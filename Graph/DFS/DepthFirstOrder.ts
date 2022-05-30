/**
 * 基于深度优先搜索的顶点排序（有向图）
 *  */
import { Digraph } from "../common/Digraph";

export class DepthFirstOrder {
    private marked: boolean[]
    private pre: number[]
    private post: number[]
    private reversePost: number[]

    constructor(G: Digraph) {
        this.pre = []
        this.post = []
        this.reversePost = []
        this.marked = []
        for (let v = 0; v < G.getV(); v++) {
            if (!this.marked[v]) this.dfs(G, v)
        }
    }

    private dfs(G: Digraph, v: number) {
        this.pre.push(v)
        this.marked[v] = true
        for (let w of G.getAdj(v)) {
            if (!this.marked[w]) {
                this.dfs(G, w)
            }
        }
        this.post.push(v)
        this.reversePost.unshift(v)
    }

    getPre(): number[] {
        return this.pre
    }

    getPost(): number[] {
        return this.post
    }

    getReversePost(): number[] {
        return this.reversePost
    }
}