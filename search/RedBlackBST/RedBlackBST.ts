import { getComparaValue } from '../../utils'
const RED = true
const BLACK = false
class RedBlackBstNode<Key, Value>{
    key: Key
    val: Value
    left: NodeType<Key, Value> = null
    right: NodeType<Key, Value> = null
    N: number
    color: boolean
    constructor(key: Key, val: Value, N: number, color: boolean) {
        this.key = key
        this.val = val
        this.N = N
        this.color = color
    }
}

type NodeType<Key, Value> = RedBlackBstNode<Key, Value> | null

/* 
 * 红黑树
 * 本质上就是2-3查找树，只是其易于实现的数据结构抽象，其中红链接连接的父子节点成一个-3节点，黑链接指向一个-2节点
 * 另一种等价表述：红链接均为左链接，没有任何一个结点同时和两条红链接相连（这是一个-4节点需要变换）；该树黑色平衡
 * 是为了解决二叉查找树最坏情况下性能问题的一种数据结构，理解的关键在于局部变换不影响树的全局有序性和平衡性
 * 结合图可能更好理解一些，简单点说，其变换就是提取某个节点到父节点中形成一个-3或-4节点，然后继续向上变化
 * 可以想象到，这个时候子节点到这个父节点路径长度是不会变的（因为只是提取节点并到原有的父节点中）
 * 原理就是通过改变-4节点来保证任意空链接到根节点的路径长度都是相等的
 */
export class RedBlackBST<Key, Value> {
    private root: NodeType<Key, Value> = null
    private putTimes: number = 0

    isRed(node: NodeType<Key, Value>): boolean {
        if (node === null) return false
        return node.color === RED
    }

    // 左旋转（将右红转变为左红）
    rotateLeft(h: NodeType<Key, Value>): NodeType<Key, Value> {
        const x = h?.right
        h!.right = x?.left!
        x!.left = h
        x!.color = h!.color
        h!.color = RED
        x!.N = h!.N
        h!.N = 1 + this.size(h!.left) + this.size(h!.right)
        return x!
    }

    // 右旋转（将左红转变为右红）
    rotateRight(h: NodeType<Key, Value>): NodeType<Key, Value> {
        const x = h?.left
        h!.left = x?.right!
        x!.right = h
        x!.color = h!.color
        h!.color = RED
        x!.N = h!.N
        h!.N = 1 + this.size(h!.left) + this.size(h!.right)
        return x!
    }

    // 将两个红色链接变为黑色链接，同时将父节点变为红链接（双红变一红）
    flipColors(h: NodeType<Key, Value>) {
        h!.color = RED
        h!.left!.color = BLACK
        h!.right!.color = BLACK
    }

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
            this.root!.color = BLACK
        } else {
            if (node === null) {
                // 新插入都是一个红链接
                return new RedBlackBstNode(key, val, 1, RED)
            }
            this.putTimes++
            const cmp: number | undefined = getComparaValue(key, node.key)!
            if (cmp < 0) node.left = this.put(key, val, node.left)
            else if (cmp > 0) node.right = this.put(key, val, node.right)
            else node.val = val
            if (this.isRed(node.right) && !this.isRed(node.left)) node = this.rotateLeft(node)
            if (this.isRed(node.left) && this.isRed(node.left.left)) node = this.rotateRight(node)
            if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node)
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

    // TODO 红黑树的删除算法比较复杂，后续做练习的时候实现
    // delete(key: Key, node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
    //   
    // }

    // TODO
    // deleteMin(node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
    //    
    // }

    // TODO
    // deleteMax(node?: NodeType<Key, Value>): NodeType<Key, Value> | undefined {
    //     
    // }

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