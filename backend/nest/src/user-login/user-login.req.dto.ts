import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsString, Length } from 'class-validator';
import { CreateUserDto } from "src/user/user-req.dto";

export class LoginDto{
    @ApiProperty({example: '실제 이름'})
    @IsString()
    @Length(1, 10)
    @Type(()=>String)
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @IsString()
    @Length(1, 30)
    user_email: string;

    @ApiProperty({example: 1234})
    @IsString()
    @Length(1, 30)
    user_password: string;

    @Type(()=>Number)
    user_id?: number
}

export class LoginUserDto{
    @ApiProperty()
    user:CreateUserDto

    @ApiProperty()
    login: LoginDto
}
