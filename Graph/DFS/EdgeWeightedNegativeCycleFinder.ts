import { DirectedEdge } from "../common/DirectedEdge";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";

export class EdgeWeightedNegativeCycleFinder {
    private marked: boolean[]
    private edgeTo: DirectedEdge[]
    private _cycle: DirectedEdge[] | null = null // 有向环中的所有顶点（如果存在）
    private onStack: boolean[] // 递归调用的栈上的所有顶点

    constructor(G: EdgeWeightedDigraph) {
        this.onStack = []
        this.edgeTo = []
        this.marked = []
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, v)
        }
    }

    private dfs(G: EdgeWeightedDigraph, v: number) {
        this.onStack[v] = true
        this.marked[v] = true
        for (let e of G.adj(v)) {
            if (this.hasCycle()) return;
            else if (!this.marked[e.to()]) {
                this.edgeTo[e.to()] = e
                this.dfs(G, e.to())
            } else if (this.onStack[e.to()]) {
                this._cycle = []
                let totalWeight = 0
                this._cycle.unshift(e)
                totalWeight += e.weight()
                for (let x = v; x != e.to(); x = this.edgeTo[x].from()) {
                    const edge = this.edgeTo[x]
                    this._cycle.unshift(edge)
                    totalWeight += edge.weight()
                }
                if (totalWeight > 0) {
                    this._cycle = null
                }
            }
        }
        this.onStack[v] = false
    }

    hasCycle() {
        return this._cycle !== null
    }

    cycle() {
        return this._cycle
    }
}