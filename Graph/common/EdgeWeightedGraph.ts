import { Edge } from "./Edge"

/**
 * 加权无向图 
 */
export class EdgeWeightedGraph {
    private _V: number = 0
    private _E: number = 0
    private _adj: Array<Edge>[] = []
    constructor(input: number | string) {
        const init = (input: number) => {
            this._V = input
            for (let v = 0; v < this._V; v++) {
                this._adj[v] = [] as Edge[]
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
                const weight = Number(graphStrArr.shift())
                const edge = new Edge(v, w, weight)
                this.addEdge(edge)
            }
        }
    }

    addEdge(e: Edge) {
        const v = e.either()
        const w = e.other(v)
        this._adj[v].unshift(e)
        this._adj[w].unshift(e)
        this._E++
    }

    adj(v: number): Edge[] {
        return this._adj[v]
    }

    V(): number {
        return this._V
    }

    E(): number {
        return this._E
    }

    edges(): Edge[] {
        const b = [] as Edge[]
        for (let v = 0; v < this._V; v++) {
            for (let e of this.adj(v)) {
                if (e.other(v) > v) b.unshift(e)
            }
        }
        return b
    }

    // 图的字符串表示
    toString() {
        let s = `${this._V} vertices, ${this._E} edges\n`
        for (let e of this.edges()) {
            const v = e.either()
            const w = e.other(v)
            s += `${v}-${w} ${e.weight()}\n`
        }
        return s
    }
}