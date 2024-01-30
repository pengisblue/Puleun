import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UserListDto{
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}

export class CreateUserDto{
    @ApiProperty({example:'박지예'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'1 // for male'})
    @IsString()
    gender: string;

    @ApiProperty({example:'0 // if user is parent'})
    @IsNumber()
    parent_id: number;

    @ApiProperty({example:'"" // it can be null'})
    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}

export class UpdateUserDto{
    @ApiProperty({example:'박지예'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'1 // for male'})
    @IsString()
    gender: string;

    @ApiProperty({example:'"" // it can be null'})
    @IsOptional() // 데이터가 없을 경우
    @IsString()
    profile_img_url?: string="";
}