import { Graph } from "../Graph/Graph";

export function degree(G: Graph, v: number): number {
    return G.getAdj(v)?.length
}

export function maxDegree(G: Graph): number {
    let max = 0
    for (let v = 0; v < G.getV(); v++) {
        if (degree(G, v) > max) max = degree(G, v)
    }
    return max
}

export function avgDegree(G: Graph): number {
    return 2 * G.getE() / G.getV()
}

export function numberOfSelfLoops(G: Graph): number {
    let count = 0
    for (let v = 0; v < G.getV(); v++) {
        for (let w of G.getAdj(v)) {
            if (v === w) count++
        }
    }
    return count / 2
}
