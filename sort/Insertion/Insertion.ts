import { Sort } from "../Sort"

// 核心：将当前值按大小插入到数组对应位置
export class Insertion extends Sort {
    static sort(a: any[], lo?: number, hi?: number, d?: number): void {
        if (lo !== undefined && hi !== undefined && d !== undefined) {
            const less = (v: string, w: string, d: number) => {
                return v.substring(d) < w.substring(d)
            }
            for (let i = lo; i <= hi; i++) {
                for (let j = i; j > lo && less(a[j], a[j - 1], d); j--) {
                    this.exch(a, j, j - 1)
                }
            }
        }
        else {
            let N: number = a.length
            for (let i = 1; i < N; i++) {
                for (let j = i; j > 0 && this.less(a[j], a[j - 1]); j--) {
                    this.exch(a, j, j - 1)
                }
            }
        }

    }
}