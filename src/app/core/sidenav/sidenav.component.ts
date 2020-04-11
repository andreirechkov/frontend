import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public sideNav = [];

  constructor() { }

  ngOnInit() {
    this.sideNav = [
      {
        name: 'Your team',
        single: true,
        icon: 'fa-users',
        link: ['/users-list'],
      },
      {
        name: 'Write a new update',
        single: true,
        icon: 'fa-calendar-plus-o',
        link: ['/update'],
        permissions: 'projects:participant',
      },
      {
        name: 'Search a developer',
        single: true,
        icon: 'fa-address-card',
        link: ['/search'],
      },
      {
        name: 'Calendars',
        single: true,
        icon: 'fa-calendar',
        link: ['/calendar'],
      },
      {
        name: 'Free for sales',
        single: true,
        icon: 'fa-child',
        permissions: 'users:busy',
        link: ['/free-for-sales'],
      }];
  }

}
