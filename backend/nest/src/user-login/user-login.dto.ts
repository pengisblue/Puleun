import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {IsString, Length} from 'class-validator';

@Exclude()
export class UserLoginDto{
    @ApiProperty({example: '실제 이름'})
    @IsString()
    @Length(1, 10)
    @Expose()
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @IsString()
    @Length(1, 30)
    @Expose()
    user_email: string;

    @ApiProperty({example: 1234})
    @IsString()
    @Length(1, 30)
    @Expose()
    user_password: string;
}

@Exclude()
export class LoginDto{
    @ApiProperty({example: 'email@purun.com'})
    @IsString()
    @Length(1, 30)
    @Expose()
    user_email: string;

    @ApiProperty({example: 1234})
    @IsString()
    @Length(1, 30)
    @Expose()
    user_password: string;
}