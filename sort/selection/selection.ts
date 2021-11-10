import { Sort } from "../../common";

export class Selection extends Sort {
    static sort(a: Array<any>): void {
        let N: number = a.length;
        for (let i = 0; i < N; i++) {
            let min = i;
            for (let j = i + 1; j < N; j++) {
                if (this.less(a[j], a[min])) min = j
            }
            this.exch(a, i, min)
        }
    }
}