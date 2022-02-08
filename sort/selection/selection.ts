import { Sort } from "../../common"

// 核心：将未排序数组中最小的值放到未排序的最前面（已排序的最后面）
export class Selection extends Sort {
    static sort(a: any[]): void {
        let N: number = a.length
        for (let i = 0; i < N; i++) {
            let min = i
            for (let j = i + 1; j < N; j++) {
                if (this.less(a[j], a[min])) min = j
            }
            this.exch(a, i, min)
        }
    }
}