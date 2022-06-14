#!/usr/bin/env ts-node

import { Genome } from "./Genome"

const argv = process.argv.slice(2)
if (argv[0] === '-') Genome.compress()
if (argv[0] === '+') Genome.expand()