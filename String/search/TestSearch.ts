#!/usr/bin/env ts-node

import { KMP } from "./KMP"
import { BoyerMoore } from "./BoyerMoore"
import { RabinKarp } from "./RabinKarp"
const argvs = process.argv.splice(2)
const pat = argvs[1]
const txt = argvs[2]
const type = argvs[0]

interface SearchType {
    [key: string]: typeof KMP | typeof BoyerMoore | typeof RabinKarp
}
const SearchMethod = {
    'KMP': KMP,
    'BoyerMoore': BoyerMoore,
    'RabinKarp': RabinKarp
} as SearchType

const search = new SearchMethod[type](pat)

console.log(`text:    ${txt}`)
const offset = search.search(txt)
let output = 'pattern: '
for (let i = 0; i < offset; i++) {
    output += ' '
}
console.log(output + pat)