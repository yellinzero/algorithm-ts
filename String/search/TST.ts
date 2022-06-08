/**
 * 基于三项单词查找树的符号表
 */

class Node<Value> {
    c: string = ''
    left: Node<Value> | null = null
    mid: Node<Value> | null = null
    right: Node<Value> | null = null
    val: Value | null = null
}

// TODO  不完整的实现
export class TST<Value> {
    private root: Node<Value> | null = null

    get(key: string, d?: number, x?: Node<Value> | null): Value | Node<Value> | null {
        if (d !== undefined && x !== undefined) {
            if (x === null) return null
            const c = key.charAt(d)
            if (c < x.c) return this.get(key, d, x.left)
            else if (c > x.c) return this.get(key, d, x.right)
            else if (d < key.length - 1) return this.get(key, d + 1, x.mid)
            else return x
        } else {
            const x = this.get(key, 0, this.root) as Node<Value>
            if (x === null) return null
            return x.val as Value
        }
    }

    put(key: string, val: Value, d?: number, x?: Node<Value> | null): void | Node<Value> {
        if (d !== undefined && x !== undefined) {
            const c = key.charAt(d)
            if (x === null) {
                x = new Node()
                x.c = c
            }
            if (c < x.c) x.left = this.put(key, val, d, x.left) as Node<Value>
            else if (c > x.c) x.right = this.put(key, val, d, x.right) as Node<Value>
            else if (d < key.length - 1) x.mid = this.put(key, val, d + 1, x.mid) as Node<Value>
            else x.val = val
            return x
        } else {
            this.root = this.put(key, val, 0, this.root) as Node<Value>
        }
    }
}