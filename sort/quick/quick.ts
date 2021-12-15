import { Sort, shuffle, Comparable } from "../../common";

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
        this.exch(a, lo, j);// 定位（切分）元素放中间
        return j;
    }
}


export class Quick3way extends Sort {
    static sort(a: Array<Comparable>, lo?: number, hi?: number): void {
        if (lo === undefined && hi === undefined) {
            shuffle(a);
            this.sort(a, 0, a.length - 1)
        } else if (typeof lo === 'number' && typeof hi === 'number') {
            if (hi <= lo) return;
            let lt = lo, i = lo + 1, gt = hi;
            let v: Comparable = a[lo];
            while (i <= gt) {
                const cmp = a[i].compareTo(v);
                // a[i]比v小，则放置到v的右边，并增加i和lt的索引，相当于向下走接着对比
                if (cmp < 0) this.exch(a, lt++, i++)
                else if (cmp > 0) this.exch(a, i, gt--)
                else i++;
            }
            // 以上相当于分成了 a[lo..lt-1] < v=a[lt..gt] < a[gt+1,hi] 三块，然后分别取左右两块自上而下递归
            this.sort(a, lo, lt - 1);
            this.sort(a, gt + 1, hi)
        } else {
            console.error('参数错误')
        }
    }
}
