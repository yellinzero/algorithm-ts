import { getType, isComparable, Comparable } from "./index"
// 排序抽象类
export abstract class PQ<T> {
    constructor(arg?: T[] | number)
    constructor() { }

    abstract insert(v: T, k?: number): void
    abstract isEmpty(): boolean
    abstract size(): number
}
export abstract class AbstractMaxPQ<T> extends PQ<T> {
    abstract max(): T
    abstract delMax(): T | number
}

export abstract class AbstractMinPQ<T> extends PQ<T> {
    abstract min(): T
    abstract delMin(): T | number
}

/**
 *优先队列：支持 删除最大元素 和 插入元素 两种操作的抽象数据类型
 *我们可以通过数组、链表、堆等数据结构实现优先队列
 *以下为基于堆的优先队列
 */
export class MaxPQ<T> extends AbstractMaxPQ<T> {
    private pq: any[]
    private N: number = 0

    constructor(maxN: number) {
        super()
        this.pq = new Array(maxN + 1)
    }

    public isEmpty(): boolean {
        return this.N === 0
    }
    public size(): number {
        return this.N
    }

    // 插入数据，从最尾端上浮
    public insert(v: T): void {
        this.pq[++this.N] = v
        this.swim(this.N)
    }

    public max(): T {
        return this.pq[1]
    }

    /** 
     * 删除并输出最大元素 
     * 将最大元素输出后置于数组最后清除，将最后元素置于堆最上放进行下沉重新排序
     */
    public delMax(): T {
        const max = this.pq[1]
        this.exch(1, this.N--)
        this.pq[this.N + 1] = null
        this.sink(1)
        return max
    }

    private less(i: number, j: number): boolean {
        if (isComparable(this.pq[i]) && isComparable(this.pq[j])) {
            return (this.pq[i] as unknown as Comparable).compareTo(this.pq[j] as unknown as Comparable) < 0
        } else if ((getType(this.pq[i]) === 'String' && getType(this.pq[j]) === 'String')
            || (getType(this.pq[i]) === 'Number' && getType(this.pq[j]) === 'Number')) {
            return this.pq[i] < this.pq[j]
        } else {
            console.error('请传入Comparable、Number、String类型，且保证传入值类型相同')
            return false
        }
    }

    private exch(i: number, j: number): void {
        const t: T = this.pq[i]
        this.pq[i] = this.pq[j]
        this.pq[j] = t
    }

    /** 
     * 上浮：若父节点比当前节点小则交换两节点，否则结束上浮
     */
    private swim(k: number): void {
        while (k > 1 && this.less(Math.floor(k / 2), k)) {
            this.exch(Math.floor(k / 2), k)
            k = Math.floor(k / 2)
        }
    }

    /** 
     * 下沉：
     * 先选出儿子节点中最大的
     * 当前节点小于儿子节点中最大的，则互相交换
     * 否则结束下沉
     */
    private sink(k: number): void {
        while (2 * k <= this.N) {
            let j: number = 2 * k
            if (j < this.N && this.less(j, j + 1)) j++
            if (!this.less(k, j)) break
            this.exch(k, j)
            k = j
        }
    }
}

export class IndexMinPQ<T> extends AbstractMinPQ<T> {
    private items: any[]
    private qp: number[]
    private pq: number[]
    private N: number = 0

    constructor(maxN: number) {
        super()
        this.pq = new Array(maxN + 1)
        this.items = new Array(maxN + 1)
        this.qp = new Array(maxN + 1)
        for (let i = 0; i <= maxN; i++) {
            this.qp[i] = -1
        }
    }

    public isEmpty(): boolean {
        return this.N === 0
    }
    public size(): number {
        return this.N
    }

    // 插入数据，从最尾端上浮
    public insert(item: T, k: number): void {
        this.N++
        this.qp[k] = this.N
        this.pq[this.N] = k
        this.items[k] = item
        this.swim(this.N)
    }

    // 修改索引为k的元素为item
    public change(item: T, k: number): void {
        this.items[k] = item
        this.swim(this.qp[k])
        this.sink(this.qp[k])
    }

    // 是否存在索引为k的元素
    public contains(k: number): boolean {
        return this.qp[k] != -1
    }

    // 删除索引为k的元素
    public delete(k: number): void {
        const index = this.qp[k]
        this.exch(index, this.N--)
        this.swim(index)
        this.sink(index)
        this.items[k] = null
        this.qp[k] = -1
    }

    public min(): T {
        return this.items[this.pq[1]]
    }

    public minIndex(): number {
        return this.pq[1]
    }

    /** 
     * 删除并输出最小元素 
     * 将最小元素输出后置于数组最后清除，将最后元素置于堆最上放进行下沉重新排序
     */
    public delMin(): number {
        const min = this.pq[1]
        this.exch(1, this.N--)
        this.sink(1)
        this.qp[this.pq[this.N + 1]] = -1
        this.items[this.pq[this.N + 1]] = null
        return min
    }

    /** 
     * 上浮：判断j比i小的情况
     */
    private less(i: number, j: number): boolean {
        if (isComparable(this.items[this.pq[i]]) && isComparable(this.items[this.pq[j]])) {
            return (this.items[this.pq[i]] as unknown as Comparable).compareTo(this.items[this.pq[j]] as unknown as Comparable) > 0
        } else if ((getType(this.items[this.pq[i]]) === 'String' && getType(this.items[this.pq[j]]) === 'String')
            || (getType(this.items[this.pq[i]]) === 'Number' && getType(this.items[this.pq[j]]) === 'Number')) {
            return this.items[this.pq[i]] > this.items[this.pq[j]]
        } else {
            console.error('请传入Comparable、Number、String类型，且保证传入值类型相同')
            return false
        }
    }

    private exch(i: number, j: number): void {
        const key: number = this.pq[i]
        this.pq[i] = this.pq[j]
        this.pq[j] = key
        this.qp[this.pq[i]] = i
        this.qp[this.pq[j]] = j
    }

    /** 
     * 上浮：若父节点比当前节点大则交换两节点，否则结束上浮
     */
    private swim(n: number): void {
        while (n > 1 && this.less(Math.floor(n / 2), n)) {
            this.exch(Math.floor(n / 2), n)
            n = Math.floor(n / 2)
        }
    }

    /** 
     * 下沉：
     * 先选出儿子节点中最小的
     * 当前节点大于儿子节点中最小的，则互相交换
     * 否则结束下沉
     */
    private sink(k: number): void {
        while (2 * k <= this.N) {
            let j: number = 2 * k
            if (j < this.N && this.less(j, j + 1)) j++
            if (!this.less(k, j)) break
            this.exch(k, j)
            k = j
        }
    }
}