#!/usr/bin/env ts-node
import { Merge, MergeBU } from './Merge'
const argvs = process.argv.splice(2)
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Merge.sort(arr)
Merge.show(arr)

const arr2 = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
MergeBU.sort(arr2)
MergeBU.show(arr2)