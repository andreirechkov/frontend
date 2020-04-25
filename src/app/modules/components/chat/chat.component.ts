import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../shared/service/websocket.service';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/interface/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public user: User;

  public destroy$ = new Subject();

  constructor(private webSocket: WebsocketService,
              private api: AuthService) {}

  ngOnInit(): void {
    this.api.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: User) => {
      this.user = res;
    });
    this.webSocket.connect();
  }

  public sendMessage() {
    this.webSocket.socketRef.send(JSON.stringify({
      'command': 'new_message',
      'message': this.message,
      'from': this.user.username
    }));
    this.message = '';
  }
}
