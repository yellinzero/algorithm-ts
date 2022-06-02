#!/usr/bin/env ts-node

import { EdgeWeightedDigraph } from './common/EdgeWeightedDigraph'
import { AcyclicLP } from './SP/AcyclicLP'
import { AcyclicSP } from './SP/AcyclicSP'
import { DijkstraSP } from './SP/DijkstraSP'

interface SPType {
    [key: string]: typeof DijkstraSP | typeof AcyclicSP | typeof AcyclicLP
}
const argvs = process.argv.splice(2)
const fs = require('fs')
const SPObject: string = argvs[0]
const graphInfo = fs.readFileSync(argvs[1], { encoding: 'UTF-8' })
const s = Number(argvs[2])

const G = new EdgeWeightedDigraph(graphInfo)
const SP: SPType = {
    'DijkstraSP': DijkstraSP,
    'AcyclicSP': AcyclicSP,
    'AcyclicLP': AcyclicLP,
}
const sp = new SP[SPObject](G, s)

for (let t = 0; t < G.V(); t++) {
    let output = `${s} to ${t} (${sp.distTo(t).toFixed(2)}): `
    if (sp.hasPathTo(t)) {
        for (let e of sp.pathTo(t)!) {
            output += `${e}  `
        }
    }
    console.log(output)
}