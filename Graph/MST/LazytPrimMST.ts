import { Edge } from "../common/Edge"
import { MinPQ } from "../../sort/Heap/PriorityQueue"
import { EdgeWeightedGraph } from "../common/EdgeWeightedGraph"
export class LazyPrimMST {
    private marked: boolean[]
    private mst: Edge[]
    private pq: MinPQ<Edge>

    constructor(G: EdgeWeightedGraph) {
        this.pq = new MinPQ<Edge>()
        this.marked = [] as boolean[]
        this.mst = [] as Edge[]

        this.visit(G, 0)
        while (!this.pq.isEmpty()) {
            const e: Edge = this.pq.delMin()
            const v = e.either()
            const w = e.other(v)
            if (this.marked[v] && this.marked[w]) continue
            this.mst.push(e)
            if (!this.marked[v]) this.visit(G, v)
            if (!this.marked[w]) this.visit(G, w)
        }
    }

    private visit(G: EdgeWeightedGraph, v: number) {
        this.marked[v] = true
        for (let e of G.getAdj(v)) {
            if (!this.marked[e.other(v)]) this.pq.insert(e)
        }
    }

    edges() {
        return this.mst
    }

    weight() {
        let weight = 0
        for (let e of this.edges()) {
            weight += e.getWeight()
        }
        return weight
    }
}