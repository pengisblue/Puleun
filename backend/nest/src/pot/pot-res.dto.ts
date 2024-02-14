import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { UserListDto } from "src/user/user-res.dto";
import { User } from "src/user/user.entity";

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

    @Expose()
    @Type(() => UserListDto)
    user: UserListDto;
}