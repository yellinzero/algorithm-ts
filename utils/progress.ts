const slog = require('single-line-log').stdout

export class ProgressBar {
    description: string = 'Progress'
    length: number = 25
    total: number = 0

    constructor(description:string , length: number, total: number) {
        this.description = description
        this.length = length
        this.total = total
    }

    render(completed: number) {
        const percent = Number((completed / this.total).toFixed(4))
        const cells = Math.floor(percent * this.length)

        let cell = '';
        for(let i =0; i<cells;i++) {
            cell+='='
        }

        let empty = ''
        for(let i =0; i<this.length - cells;i++) {
            empty+='-'
        }

        slog(`${this.description}: ${(100*percent).toFixed(2)}% ${cell}${empty} ${completed}/${this.total}`)
    }
}