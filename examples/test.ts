#!/usr/bin/env ts-node
import { Rolls } from './Counter'
const argvs = process.argv.splice(2)
Rolls(Number(argvs[0]))