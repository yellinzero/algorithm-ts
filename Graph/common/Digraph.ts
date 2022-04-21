/**
 * 有向图 
 */
export class Digraph {
    private V: number = 0
    private E: number = 0
    private adj: Array<number>[] = []
    constructor(input: number) {
        this.V = input
        for (let v = 0; v < this.V; v++) {
            this.adj[v] = [] as number[]
        }
    }

    addEdge(v: number, w: number) {
        this.adj[v].unshift(w)
        this.E++
    }

    getAdj(v: number): number[] {
        return this.adj[v]
    }

    getV(): number {
        return this.V
    }

    getE(): number {
        return this.E
    }

    reverse(): Digraph {
        const R: Digraph = new Digraph(this.V)
        for (let v = 0; v < this.V; v++) {
            for (let w of this.getAdj(v)) {
                R.addEdge(w, v)
            }
        }
        return R
    }

    // 图的字符串表示
    toString() {
        let s = `${this.V} vertices, ${this.E} edges\n`
        for (let v = 0; v < this.V; v++) {
            s += v + ": "
            for (let w = 0; w < this.adj[v].length; w++) {
                s += this.adj[v][w] + " "
            }
            s += "\n"
        }
        return s
    }
}