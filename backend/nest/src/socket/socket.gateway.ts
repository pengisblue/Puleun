import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('login')
  handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('message') message: JSON) {
    client.emit('message',{ result: `${message} accepted`})
  }

  @SubscribeMessage('text')
  handleMessage( @MessageBody() message: JSON): void{
    console.log(message)
    this.server.emit('message', message)
  }
}
