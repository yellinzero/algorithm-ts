// 比较抽象类
export interface Comparable<T> {
    compareTo(x: Comparable<T>): number
}

export function isComparable(object: any): object is Comparable<any> {
    return (<Comparable<any>>object)?.compareTo !== undefined
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