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
      name: 'Пользователи',
      link: '/users',
    },
    {
      name: 'Чат',
      link: '/chat-messages'
    },
    {
      name: 'Объявления',
      link: '/person'
    },
    {
      name: 'Карты',
      link: '/maps'
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
