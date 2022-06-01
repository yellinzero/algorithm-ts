/**
 * 有向图 
 */
export class Digraph {
    private _V: number = 0
    private _E: number = 0
    private _adj: Array<number>[] = []
    constructor(input: number | string) {
        const init = (input: number) => {
            this._V = input
            for (let v = 0; v < this._V; v++) {
                this._adj[v] = [] as number[]
            }
        }
        if (typeof input === 'number') {
            init(input)
        }
        if (typeof input === 'string') {
            const graphStrArr = input.replace(/\s+/g, ' ').split(' ')
            const V = Number(graphStrArr.shift())
            const E = Number(graphStrArr.shift())
            init(V)
            for (let i = 0; i < E; i++) {
                const v = Number(graphStrArr.shift())
                const w = Number(graphStrArr.shift())
                this.addEdge(v, w)
            }
        }
    }

    addEdge(v: number, w: number) {
        this._adj[v].unshift(w)
        this._E++
    }

    adj(v: number): number[] {
        return this._adj[v]
    }

    V(): number {
        return this._V
    }

    E(): number {
        return this._E
    }

    reverse(): Digraph {
        const R: Digraph = new Digraph(this._V)
        for (let v = 0; v < this._V; v++) {
            for (let w of this.adj(v)) {
                R.addEdge(w, v)
            }
        }
        return R
    }

    // 图的字符串表示
    toString() {
        let s = `${this._V} vertices, ${this._E} edges\n`
        for (let v = 0; v < this._V; v++) {
            s += v + ": "
            for (let w = 0; w < this._adj[v].length; w++) {
                s += this._adj[v][w] + " "
            }
            s += "\n"
        }
        return s
    }
}