#!usr/env/bin ts-node

import { BinaryStdIn } from './BinaryStdIn'

async function run () {
    console.log(await BinaryStdIn.readString())
}
run()
