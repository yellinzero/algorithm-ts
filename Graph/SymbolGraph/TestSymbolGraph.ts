#!/usr/bin/env ts-node
import { SymbolGraph } from "./SymbolGraph";

const argvs = process.argv.splice(2)
const fs = require('fs')
const readline = require('readline')
const path = require('path')

async function run() {
    const sp = argvs[1]
    const fileStream = fs.createReadStream(path.join(__dirname, `../data/${argvs[0]}`))

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    const stream: string[][] = []

    for await (let line of rl) {
        const a: string[] = line.split(sp)
        stream.push(a)
    }

    const sg = new SymbolGraph(stream, sp)
    const G = sg.getG()

    const currRl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });
    currRl.prompt()
    currRl.on('line', (line: string) => {
        if(line === 'close') {
            currRl.close()
        } else {
            for(let w of (G.getAdj(sg.index(line)!) || [])) {
                console.log('    ' + sg.name(w))
            }
            currRl.prompt()
        }
    }).on('close', ()=>{
        console.log('\nDONE!')
        process.exit(0)
    })
}

run()