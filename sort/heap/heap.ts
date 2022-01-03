import { MaxPQ, getType, isComparable, Comparable } from "../../common";
/**
 *核心：利用堆优先队列实现排序
 *优先队列：支持 删除最大元素 和 插入元素 两种操作的抽象数据类型
 *我们可以通过数组、链表、堆等数据结构实现优先队列
 *以下为基于堆的优先队列
 */
export class Heap<T> extends MaxPQ<T> {
    private pq: T[];
    private N: number = 0;

    constructor(maxN: number) {
        super();
        this.pq = new Array(maxN + 1);
    }

    public isEmpty(): boolean {
        return this.N === 0;
    }
    public size(): number {
        return this.N;
    }

    // 插入数据，从最尾端上浮
    public insert(v: T): void {
        this.pq[++this.N] = v;
        this.swim(this.N);
    }

    public max(): T {
        return this.pq[1];
    }

    /** 
     * 删除并输出最大元素 
     * 将最大元素输出后置于数组最后清除，将最后元素置于堆最上放进行下沉重新排序
     */
    public delMax(): T {
        const max = this.pq[1];
        this.exch(1, this.N--);
        this.pq[this.N + 1] = null;
        this.sink(1);
        return max;
    }

    private less(i: number, j: number): boolean {
        if (isComparable(this.pq[i]) && isComparable(this.pq[j])) {
            return (this.pq[i] as unknown as Comparable).compareTo(this.pq[j] as unknown as Comparable) < 0;
        } else if ((getType(this.pq[i]) === 'String' && getType(this.pq[j]) === 'String')
            || (getType(this.pq[i]) === 'Number' && getType(this.pq[j]) === 'Number')) {
            return this.pq[i] < this.pq[j];
        } else {
            console.error('请传入Comparable、Number、String类型，且保证传入值类型相同');
            return false;
        }
    }

    private exch(i: number, j: number): void {
        const t: T = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = t;
    }

    /** 
     * 上浮：若父节点比当前节点小则交换两节点，否则结束上浮
     */
    private swim(k: number): void {
        while (k > 1 && this.less(k / 2, k)) {
            this.exch(k / 2, k);
            k = k / 2;
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
            let j: number = 2 * k;
            if (j < this.N && this.less(j, j+1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }
}