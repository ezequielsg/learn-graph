import Edge from './edge';

export default class Vertex {
    degree = 0;
    edges: Edge[] = [];
    distances: { [key: string]: number } = {};

    constructor(
        public name: string,
    ) { }

    getEdgesName() {
        return this.edges.map(edge => edge.adjacent(this).name);
    }

    isAdjacent(vertex: Vertex) {
        return !!this.edges.findIndex(edge => edge.adjacent(vertex) === vertex);
    }

    getDistanceTo(to: Vertex) {
        if (this.distances[to.name] !== undefined) {
            return this.distances[to.name];
        }

        return this.distances[to.name] = to.distances[this.name] =
            Math.min(...this.edges.map(edge => edge.weight + edge.adjacent(this).getDistanceTo(to)));
    }
}
