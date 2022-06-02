import { DirectedEdge } from "./DirectedEdge"

export class EdgeWeightedDigraph {
    private _V: number = 0
    private _E: number = 0
    private _adj: DirectedEdge[][] = []

    constructor(input: number | string) {
        const init = (input: number) => {
            this._V = input
            this._E = 0
            this._adj = []

            for (let v = 0; v < this._V; v++) {
                this._adj[v] = [] as DirectedEdge[]
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
                const edge = new DirectedEdge(v, w, weight)
                this.addEdge(edge)
            }
        }
    }

    V() {
        return this._V
    }

    E() {
        return this._E
    }

    addEdge(e: DirectedEdge) {
        this._adj[e.from()].push(e)
        this._E++
    }

    adj(v: number) {
        return this._adj[v]
    }

    edges() {
        const bag = []
        for (let v = 0; v < this._V; v++) {
            for (let e of this._adj[v])
                bag.push(e)
        }
        return bag
    }
}