import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {IsString, Length, IsNumber, IsDate} from 'class-validator';

@Exclude()
export class UserLoginSaveDto{
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

@Exclude()
export class AllUserDto{
    @IsNumber()
    @ApiProperty({example: 1})
    user_id: number;

    @IsString()
    nickname: string;

    @IsDate()
    birth_DT: Date;

    @IsString()
    gender: string;

    @IsString()
    profile_img_url: string;

    @IsNumber()
    parent_id: number;

    // @Type(()=> UserLoginDto)
    // userLoginDto: UserLoginDto[];
}

export class LoginReturnDto{
    @Expose()    
    user_id: number;

    @Expose()
    user_email: string;

    @Expose()
    profile_img_url: string;
}