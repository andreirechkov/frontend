import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../shared/service/websocket.service';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/interface/user';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from '../../../shared/interface/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public message: string = '';
  public wsSubscription: Subscription;
  public user: User;

  private destroy$ = new Subject();

  constructor(private wsService: WebsocketService,
              private api: AuthService) {
    this.wsSubscription =
      this.wsService.createObservableSocket("ws://localhost:8000/ws/chat/test/")
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          ev => {
            const data: Message = JSON.parse(ev);
            if (data.messages) data.messages.reverse();

            this.api.getUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: User) => {
              this.user = res;
              if (data['command'] === 'messages') {
                data.messages.forEach(element => {
                  this.createMessage(element);
                });
              } else if (data['command'] === 'new_message'){
                this.createMessage(data['message']);
              }
            });
          },
              err => console.log( 'err'),
          () =>  console.log( 'The observable stream is complete')
        );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createMessage(data): void {
    const author = data['author'];
    const msgListTag = document.createElement('li');
    const imgTag = document.createElement('img');
    const pTag = document.createElement('p');
    pTag.textContent = data.content;
    imgTag.src = 'http://emilcarlsson.se/assets/mikeross.png';
    if (author === this.user.username) {
      msgListTag.className = 'replies';
      msgListTag.style.display = 'inline-block'
      msgListTag.style.clear = 'both';
      msgListTag.style.float = 'right';
      msgListTag.style.margin = '15px 15px 5px 15px';
      msgListTag.style.width = 'calc(100% - 25px)';
      msgListTag.style.fontSize = '0.9em';

      imgTag.style.width = '22px';
      imgTag.style.borderRadius = '50%';
      imgTag.style.float = 'right';
      imgTag.style.margin = '6px 8px 0 0';

      pTag.style.background = '#f5f5f5';
      pTag.style.color = '#000000';
      pTag.style.maxWidth = '205px';
      pTag.style.display = 'inline-block';
      pTag.style.padding = '10px 15px';
      pTag.style.borderRadius = '20px';
      pTag.style.lineHeight = '130%';
      pTag.style.float = 'right';
    } else {
      msgListTag.className = 'sent';
      msgListTag.style.display = 'inline-block'
      msgListTag.style.clear = 'both';
      msgListTag.style.float = 'left';
      msgListTag.style.margin = '15px 15px 5px 15px';
      msgListTag.style.width = 'calc(100% - 25px)';
      msgListTag.style.fontSize = '0.9em';

      imgTag.style.width = '22px';
      imgTag.style.borderRadius = '50%';
      imgTag.style.float = 'left';
      imgTag.style.margin = '6px 8px 0 0';

      pTag.style.background = '#435f7a';
      pTag.style.color = '#f5f5f5';
      pTag.style.maxWidth = '205px';
      pTag.style.display = 'inline-block';
      pTag.style.padding = '10px 15px';
      pTag.style.borderRadius = '20px';
      pTag.style.lineHeight = '130%';
      pTag.style.float = 'left';
    }
    msgListTag.appendChild(imgTag);
    msgListTag.appendChild(pTag);
    document.querySelector('#chat-log').appendChild(msgListTag);
  }

  public sendMessage(): void {
    this.wsService.ws.send(JSON.stringify({
      'command': 'new_message',
      'message': this.message,
      'from': this.user.username
    }));
    this.message = '';
  }
}
