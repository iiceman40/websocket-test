import {
	OnGatewayConnection,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Socket} from 'socket.io';
import * as SocketIO from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
	@WebSocketServer() server: SocketIO.Server;

	handleConnection(client: Socket, ...args: any[]): any {
		this.server.emit('events', {data: 'my test data'});
	}

	afterInit(server): any {
		console.log('afterInit');
	}

	@SubscribeMessage('events')
	findAll(client, data): Observable<WsResponse<number>> {
		return from([1, 2, 3]).pipe(map(item => ({event: 'events', data: item})));
	}

	@SubscribeMessage('identity')
	async identity(client, data: number): Promise<number> {
		console.log('DATA identity', data);
		return data;
	}

}