/**
 * 带权重的边
 */

import { Comparable } from "../../utils";

export class Edge implements Comparable<Edge> {
    private v: number
    private w: number
    private weight: number

    constructor(v: number, w: number, weight: number) {
        this.v = v
        this.w = w
        this.weight = weight
    }

    getWeight() {
        return this.weight
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
        if (this.getWeight() < that.getWeight()) return -1
        else if (this.getWeight() < that.getWeight()) return 1
        else return 0
    }

    toString() {
        return `${this.v}-${this.w} ${this.weight.toFixed(2)}`
    }

}