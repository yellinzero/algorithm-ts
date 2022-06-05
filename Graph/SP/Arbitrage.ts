#!/usr/bin/env ts-node

/**
 * 货币兑换中的套汇
 * 备注：得到的答案跟书上不一样，但是根据代码逻辑，应该是无误的，因为USD-> EUR -> GBP -> USD 也是一个负权重环且按执行逻辑会先被找出来
 */

import { DirectedEdge } from "../common/DirectedEdge"
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph"
import { BellmanFordSP } from "./BellmanFordSP"

const argvs = process.argv.splice(2)
const fs = require('fs')

const graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })
const graphStrArr = graphInfo.replace(/\s+/g, ' ').split(' ')
const V = Number(graphStrArr.shift())
const name = [] as string[]
const G = new EdgeWeightedDigraph(V)

for (let v = 0; v < V; v++) {
    name[v] = graphStrArr.shift()
    for (let w = 0; w < V; w++) {
        const rate = Number(graphStrArr.shift())
        const e = new DirectedEdge(v, w, -Math.log(rate))
        G.addEdge(e)
    }
}

const spt = new BellmanFordSP(G, 0)
if (spt.hasNegativeCycle()) {
    let stake = 1000
    for (let e of spt.negativeCycle()!) {
        console.log(`${stake.toFixed(5)} ${name[e.from()]} = ${(stake *= Math.exp(-e.weight())).toFixed(5)} ${name[e.to()]}`)
    }
} else {
    console.log('No arbitrage opportunity')
}