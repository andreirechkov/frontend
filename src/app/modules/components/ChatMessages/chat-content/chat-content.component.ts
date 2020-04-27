import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {WebsocketService} from '../../../../shared/service/websocket.service';
import {AuthService} from '../../../../shared/service/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Message, Messages} from '../../../../shared/interface/message';
import {Channel} from '../../../../shared/interface/channel';
import {User} from '../../../../shared/interface/user';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnDestroy, OnChanges {

  @Input() userChannel: Channel;

  public message: string = '';
  public user: User;
  public messageContent: Array<Message> = [];
  public wsSubscription: Subscription;
  private Subscribe: Subscription[] = [];

  private destroy$ = new Subject();

  constructor(private wsService: WebsocketService,
              private api: AuthService) {
  }

  ngOnInit(): void {
    this.Subscribe.push(
      this.api.getUser().subscribe((res: User) => {
        this.user = res;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Subscribe.forEach(subscribe => subscribe.unsubscribe());
    if (this.userChannel) {
      this.Subscribe.push(this.wsSubscription =
        this.wsService.createObservableSocket(`ws://localhost:8000/ws/chat/${this.userChannel.username}/`)
          .subscribe(
            ev => {
              const data: Messages = JSON.parse(ev);
              if (data['command'] === 'messages') {
                data.messages.forEach(element => {
                  this.messageContent.push(element);
                });
                this.messageContent.reverse();
              } else if (data['command'] === 'new_message') {
                this.messageContent.push(data['message']);
              }
            },
            err => console.log('err'),
            () => console.log('The observable stream is complete')
          )
      );
    }
  }

  ngOnDestroy(): void {
    this.Subscribe.forEach(subscribe => subscribe.unsubscribe());
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
