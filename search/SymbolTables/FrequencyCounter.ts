#!/usr/bin/env ts-node
import { SequentialSearchST } from "./SequentialSearchST"
const fs = require('fs')
const argvs = process.argv.splice(2)
const minlen: number = Number(argvs[0])
const article = fs.readFileSync(argvs[1], { encoding: 'UTF-8' })
const articleArr = article.split(' ')

const ssst = new SequentialSearchST<any, number>()
while (articleArr.length > 0) {
    const word: string = articleArr.shift()
    if (word.length < minlen) continue;
    if (!ssst.contains(word)) ssst.put(word, 1);
    else ssst.put(word, ssst.get(word)! + 1);
}

let max = " ";
ssst.put(max, 0);
for (let key of ssst.keys()) {
    if (ssst.get(key)! > ssst.get(max)!) max = key;
}
console.log(max + " " + ssst.get(max));