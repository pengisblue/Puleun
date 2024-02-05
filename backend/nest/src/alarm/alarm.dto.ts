import { Exclude, Expose, Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, Length , IsBoolean} from "class-validator";
import { Alarm } from "./alarm.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Pot } from "src/pot/pot.entity";
import { Optional } from "@nestjs/common";


export class AlarmWithPotDto{
    pot_id: number;
    pot_name: string;
}

@Exclude()
export class CreateAlarmDto{
    @IsString()
    @Length(1, 30)
    @ApiProperty({
        example: 'example name',
        required: true,
        description: 'alarm_name'
    })
    @Expose()
    alarm_name: string;

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        example: 'example content',
        required: true,
        description: 'alarm_content'
    })
    @Expose()
    alarm_content: string;


    @ApiProperty({
        example: true,
        required: true,
        description: 'active_FG'
    })
    @Expose()
    @IsOptional()
    @IsBoolean()
    active_FG: boolean;

    @IsDate()
    @Type(()=>Date)
    @ApiProperty({
        example: '07:30',
        required: true,
        description: 'alarm_date'
    })
    @Expose()
    alarm_date: Date

    @IsInt()
    @ApiProperty({
        example: 11,
        required: true,
        description: 'alarm_name',
    })

    @Expose()
    @IsOptional()
    routine? : number=0;

    @ApiProperty({
        example: 5,
        required: true,
        description: 'pot_id'
    })

    @Expose()
    @Type(()=> AlarmWithPotDto)
    pot: AlarmWithPotDto;
}

@Exclude()
export class AlarmDto{
    @IsString()
    @Length(1, 30)
    @ApiProperty({
        example: 'example name',
        required: true,
        description: 'alarm_name'
    })
    @Expose()
    alarm_name: string;

    @IsString()
    @Length(1, 100)
    @ApiProperty({
        example: 'example content',
        required: true,
        description: 'alarm_content'
    })
    @Expose()
    alarm_content: string;

    @IsBoolean()
    @ApiProperty({
        example: true,
        required: true,
        description: 'active_FG'
    })
    @Expose()
    @IsOptional()
    active_FG ? : boolean;

    @IsDate()
    @Type(()=>Date)
    @ApiProperty({
        example: '07:30',
        required: true,
        description: 'alarm_date'
    })
    @Expose()
    alarm_date: Date

    @IsInt()
    @ApiProperty({
        example: 11,
        required: true,
        description: 'alarm_name',
    })
    @Expose()
    @IsOptional()
    routine? : number;

    @ApiProperty({
        example: 5,
        required: true,
        description: 'pot_id'
    })

    @Expose()
    @Type(() => AlarmWithPotDto)
    pot: AlarmWithPotDto;
}