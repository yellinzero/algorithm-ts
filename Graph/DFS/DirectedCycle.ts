/**
 * 有向图的环检测 
 * */
import { getType } from "../../utils";
import { Digraph } from "../common/Digraph";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";

export class DirectedCycle {
    private marked: boolean[]
    private edgeTo: number[]
    private cycle: number[] | null = null // 有向环中的所有顶点（如果存在）
    private onStack: boolean[] // 递归调用的栈上的所有顶点

    constructor(G: Digraph | EdgeWeightedDigraph) {
        this.onStack = []
        this.edgeTo = []
        this.marked = []
        for (let v = 0; v < G.V(); v++) {
            if (!this.marked[v]) this.dfs(G, v)
        }
    }

    private dfs(G: Digraph | EdgeWeightedDigraph, v: number) {
        this.onStack[v] = true
        this.marked[v] = true
        if (G instanceof Digraph) {
            for (let w of G.adj(v)) {
                if (this.hasCycle()) return;
                else if (!this.marked[w]) {
                    this.edgeTo[w] = v
                    this.dfs(G, w)
                } else if (this.onStack[w]) {
                    this.cycle = []
                    for (let x = v; x != w; x = this.edgeTo[x])
                        this.cycle.push(x)
                    this.cycle.push(w)
                    this.cycle.push(v)
                }
            }
        }

        if(G instanceof EdgeWeightedDigraph) {
            for (let w of G.adj(v)) {
                if (this.hasCycle()) return;
                else if (!this.marked[w.to()]) {
                    this.edgeTo[w.to()] = v
                    this.dfs(G, w.to())
                } else if (this.onStack[w.to()]) {
                    this.cycle = []
                    for (let x = v; x != w.to(); x = this.edgeTo[x])
                        this.cycle.push(x)
                    this.cycle.push(w.to())
                    this.cycle.push(v)
                }
            }
        }

        this.onStack[v] = false
    }

    hasCycle() {
        return this.cycle !== null
    }

    getCycle() {
        return this.cycle
    }
}