import { IsDate, IsOptional, IsString } from "class-validator";

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