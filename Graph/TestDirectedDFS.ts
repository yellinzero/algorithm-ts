#!/usr/bin/env ts-node

import { Digraph } from "./common/Digraph";
import { DirectedDFS } from "./DFS/DirectedDFS";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Digraph(graphInfo)
const sources: number[] = []
for (let i = 1; i < argvs.length; i++) {
    sources.push(Number(argvs[i]))
}

const reachable: DirectedDFS = new DirectedDFS(G, sources)

let printStr = ''
for (let v = 0; v < G.V(); v++) {
    if (reachable.marked(v)) printStr += `${v} `
}
console.log(printStr)