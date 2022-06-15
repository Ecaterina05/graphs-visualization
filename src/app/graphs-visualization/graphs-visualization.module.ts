import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsVisualizationRoutingModule } from './graphs-visualization.routes';
import { GraphsVisualizationComponent } from './container/graphs-visualization.component';
import { TheoryComponent } from './components/theory/theory.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    GraphsVisualizationComponent,
    TheoryComponent,
    VisualizationComponent,
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    GraphsVisualizationRoutingModule,
    CardModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    SelectButtonModule,
    InputNumberModule,
    DropdownModule,
    FormsModule
  ]
})
export class GraphsVisualizationModule { }
