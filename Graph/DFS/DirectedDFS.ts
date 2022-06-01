/**
 * 有向图的深度优先搜索
 *  */
import { getType } from "../../utils"
import { Digraph } from "../common/Digraph"

export class DirectedDFS {
    private _marked: boolean[] = []

    constructor(G: Digraph, s: number  | number[]) {
        this._marked = []
        if(typeof s === 'number') {
            this.dfs(G, s)
        } else if (getType(s) === 'Array') {
            for(let value of s) {
                if(!this._marked[value]) this.dfs(G, value)
            }
        }
    }

    dfs(G: Digraph, v: number) {
        this._marked[v] = true;
        for (let w of G.adj(v)) {
            if (!this._marked[w]) this.dfs(G, w)
        }
    }

    marked(v: number): boolean {
        return this._marked[v]
    }
}