#!/usr/bin/env ts-node

import { Genome } from "./Genome"
import { RunLengthEncoding } from "./RunLengthEncoding"

const argv = process.argv.slice(2)
const compression = argv[0]
interface CompressionType {
    [key: string]: typeof Genome | typeof RunLengthEncoding
}
const Compression: CompressionType = {
    'Genome': Genome,
    'RunLengthEncoding': RunLengthEncoding
}
if (argv[1] === '-') Compression[compression].compress()
if (argv[1] === '+') Compression[compression].expand()