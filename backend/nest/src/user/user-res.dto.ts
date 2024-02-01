import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

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