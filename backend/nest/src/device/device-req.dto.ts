import { Exclude, Type } from "class-transformer";
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

@Exclude()
export class DeviceCreateDto{
    @IsString()
    serial_number: string;

    @Type( () => Boolean )
    empty_FG?: boolean=false;

    @Type( () => Number )
    @IsOptional()
    user_id?: number=null;

    @Type( () => Number )
    @IsOptional()
    pot_id?: number=null;
}