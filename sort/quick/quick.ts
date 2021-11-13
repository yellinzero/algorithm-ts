import { Sort, shuffle } from "../../common";

// 核心：大的右边，小的左边，切分元素在中间，反复长度递减切分，只要每一个元素左小右大则整个数组有序
export class Quick extends Sort {
    static sort(a: Array<any>, lo?: number, hi?: number): void {
        if (lo === undefined && hi === undefined) {
            shuffle(a);
            this.sort(a, 0, a.length - 1)
        } else if (typeof lo === 'number' && typeof hi === 'number') {
            if (hi <= lo) return;
            let j: number = this.partition(a, lo, hi);
            this.sort(a, lo, j - 1);
            this.sort(a, j + 1, hi);
        } else {
            console.error('参数错误')
        }
    }
    static partition(a: Array<any>, lo: number, hi: number): number {
        let i = lo, j = hi + 1;
        let v = a[lo];
        while (true) {
            while (this.less(a[++i], v)) if (i === hi) break;
            while (this.less(v, a[--j]));
            if (i >= j) break;
            // 小的放左边，大的放右边
            this.exch(a, i, j);
        }
        this.exch(a,lo,j);// 定位（切分）元素放中间
        return j;
    }
}