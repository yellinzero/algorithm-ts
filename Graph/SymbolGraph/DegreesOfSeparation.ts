#!/usr/bin/env ts-node
import { BreadthFirstPaths } from "../BFS/BreadthFirstPaths";
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

    const source = argvs[2]
    if (!sg.contains(source)) {
        console.log(source + 'not in database.')
        return
    }

    const s = sg.index(source)!
    const bfs = new BreadthFirstPaths(G, s)

    const currRl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });
    currRl.prompt()
    currRl.on('line', (line: string) => {
        if (line === 'close') {
            currRl.close()
        } else {
            if (sg.contains(line)) {
                const t = sg.index(line)!
                if (bfs.hasPathTo(t)) {
                    for (let v of bfs.pathTo(t)!) {
                        console.log('    ' + sg.name(v))
                    }
                } else {
                    console.log('Not connected')
                }
            } else {
                console.log('Not in database')
            }
            currRl.prompt()
        }
    }).on('close', () => {
        console.log('\nDONE!')
        process.exit(0)
    })
}

run()