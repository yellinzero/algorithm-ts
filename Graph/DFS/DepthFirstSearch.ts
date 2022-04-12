import { Graph } from "../Graph";

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
        const adj = G.getAdj(v)
        for (let w = 0; w < adj.length; w++) {
            if (!this.markeds[adj[w]]) this.dfs(G, adj[w])
        }
    }

    marked(v: number): boolean {
        return this.markeds[v]
    }

    count(): number {
        return this.N
    }
}