#!/usr/bin/env ts-node

import { Graph } from "./Graph";
import { CC } from "./DFS/CC";
import { stdout } from "process";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Graph(graphInfo)
const cc = new CC(G)

const M: number = cc.getCount()
console.log(M + ' components')

const components: number[][] = []
for (let i = 0; i < M; i++) {
    components[i] = []
}
for (let v = 0; v < G.getV(); v++) {
    components[cc.getId(v)].unshift(v)
}
for (let i = 0; i < M; i++) {
    let str = ''
    for (let v of components[i]) {
        str += v + ' '
    }
    console.log(str)
}


