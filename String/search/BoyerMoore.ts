/**
 * Boyer-Moore字符串匹配算法
 * 核心：i从左至右检查文本，j从右至左检查模式匹配。提前计算好匹配失败是模式应该偏移的位置，就可以快速正确的移动指针
 */
export class BoyerMoore {
    private right: number[]
    private pat: string
    constructor(pat: string) {
        this.pat = pat
        const M = pat.length
        const R = 256
        this.right = new Array(R)
        this.right.fill(-1)
        for (let j = 0; j < M; j++) {
            this.right[pat.charCodeAt(j)] = j
        }
    }

    search(txt: string) {
        const N = txt.length
        const M = this.pat.length
        let skip: number
        // 实际上i指针所指向的位置，模式字符的起点位置
        for (let i = 0; i <= N - M; i += skip) {
            skip = 0
            for (let j = M - 1; j >= 0; j--) {
                if (this.pat.charCodeAt(j) !== txt.charCodeAt(i + j)) {
                    skip = j - this.right[txt.charCodeAt(i + j)]
                    if (skip < 1) skip = 1
                    break
                }
            }
            if (skip === 0) return i
        }
        return N
    }
}