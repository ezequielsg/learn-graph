import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import Vertex from './models/vertex';
import Edge from './models/edge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  file: any;

  rawMatrix: string;
  transitiveMatrix: number[][] = [];
  transitiveClosures: boolean[][] = [];

  distanceMatrix: number[][] = [];

  vertices: Vertex[] = [];
  edges: Edge[] = [];

  simple = false;
  pseudograph = false;
  multigraph = false;
  connected = false;
  complete = false;
  cycle = false;
  regular = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // aleatorio
    // this.recognize(`a - b\na - d\nb - c\nb - d\nc - c\nc - d`);
    // ciclo
    this.recognize('a 5 b, b 4 c, c 7 d, d 10 a');
  }

  recognize(input: string) {
    this.rawMatrix = input;

    const lines = input.split(/[,\n]/);

    for (let line of lines) {
      line = line.trim();

      if (!line) {
        continue;
      }

      const [leftName, weight, rightName] = line.split(' ');

      let left = this.vertices.find((vertex) => vertex.name === leftName);

      if (!left) {
        left = new Vertex(leftName);

        this.vertices.push(left);
      }

      let right = this.vertices.find((vertex) => vertex.name === rightName);

      if (!right) {
        right = new Vertex(rightName);

        this.vertices.push(right);
      }

      this.edges.push(new Edge(left, right, +weight));
    }

    this.vertices = this.vertices.sort((left, right) => left.name < right.name ? -1 : 1);

    this.initialize();
  }

  initialize() {
    // console.log(this.vertices);
    // console.log(this.edges);

    // montar matriz de adjacência
    // Não se faz necessário

    // montar matriz de incidência
    // Não se faz necessário

    // calcular fechos transitivos
    this.mountTransitiveMatrix();

    // calcular matriz de distancia
    this.mountDistanceMatrix();

    // calc minimum path
    // this.calcMinimumSpanningTree();

    // calcular grau dos vertices
    // Não se faz necessário

    // verificar se o grafo é regular
    this.isRelugar();

    // verificar se é pseudografo
    this.isPseudograph();

    // verificar se é multigrafo
    this.isMultigraph();

    // verificar se é simples
    this.isSimple();

    // verificando se é conexo
    this.isConnected();

    // verificando se o grafo é completo
    this.isComplete();

    // verificando se o grafo é ciclo
    this.isCycle();

    // encontrar sua arvore geradora mínima

    // renderizar
    this.changeDetectorRef.detectChanges();
  }

  mountTransitiveMatrix() {
    const n = this.vertices.length;
    this.transitiveClosures = new Array(n);

    for (let i = 0; i < n; i++) {
      this.transitiveClosures[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        this.transitiveClosures[i][j] = this.vertices[i].isAdjacent(this.vertices[j]);
      }
    }

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          this.transitiveClosures[i][j] = this.transitiveClosures[i][j] || (this.transitiveClosures[i][k] && this.transitiveClosures[k][j]);
        }
      }
    }

    this.transitiveMatrix = new Array(n);

    for (let i = 0; i < n; i++) {
      this.transitiveMatrix[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        this.transitiveMatrix[i][j] = this.transitiveClosures[i][j] && i !== j ? 1 : null;
      }
    }
  }

  mountDistanceMatrix() {
    this.vertices.forEach(from => {
      this.vertices.forEach(to => {
        from.getDistanceTo(to);
      });
    });
  }

  // calcMinimumSpanningTree() {
  //   const edges = [...this.edges].sort((a, b) => a.weight < b.weight ? -1 : 1);
  //   const spanningTree = [];

  //   const isConnected = (left: Vertex, right: Vertex) => {

  //     return false;
  //   };

  //   edges.forEach(edge => {
  //     if (!isConnected(edge.left, edge.right)) {
  //       spanningTree.push(edge);
  //     }
  //   });

  //   console.log(spanningTree);
  // }

  // getDistanceMatrix() {
  //   const length = this.vertices.length;
  //   const matrix = Array.from(Array(length), () => new Array(length).fill(0));

  //   for (let i = 0; i < length; i++) {
  //     for (let j = 0; j < length; j++) {
  //       if (i === j) {
  //         continue;
  //       }

  //       const vi = this.vertices[i];
  //       const vj = this.vertices[j];

  //       matrix[i][j] = vi.distances[vj.name] || -1;
  //     }
  //   }

  //   return matrix;
  // }

  isRelugar() {
    const n = this.vertices.length;
    let auxDegree;
    for (let i = 0; i < n; i++) {
      if (auxDegree === undefined) {
        auxDegree = this.vertices[i].degree;
      } else if (auxDegree !== this.vertices[i].degree) {
        return;
      }
    }
    this.regular = true;
  }

  isSimple() {
    for (const [index, edge] of Object.entries(this.edges)) {
      if (edge.left.name === edge.right.name) {
        return;
      }
      for (let jindex = +index + 1; jindex < this.edges.length; jindex++) {

        const j = this.edges[jindex];

        if (edge.left.name === j.left.name && edge.right.name === j.right.name) {
          return;
        }
      }
    }

    this.simple = true;
  }

  isPseudograph() {
    for (const edge of this.edges) {
      if (edge.left.name === edge.right.name) {
        this.pseudograph = true;
        return;
      }
    }
  }

  isMultigraph() {
    for (const [index, edge] of Object.entries(this.edges)) {
      if (edge.left.name === edge.right.name) {
        this.multigraph = true;
        return;
      }
      for (let jindex = +index + 1; jindex < this.edges.length; jindex++) {

        const j = this.edges[jindex];

        if (edge.left.name === j.left.name && edge.right.name === j.right.name) {
          this.multigraph = true;
          return;
        }
      }
    }
  }

  isCycle() {
    this.cycle = this.regular && this.connected && this.vertices[0].degree === 2;
  }

  isComplete() {
    if (this.regular && this.vertices[0].degree === this.vertices.length - 1) {
      this.complete = true;
    }
  }

  isConnected() {
    const n = this.vertices.length;
    let auxDegree;
    for (let i = 0; i < n; i++) {
      const degree = this.transitiveClosures[i].reduce((accumulator, currentValue) => accumulator + (currentValue ? 1 : 0), 0);
      if (auxDegree === undefined) {
        auxDegree = degree;
      } else if (auxDegree !== degree) {
        return;
      }
    }


    if (auxDegree === this.vertices.length) {
      this.connected = true;
    }
  }

  change(e) {
    const input = e.target;
    const files = input.files;
    if (files.length) {
      this.file = e.target.files[0];
    }
  }

  submit() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.recognize(fileReader.result as string);
    };
    fileReader.readAsText(this.file);
  }
}
