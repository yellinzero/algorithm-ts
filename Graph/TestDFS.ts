#!/usr/bin/env ts-node

import { Graph } from "./common/Graph";
import { DepthFirstSearch } from "./DFS/DepthFirstSearch";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Graph(graphInfo)
const s: number = Number(argvs[1])
const search = new DepthFirstSearch(G, s)


let marked = ''
for (let v = 0; v < G.V(); v++) {
    if (search.marked(v)) marked += v + ' '
}
console.log(marked)

let connect = ''
if (search.count() != G.V()) connect += 'NOT '
connect += 'connected'
console.log(connect)