import { isComparable, Comparable } from "./Comparable"
import { getType } from "./utils"
// 排序抽象类
export abstract class Sort {
    static sort(a: any[]): void { }

    static less(v: any, w: any): boolean {
        if (isComparable(v) && isComparable(w)) {
            return v.compareTo(w) < 0
        } else if ((getType(v) === 'String' && getType(w) === 'String') || (getType(v) === 'Number' && getType(w) === 'Number')) {
            return v < w
        } else {
            console.error('请传入Comparable、Number、String类型，且保证传入值类型相同')
            return false
        }
    }

    static exch(a: any[], i: number, j: number): void {
        const t = a[i]
        a[i] = a[j]
        a[j] = t
    }

    static show(a: any[]): void {
        let str: string = ''
        for (let i = 0; i < a.length; i++) {
            str += `${a[i]} `
        }
        console.log('sorted', str)
    }

    static isSorted(a: any[]): boolean {
        for (let i = 1; i < a.length; i++) {
            if (this.less(a[i], a[i - 1])) return false
        }
        return true
    }

}