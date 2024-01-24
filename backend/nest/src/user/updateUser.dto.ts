import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    nickname: string;

    birth_DT: Date;

    gender: string;

    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}