/**
 * 无向图中的环检测
 */
import { Graph } from "../common/Graph"

export class Cycle {
    private marked: boolean[]
    private has: boolean = false

    constructor(G: Graph) {
        this.marked = []
        for (let s = 0; s < G.V(); s++) {
            if (!this.marked[s]) {
                this.dfs(G, s, s)
            }
        }
    }

    private dfs(G: Graph, v: number, u: number) {
        this.marked[v] = true;
        for (let w of G.adj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w, v)
            } else if (w !== u) {
                // 如果不是当前边且又已经路过过，则说明存在环
                this.has = true;
            }
        }
    }

    hasCycle() {
        return this.has
    }

}