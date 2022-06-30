import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TheoryComponent } from './graphs-visualization/components/theory/theory.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';

import { HttpClientModule } from  '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CanActivateMainRouteGuard } from './can-activate-main-route.guard';

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
    ToastModule,
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
        canActivate: [CanActivateMainRouteGuard],
        loadChildren: () => import('src/app/graphs-visualization/graphs-visualization.module').then(mod => mod.GraphsVisualizationModule)
      },
      {
        path: 'theory',
        component: TheoryComponent
      },
    ])
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}


