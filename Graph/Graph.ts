export class Graph {
    private V: number = 0
    private E: number = 0
    private adj: Array<number>[] = []
    constructor(input: number | string) {
        const init = (input: number) => {
            this.V = input
            for (let v = 0; v < this.V; v++) {
                this.adj[v] = [] as number[]
            }
        }
        if (typeof input === 'number') {
            init(input)
        }
        if (typeof input === 'string') {
            const graphStrArr = input.replace(/\s+/g, ' ').split(' ')
            const V = Number(graphStrArr.shift())
            const E = Number(graphStrArr.shift())
            init(V)
            for (let i = 0; i < E; i++) {
                const v = Number(graphStrArr.shift())
                const w = Number(graphStrArr.shift())
                this.addEdge(v, w)
            }
        }
    }

    addEdge(v: number, w: number) {
        this.adj[v].push(w)
        this.adj[w].push(v)
        this.E++
    }

    getAdj(v: number) {
        return this.adj[v]
    }
}