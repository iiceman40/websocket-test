import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer,} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';

export enum MESSAGE_TYPES {
	EVENTS = 'events',
	IDENTITY = 'identity'
}

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
	@WebSocketServer() server: SocketIO.Server;

	afterInit(server: SocketIO.Server): any {
		setInterval(() => {
			this.push({message: 'everything okay!'})
		}, 10000)
	}

	@SubscribeMessage(MESSAGE_TYPES.IDENTITY)
	async identity(client, data: number): Promise<number> {
		console.log('Subscribe Message IDENTITY', data);
		return data;
	}

	push(data: {message}) {
		console.log('Sending push message', data.message);
		this.server.emit(MESSAGE_TYPES.EVENTS, data);
	}

}