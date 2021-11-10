import { Sort } from "../../common";

// 核心：将当前值按大小插入到数组对应位置
export class Insertion extends Sort {
    static sort(a: Array<any>): void {
        let N: number = a.length;
        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j > 0 && this.less(a[j], a[j - 1]); j--) {
                this.exch(a, j, j - 1)
            }
        }
    }
}