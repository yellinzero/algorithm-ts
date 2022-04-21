/**
 * 无向图中的连通分量
 */
import { Graph } from "../common/Graph"

export class CC {
    private marked: boolean[]
    private id: number[]
    private count: number = 0

    constructor(G: Graph) {
        this.marked = []
        this.id = []
        for (let s = 0; s < G.getV(); s++) {
            if (!this.marked[s]) {
                this.dfs(G, s)
                this.count++
            }
        }
    }

    private dfs(G: Graph, v: number) {
        this.marked[v] = true
        this.id[v] = this.count
        for (let w of G.getAdj(v)) {
            if (!this.marked[w]) this.dfs(G, w)
        }
    }

    connected(v: number, w: number) {
        return this.id[v] === this.id[w]
    }

    getId(v: number) {
        return this.id[v]
    }

    getCount() {
        return this.count;
    }
}