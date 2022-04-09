#!/usr/bin/env ts-node

import { Graph } from "./Graph";
import { DepthFirstSearch } from "./DepthFirstSearch";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

// 图搜索测试逻辑，当前Search不含具体实现
const G = new Graph(graphInfo)
const s: number = Number(argvs[1])
const search = new DepthFirstSearch(G, s)


let marked = ''
for (let v = 0; v < G.getV(); v++) {
    if (search.marked(v)) marked += v + ' '
}
console.log(marked)

let connect = ''
if (search.count() != G.getV()) connect += 'NOT '
connect += 'connected'
console.log(connect)