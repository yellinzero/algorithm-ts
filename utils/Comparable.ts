// 比较抽象类
export interface Comparable {
    compareTo(x: Comparable): number
}

export function isComparable(object: any): object is Comparable {
    return (<Comparable>object)?.compareTo !== undefined
}

// 获取比较值
export function getComparaValue(x: any, y: any) {
    if (isComparable(x) && isComparable(y)) {
        return x.compareTo(y)
    } else if (typeof x === 'number' && typeof y === 'number') {
        return x - y
    } else if (typeof x === 'string' && typeof y === 'string') {
        if (x > y) return 1
        else if (x === y) return 0
        else return -1
    }
}