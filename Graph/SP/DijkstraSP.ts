/**
 * 有向图单点最短路径的Dijkstra算法
 */

import { IndexMinPQ } from "../../sort/Heap/PriorityQueue";
import { DirectedEdge } from "../common/DirectedEdge";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";

export class DijkstraSP {
    private edgeTo: DirectedEdge[]
    private _distTo: number[]
    private pq: IndexMinPQ<number>

    constructor(G: EdgeWeightedDigraph, s: number) {
        this.edgeTo = []
        this._distTo = []
        this.pq = new IndexMinPQ<number>(G.V())

        for (let v = 0; v < G.V(); v++) {
            this._distTo[v] = Number.POSITIVE_INFINITY
        }
        this._distTo[s] = 0.00

        this.pq.insert(0.00, s)
        while (!this.pq.isEmpty()) {
            this.relax(G, this.pq.delMin())
        }
    }

    private relax(G: EdgeWeightedDigraph, v: number) {
        for (let e of G.adj(v)) {
            const w = e.to()
            if (this._distTo[w] > this._distTo[v] + e.weight()) {
                this._distTo[w] = this._distTo[v] + e.weight()
                this.edgeTo[w] = e
                if (this.pq.contains(w)) this.pq.change(this._distTo[w], w)
                else this.pq.insert(this._distTo[w], w)
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
        for (let e = this.edgeTo[v]; e !== undefined ; e = this.edgeTo[e.from()])
            path.unshift(e)
        return path
    }
}