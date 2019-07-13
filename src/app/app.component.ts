import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import Vertex from './models/vertex';
import Edge from './models/edge';
import Graph from './models/graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  file: any;

  rawMatrix: string;

  graph = new Graph('main');

  ngOnInit() {
    // aleatorio
    // this.recognize(`a - b\na - d\nb - c\nb - d\nc - c\nc - d`);
    // ciclo
    // this.recognize('a 5 b, b 4 c, c 7 d, d 10 a');
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

      let left = this.graph.findVertexByName(leftName);

      if (!left) {
        left = new Vertex(leftName);

        this.graph.addVertex(left);
      }

      let right = this.graph.findVertexByName(rightName);

      if (!right) {
        right = new Vertex(rightName);

        this.graph.addVertex(right);
      }

      this.graph.addEdge(new Edge(left, right, +weight));
    }

    // const spanningTree = this.graph.getMinimumSpanningTree();

    // console.log(spanningTree);
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
