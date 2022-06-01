export class QuickUnionUF {
    private id: number[]
    private _count: number

    constructor(N: number) {
        this._count = N
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
        }
    }

    count() {
        return this._count
    }

    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }

    find(p: number) {
        while (p !== this.id[p]) p = this.id[p]
        return p
    }

    union(p: number, q: number) {
        const pRoot = this.find(p)
        const qRoot = this.find(q)

        if (pRoot === qRoot) return
        this.id[pRoot] = qRoot
        this._count--
    }
}