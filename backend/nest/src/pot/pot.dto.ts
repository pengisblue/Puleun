import { IsDate, IsInt, IsString } from "class-validator";

export class CreatePotDto {
    @IsString()
    potName: string;

    @IsString()
    potSpecies: string;

    @IsDate()
    birth_DT: Date;
}

export class UpdatePotDto{

}