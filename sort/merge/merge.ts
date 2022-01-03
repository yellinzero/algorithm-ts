import { Sort } from "../../common";
class MergeFn extends Sort {
    static aux: any[]
    static merge(a: any, lo: number, mid: number, hi: number) {
        let i = lo, j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            this.aux[k] = a[k]
        }
        for (let k = lo; k <= hi; k++) {
            if (i > mid) a[k] = this.aux[j++];
            else if (j > hi) a[k] = this.aux[i++];
            else if (this.less(this.aux[j], this.aux[i])) a[k] = this.aux[j++];
            else a[k] = this.aux[i++];
        }
    }
}

// 核心：自顶向下归并，从大数组开始排序归并 1-2-4-8……（区别在于，这里是1个数组分成2个数组分成4个数组）
export class Merge extends MergeFn {
    static aux: any[]
    static sort(a: any[], lo?: number, hi?: number): void {
        if (lo === undefined && hi === undefined) {
            this.aux = new Array(a.length)
            this.sort(a, 0, a.length - 1)
        } else if (typeof lo === 'number' && typeof hi === 'number') {
            if (hi <= lo) return;
            let mid: number = lo + Math.floor((hi - lo) / 2);
            this.sort(a, lo, mid);
            this.sort(a, mid + 1, hi);
            this.merge(a, lo, mid, hi);
        } else {
            console.error('参数错误')
        }
    }
}

// 核心：自底向上归并，从小数组开始归并，1-2-4-8……（这里是长度为1的数组->长度为2个数组）
export class MergeBU extends MergeFn {
    static aux: any[]
    static sort(a: any[]): void {
        const N = a.length;
        this.aux = new Array(N)
        for (let sz = 1; sz < N; sz = sz + sz) {
            for (let lo = 0; lo < N - sz; lo += sz + sz) {
                this.merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1))
            }
        }
    }
}