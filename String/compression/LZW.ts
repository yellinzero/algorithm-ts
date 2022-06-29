// TODO LZW算法依赖于基于三项单词查找树的符号表，这个未完全实现
// import { BinaryStdIn, BinaryStdOut } from "../../utils";
// import { TST } from "../search/TST"
// export class LZW {
//     private static R: number = 256
//     private static L = 4096
//     private static W = 12

//     static async compress() {
//         let input = await BinaryStdIn.readString()
//         const st = new TST<number>()
//         for (let i = 0; i < this.R; i++) {
//             st.put(String.fromCharCode(i), i)
//         }
//         let code = this.R + 1
//         while(input.length>0) {
//             const s = st.longestPrefixOf(input)
            
//         }
//     }
// }
