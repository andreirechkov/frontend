import { AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription} from 'rxjs';
import { WebsocketService} from '../../../shared/service/websocket.service';
import { Message, ChannelMessage } from '../../../shared/interface/message';
import { Channel } from '../../../shared/interface/channel';
import { User } from '../../../shared/interface/user';
import { ApiService } from '../../../shared/service/api.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input() userChannel: Channel;
  public defaultImage: any = "../assets/avatar-3.png";
  public user: User;
  public container: HTMLElement;
  public message: string = '';
  public messageContent: Array<Message> = [];
  public wsSubscription: Subscription;
  private Subscribe: Subscription[] = [];

  constructor(private wsService: WebsocketService,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getUser().subscribe(res => {
      this.user = res;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Subscribe.forEach(subscribe => subscribe.unsubscribe());
    this.messageContent = [];
    if (this.userChannel) {
      this.Subscribe.push(this.wsSubscription =
        this.wsService.createObservableSocket(`ws://localhost:8000/ws/chat/${this.userChannel.channelId}/`,
          this.user.username, this.userChannel.channelId)
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

  public sendMessage(message: string): void {
    this.wsService.ws.send(JSON.stringify({
      'command': 'new_message',
      'message': message,
      'from': this.user.username,
      'chatId': this.userChannel.channelId
    }));
    this.message = '';
  }
}
