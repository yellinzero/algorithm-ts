import { Sort } from "../../common"

// 核心：插入排序分成多个子数组进行排序(h有序数组)（由大及小，当h为1时，则数组排序完成）
export class Shell extends Sort {
    static sort(a: any[]): void {
        const N = a.length
        let h = 1
        // 自定义的递增序列
        while (h < N / 3) {
            h = 3 * h + 1
        }
        while (h >= 1) {
            for (let i = h; i < N; i++) {
                for (let j = i; j >= h && this.less(a[j], a[j - h]); j -= h) {
                    this.exch(a, j, j - h)
                }
            }
            h = Math.floor(h / 3)
        }
    }
}