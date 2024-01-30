import { ApiProperty } from "@nestjs/swagger";

export class UserListDto{
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    nickname: string;

    profile_img_url?: string="";
}

export class UserDetailDto{
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    birth_DT: Date;

    @ApiProperty()
    gender: string;

    profile_img_url?: string="";

}