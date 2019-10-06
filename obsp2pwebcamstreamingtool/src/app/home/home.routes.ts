import { Routes } from '@angular/router';
import { HomeComponent } from "./home.component";
import { ReceiverComponent } from "./receiver/receiver.component";
import { SenderComponent } from "./sender/sender.component";

export const HomeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children:[
      {path: '', redirectTo: 'receiver', pathMatch: 'full'},
      { path: 'receiver', component:  ReceiverComponent},
      { path: 'sender', component:  SenderComponent},
    ]
  },
];
