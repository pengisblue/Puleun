import { Exclude, Type } from "class-transformer";
import { IsString } from 'class-validator';

@Exclude()
export class SocketLoginDto{
    @IsString()
    serial_number: string;

    is_owner: Boolean;

    pot_id?: number=null;
}