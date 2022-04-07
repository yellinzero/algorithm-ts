import { getComparaValue } from "../../utils"

/* 
 * 二分查找
 * 构造有序数组，并通过二分查找法（rank）进行查找
 */
export class BinarySearchST<Key, Value> {
    private keys: Key[]
    private vals: Value[]
    private N: number = 0
    private putTimes: number = 0
    constructor() {
        // TS数组是动态的
        this.keys =[] as Key[]
        this.vals = [] as Value[]
    }

    size(): number {
        return this.N
    }

    isEmpty(): boolean {
        return this.N === 0
    }

    get(key: Key) {
        if (this.isEmpty()) return null
        const i = this.rank(key)
        if (i !== undefined) {
            const cmp = i < this.N && getComparaValue(this.keys[i], key)
            if (cmp === 0) return this.vals[i]
            else return null
        }
    }

    contains(key: Key) {
        return !!this.get(key)
    }

    put(key: Key, val: Value) {
        const i = this.rank(key)
        if (i !== undefined) {
            this.putTimes++
            const cmp = i < this.N && getComparaValue(this.keys[i], key)
            if (cmp === 0) {
                this.vals[i] = val
                return
            }
            // 后移一位
            for (let j = this.N; j > i; j--) {
                this.keys[j] = this.keys[j - 1]
                this.vals[j] = this.vals[j - 1]
            }
            this.keys[i] = key;
            this.vals[i] = val;
            this.N++
        }
    }

    rank(key: Key, lo?: number, hi?: number): number | undefined {
        if (lo === undefined && hi === undefined) {
            return this.rank(key, 0, this.N)
        }
        if (lo !== undefined && hi !== undefined) {
            if (hi < lo) return lo
            const mid = lo + Math.floor((hi - lo) / 2)
            this.putTimes++
            const cmp = getComparaValue(key, this.keys[mid]) || 0;
            if (cmp !== undefined) {
                if (cmp < 0) return this.rank(key, lo, mid - 1)
                else if (cmp > 0) return this.rank(key, mid + 1, hi)
                else return mid
            }
        }
    }

    // 非递归的二分查找法
    rankNoRecur(key: Key): number {
        let lo = 0, hi = this.N - 1
        while (lo <= hi) {
            const mid = lo + Math.floor((hi - lo) / 2)
            this.putTimes++
            const cmp = getComparaValue(key, this.keys[mid]);
            if (cmp) {
                if (cmp < 0) hi = mid - 1
                else if (cmp > 0) lo = mid + 1
                else return mid
            }
        }
        return lo
    }

    min(): Key {
        return this.keys[0]
    }

    max(): Key {
        return this.keys[this.N - 1]
    }

    select(k: number): Key {
        return this.keys[k]
    }

    ceiling(key: Key): Key | undefined {
        const i = this.rank(key)
        if (i !== undefined) {
            return this.keys[i]
        }
    }

    delete(key: Key) {
        // TODO
    }

    range(lo: Key, hi: Key): Key[] {
        const q: Key[] = []
        const loi = this.rank(lo)
        const hii = this.rank(hi)
        if (loi !== undefined && hii !== undefined) {
            for (let i = loi; i < hii; i++) {
                q.push(this.keys[i])
            }
            if (this.contains(hi)) {
                q.push(this.keys[hii])
            }
            return q
        }
        return []
    }

    * keysEach() {
        for (let i = 0; i < this.N; i++) {
            yield this.keys[i]
        }
    }

    getAver() {
        return this.putTimes / this.N
    }

}