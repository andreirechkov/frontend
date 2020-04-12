import { Component, OnInit } from '@angular/core';
import {faComments, faHome, faMapSigns, faQuestion, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public sideNavList = [
    {
      name: 'Главная',
      icon: faHome,
      link: '/home'
    },
    {
      name: 'Чат сообщений',
      icon: faComments,
      link: '/chat-messages'
    },
    {
      name: 'Подбор персонала',
      icon: faUsers,
      link: '/home'
    },
    {
      name: 'Карты',
      icon: faMapSigns,
      link: '/home'
    },
    {
      name: '????',
      icon: faQuestion,
      link: '/home'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
