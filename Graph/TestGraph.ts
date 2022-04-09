#!/usr/bin/env ts-node
import { Graph } from "./Graph";

const argvs = process.argv.splice(2)
const fs = require('fs')
let graphInfo = fs.readFileSync(argvs[0], { encoding: 'UTF-8' })

const graph = new Graph(graphInfo)
console.log(graph.toString())