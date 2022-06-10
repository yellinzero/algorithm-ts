/**
 * Rabin-Karp指纹字符串查找算法
 * 原理就是通过散列值（指纹）进行模式匹配，关键在于如何提高计算文本中散列值的效率。这里利用了进制算法和取余的数学性质
 */

export class RabinKarp {
    private pat: string
    private patHash: number
    private M: number
    private Q: number
    private R: number = 256
    private RM: number
    constructor(pat: string) {
        this.pat = pat
        this.M = pat.length
        // TODO 这里应该使用随机大素数算法
        // 另外有个需要注意的问题就是js取超过2^53-1的大数需要使用bigint
        // this.Q = longRandomPrime()
        this.Q = 1099511627689
        this.RM = 1
        for (let i = 1; i <= this.M - 1; i++) {
            this.RM = (this.R * this.RM) % this.Q
        }
        this.patHash = this.hash(pat, this.M)
    }

    // 蒙特卡洛方法（使用超大素数减少冲突，直接认为不冲突）
    // 也可以使用拉斯维加斯算法，则能保证正确性
    check(i: number) {
        return true;
    }

    // horner方法
    private hash(key: string, M: number) {
        let h = 0
        for (let j = 0; j < M; j++) {
            h = (this.R * h + key.charCodeAt(j)) % this.Q
        }
        return h
    }

    search(txt: string) {
        const N = txt.length
        let txtHash = this.hash(txt, this.M)
        if (this.patHash === txtHash && this.check(0)) return 0
        for (let i = this.M; i < N; i++) {
            txtHash = (txtHash + this.Q - this.RM * txt.charCodeAt(i - this.M) % this.Q) % this.Q
            txtHash = (txtHash * this.R + txt.charCodeAt(i)) % this.Q
            if (this.patHash === txtHash) {
                if (this.check(i - this.M + 1)) return i - this.M + 1
            }

        }
        return N
    }
}