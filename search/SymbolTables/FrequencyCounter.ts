#!/usr/bin/env ts-node
import { getWords } from "../../common/article"
import { SequentialSearchST } from "./SequentialSearchST"
import { BinarySearchST } from "./BinarySearchST"
const argvs = process.argv.splice(2)
const minlen: number = Number(argvs[0])
const articleArr = getWords(argvs[1])

function SequentialSearchSTRun() {
    const ssst = new SequentialSearchST<any, number>()
    while (articleArr.length > 0) {
        let word: string = articleArr.shift()?.toLowerCase() as string
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
    console.log('Average comparison times: ', ssst.getAver());

}
SequentialSearchSTRun()

function BinarySearchSTRun() {
    const bsst = new BinarySearchST<any, number>()
    while (articleArr.length > 0) {
        let word: string = articleArr.shift()?.toLowerCase() as string
        if (word.length < minlen) continue;
        if (!bsst.contains(word)) bsst.put(word, 1)
        else bsst.put(word, bsst.get(word)! + 1)
    }

    let max = " "
    bsst.put(max, 0)

    for (let key of bsst.keysEach()) {
        if (bsst.get(key)! > bsst.get(max)!) max = key
    }

    console.log(max + " " + bsst.get(max))
    console.log('Average comparison times: ', bsst.getAver())
}
// BinarySearchSTRun()