import { Alphabet, BinaryStdIn, BinaryStdOut } from "../../utils";

export class Genome {
    static async compress() {
        const DNA = new Alphabet('ACTG')
        const s = await BinaryStdIn.readString()
        const N = s.length
        BinaryStdOut.write(N)
        for (let i = 0; i < N; i++) {
            const d = DNA.toIndex(s.charAt(i))
            BinaryStdOut.write(d, DNA.lgR())
        }
        BinaryStdOut.close()
    }
    static async expand() {
        const DNA = new Alphabet('ACTG')
        const w = DNA.lgR()
        const N = await BinaryStdIn.readInt()
        for (let i = 0; i < N; i++) {
            const c = await BinaryStdIn.readChar(w)
            BinaryStdOut.write(DNA.toChar(c.charCodeAt(0)))
        }
        BinaryStdOut.close()
    }
}