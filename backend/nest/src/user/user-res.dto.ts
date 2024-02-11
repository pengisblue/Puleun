import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString, } from 'class-validator';
import { Species } from "src/species/species.entity";

@Exclude()
export class UserListDto{
    @ApiProperty()
    @Expose()
    user_id: number;

    @ApiProperty()
    @Expose()
    nickname: string;

    @Expose()
    profile_img_url?: string="";
}

export class UserDetailDto{
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    nickname: string;

    @ApiProperty({example:'1990-01-01'})
    birth_DT: Date;

    @ApiProperty()
    gender: string;

    profile_img_url?: string="";
}

@Exclude()
export class SpeciesWithUser{
    @Expose()
    @IsNumber()
    user_id: number;

    @Expose()
    @IsString()
    nickname: string;

    @Type(() => Species)
    @Expose()
    species: Species[];
}


export class SimpleUserListDto{
    @IsNumber()
    pot_id: number;

    @IsString()
    pot_name: string;

    @IsNumber()
    user_id: number;

    @IsString()
    profile_img_url: string;

    @IsString()
    nickname: string;

    @IsString()
    pot_img_url: string;

    @IsNumber()
    parent_id: number;
}