import Vertex from './vertex';

export default class Edge {
    constructor(
        public left: Vertex,
        public right: Vertex,
        public weight: number
    ) {
        left.degree++;
        right.degree++;

        left.edges.push(this);
        right.edges.push(this);

        left.distances[left.name] = 0;
        left.distances[right.name] = +weight;

        right.distances[right.name] = 0;
        right.distances[left.name] = +weight;
    }

    adjacent(vertex: Vertex) {
        return this.left.name === vertex.name ? this.right : this.left;
    }
}