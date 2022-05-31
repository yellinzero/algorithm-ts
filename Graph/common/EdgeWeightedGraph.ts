import { Edge } from "./Edge"

/**
 * 加权无向图 
 */
export class EdgeWeightedGraph {
    private V: number = 0
    private E: number = 0
    private adj: Array<Edge>[] = []
    constructor(input: number | string) {
        const init = (input: number) => {
            this.V = input
            for (let v = 0; v < this.V; v++) {
                this.adj[v] = [] as Edge[]
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
        this.adj[v].unshift(e)
        this.adj[w].unshift(e)
        this.E++
    }

    getAdj(v: number): Edge[] {
        return this.adj[v]
    }

    getV(): number {
        return this.V
    }

    getE(): number {
        return this.E
    }

    edges(): Edge[] {
        const b = [] as Edge[]
        for (let v = 0; v < this.V; v++) {
            for (let e of this.getAdj(v)) {
                if (e.other(v) > v) b.unshift(e)
            }
        }
        return b
    }

    // 图的字符串表示
    toString() {
        let s = `${this.V} vertices, ${this.E} edges\n`
        for (let e of this.edges()) {
            const v = e.either()
            const w = e.other(v)
            s += `${v}-${w} ${e.getWeight()}\n`
        }
        return s
    }
}