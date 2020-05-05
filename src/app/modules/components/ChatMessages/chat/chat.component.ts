import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth.service';
import { Subject } from 'rxjs';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Channel } from '../../../../shared/interface/channel';
import { User } from '../../../../shared/interface/user';
import { takeUntil } from 'rxjs/operators';
import {element} from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public star = faStar;
  public userChannel: object;
  public user: any;
  public userAll = [];
  public dropMenu = [];
  public contactItem: Array<Channel> = [];

  private destroy$ = new Subject();
  public selected: any;

  constructor(private api: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.api.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: User) => {
      this.user = res;
      this.api.getUserAll()
        .pipe(takeUntil(this.destroy$))
        .subscribe(allUser => {
        this.userAll = allUser;
        this.api.getChannel(this.user.username)
          .pipe(takeUntil(this.destroy$))
          .subscribe(res => {
          res.forEach(channel => {
            if (channel.participants[0] !== this.user.username) {
              this.userAll.forEach(item => {
                if (item.username === channel.participants[0]) {
                  const test = {
                    id: channel.id,
                    image: item.person.image,
                    status: 'online',
                    name: `${ item.person.firstName} ${ item.person.lastName}`,
                    username: 'test',
                    text: 'Hello everyone!',
                    time: '15:00'
                  }
                  this.contactItem.push(test);
                }
              })
            } else if (channel.participants[1] !== this.user.username) {
              this.userAll.forEach(item => {
                if (item.username === channel.participants[1]) {
                  const test = {
                    id: channel.id,
                    image: item.person.image,
                    status: 'online',
                    name: `${item.person.firstName} ${item.person.lastName}`,
                    username: 'test',
                    text: 'Hello everyone!',
                    time: '15:00'
                  }
                  this.contactItem.push(test);
                }
              })
            }
          })
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addContact(addUser: any): void {
    const body = {
      messages: [],
      participants: [this.user.username, addUser[0].username]
    }
    this.api.addContactChannel(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {},
      error => console.log(error));
  }

  public chatChannel(user: object): void {
    this.userChannel = user;
  }
}
