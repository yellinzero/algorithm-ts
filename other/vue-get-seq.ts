/**
 * vue3diff算法中的最长递增子序列算法
 */
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
    const p = arr.slice()
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
      const arrI = arr[i]
      if (arrI !== 0) {
        // 处理的是比当前结果数组中还大的数
        j = result[result.length - 1]
        if (arr[j] < arrI) {
          p[i] = j
          result.push(i)
          continue
        }
        // 通过二分查找快速定位结果数组中的位置
        u = 0
        v = result.length - 1
        while (u < v) {
          c = (u + v) >> 1
          if (arr[result[c]] < arrI) {
            u = c + 1
          } else {
            v = c
          }
        }
        // 为什么是覆写而不是插入，要考虑要求的是递增子序列
        // 如果后面的值比前面的大，这时候应该是直接更新相应位置的数值
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1]
          }
          result[u] = i
        }
      }
    }
    // 为什么要从后自前做一次更新
    // 要考虑如果后面存在更小的元素的话会破坏序列
    // 有更小的元素其实相当于重新开启新的子序列的查找，但是如果没查找完的话，其实还是应该按上一次的最长子序列为标准
    // 所以从结果最后一个值往前逆推，得到最终的子序列
    // 这也是为什么要记录一个p的缘故，是为了重整序列的时候可以查到上一个大小位置
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
      result[u] = v
      v = p[v]
    }
    return result
  }