import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

export enum WS_MESSAGE_TYPES {
  EVENTS = 'events',
  IDENTITY = 'identity'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _socket: SocketIOClient.Socket;
  private _wsEventsListener: Observable<any>;

  messages: any[] = [];

  ngOnInit(): void {
    this._socket = io(environment.ws_url);

    this._wsEventsListener = new Observable(observer => {
      this._socket.on(WS_MESSAGE_TYPES.EVENTS, (data) => {
        observer.next(data);
      });
      return () => {
        this._socket.disconnect();
      }
    });

    // listen to ws messages of type events
    this._wsEventsListener.subscribe(data => {
      console.log('received event', data);
      this.messages.push(data);
    });

    // submit identity check and listen to acknowledgment
    console.log('sending identity check');
    this._socket.emit(WS_MESSAGE_TYPES.IDENTITY, JSON.stringify({test: 'identity check'}), (data) => {
      console.log('identity acknowledgement handler', data);
    });
  }
}
