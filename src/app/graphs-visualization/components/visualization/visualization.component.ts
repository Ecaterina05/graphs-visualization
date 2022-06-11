import { Component, HostListener, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Node } from '../common/node.model';

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
  value1: number | undefined;
  value2: number | undefined ;
  pondere: number | undefined;

  nodesArray: Node[] = [];

  leftNode!: number;
  topNode!: number;

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

  changedGraphType2() {
    console.log(this.selectedGraphType2);
  }

  getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
  }

  randomIntFromInterval(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addNode() {
    this.nodesNumer++;
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

    var line = new fabric.Line([x1, y1, x2, y2], {
      stroke: 'black',
      strokeWidth : 2,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      evented: false,
      hoverCursor: 'default'
    });

    if(this.selectedGraphType === 'neorientat') {
      this.canvas.add(line);
    } else {
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
        selectable: false
      });

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
  }

  getCanvasElements() {
    this.canvas.getObjects()[0]._objects[0].set('fill', '#b30000');
    this.canvas.renderAll();
  }
}
