export class QuickFindUF {
    private id: number[]
    private _count: number

    constructor(N: number) {
        this._count = N
        this.id = []
        for (let i = 0; i < N; i++) {
            this.id[i] = i
        }
    }

    count() {
        return this._count
    }

}