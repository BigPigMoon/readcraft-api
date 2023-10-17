import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Public } from '../common/decorators';

@WebSocketGateway({ cors: true })
export class CardGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @Public()
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    console.log(data);
    return { event: 'message', data: { name: 'alex', age: 10 } };
  }

  handleConnection(client: any): any {
    console.log('connection start');
  }

  handleDisconnect(client: any): any {
    console.log('connection close');
  }
}
