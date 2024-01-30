import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Length , IsBoolean} from "class-validator";
import { Alarm } from "./alarm.entity";
import { ApiProperty } from "@nestjs/swagger";


export class AlarmDto{

    @IsString()
    @Length(1, 30)
    @ApiProperty({
        example: 'example name',
        required: true,
        description: 'alarm_name'
    })
    alarm_name: string;

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        example: 'example content',
        required: true,
        description: 'alarm_content'
    })
    alarm_content: string;

    @IsBoolean()
    @ApiProperty({
        example: true,
        required: true,
        description: 'active_FG'
    })
    active_FG: boolean;

    @IsDate()
    @Type(()=>Date)
    @ApiProperty({
        example: '07:30',
        required: true,
        description: 'alarm_date'
    })
    alarm_date: Date

    @IsInt()
    @ApiProperty({
        example: 11,
        required: true,
        description: 'alarm_name',
    })
    routine: number;

    @IsInt()
    @ApiProperty({
        example: 5,
        required: true,
        description: 'pot_id'
    })
    pot_id: number;

    static fromEntity(entity: Alarm): AlarmDto{
        const alarmDto = new AlarmDto();
        alarmDto.alarm_name = entity.alarm_name;
        alarmDto.alarm_content = entity.alarm_content;
        alarmDto.active_FG = entity.active_FG;
        alarmDto.alarm_date = entity.alarm_date;
        alarmDto.routine = entity.routine;
        alarmDto.pot_id = entity.pot_id;
        return alarmDto;
    }

}