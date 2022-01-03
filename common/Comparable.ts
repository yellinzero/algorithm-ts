// 比较抽象类
export interface Comparable {
    compareTo(x: Comparable): number
}

export function isComparable(object: Comparable): boolean {
    return typeof object.compareTo === 'function'
}