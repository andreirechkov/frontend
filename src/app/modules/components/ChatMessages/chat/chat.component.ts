import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../shared/interface/user';
import { AuthService } from '../../../../shared/service/auth.service';
import { Subject } from 'rxjs';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Channel} from '../../../../shared/interface/channel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public star = faStar;
  public userChannel: object;
  public contactItem: Array<Channel> = [
    {
      status: 'online',
      name: 'Мария Выскребец',
      username: 'test',
      text: 'Hello everyone!',
      time: '15:00'
    },
    {
      status: 'busy',
      name: 'Frank Lampard',
      username: 'frank',
      text: 'Hello, I am is coach Chelsea',
      time: '21:00'
    },
  ];

  private destroy$ = new Subject();

  constructor(private api: AuthService,
              private router: Router) {}

  ngOnInit(): void {
  }

  public chatChannel(user: object): void {
    this.userChannel = user;
  }
}
