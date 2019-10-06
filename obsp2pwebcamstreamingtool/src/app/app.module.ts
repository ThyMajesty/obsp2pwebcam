import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routes";
import { HomeModule } from "./home/home.module";
import { MatTabsModule, MatToolbarModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      AppRoutes,
      {enableTracing: false}
    ),
    BrowserAnimationsModule,

    MatToolbarModule,
    MatTabsModule,

    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
