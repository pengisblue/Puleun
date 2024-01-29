import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotState } from 'src/pot-state/pot-state.entity';
import { FileModule } from "src/file/file.module";
import { SocketService } from './socket.service';

@Module({
    imports: [ TypeOrmModule.forFeature([PotState]) ],
    controllers:[SocketController],
    providers:[SocketGateway, SocketService],})
export class SocketModule {
}
