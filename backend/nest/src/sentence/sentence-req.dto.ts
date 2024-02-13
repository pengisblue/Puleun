import { Type } from "class-transformer";

export class SentenceCreateDto{
    content: string;

    @Type(()=>Date)
    sentence_DTN: Date;

    talker: string;

    @Type(()=>Number)
    talk_id: number;

    audio: string;
}