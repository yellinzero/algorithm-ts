import { getType } from "../../utils"
import { Digraph } from "../common/Digraph"

export class DirectedDFS {
    private markeds: boolean[] = []

    constructor(G: Digraph, s: number  | number[]) {
        this.markeds = []
        if(typeof s === 'number') {
            this.dfs(G, s)
        } else if (getType(s) === 'Array') {
            for(let value of s) {
                if(!this.markeds[value]) this.dfs(G, value)
            }
        }
    }

    dfs(G: Digraph, v: number) {
        this.markeds[v] = true;
        for (let w of G.getAdj(v)) {
            if (!this.markeds[w]) this.dfs(G, w)
        }
    }

    marked(v: number): boolean {
        return this.markeds[v]
    }
}