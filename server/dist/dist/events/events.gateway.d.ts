import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
export declare class EventsGateway {
    server: any;
    findAll(client: any, data: any): Observable<WsResponse<number>>;
    identity(client: any, data: number): Promise<number>;
}
