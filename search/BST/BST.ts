//  TODO
import {getComparaValue } from '../../common/'
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

    get(key: Key, node?: NodeType<Key, Value>): Value {
        if (node === undefined) {
            return this.get(key, this.root)
        }
        if (node === null) return null;

        const cmp: number = getComparaValue(key, node.key)

        if (cmp < 0) return this.get(key, node.left)
        else if (cmp > 0) return this.get(key, node.right)
        else return node.val

    }

    put(key: Key, val: Value): void
    put(key: Key, val: Value, node?: NodeType<Key, Value>): NodeType<Key, Value>
    put(key, val, node?): any {
        if (node === undefined) {
            this.root = this.put(key, val, this.root)
        } else {
            if (node === null) return new BstNode(key, val, 1)
            const cmp = getComparaValue(key, node.key)
            if (cmp < 0) node.left = this.put(key, val, node.left)
            else if (cmp > 0) node.right = this.put(key, val, node.right)
            else node.val = val
            node.N = this.size(node.left) + this.size(node.right) + 1
            return node
        }
    }
    max() {

    }
    min() {

    }
    floor() {

    }
    ceiling() {

    }
    select() {

    }
    rank() {

    }
    delete() {

    }
    deleteMin() {

    }
    deleteMax() {

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

    // * keys() {
    //     for (let x: NodeType<Key, Value> = this.first; x !== null; x = x.next) {
    //         yield x.key
    //     }
    // }

}