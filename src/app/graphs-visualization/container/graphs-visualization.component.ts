import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs-visualization',
  templateUrl: './graphs-visualization.component.html',
  styleUrls: ['./graphs-visualization.component.css']
})
export class GraphsVisualizationComponent implements OnInit {

  selected: string = 'Theory';
  constructor() { }

  ngOnInit(): void {
  }

  goToTheory() {
    this.selected = 'Theory';
  }

  goToVisualization() {
    this.selected = 'Visualization';
  }

  goToApplications() {
    this.selected = 'Applications';
  }

  signOut() {
    
  }
}
