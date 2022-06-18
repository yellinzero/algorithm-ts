/**
 * 这工具因为类型的类型存储模式跟java不一样，所以移植不算很好
 * 只是为了保证跟书的api尽量一致，提高效率，所以做了简单的封装
 * nodejs process.stdout在不同环境下的表现的不一样，加上解码的问题会导致此方法有问题。暂时先不改写。
 * 重点毕竟在算法学习上
 */

import { Writable } from "stream";

export class BinaryStdOut {
    private static out: Writable;
    private static buffer: number;
    private static n: number;
    private static isInitialized: boolean;

    private static initialize() {
        this.out = process.stdout;
        this.buffer = 0;
        this.n = 0;
        this.isInitialized = true;
    }

    private static clearBuffer() {
        if (!this.isInitialized) this.initialize();

        if (this.n == 0) return;
        if (this.n > 0) this.buffer <<= 8 - this.n;
        this.out.write(String.fromCharCode(this.buffer));
        this.n = 0;
        this.buffer = 0;
    }

    private static writeBit(bit: boolean) {
        if (!this.isInitialized) this.initialize();

        // add bit to buffer
        this.buffer <<= 1;
        if (bit) this.buffer |= 1;

        // if buffer is full (8 bits), write out as a single byte
        this.n++;
        if (this.n == 8) this.clearBuffer();
    }
    private static writeByte(x: number) {
        if (!this.isInitialized) this.initialize();
        if (!(x >= 0 && x < 256)) return;
        // optimized if byte-aligned
        if (this.n == 0) {
            this.out.write(String.fromCharCode(x));
            return;
        }

        // otherwise write one bit at a time
        for (let i = 0; i < 8; i++) {
            const bit = ((x >>> (8 - i - 1)) & 1) == 1;
            this.writeBit(bit);
        }
    }
    static write(x: number | boolean | string, r?: number) {
        if (typeof x === "number" && r !== undefined) {
            if (r == 32) {
                this.write(x);
                return;
            }
            if (r < 1 || r > 32) throw new Error("Illegal value for r = " + r);
            if (x < 0 || x >= (1 << r))
                throw new Error(
                    "Illegal " + r + "-bit char = " + String.fromCharCode(x)
                );
            for (let i = 0; i < r; i++) {
                const bit = ((x >>> (r - i - 1)) & 1) == 1;
                this.writeBit(bit);
            }
        } else if (typeof x === 'string' && x.length <= 1 && r !== undefined) {
            if (r === 8) {
                this.write(x)
                return
            }
            if (r < 1 || r > 16) throw new Error("Illegal value for r = " + r);
            if (x.charCodeAt(0) >= (1 << r)) throw new Error("Illegal " + r + "-bit char = " + x);
            for (let i = 0; i < r; i++) {
                const bit = ((x.charCodeAt(0) >>> (r - i - 1)) & 1) == 1;
                this.writeBit(bit);
            }
        } else if (typeof x === 'string' && x.length > 1 && r !== undefined) {
            for (let i = 0; i < x.length; i++) {
                this.write(x.charAt(i), r)
            }
        } else if (typeof x === 'boolean') {
            this.writeBit(x);
        } else if (typeof x === 'string' && x.length <= 1) {
            if (x.charCodeAt(0) < 0 || x.charCodeAt(0) >= 256) throw new Error("Illegal 8-bit char = " + x);
            this.writeByte(x.charCodeAt(0));
        } else if (typeof x === 'string' && x.length > 1) {
            for (let i = 0; i < x.length; i++) {
                this.write(x.charAt(i))
            }
        } else if (typeof x === 'number') {
            // js只有number类型占8个字节
            // this.writeByte(((x >>> 56) & 0xff));
            // this.writeByte(((x >>> 48) & 0xff));
            // this.writeByte(((x >>> 40) & 0xff));
            // this.writeByte(((x >>> 32) & 0xff));
            this.writeByte((x >>> 24) & 0xff);
            this.writeByte((x >>> 16) & 0xff);
            this.writeByte((x >>> 8) & 0xff);
            this.writeByte((x >>> 0) & 0xff);
        }
    }

    static close() {
        this.clearBuffer()
        this.isInitialized = false;
        this.out.destroy()
    }


}
