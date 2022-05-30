#!/usr/bin/env ts-node
import { Topological } from "./DFS/Topological"
import { SymbolDigraph } from "./SymbolGraph/SymbolDigraph"

const argvs = process.argv.splice(2)
const fs = require('fs')
const readline = require('readline')
const path = require('path')

async function run() {
    const sp = argvs[1]
    const fileStream = fs.createReadStream(path.join(__dirname, `./data/${argvs[0]}`))

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    const stream: string[][] = []

    for await (let line of rl) {
        const a: string[] = line.split(sp)
        stream.push(a)
    }

    const sg = new SymbolDigraph(stream, sp)
    const top = new Topological(sg.getG())
    for (let v of top.getOrder()!) {
        console.log(sg.name(v))
    }
}

run()