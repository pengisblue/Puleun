import { IsDate, IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreatePotDto {
    @IsString()
    potName: string;

    @IsString()
    potSpecies: string;

    @IsDate()
    @IsOptional()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    deletedAt ? : Date

    @IsDate()
    @IsOptional()
    updatedAt ? : Date
    
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

export class SelectPotDto{
    @IsString()
    potName: string;

    @IsString()
    potSpecies: string;

    @IsDate()
    @IsOptional()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    updatedAt ? : Date
    
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
    @IsOptional()
    @Length(1, 200)
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    happy_cnt ? : number;

    // user_id가 0 이라면 이 화분은 부모가 키우고 있다는 것!
    // user_id가 존재한다면 아이가 키우고 있다는 것
    @IsInt()
    @IsOptional()
    user_id ? : number = 0;
}