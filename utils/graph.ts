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
        const adj = G.getAdj(v)
        for (let w = 0; w < adj.length; w++) {
            if (v === adj[w]) count++
        }
    }
    return count / 2
}
