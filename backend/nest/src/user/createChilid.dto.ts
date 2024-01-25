import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { User } from "src/user/user.entity";

export class CreateChildDto{
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    birth_DT: Date;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    parent: User;

    @ApiProperty()
    @IsOptional()
    @IsString()
    profile_img_url?: string="";
}