import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Sentence } from 'src/sentence/sentence.entity';
import { Repository } from 'typeorm';

@WebSocketGateway(8080, {
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Sentence)
    private readonly SentenceRepository: Repository<Sentence>
  ){}

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
