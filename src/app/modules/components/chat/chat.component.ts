import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../../environments/environment';
import {AuthService} from '../../../shared/service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private auth: AuthService
              ) {
    this.init(environment.appId);
  }

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      console.log(res);
    });
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
