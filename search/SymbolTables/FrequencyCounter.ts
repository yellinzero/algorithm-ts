#!/usr/bin/env ts-node
import { getWords } from "../../common/article"
import { SequentialSearchST } from "./SequentialSearchST"
import { BinarySearchST } from "./BinarySearchST"
const argvs = process.argv.splice(2)
const minlen: number = Number(argvs[0])
const articleArr = getWords(argvs[1])

// const ssst = new SequentialSearchST<any, number>()
const bsst = new BinarySearchST<any, number>(articleArr.length)
while (articleArr.length > 0) {
    let word: string = articleArr.shift() as string
    if (word.length < minlen) continue;
    // if (!ssst.contains(word)) ssst.put(word, 1);
    // else ssst.put(word, ssst.get(word)! + 1);
    if (!bsst.contains(word)) bsst.put(word, 1);
    else bsst.put(word, bsst.get(word)! + 1);
}

let max = " ";
// ssst.put(max, 0);
bsst.put(max, 0);
// for (let key of ssst.keys()) {
//     if (ssst.get(key)! > ssst.get(max)!) max = key;
// }

for (let key of bsst.keysEach()) {
    if (bsst.get(key)! > bsst.get(max)!) max = key;
}

// console.log(max + " " + ssst.get(max));
// console.log('times: ', ssst.putTimes);

console.log(max + " " + bsst.get(max));
console.log('times: ', bsst.putTimes);