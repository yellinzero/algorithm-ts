#!/usr/bin/env ts-node
import { getWords, ProgressBar } from "../../utils"
import { BST } from "./BST"

const argvs = process.argv.splice(2)
const minlen: number = Number(argvs[0])
const articleArr = getWords(argvs[1])

function BSTRun() {
    const bst = new BST<any, number>()
    const length = articleArr.length
    const PB = new ProgressBar('数据结构构造进度', 50, length)
    let completed = 0
    while (articleArr.length > 0) {
        let word: string = articleArr.shift()?.toLowerCase() as string
        PB.render(++completed)
        if (word.length < minlen) continue;
        if (!bst.contains(word)) bst.put(word, 1);
        else bst.put(word, bst.get(word)! + 1);
    }

    let max = ''
    const keys = bst.keys()!
    for (let i = 0; i < keys.length; i++) {
        if (!max) {
            max = keys[i]
        } else {
            if (bst.get(keys[i])! > bst.get(max)!) max = keys[i]
        }
    }


    console.log('\n' + max + " " + bst.get(max));
    console.log('Average comparison times: ', bst.getAver());

}
BSTRun()
