import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth.service';
import { Subject } from 'rxjs';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Channel } from '../../../../shared/interface/channel';
import {User} from '../../../../shared/interface/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public star = faStar;
  public userChannel: object;
  public user: User;
  public contactItem: Array<Channel> = [];

  private destroy$ = new Subject();

  constructor(private api: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.api.getUser().subscribe((res: User) => {
      this.user = res;
      this.api.getChannel(this.user.username).subscribe(res => {
        res.forEach(channel => {
          const test = {
            id: channel.id,
            status: 'online',
            name: `test`,
            username: 'test',
            text: 'Hello everyone!',
            time: '15:00'
          }
          this.contactItem.push(test);
        })
      })
    })
  }

  public addContact(): void {
    const newChannel = {
      messages: [],
      participants: ['firstep', 'Leonid'],

    }
    this.api.addContactChannel(newChannel).subscribe(res => {},
      error => console.log(error));
  }

  public chatChannel(user: object): void {
    this.userChannel = user;
  }
}
