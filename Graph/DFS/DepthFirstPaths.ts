import { Graph } from "../Graph";

export class DepthFirstPaths {
    private marked: boolean[] = []
    private N: number = 0
    private edgeTo: number[]
    private s: number

    constructor(G: Graph, s: number) {
        this.marked = []
        this.edgeTo = []
        this.s = s
        this.dfs(G, s)
    }

    dfs(G: Graph, v: number) {
        this.marked[v] = true;
        const adj = G.getAdj(v)
        for (let w = 0; w < adj.length; w++) {
            if (!this.marked[adj[w]]) {
                this.edgeTo[adj[w]] = v
                this.dfs(G, adj[w])
            }
        }
    }

    hasPathTo(v: number): boolean {
        return this.marked[v]
    }

    pathTo(v: number): number[] | null {
        if (!this.hasPathTo(v)) return null
        const path = []
        for (let x = v; x != this.s; x = this.edgeTo[x]) {
            path.unshift(x)
        }
        path.unshift(this.s)
        return path
    }
}