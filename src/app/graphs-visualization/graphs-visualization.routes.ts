import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraphsVisualizationComponent } from './container/graphs-visualization.component';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: GraphsVisualizationComponent
      }
    ])
  ],
  exports: [RouterModule]
})

export class GraphsVisualizationRoutingModule {
}


