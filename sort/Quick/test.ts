#!/usr/bin/env ts-node
import { Quick, Quick3way } from './Quick'
import { Comparable } from "../../utils"
const argvs = process.argv.splice(2)
// examples
const arr = [1, 2, 5, 6, 7, 7, 8, 123, 5, 2]
Quick.sort(arr)
console.log('-----------Quick')
Quick.show(arr)


class NumberComparable extends Number {
    compareTo(x: NumberComparable): number {
        return  Number(this) - Number(x)
    }
}

const arr2 = [1, 2, 5, 6, 11, 2, 5, 6, 7, 7, 8, 123, 5, 2, 2, 5, 6, 7, 7, 8, 123, 5, 27, 7, 8, 123, 51, 2, 5, 6, 7, 7, 8, 123, 5, 2, 2]
const arrNew:Comparable[] = []
arr2.forEach(item=> {
    arrNew.push(new NumberComparable(item))
})
Quick3way.sort(arrNew)
console.log('-----------Quick3way')
Quick3way.show(arrNew)