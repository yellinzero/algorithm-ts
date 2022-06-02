/**
 * 拓扑排序
 *  */
import { Digraph } from "../common/Digraph";
import { EdgeWeightedDigraph } from "../common/EdgeWeightedDigraph";
import { DepthFirstOrder } from "./DepthFirstOrder";
import { DirectedCycle } from "./DirectedCycle";

export class Topological {
    private _order: number[] | null = null

    constructor(G: Digraph | EdgeWeightedDigraph) {
        const cyclefinder = new DirectedCycle(G)
        if (!cyclefinder.hasCycle()) {
            const dfs = new DepthFirstOrder(G)
            this._order = dfs.getReversePost()
        }
    }

    order(): number[] | null {
        return this._order
    }

    isDAG(): boolean {
        return this._order !== null
    }

}