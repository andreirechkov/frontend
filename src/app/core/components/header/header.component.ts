import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/interface/user';

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
  public image: string = '';

  constructor(private auth: AuthService ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user: User) => {
      this.image = user?.person?.image;
    });
  }

  public logout(): void {
    this.auth.logout();
  }
}
