/**
 * 无向图基于广度优先搜索查找路径
 */
import { Graph } from "../common/Graph"

export class BreadthFirstPaths {
    private marked: boolean[] = []
    private edgeTo: number[]
    private s: number

    constructor(G: Graph, s: number) {
        this.marked = []
        this.edgeTo = []
        this.s = s
        this.bfs(G, s)
    }

    bfs(G: Graph, s: number) {
        const queue: number[] = []
        this.marked[s] = true;
        queue.push(s)
        while (queue.length > 0) {
            const v = queue.shift() as number
            for (let w of G.getAdj(v)) {
                if (!this.marked[w]) {
                    this.edgeTo[w] = v
                    this.marked[w] = true
                    queue.push(w)
                }
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