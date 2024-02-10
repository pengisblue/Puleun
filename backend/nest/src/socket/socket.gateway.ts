import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';
import { SocketService } from "./socket.service";
import { PotStateService } from 'src/pot-state/pot-state.service';
import { CalenderService } from 'src/calender/calender.service';
import { CalenderCreateDto } from 'src/calender/calender-req.dto';
import { TalkService } from 'src/talk/talk.service';
import { DeviceService } from 'src/device/device.service';

@WebSocketGateway(7080, {
  cors: { origin: "*",},
  headers: { Authorization: 'base64 auth' }
})

@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly potStateService: PotStateService,
    private readonly calenderService: CalenderService,
    private readonly talkService: TalkService,
    private readonly deviceService: DeviceService,
  ){}

  handleConnection( client: Socket ){
    console.log(client.id)
  }

  async handleDisconnect( client: Socket){
    await this.deviceService.disconnectDevice( client.id )
  }

  @SubscribeMessage('login')
  async handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('serial_number') serial_number: string){
    const result = await this.socketService.login(client.id, serial_number)
    client.emit('login_result', result)
  }

  @SubscribeMessage('pot_state')
  async handleMessage( @MessageBody() inputDto: CreatePotStateDto): Promise<number>{
    await this.potStateService.save(inputDto);
    return 1;
  }

  @SubscribeMessage('stt')
  async saveSttFile( @ConnectedSocket() client: Socket, 
        @MessageBody('text') text: string, 
        @MessageBody('talk_id') talk_id: number, 
        @MessageBody('file') base64Data: string): Promise<string>{
    if (text==null) text=""
    if (base64Data==null) base64Data=""
    console.log(talk_id)
    const returnData = await this.socketService.stt(text, talk_id, base64Data)
    try{
      client.emit('tts', {base64Data:returnData} );
    } catch (error) {
      console.error(`Error reading file: ${error}`);
    }
    return returnData
  }

  @SubscribeMessage('water')
  async water( @MessageBody('pot_id') pot_id: number ): Promise<void>{
    const waterDto = new CalenderCreateDto;
    waterDto.pot_id = pot_id
    waterDto.code = 'W'
    this.calenderService.save(waterDto)
  }

  @SubscribeMessage('hot_word')
  async hotWord( @ConnectedSocket() client: Socket, @MessageBody('pot_id') pot_id: number ): Promise<void>{
    const dto = new CalenderCreateDto;
    dto.pot_id = pot_id
    dto.code = 'T'
    this.calenderService.save(dto)
    const talk_id = await this.talkService.saveTalk("푸른 푸르른", "2023-02-01")
    client.emit('talk_id',{talk_id})
  }

  async refresh( clientId: string): Promise<void>{
    this.server.to(clientId).emit('refresh')
  }
}