#!/usr/bin/env ts-node
import { Heap } from './heap'
const fs = require('fs')
const argvs = process.argv.splice(2);
// examples
const N: number = argvs.length;