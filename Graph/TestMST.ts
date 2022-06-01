#!/usr/bin/env ts-node

import { EdgeWeightedGraph } from "./common/EdgeWeightedGraph"
import { LazyPrimMST } from "./MST/LazytPrimMST"
import { PrimMST } from "./MST/PrimMST"
import { KruskalMST } from "./MST/KruskalMST"

interface MSTType {
    [key: string]: typeof LazyPrimMST | typeof PrimMST | typeof KruskalMST
}
const argvs = process.argv.splice(2)
const fs = require('fs')
const MSTObject: string = argvs[0]
let graphInfo = fs.readFileSync(argvs[1], { encoding: 'UTF-8' })

const G = new EdgeWeightedGraph(graphInfo)
const MST: MSTType = {
    'LazyPrimMST': LazyPrimMST,
    'PrimMST': PrimMST,
    'KruskalMST': KruskalMST
}
const mst = new MST[MSTObject](G)
for (let e of mst.edges())
    console.log(e.toString())
console.log(mst.weight())