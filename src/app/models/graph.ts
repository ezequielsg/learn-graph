import Vertex from './vertex';
import Edge from './edge';

export default class Graph {

    vertices: Vertex[] = [];
    edges: Edge[] = [];

    constructor(
        public name: string
    ) { }

    addVertex(vertex: Vertex) {
        this.vertices.push(vertex);
    }

    findVertexByName(name: string) {
        return this.vertices.find(vertex => vertex.name === name);
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }

    getOrder() {
        return this.vertices.length;
    }

    getDegree(vertex: Vertex) {
        return this.edges
            .filter(edge => edge.isAdjacent(vertex))
            .reduce(acc => acc + 1, 0);
    }

    getLength() {
        return this.edges.length;
    }

    isRegular() {
        const n = this.getOrder();
        let auxDegree;
        for (let i = 0; i < n; i++) {
            if (auxDegree === undefined) {
                auxDegree = this.getDegree(this.vertices[i]);
            } else if (auxDegree !== this.getDegree(this.vertices[i])) {
                return false;
            }
        }
        return true;
    }

    isSimple() {
        return !this.isMultigraph();
    }

    isPseudograph() {
        for (const edge of this.edges) {
            if (edge.left.name === edge.right.name) {
                return true;
            }
        }

        return false;
    }

    isMultigraph() {
        if (this.isPseudograph()) {
            return true;
        }

        for (const [index, edge] of Object.entries(this.edges)) {

            for (let jindex = +index + 1; jindex < this.edges.length; jindex++) {

                const j = this.edges[jindex];

                if (edge.left.name === j.left.name && edge.right.name === j.right.name) {
                    return true;
                }
            }
        }
    }

    isCycle() {
        return this.isRegular() && this.isConnected() && this.getDegree(this.vertices[0]) === 2;
    }

    isComplete() {
        if (this.isRegular() && this.getDegree(this.vertices[0]) === this.vertices.length - 1) {
            return true;
        }
    }

    isConnected() {
        const n = this.vertices.length;
        const closures = this.getTransitiveClosures();
        let auxDegree: number;
        for (let i = 0; i < n; i++) {
            const degree = closures[i].reduce((acc: number, val: number) => val ? acc + 1 : acc, 0);
            if (auxDegree === undefined) {
                auxDegree = degree;
            } else if (auxDegree !== degree) {
                return false;
            }
        }

        return auxDegree === this.vertices.length;
    }

    isAdjacent(left: Vertex, right: Vertex) {
        return this.edges.some(edge => edge.getAdjacentVertex(left) === right);
    }

    getTransitiveClosures() {
        const n = this.vertices.length;
        const closures = new Array(n);

        for (let i = 0; i < n; i++) {
            closures[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                closures[i][j] = this.isAdjacent(this.vertices[i], this.vertices[j]);
            }
        }

        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    closures[i][j] = closures[i][j] || (closures[i][k] && closures[k][j]);
                }
            }
        }

        return closures;
    }

    getTransitiveMatrix() {
        const n = this.vertices.length;
        const closures = this.getTransitiveClosures();

        const matrix = new Array(n);

        for (let i = 0; i < n; i++) {
            matrix[i] = new Array(n);
            for (let j = 0; j < n; j++) {
                matrix[i][j] = closures[i][j] && i !== j ? 1 : null;
            }
        }

        return matrix;
    }

    getAdjacentVertices(vertex: Vertex) {
        return this.edges.filter(edge => edge.isAdjacent(vertex));
    }

    getDistanceMatrix() {
        const length = this.vertices.length;
        const matrix = Array.from(Array(length), () => new Array(length).fill(0));

        this.vertices.forEach((from, i) => {
            this.vertices.forEach((to, j) => {
                matrix[i][j] = this.getDistanceBetween(from, to);
            });
        });

        return matrix;
    }

    hasPathBetween(left: Vertex, right: Vertex) {
        return this.getDistanceBetween(left, right) !== -1;
    }

    getDistanceBetween(from: Vertex, to: Vertex, traveled: Edge[] = []) {
        if (from === to) {
            return 0;
        }

        const travel = traveled.find(edge => edge.isBetween(from, to));
        if (travel) {
            return travel.weight;
        }

        const findEdge = this.edges.find(edge => edge.isBetween(from, to));
        if (findEdge) {
            return findEdge.weight;
        }

        const me = new Edge(from, to, -1);

        traveled.push(me);

        this.getAdjacentVertices(from).forEach(edge => {
            const distance = this.getDistanceBetween(edge.getAdjacentVertex(from), to, traveled);
            if (distance !== -1 && (distance + edge.weight < me.weight || me.weight === -1)) {
                me.weight = distance + edge.weight;
            }
        });

        return me.weight;
    }

    getMinimumSpanningTree() {
        const tree = new Graph(this.name + '-spanning-tree');

        this.vertices.forEach(vertex => tree.addVertex(vertex));

        this.edges
            .sort((a: Edge, b: Edge) => a.weight < b.weight ? -1 : 1)
            .forEach(edge => {
                if (!tree.hasPathBetween(edge.left, edge.right)) {
                    tree.addEdge(edge);
                }
            });

        return tree;
    }
}
