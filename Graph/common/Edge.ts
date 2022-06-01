/**
 * 带权重的边
 */

import { Comparable } from "../../utils";

export class Edge implements Comparable<Edge> {
    private v: number
    private w: number
    private _weight: number

    constructor(v: number, w: number, weight: number) {
        this.v = v
        this.w = w
        this._weight = weight
    }

    weight() {
        return this._weight
    }

    either() {
        return this.v
    }

    other(vertex: number) {
        if (vertex === this.v) return this.w
        else if (vertex === this.w) return this.v
        else throw new Error('Inconsistent edge')
    }

    compareTo(that: Edge): number {
        if (this.weight() < that.weight()) return -1
        else if (this.weight() > that.weight()) return 1
        else return 0
    }

    toString() {
        return `${this.v}-${this.w} ${this._weight.toFixed(2)}`
    }

}