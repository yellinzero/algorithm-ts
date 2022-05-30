import { Digraph } from "../common/Digraph"


export class SymbolDigraph {
    private st: Map<string, number> = new Map()
    private keys: string[] = []
    private G: Digraph

    constructor(stream: string[][], sp: string) {
        for (let line of stream) {
            // 为每个不同的字符串关联一个索引
            for (let i = 0; i < line.length; i++) {
                if (!this.st.has(line[i])) this.st.set(line[i], this.st.size)
            }
        }

        // 建立顶点名的反向索引
        for (let name of this.st.keys()) {
            this.keys[this.st.get(name)!] = name
        }

        this.G = new Digraph(this.st.size)
        // 构造图
        for (let line of stream) {
            const v = this.st.get(line[0]) as number
            for (let i = 1; i < line.length; i++) {
                this.G.addEdge(v, this.st.get(line[i])!)
            }
        }
    }

    contains(s: string): boolean {
        return this.st.has(s);
    }

    index(s: string): number | undefined {
        return this.st.get(s)
    }

    name(v: number): string {
        return this.keys[v]
    }

    getG(): Digraph {
        return this.G
    }
}