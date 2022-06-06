/**
 * 低位优先字符串排序
 */
export class LSD {
    static sort(a: string[], W: number) {
        const N = a.length
        const R = 256
        const aux = [] as string[]

        for (let d = W - 1; d >= 0; d--) {
            const count = new Array(R + 1)
            count.fill(0)
            for (let i = 0; i < N; i++) {
                count[a[i].charCodeAt(d) + 1]++
            }

            for (let r = 0; r < R; r++) {
                count[r + 1] += count[r]
            }

            for (let i = 0; i < N; i++) {
                aux[count[a[i].charCodeAt(d)]++] = a[i]
            }
            for (let i = 0; i < N; i++) {
                a[i] = aux[i]
            }
        }
    }
}