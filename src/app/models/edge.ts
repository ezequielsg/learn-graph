import Vertex from './vertex';

export default class Edge {
    constructor(
        public left: Vertex,
        public right: Vertex,
        public weight: number
    ) { }

    isParallel(edge: Edge) {
        return edge.left === this.left && edge.right === this.right;
    }

    isBetween(from: Vertex, to: Vertex) {
        return this.isAdjacent(from) && this.isAdjacent(to);
    }

    isAdjacent(vertex: Vertex) {
        return this.left === vertex || this.right === vertex;
    }

    isLoop() {
        return this.left === this.right;
    }

    getAdjacentVertex(vertex: Vertex) {
        if (this.left === vertex) {
            return this.right;
        } else if (this.right === vertex) {
            return this.left;
        } else {
            return null;
        }
    }
}
