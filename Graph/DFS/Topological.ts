/**
 * 拓扑排序
 *  */
import { Digraph } from "../common/Digraph";
import { DepthFirstOrder } from "./DepthFirstOrder";
import { DirectedCycle } from "./DirectedCycle";

export class Topological {
    private order: number[] | null = null

    constructor(G: Digraph) {
        const cyclefinder = new DirectedCycle(G)
        if (!cyclefinder.hasCycle()) {
            const dfs = new DepthFirstOrder(G)
            this.order = dfs.getReversePost()
        }
    }

    getOrder(): number[] | null {
        return this.order
    }

    isDAG(): boolean {
        return this.order !== null
    }

}