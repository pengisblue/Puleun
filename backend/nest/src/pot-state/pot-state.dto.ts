import { Optional } from "@nestjs/common";
import { Exclude, Expose, Type,  } from "class-transformer";
import { IsNumber, IsString, IsDate } from 'class-validator';

export class DateAndTempMoisDto{

}


@Exclude()
export class StatusResultDto{
    @Expose()
    @IsNumber()
    @Type(() => Number)
    pot_id: number;

    @Expose()
    @IsString()
    pot_species: string;

    @Expose()
    @IsString()
    pot_img_url: string;

    @Expose()
    @IsNumber()
    @Type(() => Number)
    @Optional()
    current_temp?: number = -1;

    @Expose()
    @IsNumber()
    @Type(() => Number)
    current_mois ? : number = -1;

    @Expose()
    @IsDate()
    @Type(() => Date)
    last_water: Date;

    @Expose()
    @IsDate()
    @Type(() => Date)
    planting_day: Date;

    @Expose()
    @IsDate()
    @Type(() => Number)
    together_day: number;

    @Expose()
    @IsString()
    @Type(() => String)
    temp_state: string;

    @Expose()
    @IsString()
    @Type(() => String)
    mois_state: string;
}


export class CompareDataDto{
    @IsNumber()
    current_temp: number;

    @IsNumber()
    current_mois: number;

    @IsNumber()
    yesterday_temp: number;

    @IsNumber()
    yesterday_mois: number;
}