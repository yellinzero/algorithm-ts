#!/usr/bin/env ts-node
// 使用索引最小优先队列 实现 多向归并
import { IndexMinPQ } from "../../../common"

const fs = require('fs')
const argvs = process.argv.splice(2)
// examples
const N: number = argvs.length
const streams: any[] = []
for (let i = 0; i < N; i++) {
    const stream = fs.readFileSync(argvs[i], { encoding: 'UTF-8' }).split(' ')
    streams.push(stream)
}

merge(streams)

function merge(streams: any[]): void {
    const N = streams.length
    const pq = new IndexMinPQ<string>(N)
    
    for(let i = 0;i<N;i++) {
        if(streams[i].length > 0) pq.insert(streams[i].shift(), i)
    }

    let printStr = ''
    while(!pq.isEmpty()){
        printStr += (pq.min() + ' ')
        let i = pq.delMin()
        if(streams[i].length > 0) pq.insert(streams[i].shift(), i)
    }
    console.log(printStr)
}