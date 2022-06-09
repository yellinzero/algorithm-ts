/**
 * Knuth-Morris-pratt算法
 * 重点难点都在于确定有限状态机（DFA）的构造
 * 关键在于，匹配成功则往下走一个状态，如果匹配未成功，则返回到上一次的重启状态
 * 构造过程：一般来说时先假设匹配未成功，则把上一次的重启状态复制到当前值，然后找到匹配成功的，将值设置为下一个状态
 */

export class KMP {
    private pat: string
    private dfa: number[][]
    constructor(pat: string) {
        this.pat = pat
        const M = pat.length
        const R = 256
        this.dfa = new Array(R)
        for (let i = 0; i < this.dfa.length; i++) {
            this.dfa[i] = new Array(M).fill(0)
        }

        // 构造DFA
        // this.dfa[pat.charCodeAt(j)][j] 代表是能匹配上的，所以0的情况下为下一级状态
        this.dfa[pat.charCodeAt(0)][0] = 1
        for (let X = 0, j = 1; j < M; j++) {
            for (let c = 0; c < R; c++) {
                // 假设都匹配不上，则同步上一次状态
                this.dfa[c][j] = this.dfa[c][X]
            }
            // 匹配上了所以进入到下一个状态，覆写存的上一次状态
            this.dfa[pat.charCodeAt(j)][j] = j + 1
            // 更新当前停留的状态
            X = this.dfa[pat.charCodeAt(j)][X]
        }
    }

    search(txt: string) {
        let i, j, N = txt.length, M = this.pat.length
        for (i = 0, j = 0; i < N && j < M; i++) {
            // 识别模式应在的位置
            j = this.dfa[txt.charCodeAt(i)][j]
        }
        if (j === M) return i - M
        else return N
    }
}