/**
 * 有向图的强连通分量
 */
import { Digraph } from "../common/Digraph"
import { DepthFirstOrder } from "./DepthFirstOrder"

export class KosarajuSCC {
    private marked: boolean[]
    private id: number[]
    private count: number = 0

    constructor(G: Digraph) {
        this.marked = []
        this.id = []
        const order = new DepthFirstOrder(G.reverse())
        for (let s of order.getReversePost()) {
            if (!this.marked[s]) {
                this.dfs(G, s)
                this.count++
            }
        }
    }

    private dfs(G: Digraph, v: number) {
        this.marked[v] = true
        this.id[v] = this.count
        for (let w of G.adj(v)) {
            if (!this.marked[w]) this.dfs(G, w)
        }
    }

    stronglyConnected(v: number, w: number) {
        return this.id[v] === this.id[w]
    }

    getId(v: number) {
        return this.id[v]
    }

    getCount() {
        return this.count;
    }
}