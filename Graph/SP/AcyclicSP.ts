/**
 * 无环加权有向图的最短路径算法
 * 重要思想：利用拓扑排序，实现单向路径，不走回头路，省去了优先队列的成本
 */

import { DirectedEdge } from "../common/DirectedEdge";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";
import { Topological } from "../DFS/Topological";

export class AcyclicSP {
    private edgeTo: DirectedEdge[]
    private _distTo: number[]

    constructor(G: EdgeWeightedDigraph, s: number) {
        this.edgeTo = []
        this._distTo = []

        for (let v = 0; v < G.V(); v++) {
            this._distTo[v] = Number.POSITIVE_INFINITY
        }

        this._distTo[s] = 0.0

        const top = new Topological(G)
        if (top.order()) {
            for (let v of top.order()!) {
                this.relax(G, v)
            }
        }

    }

    private relax(G: EdgeWeightedDigraph, v: number) {
        for (let e of G.adj(v)) {
            const w = e.to()
            if (this._distTo[w] > this._distTo[v] + e.weight()) {
                this._distTo[w] = this._distTo[v] + e.weight()
                this.edgeTo[w] = e
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