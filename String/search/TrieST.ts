/**
 * 基于单词查找树的符号表
 */

class Node {
    val: any = null
    next: Node[] = []
}
export class TrieST<Value> {
    private static R: number = 256
    private root: Node | null = null

    get(key: string, d?: number, x?: Node | null): Value | Node | null {
        if (d !== undefined && x !== undefined) {
            if (x === null) return null
            if (d === key.length) return x
            const c: number = key.charCodeAt(d)
            return this.get(key, d + 1, x.next[c])
        } else {
            const x = this.get(key, 0, this.root) as Node
            if (x === null) return null
            return x.val as Value
        }
    }

    put(key: string, val: Value, d?: number, x?: Node | null): void | Node {
        if (d !== undefined && x !== undefined) {
            if (x === null) x = new Node()
            if (d === key.length) {
                x.val = val
                return x
            }
            const c = key.charCodeAt(d)
            x.next[c] = this.put(key, val, d + 1, x.next[c]) as Node
            return x
        } else {
            this.root = this.put(key, val, 0, this.root) as Node
        }
    }

    // size延迟实现，存在性能问题
    size(x?: Node | null): void | number {
        if (x !== undefined) {
            if (x === null) return 0
            let cnt = 0
            if (x.val !== null) cnt++
            for (let c = 0; c < TrieST.R; c++) {
                cnt += this.size(x.next[c]) as number
            }
            return cnt
        } else {
            return this.size(this.root)
        }
    }

    keys() {
        return this.keysWithPrefix("")
    }

    keysWithPrefix(pre: string) {
        const q = [] as string[]
        this.collect(<Node>this.get(pre, 0, this.root), pre, q)
    }

    keysThatMatch(pat: string) {
        const q = [] as string[]
        this.collect(this.root, "", q, pat)
    }

    longestPrefixOf(s: string) {
        const length = this.search(this.root, s, 0, 0)
        return s.substring(0, length)
    }

    delete(key: string, d?: number, x?: Node | null): Node | void | null {
        if (d !== undefined && x !== undefined) {
            if (x === null) return null
            if (d === key.length) x.val = null
            else {
                const c = key.charCodeAt(d)
                x.next[c] = this.delete(key, d + 1, x.next[c]) as Node
            }
            if (x.val !== null) return x
            for (let c = 0; c < TrieST.R; c++) {
                if (x.next[c] !== null) return x
            }
            return null
        } else {
            this.root = this.delete(key, 0, this.root) as Node
        }
    }

    private search(x: Node | null, s: string, d: number, length: number): number {
        if (x === null) return length
        if (x.val !== null) length = d
        if (d === s.length) return length
        let c = s.charCodeAt(d)
        return this.search(x.next[c], s, d + 1, length)
    }

    private collect(x: Node | null, pre: string, q: string[], pat?: string) {
        if (x === null) return
        if (pat === undefined) {
            if (x.val !== null) q.push(pre)
            for (let c = 0; c < TrieST.R; c++)
                this.collect(x.next[c], pre + String.fromCharCode(c), q)
        } else {
            const d = pre.length
            if (d === pat.length && x.val !== null) q.push(pre)
            if (d === pat.length) return
            const next = pat.charAt(d)
            for (let c = 0; c < TrieST.R; c++) {
                if (next === '.' || next === String.fromCharCode(c)) {
                    this.collect(x.next[c], pre + String.fromCharCode(c), q, pat)
                }
            }
        }
    }
}