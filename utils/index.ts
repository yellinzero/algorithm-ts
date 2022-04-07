// 工具方法
import { Sort } from '../sort/Sort'

// 类型获取
export function getType(ins: any) {
    return Object.prototype.toString.call(ins).replace(/^\[object (\S+)\]$/, '$1')
}


// 打散
export function shuffle(a: any[]): void {
    const N = a.length
    for (let i = 0; i < N; i++) {
        const j = Math.floor(Math.random() * (N - 1))
        Sort.exch(a, i, j)
    }
}

// 文档相关方法
export * from './article'
// 图相关方法
export * from './graph'
// 工具类
// 比较类
export * from "./Comparable"
// 命令行进度条
export * from "./progress"