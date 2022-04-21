#!/usr/bin/env ts-node

import { Graph } from "./common/Graph";
import { Cycle } from "./DFS/Cycle";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const G = new Graph(graphInfo)
const cycle = new Cycle(G)

console.log(cycle.hasCycle())

