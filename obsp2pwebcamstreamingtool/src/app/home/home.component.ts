import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Receiver',
        link: './receiver',
        index: 0
      }, {
        label: 'Sender',
        link: './sender',
        index: 1
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      console.log(this.router.url);
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
