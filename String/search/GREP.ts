#!/usr/bin/env ts-node

import { NFA } from "./NFA"

// 模拟传统unix系统GREP的效果

const argvs = process.argv.splice(2)
const fs = require('fs')
const readline = require('readline')

async function run() {
    const regexp = `(.*${argvs[0]}.*)`
    const nfa = new NFA(regexp)
    const fileStream = fs.createReadStream(argvs[1])

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        if (nfa.recognizes(line))
            console.log(line)
    }
}

run()