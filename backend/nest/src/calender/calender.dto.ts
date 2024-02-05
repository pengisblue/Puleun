import { Exclude, Expose } from "class-transformer";

@Exclude()
export class calenderPotDto{
    @Expose()
    pot_id: number;
    @Expose()
    pot_name: string;
}

@Exclude()
export class SelectCalenderDto{
    @Expose()
    calender_id: number;
    @Expose()
    code: string;

    @Expose()
    pot: calenderPotDto;
}