#!/usr/bin/env ts-node
// todo: 内存消耗计算
const argvs = process.argv.splice(2);
import * as Sort from "./index";
class SortCompare {
    static time(alg: string, a: any): number {
        const startTime: number = Number(process.hrtime.bigint().toString()) / 1000000;
        switch (alg) {
            case 'Insertion':
                Sort.Insertion.sort(a);
                break;
            case 'Selection':
                Sort.Selection.sort(a);
                break;
            case 'Shell':
                Sort.Shell.sort(a);
                break;
            case 'Merge':
                Sort.Merge.sort(a);
                break;
            case 'MergeBU':
                Sort.Merge.sort(a);
                break;
            case 'Quick':
                Sort.Quick.sort(a);
                break;
            case 'Heap':
                Sort.Heap.sort(a);
                break;

        }
        const endTime: number = Number(process.hrtime.bigint().toString()) / 1000000;
        return endTime - startTime;
    }

    static timeRandomInput(alg: string, N: number, T: number): number {
        let total: number = 0;
        const a = new Array(N);
        for (let i = 0; i < T; i++) {
            // 生成时间随机数
            for (let j = 0; j < N; j++) {
                const time = new Date().getTime();
                a[j] = Math.random() * time / Math.pow(10, time.toString().length - 5);
            }
            total += this.time(alg, a)
        }
        return total;
    }
}
const alg1 = argvs[0]!,
    alg2 = argvs[1]!,
    N = Number(argvs[2])!,
    T = Number(argvs[3])!,
    t1 = SortCompare.timeRandomInput(alg1, N, T),
    t2 = SortCompare.timeRandomInput(alg2, N, T);
console.log(`For ${N} random number ${T} times`);
console.log(`${alg1} costs  ${t1}ms totally`);
console.log(`${alg2} costs  ${t2}ms totally`);
console.log(`${alg1} is ${t2 / t1} times faster than ${alg2}`)