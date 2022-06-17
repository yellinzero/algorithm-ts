import { MinPQ } from "../../sort/Heap/PriorityQueue";
import { BinaryStdIn, BinaryStdOut, Comparable } from "../../utils";

class Node implements Comparable<Node> {
    ch: string
    freq: number
    left: Node | null
    right: Node | null

    constructor(ch: string, freq: number, left: Node | null, right: Node | null) {
        this.ch = ch
        this.freq = freq
        this.left = left
        this.right = right
    }

    isLeaf() {
        return this.left === null && this.right === null
    }

    compareTo(x: Node): number {
        return this.freq - x.freq
    }
}

export class Huffman {
    private static R: number = 256
    static async expand() {
        const root = await this.readTrie()
        const N = await BinaryStdIn.readInt()
        for (let i = 0; i < N; i++) {
            let x = root
            while (!x.isLeaf()) {
                if (await BinaryStdIn.readBoolean())
                    x = x.right!
                else
                    x = x.left!
            }
            BinaryStdOut.write(x.ch)
        }
        BinaryStdOut.close()
    }

    private static buildCode(st: string[], x: Node, s: string) {
        if (x.isLeaf()) {
            st[x.ch.charCodeAt(0)] = s
            return
        }
        this.buildCode(st, x.left!, s + '0')
        this.buildCode(st, x.right!, s + '1')
    }

    private static buildTrie(freq: number[]) {
        const pq = new MinPQ<Node>()
        for (let c = 0; c < this.R; c++) {
            if (freq[c] > 0)
                pq.insert(new Node(String.fromCharCode(c), freq[c], null, null))
        }

        while (pq.size() > 1) {
            const x = pq.delMin()
            const y = pq.delMin()
            const parent = new Node('\0', x.freq + y.freq, x, y)
            pq.insert(parent)
        }
        return pq.delMin()
    }

    private static writeTrie(x: Node) {
        if (x.isLeaf()) {
            BinaryStdOut.write(true)
            BinaryStdOut.write(x.ch)
            return
        }
        BinaryStdOut.write(false)
        this.writeTrie(x.left!)
        this.writeTrie(x.right!)
    }

    private static async readTrie(): Promise<Node> {
        if (await BinaryStdIn.readBoolean()) {
            return new Node(await BinaryStdIn.readChar(), 0, null, null)
        }
        return new Node('\0', 0, await this.readTrie(), await this.readTrie())
    }

    static async compress() {
        const s = await BinaryStdIn.readString()
        const input = s.split('')
        const freq: number[] = new Array(this.R).fill(0)

        for (let i = 0; i < input.length; i++) {
            freq[input[i].charCodeAt(0)]++
        }

        const root = this.buildTrie(freq)

        const st: string[] = new Array(this.R).fill('')

        this.buildCode(st, root, '')

        this.writeTrie(root)
        BinaryStdOut.write(input.length)
        for (let i = 0; i < input.length; i++) {
            const code = st[input[i].charCodeAt(0)]
            for (let j = 0; j < code.length; j++) {
                if (code.charAt(j) === '1')
                    BinaryStdOut.write(true)
                else BinaryStdOut.write(false)
            }
        }
        BinaryStdOut.close()
    }
}