#!/usr/bin/env ts-node

import { QuickFindUF } from "./UF/QuickFindUF"
import { QuickUnionUF } from "./UF/QuickUnionUF"
import { WeightedQuickUnionUF } from "./UF/WeightedQuickUnionUF "

interface UFType {
    [key: string]: typeof QuickFindUF | typeof QuickUnionUF | typeof WeightedQuickUnionUF
}
const argvs = process.argv.splice(2)
const fs = require('fs')
const UFObject: string = argvs[0]
let graphInfo = fs.readFileSync(argvs[1], { encoding: 'UTF-8' })

const graphStrArr = graphInfo.replace(/\s+/g, ' ').split(' ')

const N = graphStrArr.shift()
const UF: UFType = {
    'QuickFindUF': QuickFindUF,
    'QuickUnionUF': QuickUnionUF,
    'WeightedQuickUnionUF': WeightedQuickUnionUF
}
const uf = new UF[UFObject](N)
while (graphStrArr.length > 0) {
    const p = graphStrArr.shift()
    const q = graphStrArr.shift()

    if (uf.connected(p, q)) continue
    uf.union(p, q)
    console.log(p, "", q)
}

console.log(uf.count(), " components")