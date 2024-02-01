import { Pot } from "src/pot/pot.entity";
import { Calender } from "./calender.entity";

export class SelectCalenderDto{
    calender_id: number;
    code: string;
    pot: calenderPotDto;

    constructor() {
        this.pot = new calenderPotDto();
    }

    static fromEntity(entity: Calender): SelectCalenderDto{
        const dto = new SelectCalenderDto();
        dto.calender_id = entity.calender_id;
        dto.code = entity.code;
        dto.pot.pot_id = entity.pot.pot_id;
        dto.pot.pot_name = entity.pot.pot_name;
        return dto;
    }
}

export class calenderPotDto{
    pot_id: number;
    pot_name: string;
}