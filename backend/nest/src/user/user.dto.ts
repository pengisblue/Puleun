import { IsDate, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChildDto{
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    birth_DT: Date;

    @ApiProperty()
    gender: string;

    @ApiProperty()
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
    birth_DT: Date;

    @IsString()
    gender: string;

    @IsOptional() // 데이터가 없을 경우
    @IsString()
    profile_img_url?: string="";
}