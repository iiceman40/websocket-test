import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'websocket-test-client';

  private _socket: SocketIOClient.Socket;
  private _messageListener: Observable<any>;

  ngOnInit(): void {
    console.log('init');

    this._socket = io(environment.ws_url);

    this._messageListener = new Observable(observer => {
      this._socket.on('events', (data) => {
        observer.next(data);
      });
      return () => {
        this._socket.disconnect();
      }
    });

    this._messageListener.subscribe(data => {
      console.log('received', data);
    });

    this._socket.emit('identity', JSON.stringify({test: 'test'}), (data) => {
      console.log('acknowledgement handler', data);
    });
  }
}
