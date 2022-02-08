#!/usr/bin/env ts-node
import { SequentialSearchST } from "./SequentialSearchST"
const argvs = process.argv.splice(2)

let ssst = new SequentialSearchST<any, number>()

for (let i = 0; i < argvs.length; i++) {
    ssst.put(argvs[i], i);
}

console.log('SequentialSearchST Action:')
for (let key of ssst.keys()) {
    console.log(key + ' ' + ssst.get(key))
}