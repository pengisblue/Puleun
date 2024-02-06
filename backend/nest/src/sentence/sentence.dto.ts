import { Optional } from "@nestjs/common";
import { IsDate, IsNumber , IsString } from "class-validator";

export class SentenceDto{

    @IsNumber()
    @Optional()
    sentence_id: number;

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