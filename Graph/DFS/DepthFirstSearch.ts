/**
 * 无向图的深度优先搜索
 *  */
import { Graph } from "../common/Graph"

export class DepthFirstSearch {
    private _marked: boolean[] = []
    private N: number = 0

    constructor(G: Graph, s: number) {
        this._marked = []
        this.dfs(G, s)
    }

    dfs(G: Graph, v: number) {
        this._marked[v] = true;
        this.N++
        for (let w of G.adj(v)) {
            if (!this._marked[w]) this.dfs(G, w)
        }
    }

    marked(v: number): boolean {
        return this._marked[v]
    }

    count(): number {
        return this.N
    }
}