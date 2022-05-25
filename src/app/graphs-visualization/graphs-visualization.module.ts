import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsVisualizationRoutingModule } from './graphs-visualization.routes';
import { GraphsVisualizationComponent } from './container/graphs-visualization/graphs-visualization.component';

@NgModule({
  declarations: [
    GraphsVisualizationComponent
  ],
  imports: [
    CommonModule,
    GraphsVisualizationRoutingModule,
  ]
})
export class GraphsVisualizationModule { }
