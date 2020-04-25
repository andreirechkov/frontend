import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public ws: WebSocket;



  public createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onopen = (event) => {
          this.ws.send(JSON.stringify({'command': 'fetch_messages' }));
        }
        this.ws.onmessage = (event) =>
          observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () =>
          this.ws.close(1000, "The user disconnected");
      }
    );
  }
}
