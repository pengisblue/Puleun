import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { Sentence } from "src/sentence/sentence.entity";
import { JoinColumn } from "typeorm";

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

@Exclude()
export class TalkDetailDto{
    @ApiProperty()
    @Type(()=>Number)
    talk_id: number

    talk_title: string

    talk_DT: Date
    
    sentence: Sentence[]
}