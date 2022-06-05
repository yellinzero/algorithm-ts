import { DirectedEdge } from "../common/DirectedEdge"
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph"
import { EdgeWeightedNegativeCycleFinder } from "../DFS/EdgeWeightedNegativeCycleFinder"

export class BellmanFordSP {
    private _distTo: number[]
    private edgeTo: DirectedEdge[]
    private onQ: boolean[]
    private queue: number[]
    private cost: number = 0
    private cycle: DirectedEdge[] | null = null

    constructor(G: EdgeWeightedDigraph, s: number) {
        this._distTo = []
        this.edgeTo = []
        this.onQ = []
        this.queue = []
        for (let v = 0; v < G.V(); v++) {
            this._distTo[v] = Number.POSITIVE_INFINITY
        }
        this._distTo[s] = 0.0
        this.queue.push(s)
        this.onQ[s] = true
        while (this.queue.length > 0 && !this.hasNegativeCycle()) {
            const v = this.queue.shift()!
            this.onQ[v] = false
            this.relax(G, v)
        }
    }

    private relax(G: EdgeWeightedDigraph, v: number) {
        for (const e of G.adj(v)) {
            const w = e.to()
            if (this._distTo[w] > this._distTo[v] + e.weight()) {
                this._distTo[w] = this._distTo[v] + e.weight()
                this.edgeTo[w] = e
                if (!this.onQ[w]) {
                    this.queue.push(w)
                    this.onQ[w] = true
                }
            }
            if (this.cost++ % G.V() === 0) {
                this.findNegativeCycle()
            }
        }
    }

    distTo(v: number) {
        return this._distTo[v]
    }

    hasPathTo(v: number) {
        return this._distTo[v] < Number.POSITIVE_INFINITY
    }

    pathTo(v: number) {
        if (!this.hasPathTo(v)) return null
        const path: DirectedEdge[] = []
        for (let e = this.edgeTo[v]; e !== undefined; e = this.edgeTo[e.from()])
            path.unshift(e)
        return path
    }

    private findNegativeCycle() {
        const V = this.edgeTo.length
        const spt = new EdgeWeightedDigraph(V)
        for (let v = 0; v < V; v++) {
            if (this.edgeTo[v]) {
                spt.addEdge(this.edgeTo[v])
            }
        }
        const cf = new EdgeWeightedNegativeCycleFinder(spt)
        this.cycle = cf.cycle()
    }

    hasNegativeCycle() {
        return this.cycle !== null
    }

    negativeCycle() {
        return this.cycle
    }
}