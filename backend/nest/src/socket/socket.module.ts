import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketController } from './socket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotState } from 'src/pot-state/pot-state.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([PotState]) ],
    controllers:[SocketController],
    providers:[SocketGateway],})
export class SocketModule {
}
