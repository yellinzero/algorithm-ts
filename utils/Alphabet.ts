export class Alphabet {
    /**
    *  The binary alphabet { 0, 1 }.
    */
    static BINARY = new Alphabet("01");

    /**
     *  The octal alphabet { 0, 1, 2, 3, 4, 5, 6, 7 }.
     */
    static OCTAL = new Alphabet("01234567");

    /**
     *  The decimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }.
     */
    static DECIMAL = new Alphabet("0123456789");

    /**
     *  The hexadecimal alphabet { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F }.
     */
    static HEXADECIMAL = new Alphabet("0123456789ABCDEF");

    /**
     *  The DNA alphabet { A, C, T, G }.
     */
    static DNA = new Alphabet("ACGT");

    /**
     *  The lowercase alphabet { a, b, c, ..., z }.
     */
    static LOWERCASE = new Alphabet("abcdefghijklmnopqrstuvwxyz");

    /**
     *  The uppercase alphabet { A, B, C, ..., Z }.
     */

    static UPPERCASE = new Alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    /**
     *  The protein alphabet { A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y }.
     */
    static PROTEIN = new Alphabet("ACDEFGHIKLMNPQRSTVWY");

    /**
     *  The base-64 alphabet (64 characters).
     */
    static BASE64 = new Alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");

    /**
     *  The ASCII alphabet (0-127).
     */
    static ASCII = new Alphabet(128);

    /**
     *  The extended ASCII alphabet (0-255).
     */
    static EXTENDED_ASCII = new Alphabet(256);

    /**
     *  The Unicode 16 alphabet (0-65,535).
     */
    static UNICODE16 = new Alphabet(65536);


    private _alphabet: string[] = []
    private _inverse: number[] = []
    private _R: number = 0


    constructor()
    constructor(radix: number)
    constructor(alpha: string)
    constructor(arg?: number | string) {
        if (typeof arg === 'string') {
            const unicode = [] as boolean[]
            let max = 0
            for (let i = 0; i < arg.length; i++) {
                const c = arg.charCodeAt(i)
                if (c > max) {
                    max = c
                }
                if (unicode[c])
                    throw new Error("Illegal alphabet: repeated character = '" + arg.charAt(i) + "'")
                unicode[c] = true
            }
            this._alphabet = arg.split('')
            this._R = arg.length
            this._inverse = new Array(max).fill(-1)
            for (let c = 0; c < this._R; c++) {
                this._inverse[this._alphabet[c].charCodeAt(0)] = c
            }
        }
        if (typeof arg === 'number') {
            this._R = arg
            this._alphabet = new Array(this._R).fill('\u0000')
            this._inverse = new Array(this._R).fill(-1)
            for (let i = 0; i < this._R; i++) {
                this._alphabet[i] = String.fromCharCode(i)
            }
            for (let i = 0; i < this._R; i++) {
                this._inverse[i] = i
            }
        }

        if (arg === undefined) {
            this.constructor(256)
        }
    }

    contains(c: string) {
        return this._inverse[c.charCodeAt(0)] !== -1
    }

    R() {
        return this._R;
    }

    radix() {
        return this._R
    }

    lgR() {
        let lgR = 0
        for (let t = this._R - 1; t >= 1; t = Math.floor(t / 2)) {
            lgR++
        }
        return lgR
    }

    toIndex(c: string) {
        const cNum = c.charCodeAt(0)
        if (cNum >= this._inverse.length || this._inverse[cNum] === -1) {
            throw new Error("Character " + c + " not in alphabet")
        }
        return this._inverse[cNum]
    }

    toIndices(s: string) {
        const source = s.split('')
        const target = [] as number[]
        for (let i = 0; i < source.length; i++) {
            target[i] = this.toIndex(source[i])
        }
        return target
    }

    toChar(index: number) {
        if (index < 0 || index >= this._R) {
            throw new Error("index must be between 0 and " + this._R + ": " + index)
        }
        return this._alphabet[index]
    }

    toChars(indices: number[]) {
        let str = ''
        for (let i = 0; i < indices.length; i++) {
            str += String.fromCharCode(indices[i])
        }
        return str
    }
}