import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class SentenceDto{

    @IsNumber()
    @Optional()
    sentence_id: number;

    @ApiProperty({example: "밥 먹었어?"})
    @IsString()
    content: string;

    @IsDate()
    sentence_DTN: Date;

    @IsNumber()
    talker_FG: boolean;

    @IsNumber()
    talk_id: number;

    @IsString()
    @Optional()
    audio: string;
}