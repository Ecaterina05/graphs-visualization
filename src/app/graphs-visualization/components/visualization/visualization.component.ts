import { Component, HostListener, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  canvas: any;
  parent: any;
  linkType = '';
  readyToAddLink = false;
  value1: any;
  value2: any;

  leftNode: number = 150;
  topNode: number = 100;

  nodesNumer: number = 0;

  selectedGraphType = '';
  selectedGraphType2 = '';

  graphTypes: any[];
  graphTypes2: any[];

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

  constructor() {
    this.graphTypes = [
      { name: 'neorientat', value: 'neorientat' },
      { name: 'orientat', value: 'orientat' }
    ];

    this.graphTypes2 = [
      { name: 'neponderat', value: 'neponderat' },
      { name: 'ponderat', value: 'ponderat' }
    ];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.parent = document.getElementById("canvasContainer")

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

  changedGraphType2() {
    console.log(this.selectedGraphType2);
  }

  getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

  addNode() {
    this.nodesNumer++;
    var nodeNumber = this.nodesNumer.toString();

    // this.leftNode = this.leftNode + 150;
    // this.topNode = this.topNode + 100;

    var circle = new fabric.Circle({
      radius: 30,
      fill: '#ccfff5',
      stroke: '#14B8A6',
      originX: 'center',
      originY: 'center'
    });

    var text = new fabric.Text(nodeNumber, {
      fontSize: 30,
      originX: 'center',
      originY: 'center'
    });

    var group = new fabric.Group([ circle, text ], {
      left: this.leftNode,
      top: this.topNode,
      selectable: false
    });

    this.canvas.add(group);

    if(this.canvas.getObjects().length == 2) {
      this.readyToAddLink = true;
    }

    this.leftNode = this.leftNode + 150;
  }

  addLink() {
    var objects = this.canvas.getObjects();
    console.log(objects);

    var line = new fabric.Line([objects[0].oCoords.mr.x, objects[0].oCoords.mr.y, objects[1].oCoords.ml.x, objects[1].oCoords.ml.y], {
      stroke: 'black',
      strokeWidth : 5,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      evented: false,
      hoverCursor: 'default'
    });

    this.canvas.add(line);

    // this.canvas.beginPath();
    // this.canvas.moveTo(objects[0].lineCoords.tr.x, objects[0].lineCoords.tr.y);
    // this.canvas.lineTo(objects[1].lineCoords.tr.x, objects[1].lineCoords.tr.y);
    // this.canvas.strokeStyle = "#aaa";
    // this.canvas.stroke();

    // this.canvas.add(new fabric.Line([50, 100, 200, 200], {
    //   left: 170,
    //   top: 150,
    //   stroke: 'red'
    // }));
  }

  getCanvasElements() {
    console.log(this.canvas.getObjects()[0]);
    this.canvas.getObjects()[0]._objects[0].set('fill', '#b30000');
    this.canvas.renderAll();
  }
}
