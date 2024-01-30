import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePotStateDto {
    @ApiProperty()
    @IsNumber()
    pot_id: number;
    
    @ApiProperty()
    @IsNumber()
    data: number;

    @ApiProperty()
    @Type(() => Boolean)
    isTemp_FG: boolean;
}