import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public sideNavList = [
    {
      name: 'Главная',
      link: '/home',
    },
    {
      name: 'Чат',
      link: '/chat-messages'
    },
    {
      name: 'Персонал',
      link: '/person'
    },
    {
      name: 'Карты',
      link: '/maps'
    },
    {
      name: 'Настройки',
      link: '/setting'
    }
  ];

  constructor(
    private auth: AuthService ) { }

  ngOnInit(): void {}

  public logout(): void {
    this.auth.logout();
  }

}
