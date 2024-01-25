import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreatePotDto {
    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    deletedAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    updatedAt ? : Date
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_moisture: number;

    @IsString()
    @Length(1, 200)
    @ApiProperty()
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    happy_cnt ? : number;
}

export class UpdatePotDto{
    @IsString()
    @IsOptional()
    @ApiProperty()
    pot_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    updatedAt ? : Date
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_moisture: number;

    @IsString()
    @Length(1, 200)
    @ApiProperty()
    pot_img_url: string;
}

export class SelectPotDto{
    @IsString()
    @ApiProperty()
    @Length(1, 10)
    pot_name: string;

    @IsString()
    @ApiProperty()
    @Length(1, 10)
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    updatedAt ? : Date
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    max_moisture: number;

    @IsString()
    @IsOptional()
    @Length(1, 200)
    @ApiProperty()
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    happy_cnt ? : number;

    // user_id가 0 이라면 이 화분은 부모가 키우고 있다는 것!
    // user_id가 존재한다면 아이가 키우고 있다는 것
    @IsInt()
    @IsOptional()
    @ApiProperty()
    user_id ? : number = 0;    
}

export class CollectionDto{
    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    deletedAt ? : Date

    @IsString()
    @Length(1, 200)
    @ApiProperty()
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    happy_cnt ? : number;
}