// 计算类
export class Counter {
    countNum: number;
    constructor(public id?: string) {
        this.countNum = 0;
    }
    increment() {
        this.countNum++;
    }
    tally(): number {
        return this.countNum;
    }
    toString(): string {
        return this.countNum + ' ' + this.id;
    }
}

// 比较抽象类
export interface Comparable {
    compareTo(x: Comparable): number
}

// 排序抽象类
export abstract class Sort {
    static sort(a: Array<any>): void { }

    static less(v: any, w: any): boolean {
        if (isComparable(v as Comparable) && isComparable(w as Comparable)) {
            return v.compareTo(w) < 0;
        } else if ((getType(v) === 'String' && getType(w) === 'String') || (getType(v) === 'Number' && getType(w) === 'Number')) {
            return v < w;
        } else {
            console.error('请传入Comparable、Number、String类型，且保证传入值类型相同');
            return false;
        }
    }

    static exch(a: Array<any>, i: number, j: number): void {
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    static show(a: Array<any>): void {
        let str: string = ''
        for (let i = 0; i < a.length; i++) {
            str += `${a[i]} `
        }
        console.log('sorted', str);
    }

    static isSorted(a: Array<any>): boolean {
        for (let i = 1; i < a.length; i++) {
            if (this.less(a[i], a[i - 1])) return false;
        }
        return true;
    }

}

export function getType(ins: any) {
    return Object.prototype.toString.call(ins).replace(/^\[object (\S+)\]$/, '$1');
}

export function shuffle(a: Array<any>): void {
    const N = a.length;
    for (let i = 0; i < N; i++) {
        const j = Math.floor(Math.random() * (N - 1))
        Sort.exch(a, i, j)
    }
}

export function isComparable(object: Comparable) : boolean {
    return  typeof object.compareTo === 'function'
}