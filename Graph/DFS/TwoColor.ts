import { Graph } from "../Graph"

export class TwoColor {
    private marked: boolean[]
    private color: boolean[]
    private isTwoColorable: boolean = true

    constructor(G: Graph) {
        this.marked = []
        this.color = new Array(G.getV())
        this.color.fill(false)
        for (let s = 0; s < G.getV(); s++) {
            if (!this.marked[s]) {
                this.dfs(G, s)
            }
        }
    }

    private dfs(G: Graph, v: number) {
        this.marked[v] = true
        for (let w of G.getAdj(v)) {
            if (!this.marked[w]) {
                this.color[w] = this.color[v]
                this.dfs(G, w)
            } else if (this.color[w] === this.color[v]) {
                this.isTwoColorable = false
            }
        }
    }

    isBipartite(): boolean {
        return this.isTwoColorable
    }
}