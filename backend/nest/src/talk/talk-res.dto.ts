import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";

@Exclude()
export class TalkListDto{
    @ApiProperty()
    @Type(()=>Number)
    talk_id: number

    @ApiProperty()
    talk_title: string
    
    @ApiProperty()
    @Type(()=>Date)
    talk_DT: Date

    @ApiProperty()
    @Type(()=>Boolean)
    read_FG: boolean
}