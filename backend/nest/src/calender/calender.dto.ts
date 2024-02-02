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

    // constructor() {
    //     this.pot = new calenderPotDto();
    // }

    // static fromEntity(entity: Calender): SelectCalenderDto{
    //     const dto = new SelectCalenderDto();
    //     dto.calender_id = entity.calender_id;
    //     dto.code = entity.code;
    //     dto.pot.pot_id = entity.pot.pot_id;
    //     dto.pot.pot_name = entity.pot.pot_name;
    //     return dto;
    // }
}