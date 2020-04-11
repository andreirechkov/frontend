import { Component, OnInit } from '@angular/core';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

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

  public arrowShow: boolean = true;
  public sideNavList = [
      {
        routerLink: '',
        icon: 'home',
        text: 'Home',
        roles: null,
        userLevel: null
      },
    {
        routerLink: '',
        icon: 'comments',
        text: 'Consulting',
        //roles: ['ROLE_VENDOR'],
        userLevel: null,
        arrow: 'angle-right',
        opened: false,
        submenu: [
          {
            routerLink: '',
            text: 'Completed',
          }
        ]
      },
      {
        routerLink: '',
        icon: 'file-signature',
        text: 'Enroll',
       // roles: ['ROLE_AGENT'],
        userLevel: null
      },
      {
        routerLink: '',
        icon: 'folder-open',
        text: 'Accounts',
       // roles: ['ROLE_AGENT'],
        userLevel: null
      },
      {
        routerLink: '',
        icon: 'users',
        text: 'Contacts',
       // roles: ['ROLE_AGENT'],
        userLevel: null
      },
      {
        icon: 'chart-bar',
        text: 'Reports',
        roles: null,
        userLevel: null,
        arrow: 'angle-right',
        opened: false,
        submenu: [
          {
            routerLink: '',
            text: 'Tickets',
          },
          {
            routerLink: '',
            text: 'By Account Owner',
          }
        ]
      },
      {
        routerLink: '',
        icon: 'cogs',
        text: 'Settings',
        roles: null,
        userLevel: null
      }
  ];

  constructor() { }

  ngOnInit() {
  }

  public showSubMenu(sideNav: any): void {
    this.hideSubMenu(sideNav);
    sideNav.opened = !sideNav.opened;
    sideNav.arrow = sideNav.opened ? 'angle-down' : 'angle-right';
  }

  public hideSubMenu(sideNav?: any): void {
    this.sideNavList = this.sideNavList.map(item => {
      if (item.opened && sideNav && item.text !== sideNav.text || item.opened && !sideNav) {
        item.opened = false;
        item.arrow = 'angle-right';
      }
      return item;
    })
  }

  public toggle(): void {
    this.arrowShow = !this.arrowShow;
    //this.document.body.classList.toggle('collapsed');
  }
}
