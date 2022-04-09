
// 图搜索接口
export interface Search {
    marked(v: number): boolean
    count(): number
}