import { Type } from "class-transformer";

export class SentenceCreateDto{
    content: string;

    @Type(()=>Date)
    sentence_DTN: Date;

    @Type(()=>Boolean)
    talker_FG: boolean;

    @Type(()=>Number)
    talk_id: number;

    audio: string;
}