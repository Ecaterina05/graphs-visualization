import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';

import { HttpClientModule } from  '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TheoryComponent } from './graphs-visualization/components/theory/theory.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent],
  imports: [
    HttpClientModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'graphs-visualization',
        loadChildren: () => import('src/app/graphs-visualization/graphs-visualization.module').then(mod => mod.GraphsVisualizationModule)
      },
      {
        path: 'theory',
        component: TheoryComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


