import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';
import { PotState } from 'src/pot-state/pot-state.entity';
import { PotStateService } from 'src/pot-state/pot-state.service';
import { Repository } from 'typeorm';

@WebSocketGateway(8080, {
  cors: { origin: ["http://172.23.48.1:3000/","192.168.30.*"], },
  namespace: 'socket'
})
@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(PotState)
    private readonly potStateRepository: Repository<PotState>,
  ){}

  handleConnection(client: Socket){
    console.log(client.id)
  }

  @SubscribeMessage('login')
  handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('message') message: JSON) {
    client.emit('message',{ result: `${message} accepted`})
  }

  @SubscribeMessage('pot-status')
  async handleMessage( @MessageBody() inputDto: CreatePotStateDto): Promise<number>{
    await this.potStateRepository.save(inputDto);
    return 1;
  }

  @SubscribeMessage('stt')
  saveSttFile( client: Socket, @MessageBody('file') file: File): void{
    console.log(client)
    console.log(file)
    // txt 파일 저장
    // redis insert
    // 답변 생성 (gpt api)
    // message -> tts >> wav
    // client.emit(wav) 
  }
}
