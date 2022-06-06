/**
 * 高位优先字符串排序
 */
import { Insertion } from "../../sort"

export class MSD {
    private static R = 256
    private static M = 15
    private static aux: string[]

    private static charAt(s: string, d: number) {
        if (d < s.length)
            return s.charCodeAt(d)
        else
            return -1
    }

    static sort(a: string[], lo?: number, hi?: number, d?: number) {
        if (lo !== undefined && hi !== undefined && d !== undefined) {
            if (hi <= lo + this.M) {
                Insertion.sort(a, lo, hi, d)
                return
            }
            const count = new Array(this.R + 2)
            count.fill(0)
            for (let i = lo; i <= hi; i++) {
                count[this.charAt(a[i], d) + 2]++
            }
            for (let r = 0; r < this.R + 1; r++) {
                count[r + 1] += count[r]
            }
            for (let i = lo; i <= hi; i++) {
                this.aux[count[this.charAt(a[i], d) + 1]++] = a[i]
            }
            for (let i = lo; i <= hi; i++) {
                a[i] = this.aux[i - lo]
            }
            for (let r = 0; r < this.R; r++) {
                this.sort(a, lo + count[r], lo + count[r + 1] - 1, d + 1)
            }
        } else {
            const N = a.length
            this.aux = []
            this.sort(a, 0, N - 1, 0)
        }
    }
}