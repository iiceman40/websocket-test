import {Controller, Get, Query} from '@nestjs/common';
import {EventsGateway} from './events.gateway';

@Controller()
export class AppController {
	constructor(private eventsGateway: EventsGateway) {
	}

	@Get()
	root(@Query('message') message = 'my test push message'): string {
		this.eventsGateway.push({message});

		return `Hey my friend! I have sent the following message to everybody: "${message}"`;
	}
}
