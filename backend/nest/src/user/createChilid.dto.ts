import { IsOptional, IsString } from "class-validator";
import { User } from "src/user/user.entity";

export class CreateChildDto{
    nickname: string;

    birth_DT: Date;

    gender: string;

    parent: User;

    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}