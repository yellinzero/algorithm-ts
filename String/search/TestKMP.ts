#!/usr/bin/env ts-node

import { KMP } from "./KMP"

const argvs = process.argv.splice(2)
const pat = argvs[0]
const txt = argvs[1]

const kmp = new KMP(pat)
console.log(`text:    ${txt}`)
const offset = kmp.search(txt)
let output = 'pattern: '
for (let i = 0; i < offset; i++) {
    output += ' '
}
console.log(output + pat)