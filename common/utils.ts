import { Sort } from './Sort'
export function getType(ins: any) {
    return Object.prototype.toString.call(ins).replace(/^\[object (\S+)\]$/, '$1')
}

export function shuffle(a: any[]): void {
    const N = a.length
    for (let i = 0; i < N; i++) {
        const j = Math.floor(Math.random() * (N - 1))
        Sort.exch(a, i, j)
    }
}