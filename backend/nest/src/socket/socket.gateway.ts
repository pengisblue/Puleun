import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';

import { SocketService } from "./socket.service";

@WebSocketGateway(8080, {
  cors: { origin: ["http://172.23.48.1:3000/","192.168.30.*"],},
})

@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
  ){}

  handleConnection(@ConnectedSocket() client: Socket){
    console.log(client.id)
    client.emit(`Hello ${client.id}`)
  }

  @SubscribeMessage('login')
  handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('message') message: JSON) {
    client.emit('message',{ result: `${message} accepted`})
  }

  @SubscribeMessage('pot-state')
  async handleMessage( @MessageBody() inputDto: CreatePotStateDto): Promise<number>{
    await this.socketService.saveState(inputDto);
    return 1;
  }

  @SubscribeMessage('stt')
  async saveSttFile( @ConnectedSocket() client: Socket, @MessageBody('txt') txt: string, @MessageBody('file') base64Data: string): Promise<string>{
    if (txt==null) txt=""
    if (base64Data==null) base64Data=""
    const returnData = await this.socketService.stt(txt, base64Data)
    try{
      client.emit('tts', {base64Data:returnData} );
    } catch (error) {
      console.error(`Error reading file: ${error}`);
    }
    return returnData
  }
}