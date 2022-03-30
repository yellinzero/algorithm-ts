#!/usr/bin/env ts-node
import { Selection } from './Selection'
const argvs = process.argv.splice(2)
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Selection.sort(arr)
Selection.show(arr)