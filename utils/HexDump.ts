#!usr/env/bin ts-node

import { BinaryStdIn } from "./BinaryStdIn"

async function run() {
    const argv = process.argv.slice(2)
    let bytesPerLine = 16
    if (argv.length === 1) {
        bytesPerLine = Number(argv[0])
    }

    let i
    let str = ''
    for (i = 0; !(await BinaryStdIn.isEmpty()); i++) {
        if (bytesPerLine === 0) {
            await BinaryStdIn.readChar()
            continue
        }
        if (i === 0) str += ''
        else if (i % bytesPerLine === 0) str += '\n'
        else str += ' '
        const c = await BinaryStdIn.readChar()
        str += (c.charCodeAt(0) & 0xff).toString(16)
    }
    console.log(str)
    console.log(i * 8 + " bits")
}

run()

