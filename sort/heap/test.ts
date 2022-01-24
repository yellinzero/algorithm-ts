#!/usr/bin/env ts-node
import { sort } from './heap'
const fs = require('fs')
const argvs = process.argv.splice(2);
// examples
const N: number = argvs.length;
let stream: any[] = [];
for (let i = 0; i < N; i++) {
    stream = stream.concat(fs.readFileSync(argvs[i], { encoding: 'UTF-8' }).split(' '));
}

console.log('before', stream)
sort(stream)
console.log('sorted', stream)