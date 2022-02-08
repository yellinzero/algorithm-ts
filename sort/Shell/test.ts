#!/usr/bin/env ts-node
import { Shell } from './shell'
const argvs = process.argv.splice(2)
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Shell.sort(arr)
Shell.show(arr)