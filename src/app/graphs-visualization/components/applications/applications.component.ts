import { Component, HostListener, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  canvas: any;
  parent: any;

  board = [
    [ -2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [ 1, 0, 1, -1, 1, 1, 0, 0, 0, 0]
  ];

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

    var blockWidth = width/(this.board.length);
    var blockHeight = height/((this.board.length))
    var squareLeft = -blockWidth;
    var squareTop = -blockHeight;

    for(let i = 0; i < this.board.length; i++){
      squareTop = squareTop + blockHeight;
      squareLeft = -blockWidth;
      for(let j = 0; j < this.board[i].length; j++){
        squareLeft = squareLeft + blockWidth;
        if(this.board[i][j] === 1){
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'black',
          });
          this.canvas.add(square);
        }
        if(this.board[i][j] === 0) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'white',
          });
          this.canvas.add(square);
        }
        if(this.board[i][j] === -1) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'yellow',
          });
          this.canvas.add(square);
        }
        if(this.board[i][j] === -2) {
          var square = new fabric.Rect({
            selectable: false,
            top: squareTop,
            left: squareLeft,
            width: blockWidth,
            height: blockHeight,
            fill: 'green',
          });
          this.canvas.add(square);
        }
      }
    }

    console.log(this.canvas.getObjects());
  }
}

