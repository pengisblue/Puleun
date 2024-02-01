import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';
import { SocketService } from "./socket.service";
import { PotStateService } from 'src/pot-state/pot-state.service';

@WebSocketGateway(8080, {
  cors: { origin: ["http://172.23.48.1:3000/","192.168.30.*"],},
})

@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly potStateService: PotStateService,
  ){}

  handleConnection( client: Socket ){
    console.log(client.id)
    client.emit(`Hello ${client.id}`)
  }

  @SubscribeMessage('login')
  async handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('serial_number') serial_number: string){
    const result = await this.socketService.login(serial_number)
    client.emit('login_result',result)
  }

  @SubscribeMessage('pot_state')
  async handleMessage( @MessageBody() inputDto: CreatePotStateDto): Promise<number>{
    console.log(inputDto)
    await this.potStateService.save(inputDto);
    return 1;
  }

  @SubscribeMessage('stt')
  async saveSttFile( @ConnectedSocket() client: Socket, @MessageBody('text') text: string, @MessageBody('talk_id') talk_id: number, @MessageBody('file') base64Data: string): Promise<string>{
    if (text==null) text=""
    if (base64Data==null) base64Data=""
    const returnData = await this.socketService.stt(text, talk_id, base64Data)
    try{
      client.emit('tts', {base64Data:returnData} );
    } catch (error) {
      console.error(`Error reading file: ${error}`);
    }
    return returnData
  }
}