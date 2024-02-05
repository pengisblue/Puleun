import { Exclude, Type } from "class-transformer";
import { IsString, IsOptional, IsNumber } from 'class-validator';

@Exclude()
export class DeviceCreateDto{
    @IsString()
    @Type(()=> String)
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

@Exclude()
export class SelectDeviceDto{

    @IsString()
    @Type( () => String )
    serial_number: string;

    @IsNumber()
    pot_id: number;
}