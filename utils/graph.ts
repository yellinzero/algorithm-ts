import { Graph } from "../Graph/common/Graph";

export function degree(G: Graph, v: number): number {
    return G.adj(v)?.length
}

export function maxDegree(G: Graph): number {
    let max = 0
    for (let v = 0; v < G.V(); v++) {
        if (degree(G, v) > max) max = degree(G, v)
    }
    return max
}

export function avgDegree(G: Graph): number {
    return 2 * G.E() / G.V()
}

export function numberOfSelfLoops(G: Graph): number {
    let count = 0
    for (let v = 0; v < G.V(); v++) {
        for (let w of G.adj(v)) {
            if (v === w) count++
        }
    }
    return count / 2
}
