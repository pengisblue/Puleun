import { IsDate, IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreatePotDto {
    @IsString()
    potName: string;

    @IsString()
    potSpecies: string;

    @IsDate()
    birth_DT: Date;
    
    @IsInt()
    @IsOptional()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    max_temperature: number;

    @IsInt()
    @IsOptional()
    min_moisture: number;

    @IsInt()
    @IsOptional()
    max_moisture: number;

    @IsString()
    @Length(1, 200)
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    happy_cnt ? : number;

    


}

export class UpdatePotDto{

}