export class WeightedQuickUnionUF {
    private id: number[]
    private sz: number[]
    private _count: number

    constructor(N: number) {
        this._count = N
        this.id = []
        for (let i = 0; i < N; i++) this.id[i] = i
        this.sz = []
        for (let i = 0; i < N; i++) this.sz[i] = 1

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
        const i = this.find(p)
        const j = this.find(q)

        if (i === j) return
        if (this.sz[i] < this.sz[j]) {
            this.id[i] = j
            this.sz[j] += this.sz[i]
        } else {
            this.id[j] = i
            this.sz[i] += this.sz[j]
        }

        this._count--
    }
}