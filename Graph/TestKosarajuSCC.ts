#!/usr/bin/env ts-node

import { Digraph } from "./common/Digraph";
import { KosarajuSCC } from "./DFS/KosarajuSCC";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Digraph(graphInfo)
console.log(G)
const cc = new KosarajuSCC(G)

const M: number = cc.getCount()
console.log(M + ' components')

const components: number[][] = []
for (let i = 0; i < M; i++) {
    components[i] = []
}
for (let v = 0; v < G.V(); v++) {
    components[cc.getId(v)].unshift(v)
}
for (let i = 0; i < M; i++) {
    let str = ''
    for (let v of components[i]) {
        str += v + ' '
    }
    console.log(str)
}


