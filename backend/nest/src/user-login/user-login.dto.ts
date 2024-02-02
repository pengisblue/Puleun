import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {IsString, Length} from 'class-validator';

@Exclude()
export class UserLoginDto{
    @ApiProperty({example: '실제 이름'})
    @IsString()
    @Length(1, 10)
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @IsString()
    @Length(1, 30)
    user_email: string;

    @ApiProperty({example: 1234})
    @IsString()
    @Length(1, 30)
    user_password: string;
}