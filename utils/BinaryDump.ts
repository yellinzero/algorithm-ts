#!usr/env/bin ts-node

import { BinaryStdIn } from "./BinaryStdIn"

async function run() {
    const argv = process.argv.slice(2)
    let bitsPerLine = 16
    if (argv.length === 1) {
        bitsPerLine = Number(argv[0])
    }

    let count
    let str = ''
    for (count = 0; !(await BinaryStdIn.isEmpty()); count++) {
        if (bitsPerLine === 0) {
            await BinaryStdIn.readBoolean()
            continue
        } else if (count !== 0 && count % bitsPerLine === 0) str += '\n'
        if (await BinaryStdIn.readBoolean()) str += '1'
        else str += '0'
    }
    console.log(str)
    console.log(count + " bits")
}

run()

