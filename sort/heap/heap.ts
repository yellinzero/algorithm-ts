import { isComparable, Comparable, getType } from '../../common/index'
/**
 *核心：利用堆优先队列实现排序
 */

export default function sort(a: any[]): void {
    let N = a.length;
    for (let k = Math.floor(N / 2); k >= 1; k--) sink(a, k, N);
    while (N > 1) {
        exch(a, 1, N--)
        sink(a, 1, N)
    }
}

function sink(a: any[], k: number, N: number): void {
    while (2 * k <= N) {
        let j: number = 2 * k;
        if (j < N && less(a, j, j + 1)) j++;
        if (!less(a, k, j)) break;
        exch(a, k, j);
        k = j;
    }
}

function less(a: any[], i: number, j: number): boolean {
    --i, --j;
    if (isComparable(a[i]) && isComparable(a[j])) {
        return (a[i] as unknown as Comparable).compareTo(a[j] as unknown as Comparable) < 0;
    } else if ((getType(a[i]) === 'String' && getType(a[j]) === 'String')
        || (getType(a[i]) === 'Number' && getType(a[j]) === 'Number')) {
        return a[i] < a[j];
    } else {
        console.error('请传入Comparable、Number、String类型，且保证传入值类型相同');
        return false;
    }
}

function exch(a: any[], i: number, j: number): void {
    --i, --j;
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}