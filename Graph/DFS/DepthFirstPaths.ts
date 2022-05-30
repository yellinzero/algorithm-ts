/**
 * 无向图基于深度优先搜索查找路径 
 */
import { Graph } from "../common/Graph"

export class DepthFirstPaths {
    private marked: boolean[] = []
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
        for (let w of G.getAdj(v)) {
            if (!this.marked[w]) {
                this.edgeTo[w] = v
                this.dfs(G, w)
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