import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";

export class CreateUserDto{
    @ApiProperty({example:'박지예'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'F', description:'M for male'})
    gender: string;

    @ApiProperty({example:0, description:'if user is parent'})
    @IsNumber()
    @Type(()=>Number)
    parent_id: number;

    profile_img_url?: string="";
}

export class UpdateUserDto{
    @ApiProperty({example:'박지예'})
    @IsString()
    @Type(()=>String)
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'M', description:'F for female'})
    @IsString()
    @Type(()=>String)
    gender: string;

    profile_img_url?: string="";
}