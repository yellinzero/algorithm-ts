#!/usr/bin/env ts-node
import { Insertion } from './insertion'
const argvs = process.argv.splice(2);
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Insertion.sort(arr);
Insertion.show(arr);