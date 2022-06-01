#!/usr/bin/env ts-node

import { EdgeWeightedGraph } from "./common/EdgeWeightedGraph"
import { PrimMST } from "./MST/PrimMST"

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new EdgeWeightedGraph(graphInfo)
const mst = new PrimMST(G)
for (let e of mst.edges())
    console.log(e.toString())
console.log(mst.weight())