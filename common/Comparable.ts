// 比较抽象类
export interface Comparable {
    compareTo(x: Comparable): number
}

export function isComparable(object: Comparable | unknown): object is Comparable {
    return (<Comparable>object)?.compareTo !== undefined
}