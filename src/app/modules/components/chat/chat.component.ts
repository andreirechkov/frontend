import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MatSnackBar } from '@angular/material/snack-bar';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../../environments/environment';
import {AuthService} from '../../../shared/service/auth.service';
=======
import {WebsocketService} from '../../../shared/service/websocket.service';
>>>>>>> Angular-Django-Chat

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

<<<<<<< HEAD
  constructor(private snackBar: MatSnackBar,
              private auth: AuthService
              ) {
    this.init(environment.appId);
  }

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      console.log(res);
    });
=======
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
>>>>>>> Angular-Django-Chat
  }

  public init(appId: string, apiKey?  : string) {
    CometChat.init(appId).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('App init failed', err);
        this.snackBar.open(
          'App initialization failed. Please refresh the page.'
        );
      }
    );
  }
}
