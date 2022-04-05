import { getComparaValue } from '../../common/'
class BstNode<Key, Value>{
    key: Key
    val: Value
    left: NodeType<Key, Value> = null
    right: NodeType<Key, Value> = null
    N: number
    constructor(key: Key, val: Value, N: number) {
        this.key = key
        this.val = val
        this.N = N
    }
}

type NodeType<Key, Value> = BstNode<Key, Value> | null

/* 
 * 二叉查找树
 * 结点的键大于左键，小于右键，所以将数据构造为二叉查找树后，查找的平均时间可以是对数级别的，
 * 缺点是最坏情况下的二叉树的构造会出现倾斜的状态，比如按大小顺序插入结点则会成为一条单向链表
 */
export class BST<Key, Value> {
    private root: NodeType<Key, Value> = null
    private putTimes: number = 0

    get(key: Key, node?: NodeType<Key, Value>): Value | null {
        if (node === undefined) {
            return this.get(key, this.root)
        }
        if (node === null) return null;

        const cmp: number | undefined = getComparaValue(key, node.key)

        if (cmp! < 0) return this.get(key, node.left)
        else if (cmp! > 0) return this.get(key, node.right)
        else return node.val

    }

    put(key: Key, val: Value): void
    put(key: Key, val: Value, node?: NodeType<Key, Value>): NodeType<Key, Value>
    put(key: any, val: any, node?: any): any {
        if (node === undefined) {
            this.root = this.put(key, val, this.root)
        } else {
            if (node === null) return new BstNode(key, val, 1)
            this.putTimes++
            const cmp: number | undefined = getComparaValue(key, node.key)
            if (cmp! < 0) node.left = this.put(key, val, node.left)
            else if (cmp! > 0) node.right = this.put(key, val, node.right)
            else node.val = val
            node.N = this.size(node.left) + this.size(node.right) + 1
            return node
        }
    }

    max(node?: NodeType<Key, Value>): NodeType<Key, Value> | Key {
        if (node === undefined) {
            return (this.max(this.root) as NodeType<Key, Value>)!.key
        }
        if (node?.right === null) return node
        return this.max(node?.right)
    }

    min(node?: NodeType<Key, Value>): NodeType<Key, Value> | Key {
        if (node === undefined) {
            return (this.min(this.root) as NodeType<Key, Value>)!.key
        }
        if (node?.left === null) return node
        return this.min(node?.left)
    }

    floor(key: Key, node?: NodeType<Key, Value>): NodeType<Key, Value> | Key {
        if (node === undefined) {
            const node: NodeType<Key, Value> = this.floor(key, this.root) as NodeType<Key, Value>
            if (node === null) return null
            return node.key
        }
        if (node === null) return null
        const cmp = getComparaValue(key, node.key)
        if (cmp! === 0) return node
        if (cmp! < 0) return this.floor(key, node.left)
        const t: NodeType<Key, Value> = this.floor(key, node.right) as NodeType<Key, Value>
        if (t !== null) return t
        else return node
    }

    ceiling(key: Key, node?: NodeType<Key, Value>): NodeType<Key, Value> | Key {
        if (node === undefined) {
            const node: NodeType<Key, Value> = this.ceiling(key, this.root) as NodeType<Key, Value>
            if (node === null) return null
            return node.key
        }
        if (node === null) return null
        const cmp = getComparaValue(key, node.key)
        if (cmp! === 0) return node
        if (cmp! > 0) return this.ceiling(key, node.right)
        const t: NodeType<Key, Value> = this.ceiling(key, node.left) as NodeType<Key, Value>
        if (t !== null) return t
        else return node
    }

    select(k: number, node?: NodeType<Key, Value>): NodeType<Key, Value> | Key {
        if (node === undefined) {
            return (this.select(k, this.root) as NodeType<Key, Value>)!.key
        }
        if (node === null) return null
        const t: number = this.size(node.left)
        if (t > k) return this.select(k, node.left)
        else if (t < k) return this.select(k - t - 1, node.right)
        else return node
    }

    rank(key: Key, node?: NodeType<Key, Value>): number {
        if (node === undefined) {
            return this.rank(key, this.root)
        }
        if (node === null) return 0
        const cmp = getComparaValue(key, node.left)
        if (cmp! < 0) return this.rank(key, node.left)
        else if (cmp! > 0) return 1 + this.size(node.left) + this.rank(key, node.right)
        else return this.size(node.left)
    }

    delete(key: Key, node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
        if (node === undefined) {
            this.root = this.delete(key, this.root)!
        } else {
            if (node === null) return null;
            const cmp = getComparaValue(key, node.key)!
            if (cmp < 0) node.left = this.delete(key, node.left)!
            else if (cmp > 0) node.right = this.delete(key, node.right)!
            else {
                if (node.right === null) return node.left
                if (node.left === null) return node.right
                const t: NodeType<Key, Value> = node;
                node = this.min(t.right) as NodeType<Key, Value>
                node!.right = this.deleteMin(t.right)!
                node!.left = t.left
            }
            node!.N = this.size(node!.left) + this.size(node!.right) + 1
            return node
        }
    }

    deleteMin(node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
        if (node === undefined) {
            this.root = this.deleteMin(this.root)!
        } else {
            if (node!.left === null) return node!.right
            node!.left = this.deleteMin(node!.left)!
            node!.N = this.size(node!.left) + this.size(node!.right) + 1
        }
    }

    deleteMax(node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
        if (node === undefined) {
            this.root = this.deleteMax(this.root)!
        } else {
            if (node!.right === null) return node!.left
            node!.right = this.deleteMax(node!.right)!
            node!.N = this.size(node!.left) + this.size(node!.right) + 1
        }
    }

    size(x?: NodeType<Key, Value>): number {
        if (x === undefined) {
            return this.size(this.root)
        }
        if (x === null) {
            return 0
        } else {
            return x.N
        }
    }

    contains(key: Key) {
        return !!this.get(key)
    }


    getAver() {
        return this.putTimes / this.root!.N
    }

    keys(lo?: Key, hi?: Key, node?: NodeType<Key, Value>, queue?: Key[]): Key[] | undefined {
        if (lo === undefined && hi === undefined && node === undefined && queue === undefined) {
            return this.keys(this.min() as Key, this.max() as Key)
        }
        if (node === undefined && queue === undefined) {
            const queue: Key[] = []
            this.keys(lo, hi, this.root, queue)
            return queue
        }
        if (node === null) return
        const cmplo = getComparaValue(lo, node!.key)!
        const cmphi = getComparaValue(hi, node!.key)!
        if (cmplo < 0) this.keys(lo, hi, node?.left, queue)
        if (cmplo <= 0 && cmphi >= 0) queue?.push(node!.key)
        if (cmphi > 0) this.keys(lo, hi, node?.right, queue)
    }

}