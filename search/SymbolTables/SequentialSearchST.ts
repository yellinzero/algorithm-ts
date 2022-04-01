class Node<Key, Value>{
    key: Key
    val: Value
    next: NodeType<Key, Value>
    constructor(key: Key, val: Value, next: NodeType<Key, Value>) {
        this.key = key
        this.val = val
        this.next = next
    }
}

type NodeType<Key, Value> = Node<Key, Value> | null

/* 
 * 顺序查找
 * 基于无序单向链表实现
 */
export class SequentialSearchST<Key, Value> {
    private first: NodeType<Key, Value> = null
    putTimes = 0

    get(key: Key): Value | null {
        for (let x: NodeType<Key, Value> = this.first; x !== null; x = x.next) {
            if (key === x.key) return x.val
        }
        return null
    }

    put(key: Key, val: Value): void {
        for (let x: NodeType<Key, Value> = this.first; x !== null; x = x.next) {
            this.putTimes++
            if (key === x.key) {
                x.val = val;
                return;
            }
        }
        this.first = new Node(key, val, this.first);
    }

    * keys() {
        for (let x: NodeType<Key, Value> = this.first; x !== null; x = x.next) {
            yield x.key
        }
    }

    contains(key: Key): boolean {
        return this.get(key) !== null;
    }
}