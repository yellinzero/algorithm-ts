export class DirectedEdge {
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

    from() {
        return this.v
    }

    to() {
        return this.w
    }

    toString() {
        return `${this.v}->${this.w} ${this._weight.toFixed(2)}`
    }
}