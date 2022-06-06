/**
 * 三向字符串快速排序
 */

import { Sort } from "../../sort/Sort"

export class Quick3string {
    private static charAt(s: string, d: number) {
        if (d < s.length)
            return s.charCodeAt(d)
        else
            return -1
    }
    static sort(a: string[], lo?: number, hi?: number, d?: number) {
        if (lo !== undefined && hi !== undefined && d !== undefined) {
            if (hi <= lo) return
            let lt = lo
            let gt = hi
            let v = this.charAt(a[lo], d)
            let i = lo + 1
            while (i <= gt) {
                let t = this.charAt(a[i], d)
                if (t < v) Sort.exch(a, lt++, i++)
                else if (t > v) Sort.exch(a, i, gt--)
                else i++
            }
            // a[lo...lt-1] < v=a[lt...gt] < a[gt+1...hi]
            this.sort(a, lo, lt - 1, d)
            if (v >= 0) this.sort(a, lt, gt, d + 1)
            this.sort(a, gt + 1, hi, d)
        } else {
            this.sort(a, 0, a.length - 1, 0)
        }
    }
}