import { Component, HostListener, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { labyrinthsTemplates } from './labyrinthsTemplates';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  canvas: any;
  parent: any;
  canvasObjects: any;
  algorithmSelected: boolean = false;
  adjacencyList: Array<{ label: number, neighbours: Array<{ neighbour: any, weight : number }> }> = [];
  temporaryNeighboursCoords: Array<{ nghi: number, nghj: number }> = [];
  neighbours: Array<{ neighbour: any, weight : number  }> = [];

  startNode: any;
  finishNode: any;

  coloredNodesOrder: Array<Array<number>> = [[]];
  coloredPath: Array<number> = [];

  finishCenterX!: number;
  finishCenterY!: number;

  algorithmFinished = false;
  labyrinthGenerated = false;

  labyrinthsTemplates = labyrinthsTemplates;
  board!: Array<Array<number>>;

  // board = [
  //   [ -2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [ 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  //   [ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  //   [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
  //   [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  //   [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
  //   [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  //   [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
  //   [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
  //   [ 1, 0, 1, -1, 1, 1, 0, 0, 0, 0]
  // ];
  width!: number;
  height!: number;

  @HostListener('window:resize')
  onResize() {
    var width = this.parent.offsetWidth;
    var height = this.parent.offsetHeight;
    if(width) {
      width = width - 24;
    }
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
    this.width = width;
    this.height = height;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.parent = document.getElementById("canvasContainer");

    var width = this.parent?.offsetWidth;
    var height = this.parent?.offsetHeight;

    if(width) {
      width = width - 24;
    }

    this.canvas = new fabric.Canvas("canvasLabyrinth");
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
    this.width = width;
    this.height = height;
  }

  randomIntFromInterval(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateLabyrinth() {
    this.labyrinthGenerated = true;
    this.canvas.clear();
    this.adjacencyList = [];
    this.temporaryNeighboursCoords = [];
    this.neighbours = [];

    this.coloredNodesOrder = [[]];
    this.coloredPath = [];

    let index = this.randomIntFromInterval(0,4);
    this.board = labyrinthsTemplates[index];

    this.drawLabyrinth(this.board);
  }

  drawLabyrinth(board: Array<Array<number>>) {
    var blockWidth = this.width/(board.length);
    var blockHeight = this.height/((board.length))
    var squareLeft = -blockWidth;
    var squareTop = -blockHeight;

    let k: number = 0;
    for(let i = 0; i < board.length; i++){
      squareTop = squareTop + blockHeight;
      squareLeft = -blockWidth;
      for(let j = 0; j < board[i].length; j++){
        squareLeft = squareLeft + blockWidth;
        if(board[i][j] === 1){
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'black',
            label: k,
            coordi: i,
            coordj: j
          } as IRectExtented);
          this.canvas.add(square);
        }
        if(board[i][j] === 0) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'white',
            label: k,
            coordi: i,
            coordj: j
          } as IRectExtented);
          this.canvas.add(square);
        }
        if(board[i][j] === -1) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'yellow',
            label: k,
            coordi: i,
            coordj: j
          } as IRectExtented);
          this.canvas.add(square);
        }
        if(board[i][j] === -2) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'green',
            label: k,
            coordi: i,
            coordj: j
          } as IRectExtented);
          this.canvas.add(square);
        }
        k = k + 1;
      }
    }

    for(let nodeLabel=0; nodeLabel<k; nodeLabel++) {
      this.temporaryNeighboursCoords = []
      this.canvasObjects = this.canvas.getObjects();
      var nodeSelected = this.canvasObjects.find((node: { label: number; }) => node.label == nodeLabel);
      if(nodeSelected.fill !== 'black') {
        if(nodeSelected.coordi == 0 && nodeSelected.coordj == 0) {
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
        }
        if(nodeSelected.coordi == 0 && nodeSelected.coordj == board.length-1) {
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1});
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
        }
        if(nodeSelected.coordi == board.length-1 && nodeSelected.coordj == 0) {
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
        }
        if(nodeSelected.coordi == board.length-1 && nodeSelected.coordj == board.length-1) {
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1});
          this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
        }
        for(let i=1; i<board.length-1; i++) {
          if(nodeSelected.coordi == i && nodeSelected.coordj == 0) {
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
          }

          if(nodeSelected.coordi == i && nodeSelected.coordj == board.length-1) {
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
          }
        }
        for(let j=1; j<board.length-1; j++) {
          if(nodeSelected.coordi == 0 && nodeSelected.coordj == j) {
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1 });
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
          }

          if(nodeSelected.coordi == board.length-1 && nodeSelected.coordj == j) {
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
            this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
          }
        }
        for(let i=1; i<board.length-1; i++) {
          for(let j=1; j<board.length-1; j++) {
            if(nodeSelected.coordi == i && nodeSelected.coordj == j) {
              this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj-1});
              this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi, nghj: nodeSelected.coordj+1});
              this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi-1, nghj: nodeSelected.coordj});
              this.temporaryNeighboursCoords.push({nghi: nodeSelected.coordi+1, nghj: nodeSelected.coordj});
            }
          }
        }

        this.neighbours = [];
        for(let index=0; index<this.temporaryNeighboursCoords.length; index++) {
          var ngh = this.canvasObjects.find((node: { coordi: any; coordj: any; })  => (node.coordi == this.temporaryNeighboursCoords[index].nghi  && node.coordj == this.temporaryNeighboursCoords[index].nghj));
          if(ngh.fill !== 'black') {
            this.neighbours.push({neighbour: ngh, weight: 1});
          }
        }
        this.adjacencyList.push({label: nodeSelected.label, neighbours: this.neighbours})
      }
    }

    this.startNode = this.canvasObjects.find((node: { fill: string; }) => node.fill === 'yellow');
    this.finishNode = this.canvasObjects.find((node: { fill: string; }) => node.fill === 'green');
    this.finishCenterX = (this.finishNode.aCoords.bl.x + this.finishNode.aCoords.tr.x)/2;
    this.finishCenterY = (this.finishNode.aCoords.bl.y + this.finishNode.aCoords.tr.y)/2;
  }

  resolveWithA_star() {
    let finishNodeFound = false;
    this.algorithmSelected = true;

    let distance_f: Array<{ nodeLabel: number, distance : number, father:number }> = [];
    let open_list: number[] = [];
    let closed_list: number[] = [];
    let g: Array<{ nodeLabel: number, weight : number }> = [];
    let h: Array<{ nodeLabel: number, estimation : number }> = [];

    this.adjacencyList.forEach(el => {
      if(el.label != this.startNode.label) {
        open_list.push(el.label);
        var elCanvas = this.canvasObjects.find((node: { label: number; }) => node.label == el.label);
        const elCanvasX = (elCanvas.aCoords.bl.x + elCanvas.aCoords.tr.x)/2;
        const elCanvasY = (elCanvas.aCoords.bl.y + elCanvas.aCoords.tr.y)/2
        var d = Math.sqrt(Math.pow((this.finishCenterX-elCanvasX), 2) + Math.pow((this.finishCenterY-elCanvasY), 2));
        h.push({nodeLabel: el.label, estimation: d});
        g.push({nodeLabel: el.label, weight: 0});
      }
    });

    closed_list.push(this.startNode.label);
    let nodeInPath = this.startNode.label;
    let i = 0;

    while(open_list.length && finishNodeFound == false) {
      let nodeInList = this.adjacencyList.find(node => node.label == nodeInPath);
      let nodeExtensions = nodeInList?.neighbours;

      this.coloredNodesOrder[i] = [];
      nodeExtensions?.forEach(ext => {
        const elementInClosedListIndex = closed_list.findIndex(el => el == ext.neighbour.label);
          if(elementInClosedListIndex === -1) {
            const g_element = g.find(el => el.nodeLabel == ext.neighbour.label);
            const g_var = g_element!.weight + ext.weight;
            g_element!.weight = g_var;
            const h_var = h.find(el => el.nodeLabel == ext.neighbour.label)!.estimation;
            const d = g_var + h_var;
            const elementInDistance_fIndex = distance_f.findIndex(el => el.nodeLabel == ext.neighbour.label);
            if(elementInDistance_fIndex > -1) {
              if(d < distance_f[elementInDistance_fIndex].distance) {
                distance_f.splice(elementInClosedListIndex, 1);
                distance_f.push({nodeLabel: ext.neighbour.label, distance: d, father: nodeInPath});
              }
            } else {
              distance_f.push({nodeLabel: ext.neighbour.label, distance: d, father: nodeInPath});
            }
            this.coloredNodesOrder[i].push(ext.neighbour.label);
          }
        });

      distance_f.sort((a,b) => a.distance - b.distance);
      nodeInPath = distance_f[0].nodeLabel;
      closed_list.push(nodeInPath);
      distance_f.shift();

      if(nodeInPath == this.finishNode.label) {
        finishNodeFound = true;
      }

      const indexInOpenList = open_list.findIndex(el => el == nodeInPath);
      open_list.splice(indexInOpenList, 1);
      i = i + 1;
    }
    closed_list.shift();
    this.coloredPath = closed_list;
  }

  resolveWithDijkstra() {
    let finishNodeFound = false;
    this.algorithmSelected = true;

    let nodesToVisit: Array<{ node: number, dist: number }> = [];
    let distances: Array<{ node: number, distance: number }> = [];
    let visitedNode: any[] = [];

    this.adjacencyList.forEach(el => {
      if(el.label != this.startNode.label) {
        distances.push({node: el.label, distance: Number.MAX_VALUE});
      }
    });

    nodesToVisit.push({node: this.startNode.label, dist: 0});
    visitedNode.push(this.startNode.label);
    let i = 0;

    while(nodesToVisit.length && finishNodeFound == false) {
      let nodeInPath = nodesToVisit[0].node;
      let dist = nodesToVisit[0].dist;
      nodesToVisit.shift();
      this.coloredPath.push(nodeInPath);

      if(nodeInPath == this.finishNode.label) {
        finishNodeFound = true;
      }

      let nodeInList = this.adjacencyList.find(node => node.label == nodeInPath);
      let nodeExtensions = nodeInList?.neighbours;

      this.coloredNodesOrder[i] = [];
      nodeExtensions?.forEach(ext => {
        const elementVisitedIndex = visitedNode.findIndex(el => el == ext.neighbour.label);
        if(elementVisitedIndex === -1) {
          let distance_var = distances.find(el => el.node == ext.neighbour.label);
          if(dist + ext.weight < distance_var!.distance) {
            distance_var!.distance = dist + ext.weight;
          }
          nodesToVisit.push({node: distance_var!.node, dist: distance_var!.distance});
          visitedNode.push(distance_var!.node);
          this.coloredNodesOrder[i].push(distance_var!.node);
        }
      });

      nodesToVisit.sort((a,b) => a.dist- b.dist);

      i = i + 1;
    }
  }

  nextStep() {
    let nodeSelected = this.coloredPath[0];
    let pathNodes = this.coloredNodesOrder[0];
    this.coloredPath.shift();
    this.coloredNodesOrder.shift();

    pathNodes.forEach(_node => {
    var nodeToColor = this.canvasObjects.find((el: { label: number; }) => el.label == _node);
    nodeToColor.set('fill', 'grey');
    });

    var nodeToColor = this.canvasObjects.find((el: { label: number; }) => el.label == nodeSelected);
    nodeToColor.set('fill', '#14B8A6');

    this.canvas.renderAll();
    if(!this.coloredPath.length) {
      this.algorithmFinished = true;
    }
  }

  restartLabyrinth() {
    this.canvas.clear();
    this.adjacencyList = [];
    this.temporaryNeighboursCoords = [];
    this.neighbours = [];

    this.coloredNodesOrder = [[]];
    this.coloredPath = [];
    this.algorithmSelected = false;
    this.algorithmFinished = false;

    this.drawLabyrinth(this.board);
  }
}

interface IRectExtented extends fabric.IRectOptions {
  label: number;
  coordi: number;
  coordj: number;
}



