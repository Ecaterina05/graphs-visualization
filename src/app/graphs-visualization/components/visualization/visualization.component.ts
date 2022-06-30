import { Component, HostListener, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { AlgorithmsService } from '../common/algorithms.service';
import { Node } from '../common/node.model';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  canvas: any;
  parent: any;
  canvasObjects: any;
  canvasNodes: any[] = [];
  previousCanvasNodes: any[] = [];
  canvasLinks: any[] = [];

  linkType = '';
  readyToAddLink = false;
  readyToFinishGraph = false;
  value1: number | undefined;
  value2: number | undefined ;
  pondere: number | undefined;

  nodesArray: Node[] = [];
  adjacencyList: Array<Array<{ label: number, weight: number }>> = [[]];
  coloredNodesOrder: Array<Array<number>> = [[]];
  coloredPath:  Array<number> = [];

  leftNode!: number;
  topNode!: number;

  nodesNumer: number = 0;

  selectedGraphType = '';
  selectedGraphType2 = '';
  selectedAlgorithm!: Algorithm;

  graphTypes: any[];
  graphTypes2: any[];
  var1_algorithms: Algorithm[];
  var2_algorithms: Algorithm[];
  algorithms: Algorithm[] = [];

  finishedGraphDrawing = false;
  algorithmStarted = false;
  reachNextStep = false;
  algorithmFinished = false;
  alertNegativeWeights = false;
  displayNegativeWeightsError = false;

  bfsVisualizationStarted = false;
  dfsVisualizationStarted = false;
  dijkstraVisualizationStarted = false;
  bfVisualizationStarted = false;

  startNode: number | undefined;
  finishNode: number | undefined;

  nodesAdded: string = '';
  nodesToAdd: string = '';
  nodesPath: string = '';

  @HostListener('window:resize')
  onResize() {
    var width = this.parent.offsetWidth;
    var height = this.parent.offsetHeight;
    if(width) {
      width = width - 24;
    }
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }

  constructor(private algorithmsService: AlgorithmsService) {
    this.graphTypes = [
      { name: 'neorientat', value: 'neorientat' },
      { name: 'orientat', value: 'orientat' }
    ];

    this.graphTypes2 = [
      { name: 'neponderat', value: 'neponderat' },
      { name: 'ponderat', value: 'ponderat' }
    ];

    this.var1_algorithms = [
      { name: 'BFS' , code: 1},
      { name: 'DFS', code: 2}
    ];

    this.var2_algorithms = [
      { name: 'Dijkstra' , code: 1},
      { name: 'Bellman-Ford' , code: 2}
    ]
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.parent = document.getElementById("canvasContainer");

    var width = this.parent?.offsetWidth;
    var height = this.parent?.offsetHeight;

    if(width) {
      width = width - 24;
    }

    this.canvas = new fabric.Canvas("canvas");
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }

  changedGraphType() {
    if(this.selectedGraphType === "neorientat") {
      this.linkType = "Adaugă muchie:"
    } else {
      this.linkType = "Adaugă arc:"
    }
  }

  randomIntFromInterval(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addNode() {
    this.nodesNumer++;
    this.adjacencyList[this.nodesNumer] = [];
    var nodeNumber = this.nodesNumer.toString();

    var left = this.randomIntFromInterval(1,791);
    var top = this.randomIntFromInterval(1,473);

    this.nodesArray.forEach(node => {
      if(Math.abs(node.left - left) <= 61) {
        left = left + 61;
      }
      if(Math.abs(node.top - top) <= 61) {
        top = top + 61;
      }
    });

    this.leftNode = left;
    this.topNode = top;

    var circle = new fabric.Circle({
      radius: 30,
      fill: 'white',
      stroke: '#14B8A6',
      originX: 'center',
      originY: 'center',
    });

    var text = new fabric.Text(nodeNumber, {
      fontSize: 30,
      originX: 'center',
      originY: 'center'
    });

    var group = new fabric.Group([ circle, text ], {
      left: this.leftNode,
      top: this.topNode,
      selectable: false,
      id: this.nodesNumer
    } as IGroupWithId
    );

    this.nodesArray.push({
      left: this.leftNode,
      top: this.topNode,
      label: this.nodesNumer,
      color: 'white',
      coordonates: group.oCoords
    });

    this.canvas.add(group);

    if(this.canvas.getObjects().length == 2) {
      this.readyToAddLink = true;
    }
  }

  addLink() {
    var x1_arrow, y1_arrow, x2_arrow, y2_arrow;
    var x1, y1, x2, y2;
    var first_node = this.nodesArray.find(node => node.label == this.value1);
    var second_node = this.nodesArray.find(node => node.label == this.value2);

    if(Math.abs(first_node!.left - second_node!.left) < 100 && Math.abs(first_node!.top - second_node!.top) > 100) {
      if(first_node!.top < second_node!.top) {
        x1 = first_node?.coordonates.mb.x;
        y1 = first_node?.coordonates.mb.y;
        x2 = second_node?.coordonates.mt.x;
        y2 = second_node?.coordonates.mt.y;
        x1_arrow = x1;
        y1_arrow = y1;
        x2_arrow = x2;
        y2_arrow = y2;
      } else {
        x1 = second_node?.coordonates.mb.x;
        y1 = second_node?.coordonates.mb.y;
        x2 = first_node?.coordonates.mt.x;
        y2 = first_node?.coordonates.mt.y;
        x1_arrow = x2;
        y1_arrow = y2;
        x2_arrow = x1;
        y2_arrow = y1;
      }
    } else {
      if(first_node!.left < second_node!.left) {
        x1 = first_node?.coordonates.mr.x;
        y1 = first_node?.coordonates.mr.y;
        x2 = second_node?.coordonates.ml.x;
        y2 = second_node?.coordonates.ml.y;
        x1_arrow = x1;
        y1_arrow = y1;
        x2_arrow = x2;
        y2_arrow = y2;
      } else {
        x1 = second_node?.coordonates.mr.x;
        y1 = second_node?.coordonates.mr.y;
        x2 = first_node?.coordonates.ml.x;
        y2 = first_node?.coordonates.ml.y;
        x1_arrow = x2;
        y1_arrow = y2;
        x2_arrow = x1;
        y2_arrow = y1;
      }
    }

    if(!this.pondere) {
      this.pondere = 0;
    }

    var line = new fabric.Line([x1, y1, x2, y2], {
      stroke: 'black',
      strokeWidth : 2,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      evented: false,
      hoverCursor: 'default',
      id: {source: first_node?.label, target: second_node?.label},
      weight: this.pondere
    } as ILineWithId);

    if(this.selectedGraphType === 'neorientat') {
      this.canvas.add(line);
      this.adjacencyList[first_node!.label].push({label: second_node!.label, weight: this.pondere});
      this.adjacencyList[second_node!.label].push({label: first_node!.label, weight: this.pondere});
    } else {
      this.adjacencyList[first_node!.label].push({label: second_node!.label, weight: this.pondere});

      let dx = x2_arrow - x1_arrow,
          dy = y2_arrow - y1_arrow;

      let angle = Math.atan2(dy, dx);
      angle *= 180 / Math.PI;
      angle += 90;

      var triangle = new fabric.Triangle({
        originX: 'center',
        originY: 'center',
        stroke: 'black',
        width: 10,
        height: 15,
        fill: 'black',
        top: y2_arrow,
        left: x2_arrow,
        angle: angle
      });

      var arrowGroup = new fabric.Group([ line, triangle], {
        selectable: false,
        id: {source: first_node?.label, target: second_node?.label},
        weight: this.pondere
      } as ILineGroupWithId);

      this.canvas.add(arrowGroup);
    }

    if(this.selectedGraphType2 === 'ponderat') {
      var x_text = (x1+x2) / 2;
      var y_text = (y1+y2) / 2;
      if(this.pondere) {
        var weightText = this.pondere.toString();
        var weight = new fabric.Text(weightText, {
          fill: 'black',
          left: x_text,
          top: y_text,
          fontSize: 20
        });
        this.canvas.add(weight);
      }
    }

    this.value1 = undefined;
    this.value2 = undefined;
    this.pondere = undefined;
    this.readyToFinishGraph = true;
  }

  finishGraphDrawing() {
    this.finishedGraphDrawing = true;
    if(this.selectedGraphType2 === 'neponderat') {
      this.algorithms = this.var1_algorithms;
    } else {
      this.algorithms = this.var2_algorithms;
    }
  }

  selectAlgorithm() {
    this.algorithmStarted = true;
  }

  startAlgorithm() {
    this.displayNegativeWeightsError = false;
    this.canvasObjects = this.canvas.getObjects();
    this.canvasObjects.forEach((canvasObject: { id: any; }) => {
      if(typeof canvasObject.id === 'number') {
        this.canvasNodes.push(canvasObject);
      } else {
        this.canvasLinks.push(canvasObject);
      }
    });
    this.canvasLinks.forEach(link => {
      if(link.weight < 0) {
        this.alertNegativeWeights = true;
      }
    })
    if(this.startNode) {
      if(this.selectedAlgorithm.name === 'BFS') {
        this.coloredNodesOrder = this.algorithmsService.BFS(this.adjacencyList, this.startNode);
      }
      if(this.selectedAlgorithm.name === 'DFS') {
        this.coloredNodesOrder = this.algorithmsService.DFS(this.adjacencyList, this.startNode);
      }
      if(this.selectedAlgorithm.name === 'Dijkstra' && this.alertNegativeWeights == true) {
        this.displayNegativeWeightsError = true;
        return;
      }
      if(this.selectedAlgorithm.name === 'Dijkstra' && this.finishNode) {
        const arrayReceived: any[] = this.algorithmsService.Dijkstra(this.adjacencyList, this.startNode, this.finishNode);
        this.coloredNodesOrder = arrayReceived[0];
        this.coloredPath = arrayReceived[1];
      }
      if(this.selectedAlgorithm.name === 'Bellman-Ford' && this.finishNode) {
        this.coloredNodesOrder = this.algorithmsService.BF(this.adjacencyList, this.startNode, this.finishNode);
      }
      var node = this.canvasNodes.find(node => node.id == this.startNode);
      node._objects[0].set('fill', '#14B8A6');
      this.previousCanvasNodes.push(node);
      this.canvas.renderAll();
    }
    this.algorithmStarted = false;
    this.reachNextStep = true;

    if(this.selectedAlgorithm.name === 'BFS') {
      this.bfsVisualizationStarted = true;
      this.nodesAdded = this.startNode + '';
      this.nodesToAdd = this.startNode + '';
    }

    if(this.selectedAlgorithm.name === 'DFS') {
      this.dfsVisualizationStarted = true;
      this.nodesAdded = this.startNode + '';
      this.nodesToAdd = this.startNode + '';
    }

    if(this.selectedAlgorithm.name === 'Dijkstra') {
      this.dijkstraVisualizationStarted = true;
      this.nodesAdded = this.startNode + '';
      this.nodesToAdd = this.startNode + '';
      var arr = this.coloredPath.reverse();
      this.nodesPath = arr + '';
    }

    if(this.selectedAlgorithm.name === 'Bellman-Ford') {
      this.bfVisualizationStarted = true;
      this.nodesAdded = this.startNode + '';
      this.nodesToAdd = this.startNode + '';
    }
  }

  nextStep() {
    if(this.coloredNodesOrder.length) {
      this.previousCanvasNodes.forEach(node => {
        node._objects[0].set('fill', '#D3D3D3');
      });
      var nodesToColor = this.coloredNodesOrder[0];
      this.nodesAdded = this.nodesAdded + ',' + this.coloredNodesOrder[0];
      this.nodesToAdd = this.coloredNodesOrder[0] + '';
      this.coloredNodesOrder.shift();
      nodesToColor.forEach(_node => {
        var nodeToColor = this.canvasNodes.find(node => node.id == _node);
        nodeToColor._objects[0].set('fill', '#14B8A6');
        this.previousCanvasNodes.push(nodeToColor);
      });
    } else {
      this.previousCanvasNodes.forEach(node => {
        node._objects[0].set('fill', '#D3D3D3');
      });
      this.algorithmFinished = true;
      if(this.coloredPath.length) {
        this.coloredPath.forEach(_node => {
          var nodeToColor = this.canvasNodes.find(node => node.id == _node);
          nodeToColor._objects[0].set('fill', '#ffcc00');
        })
      }
      this.nodesToAdd = 'Nodurile au fost parcurse';
    }
    this.canvas.renderAll();
  }

  restartVisualization() {
    this.canvas.clear();
    this.selectedGraphType = '';
    this.selectedGraphType2 = '';
    this.finishedGraphDrawing = false;
    this.algorithmStarted = false;
    this.reachNextStep = false;
    this.algorithmFinished = false;
    this.alertNegativeWeights = false;
    this.displayNegativeWeightsError = false;
    this.bfsVisualizationStarted = false;
    this.dfsVisualizationStarted = false;
    this.dijkstraVisualizationStarted = false;
    this.bfVisualizationStarted = false;
    this.readyToAddLink = false;
    this.readyToFinishGraph = false;
    this.nodesAdded = '';
    this.nodesToAdd = '';
    this.nodesPath = '';
    this.nodesNumer = 0;
    this.nodesArray = [];
    this.adjacencyList = [[]];
    this.coloredNodesOrder = [[]];
    this.canvasLinks = [];
    this.canvasNodes = [];
    this.previousCanvasNodes = [];
    this.coloredPath = [];
    this.value1 = undefined;
    this.value2 = undefined ;
    this.pondere = undefined;
    this.startNode = undefined;
    this.finishNode = undefined;
    this.selectedAlgorithm = {name: '', code: -1};
  }
}

interface IGroupWithId extends
fabric.IGroupOptions {
  id: number;
}

interface ILineWithId extends
fabric.ILineOptions {
  id: {source: number, target: number};
  weight: number;
}

interface ILineGroupWithId extends
fabric.IGroupOptions {
  id: {source: number, target: number};
  weight: number;
}

interface Algorithm {
  name: string,
  code: number
}
