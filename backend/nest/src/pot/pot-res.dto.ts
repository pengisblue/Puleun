import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

export class SelectCollectionDto {
    @Expose()
    @ApiProperty()
    pot_id: number;

    @Expose()
    @ApiProperty()
    pot_name: string;

    @Expose()
    @ApiProperty()
    pot_species: string;
    
    @Expose()
    @ApiProperty()
    pot_img_url: string;
    
    @Expose()
    @ApiProperty()
    planting_day: Date;
    
    @Expose()
    @ApiProperty()
    happy_cnt: number;

    @ApiProperty({example: 1})
    @Expose()
    user_id: number;

    @ApiProperty()
    @Expose()
    nickname: string;

    @ApiProperty()
    @Expose()
    profile_img_url?: string="";

}