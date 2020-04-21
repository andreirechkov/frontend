import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketRef: WebSocket;
  public containerMessage:any = [];

  constructor() {
    this.socketRef = null;
  }

  public connect(): void {
    const path = 'ws://localhost:8000/ws/chat/test/';
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = (() => {
      this.socketRef.send(JSON.stringify({'command': 'fetch_messages' }));
    });
    this.socketRef.onmessage = (ev => {
      const data = JSON.parse(ev.data);
      if (data.messages) {
        data.messages.reverse();
      }
      console.log(data);
      if (data['command'] === 'messages') {
        for (let i=0; i<data['messages'].length; i++) {
          this.createMessage(data['messages'][i]);
        }
      } else if (data['command'] === 'new_message'){
        this.createMessage(data['message']);
      }
    });
    this.socketRef.onerror = (ev  => {
      console.log(ev);
    });
    this.socketRef.onclose = ( () => {
      console.log('websocket is close')
      //this.connect();
    })
  }

  public createMessage(data) {
    const author = data['author'];
    const msgListTag = document.createElement('li');
    const imgTag = document.createElement('img');
    const pTag = document.createElement('p');
    pTag.textContent = data.content;
    imgTag.src = 'http://emilcarlsson.se/assets/mikeross.png';
    if (author === 'firstep') {
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
}
