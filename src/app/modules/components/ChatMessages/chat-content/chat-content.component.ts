import {AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { WebsocketService} from '../../../../shared/service/websocket.service';
import { AuthService } from '../../../../shared/service/auth.service';
import { Message, ChannelMessage } from '../../../../shared/interface/message';
import { Channel } from '../../../../shared/interface/channel';
import { User } from '../../../../shared/interface/user';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

  @Input() userChannel: Channel;
  @Input() user: User;
  container: HTMLElement;
  public message: string = '';
  public messageContent: Array<Message> = [];
  public wsSubscription: Subscription;
  private Subscribe: Subscription[] = [];

  private destroy$ = new Subject();

  constructor(private wsService: WebsocketService,
              private api: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Subscribe.forEach(subscribe => subscribe.unsubscribe());
    this.messageContent = [];
    if (this.userChannel) {
      console.log(`/ws/chat/${this.userChannel.id}/`);
      this.Subscribe.push(this.wsSubscription =
        this.wsService.createObservableSocket(`ws://localhost:8000/ws/chat/${this.userChannel.id}/`,
          this.user.username, this.userChannel.id)
          .subscribe(
            ev => {
              const data: ChannelMessage = JSON.parse(ev);
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

  ngAfterViewChecked(): void {
    if (this.userChannel) {
      this.container = document.getElementById("content-message");
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.Subscribe.forEach(subscribe => subscribe.unsubscribe());
  }

  public sendMessage(): void {
    this.wsService.ws.send(JSON.stringify({
      'command': 'new_message',
      'message': this.message,
      'from': this.user.username,
      'chatId': this.userChannel.id
    }));
    this.message = '';
  }

}
