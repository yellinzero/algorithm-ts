import { BinaryStdIn, BinaryStdOut } from "../../utils"

export class RunLengthEncoding {
    static async expand() {
        let b = false
        while (!(await BinaryStdIn.isEmpty())) {
            const cnt = await BinaryStdIn.readChar()
            for (let i = 0; i < cnt.charCodeAt(0); i++) {
                BinaryStdOut.write(b)
            }
            b = !b
        }
        BinaryStdOut.close()
    }

    static async compress() {
        let cnt = 0
        let b, old = false
        while (!(await BinaryStdIn.isEmpty())) {
            b = await BinaryStdIn.readBoolean()
            if (b !== old) {
                BinaryStdOut.write(cnt)
                cnt = 0
                old = !old
            } else {
                if (cnt === 255) {
                    BinaryStdOut.write(cnt)
                    cnt = 0
                    BinaryStdOut.write(cnt)
                }
            }
            cnt++
        }
        BinaryStdOut.write(cnt)
        BinaryStdOut.close()
    }
}