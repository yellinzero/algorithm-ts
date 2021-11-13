#!/usr/bin/env ts-node
import { Heap } from './heap'
const argvs = process.argv.splice(2);
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Heap.sort(arr);
Heap.show(arr);