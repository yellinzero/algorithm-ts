/**
 * 正则表达式的模式匹配
 * 事实上历代正则表达式的基础算法可以主要分为两类：NFA，DFA
 * NFA：不确定有限状态自动机，使用这种实现的正则表达式支持反向引用等操作
 * DFA：确定有限状态自动机，这里的确定就是可以根据模式提前得知所有的状态，然后可以是的按字符检索不回退，效率比较高
 * 当前这里使用的是NFA为基础的正则表达式简单实现
 * 注：目前js所使用的正则引擎也是基于NFA的
 */

import { Digraph } from "../../Graph/common/Digraph"
import { DirectedDFS } from "../../Graph/DFS/DirectedDFS"

export class NFA {
    private re: string[]
    private G: Digraph
    private M: number
    constructor(regexp: string) {
        const ops = [] as number[]
        this.re = regexp ? regexp.split('') : []
        this.M = this.re.length
        this.G = new Digraph(this.M + 1)

        // 生成∊-状态有向图
        for (let i = 0; i < this.M; i++) {
            let lp = i
            // 在栈中存入( | 的位置（即状态）
            if (this.re[i] === '(' || this.re[i] == '|') {
                ops.push(i)
            } else if (this.re[i] === ')') {
                const or = ops.pop() as number
                if (this.re[or] === '|') {
                    lp = ops.pop() as number
                    this.G.addEdge(lp, or + 1)
                    this.G.addEdge(or, i)
                } else lp = or
            }
            if (i < this.M - 1 && this.re[i + 1] === '*') {
                this.G.addEdge(lp, i + 1)
                this.G.addEdge(i + 1, lp)
            }
            if (this.re[i] === '(' || this.re[i] === '*' || this.re[i] === ')') {
                this.G.addEdge(i, i + 1)
            }
        }
    }

    recognizes(txt: string) {
        let pc = [] as number[]
        let dfs = new DirectedDFS(this.G, 0)
        // 确认初始时（0）∊-状态的可达点
        for (let v = 0; v < this.G.V(); v++) {
            if (dfs.marked(v)) pc.push(v)
        }
        for (let i = 0; i < txt.length; i++) {
            //计算txt[i+1]可能达到的所有NFA状态
            const match = [] as number[]
            for (let v of pc) {
                if (v < this.M) {
                    // 匹配则进入下一个状态
                    if (this.re[v] === txt.charAt(i) || this.re[v] == '.') {
                        match.push(v + 1)
                    }
                }
            }
            pc = []
            // 利用多点可达性，得到状态集合的下一次的所有可达点
            dfs = new DirectedDFS(this.G, match)
            for (let v = 0; v < this.G.V(); v++) {
                if (dfs.marked(v)) pc.push(v)
            }
        }
        for (let v of pc) {
            // 如果可达状态中有一次是到达了最后值，证明匹配成功
            if (v === this.M) return true
        }
        return false
    }
}