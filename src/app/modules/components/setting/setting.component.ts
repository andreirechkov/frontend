import { Component, OnInit } from '@angular/core';
import {faCog, faComments, faEnvelope, faFlag, faHome, faMale, faMapSigns, faMars, faUsers} from '@fortawesome/free-solid-svg-icons';
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public sideNavList = [
    {
      name: 'Имя',
      icon: faEnvelope,
      text: 'Андрей'
    },
    {
      name: 'Фамилия',
      icon: faMars,
      text: 'Речков'
    },
    {
      name: 'Отчество',
      icon: faFlag,
      text: 'Леонидович'
    },
    {
      name: 'Почта',
      icon: faMapSigns,
      text: 'andrey.rechkov@roonyx.tech'
    },
    {
      name: 'Тип',
      icon: faCog,
      text: 'Админ'
    },
    {
      name: 'Поиск',
      icon: faMapSigns,
      text: 'Неизвестно'
    },
    {
      name: 'Город',
      icon: faCog,
      text: 'Ростов'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
