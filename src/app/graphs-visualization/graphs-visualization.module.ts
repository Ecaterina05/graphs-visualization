import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsVisualizationRoutingModule } from './graphs-visualization.routes';
import { GraphsVisualizationComponent } from './container/graphs-visualization.component';
import { TheoryComponent } from './components/theory/theory.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { SavedComponent } from './components/saved/saved.component';

@NgModule({
  declarations: [
    GraphsVisualizationComponent,
    TheoryComponent,
    VisualizationComponent,
    ApplicationsComponent,
    SavedComponent
  ],
  imports: [
    CommonModule,
    GraphsVisualizationRoutingModule,
  ]
})
export class GraphsVisualizationModule { }
