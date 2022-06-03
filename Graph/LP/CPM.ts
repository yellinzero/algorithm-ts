#!/usr/bin/env ts-node

/**
 * 优先级限制下的并行任务调度问题的关键路径方法
 * 思想：将任务调度转换为无环有向图，并找到所有的调度路径（因为可以并行）
 * 其最长路径（关键路径，不能规避的调度顺序）的执行时间即为最短时间
 * 构造有向图时时按照优先级限制构造的（如v必须先指向w）
 */
import { DirectedEdge } from '../common/DirectedEdge'
import { EdgeWeightedDigraph } from '../common/EdgeWeightedDigraph'
import { AcyclicLP } from './AcyclicLP'

const argvs = process.argv.splice(2)
const fs = require('fs')
const readline = require('readline')
const path = require('path')

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, `../data/${argvs[0]}`))

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    const stream: string[][] = []

    for await (let line of rl) {
        const a: string[] = line.split(/\s+/g)
        stream.push(a)
    }
    const N = Number(stream.shift()![0])

    const G = new EdgeWeightedDigraph(2 * N + 2)
    const s = 2 * N
    const t = 2 * N + 1
    for (let i = 0; i < N; i++) {
        const a = stream.shift()!
        const duration = Number(a[0])

        G.addEdge(new DirectedEdge(i, i + N, duration))
        G.addEdge(new DirectedEdge(s, i, 0.0))
        G.addEdge(new DirectedEdge(i + N, t, 0.0))
        for (let j = 1; j < a.length; j++) {
            const successor = Number(a[j])
            G.addEdge(new DirectedEdge(i + N, successor, 0.0))
        }
    }
    const lp = new AcyclicLP(G, s)
    console.log('Start times:')
    for (let i = 0; i < N; i++) {
        console.log(`${i}: ${lp.distTo(i).toFixed(1)}`)
    }
    console.log('Finish time: ', lp.distTo(t).toFixed(1))
}

run()