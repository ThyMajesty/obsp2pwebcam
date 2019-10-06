import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from "@angular/router";
import { HomeRoutes } from "./home.routes";
import { MatTabsModule } from "@angular/material/tabs";
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';



@NgModule({
  declarations: [HomeComponent, ReceiverComponent, SenderComponent],
  imports: [
    CommonModule,
    MatTabsModule,

    RouterModule.forChild(HomeRoutes)
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
