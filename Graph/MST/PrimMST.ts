import { Edge } from "../common/Edge"
import { IndexMinPQ } from "../../sort/Heap/PriorityQueue"
import { EdgeWeightedGraph } from "../common/EdgeWeightedGraph"

/**
 * 最小生成树Prim算法
 */
export class PrimMST {
    private edgeTo: Edge[]
    private distTo: number[]
    private marked: boolean[]
    private pq: IndexMinPQ<number>

    constructor(G: EdgeWeightedGraph) {
        this.edgeTo = []
        this.distTo = []
        this.marked = []
        for (let v = 0; v < G.V(); v++) {
            this.distTo[v] = Number.POSITIVE_INFINITY
        }
        this.pq = new IndexMinPQ(G.V())

        this.distTo[0] = 0.0
        this.pq.insert(0.0, 0)
        while (!this.pq.isEmpty()) {
            this.visit(G, this.pq.delMin())
        }
    }

    private visit(G: EdgeWeightedGraph, v: number) {
        this.marked[v] = true
        for (let e of G.adj(v)) {
            let w = e.other(v)

            if (this.marked[w]) continue
            if (e.weight() < this.distTo[w]) {
                this.edgeTo[w] = e
                this.distTo[w] = e.weight()
                if (this.pq.contains(w)) this.pq.change(this.distTo[w], w)
                else this.pq.insert(this.distTo[w], w)
            }
        }
    }

    edges() {
        const mst = []
        for (let v = 1; v < this.edgeTo.length; v++) {
            mst.push(this.edgeTo[v])
        }
        return mst
    }

    weight() {
        let weight = 0
        for (let e of this.edges()) {
            weight += e.weight()
        }
        return weight
    }
}