import {Component, Inject, OnInit} from '@angular/core';
import {faCog, faComments, faHome, faMapSigns, faQuestion, faUsers} from '@fortawesome/free-solid-svg-icons';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '200px',
          opacity: '1',
          display: 'block'
        })
      ),
      state(
        'out',
        style({
          width: '0px',
          opacity: '0',
          display: 'none'
        })
      ),
      transition('in => out', [
        group([
          animate(
            '100ms ease-in-out',
            style({
              opacity: '0'
            })
          ),
          animate(
            '100ms ease-in-out',
            style({
              width: '0px'
            })
          ),
          animate(
            '100ms ease-in-out',
            style({
              display: 'none'
            })
          )
        ])
      ]),
      transition('out => in', [
        group([
          animate(
            '1ms ease-in-out',
            style({
              display: 'block'
            })
          ),
          animate(
            '100ms ease-in-out',
            style({
              width: '100%'
            })
          ),
          animate(
            '100ms ease-in-out',
            style({
              opacity: '1'
            })
          )
        ])
      ])
    ]),
    trigger('openClose', [
      state('true', style({ height: '*' , opacity: '1', visibility: 'visible'})),
      state('false', style({ height: '0px', opacity: '0',  visibility: 'hidden'})),
      transition('false <=> true', animate('150ms'))
    ])
  ]
})
export class SidenavComponent implements OnInit {

  public braodSideBar = true;

  public sideNavList = [
    {
      name: 'Главная',
      icon: faHome,
      link: '/home',
      opened: false,
      arrow: 'angle-right',
    },
    {
      name: 'Чат',
      icon: faComments,
      link: '/chat-messages'
    },
    {
      name: 'Персонал',
      icon: faUsers,
      link: '/person'
    },
    {
      name: 'Карты',
      icon: faMapSigns,
      link: '/maps'
    },
    {
      name: 'Настройки',
      icon: faCog,
      link: '/setting'
    }
  ];

  public arrowShow: boolean = true;

  constructor( @Inject(DOCUMENT) private document: Document,) { }

  ngOnInit() {
  }

  public showSubMenu(sideNav: any): void {
    this.hideSubMenu(sideNav);
    sideNav.opened = !sideNav.opened;
    sideNav.arrow = sideNav.opened ? 'angle-down' : 'angle-right';
  }

  public hideSubMenu(sideNav?: any): void {
    this.sideNavList = this.sideNavList.map(item => {
      if (item.opened && sideNav && item.name !== sideNav.text || item.opened && !sideNav) {
        item.opened = false;
        item.arrow = 'angle-right';
      }
      return item;
    })
  }

  public toggle(): void {
    console.log('+');
    this.arrowShow = !this.arrowShow;
    //this.document.body.classList.toggle('collapsed');
  }
}
