import { Component, OnInit } from '@angular/core';
import {WebsocketService} from '../../../shared/service/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';

  constructor(private webSocket: WebsocketService) {}

  ngOnInit(): void {
    this.webSocket.connect();
  }

  public sendMessage() {
    this.webSocket.socketRef.send(JSON.stringify({
      'command': 'new_message',
      'message': this.message,
      'from': 'firstep'
    }));
    this.message = '';
  }

}
