#!/usr/bin/env ts-node

import { Graph } from "./Graph";
import { TwoColor } from "./DFS/TwoColor";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Graph(graphInfo)
const twoColor = new TwoColor(G)

console.log(twoColor.isBipartite())

