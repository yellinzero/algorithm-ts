import { Graph } from "../common/Graph"

export class DepthFirstSearch {
    private markeds: boolean[] = []
    private N: number = 0

    constructor(G: Graph, s: number) {
        this.markeds = []
        this.dfs(G, s)
    }

    dfs(G: Graph, v: number) {
        this.markeds[v] = true;
        this.N++
        for (let w of G.getAdj(v)) {
            if (!this.markeds[w]) this.dfs(G, w)
        }
    }

    marked(v: number): boolean {
        return this.markeds[v]
    }

    count(): number {
        return this.N
    }
}