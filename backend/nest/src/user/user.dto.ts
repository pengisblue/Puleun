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
export class CreateChildDto{
    @ApiProperty()
    @IsString()
    nickname: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsNumber()
    parent_id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}

export class UpdateUserDto{
    @IsString()
    nickname: string;

    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @IsString()
    gender: string;

    @IsOptional() // 데이터가 없을 경우
    @IsString()
    profile_img_url?: string="";
}