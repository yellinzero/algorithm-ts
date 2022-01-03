// 排序抽象类
export abstract class PQ<T> {
    constructor(arg?: T[] | number)
    constructor(){}

    abstract insert(v: T): void
    abstract isEmpty(): boolean
    abstract size(): number
}
export abstract class MaxPQ<T> extends PQ<T> {
    abstract max(): T
    abstract delMax(): T
}

export abstract class MinPQ<T> extends PQ<T> {
    abstract min(): T
    abstract delMin(): T
}