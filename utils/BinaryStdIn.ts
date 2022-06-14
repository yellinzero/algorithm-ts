/**
 * 这工具因为类型的类型存储模式跟java不一样，所以移植不算很好
 * 只是为了保证跟书的api尽量一致，提高效率，所以做了简单的封装
 */

const { EOL } = require('os')
const EOLCode = [] as number[]
for (let i = 0; i < EOL.length; i++) {
    EOLCode.push(EOL.charCodeAt(i))
}
export class BinaryStdIn {
    private static EOF: number = -1
    private static chunks: number[]
    private static buffer: number
    private static n: number
    private static isInitialized: boolean

    static initialize() {
        return new Promise((resolve) => {
            process.stdin.on('data', chunk => {
                this.chunks = []
                const chunksWithEOL = Array.from(chunk)
                for (let i = 0; i < chunksWithEOL.length; i++) {
                    if (EOLCode.length === 2) {
                        if (chunksWithEOL[i] === EOLCode[0] && chunksWithEOL[i + 1] === EOLCode[1]) {
                            break
                        } else {
                            this.chunks.push(chunksWithEOL[i])
                        }
                    } else if (EOLCode.length === 1) {
                        if (chunksWithEOL[i] === EOLCode[0]) {
                            break
                        } else {
                            this.chunks.push(chunksWithEOL[i])
                        }
                    }
                }
                this.buffer = 0
                this.n = 0
                this.fillBuffer()
                this.isInitialized = true
                resolve(true)
            })
        })
    }

    private static fillBuffer() {
        try {
            if (this.chunks.length > 0) {
                this.buffer = this.chunks.shift()!
                this.n = 8
            } else {
                throw new Error('EOF')
            }
        } catch (error) {
            console.log('EOF')
            this.buffer = this.EOF
            this.n = -1
        }
    }

    private static async close() {
        if (!this.isInitialized) await this.initialize()
        try {
            this.chunks = []
            this.isInitialized = false
            process.stdin.destroy()
        } catch (error) {
            throw new Error("Could not close BinaryStdIn " + error)
        }
    }

    static async isEmpty() {
        if (!this.isInitialized) await this.initialize()
        return this.buffer === this.EOF
    }

    static async readBoolean() {
        if (await this.isEmpty()) throw new Error('Reading from empty input stream')
        this.n--
        const bit = ((this.buffer >> this.n) & 1) === 1
        if (this.n === 0) this.fillBuffer()
        return bit
    }

    static async readChar(r?: number): Promise<string> {
        if (r !== undefined) {
            if (r < 1 || r > 16) throw new Error("Illegal value of r = " + r)
            if (r === 8) return this.readChar()

            let x = 0
            for (let i = 0; i < r; i++) {
                x <<= 1
                const bit = await this.readBoolean()
                if (bit) x |= 1
            }
            return String.fromCharCode(x)
        } else {
            if (await this.isEmpty()) throw new Error('Reading from empty input stream')
            // 当前为完整字节
            if (this.n === 8) {
                let x = this.buffer
                this.fillBuffer()
                return String.fromCharCode(x & 0xff)
            }

            // 字节不完整时取当前buffer后n比特和下一个buffer的前8-n个比特
            let x = this.buffer
            x <<= (8 - this.n)
            let oldN = this.n
            this.fillBuffer()
            if (await this.isEmpty()) throw new Error('Reading from empty input stream')
            this.n = oldN
            // 合并
            x |= (this.buffer >>> this.n)
            return String.fromCharCode(x & 0xff)
        }
    }

    static async readString() {
        if (await this.isEmpty()) throw new Error('Reading from empty input stream')
        let sb = ''
        while (!(await this.isEmpty())) {
            const c = await this.readChar()
            sb += c
        }
        return sb
    }

    static async readShort() {
        let x = 0;
        for (let i = 0; i < 2; i++) {
            const c = await this.readChar()
            x <<= 8
            x |= c!.charCodeAt(0)
        }
        return x
    }

    static async readInt(r?: number): Promise<number> {
        if (r !== undefined) {
            if (r < 1 || r > 32) throw new Error("Illegal value of r = " + r);
            if (r === 32) return await this.readInt()

            let x = 0
            for (let i = 0; i < r; i++) {
                x <<= 1
                const bit = await this.readBoolean()
                if (bit) x |= 1
            }
            return x
        } else {
            let x = 0;
            for (let i = 0; i < 4; i++) {
                const c = await this.readChar()
                x <<= 8
                x |= c!.charCodeAt(0)
            }
            return x
        }
    }
}