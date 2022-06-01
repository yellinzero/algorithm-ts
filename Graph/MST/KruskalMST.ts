/**
 * 最小生成树Kruskal算法
 */

import { MinPQ } from "../../sort/Heap/PriorityQueue";
import { Edge } from "../common/Edge";
import { EdgeWeightedGraph } from "../common/EdgeWeightedGraph";
import { WeightedQuickUnionUF } from "../UF/WeightedQuickUnionUF ";

export class KruskalMST {
    private mst: Edge[]

    constructor(G: EdgeWeightedGraph) {
        this.mst = []
        const pq: MinPQ<Edge> = new MinPQ<Edge>();
        for (let e of G.edges()) pq.insert(e)
        const uf: WeightedQuickUnionUF = new WeightedQuickUnionUF(G.V())

        while (!pq.isEmpty() && this.mst.length < G.V() - 1) {
            const e = pq.delMin()
            const v = e.either()
            const w = e.other(v)
            if (uf.connected(v, w)) continue
            uf.union(v, w)
            this.mst.push(e)
        }
    }

    edges() {
        return this.mst
    }

    weight() {
        let weight = 0
        for (let e of this.mst) {
            weight += e.weight()
        }
        return weight
    }
}