#!/usr/bin/env ts-node

import { Graph } from "./Graph";
import { DepthFirstPaths } from "./DFS/DepthFirstPaths";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Graph(graphInfo)
const s: number = Number(argvs[1])
const search = new DepthFirstPaths(G, s)



for (let v = 0; v < G.getV(); v++) {
    let path = `${s} to ${v}: `
    if(search.hasPathTo(v)) {
        for (let x of search.pathTo(v)!) {
            x === s ?  path += x :  path += `-${x}`
        }
    }
    console.log(path)
}