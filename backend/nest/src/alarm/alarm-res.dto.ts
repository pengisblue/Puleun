import { Expose, Type } from "class-transformer";
import { time } from "console";

// export class TinyPotDto{
//     pot_id: number;
//     pot_name: string;
// }

// export class alarmDto extends TinyPotDto{
//     alarm_id: number;
//     alarm_name: string;
//     alarm_content: string;
//     active_FG: boolean;
//     alarm_date: Date;
//     routine: number;
// }

// export class UserWithAlarmDto extends alarmDto{
//     user_id: number;
//     nickname: string;

// }

export class AlarmDto {
    @Expose()
    alarm_id: number;
    @Expose()
    alarm_name: string;
    @Expose()
    alarm_content: string;
    @Expose()
    active_FG: boolean;
    @Expose()
    @Type(() => time)
    alarm_date: string;
    @Expose()
    routine: string;
    
}

export class PotDto {
    @Expose()
    pot_id: number;

    @Expose()
    pot_name: string;

    @Expose({ name: 'alarm' })
    @Type(() => AlarmDto)
    alarm: AlarmDto[];
    
}
    

export class UserWithAlarmDto {
    @Expose()
    user_id: number;
    @Expose()
    nickname: string;

    @Expose({ name: 'pots' })
    @Type(() => PotDto)
    pots: PotDto[];
    
}
  



