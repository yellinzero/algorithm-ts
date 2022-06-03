#!/usr/bin/env ts-node

import { EdgeWeightedDigraph } from './common/EdgeWeightedDigraph'
import { AcyclicLP } from './LP/AcyclicLP'

interface LPType {
    [key: string]: typeof AcyclicLP
}
const argvs = process.argv.splice(2)
const fs = require('fs')
const LPObject: string = argvs[0]
const graphInfo = fs.readFileSync(argvs[1], { encoding: 'UTF-8' })
const s = Number(argvs[2])

const G = new EdgeWeightedDigraph(graphInfo)
const LP: LPType = {
    'AcyclicLP': AcyclicLP,
}
const lp = new LP[LPObject](G, s)

for (let t = 0; t < G.V(); t++) {
    let output = `${s} to ${t} (${lp.distTo(t).toFixed(2)}): `
    if (lp.hasPathTo(t)) {
        for (let e of lp.pathTo(t)!) {
            output += `${e}  `
        }
    }
    console.log(output)
}