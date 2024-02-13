import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString, Length, IsNumber } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { User } from "src/user/user.entity";


export class PotUserDto{
    @IsInt()
    @ApiProperty({example: 3})
    user_id: number;

    @IsString()
    @Length(1, 10)
    @ApiProperty({example: '이서호'})
    nickname: string;
}

export class CreatePotDto {
    @IsNumber()
    @ApiProperty({example: 1})
    @Type(() => Number)
    device_id: number;

    // @IsNumber()
    // @ApiProperty({example: 1})
    // @Type(() => Number)
    // pot_id: number;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '푸른', required: true})
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '소나무', required: true})
    pot_species: string;
    
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    max_moisture: number;

    @IsString()
    @IsOptional()
    pot_img_url: string;

    @IsOptional()
    @IsDate()
    @ApiProperty({example: '2023-02-13', description: '심은 날'})
    @Type(() => Date)
    planting_day: Date;
}

export class UpdatePotDto{
    @IsString()
    @IsOptional()
    @ApiProperty({example: '금쪽이',required: true})
    pot_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: '바질'})
    pot_species: string;
    
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    max_moisture: number;

    @IsString()
    @IsOptional()
    pot_img_url: string;
}

@Exclude()
export class SelectPotDto{
    @IsNumber()
    @Expose()
    pot_id: number;

    @IsString()
    @ApiProperty()
    @Length(1, 10)
    @Expose()
    pot_name: string;

    @IsString()
    @ApiProperty()
    @Length(1, 10)
    @Expose()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Expose()
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Expose()
    updatedAt ? : Date
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    max_moisture: number;

    @IsString()
    @IsOptional()
    @Length(1, 200)
    @ApiProperty()
    @Expose()
    pot_img_url: string;

    @IsNumber()
    @ApiProperty()
    @Expose()
    user: User;

    // user_id가 0 이라면 이 화분은 부모가 키우고 있다는 것!
    // user_id가 존재한다면 아이가 키우고 있다는 것
    // @IsInt()
    // @IsOptional()
    // @ApiProperty()
    // user_id ? : number = 0;    
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


export class PotWithStatusDto{
    @IsNumber()
    pot_id: number;

    @IsString()
    pot_name: string;

    @IsString()
    pot_img_url: string;

    @IsString()
    pot_species: string;

    @IsNumber()
    parent_id: number;

    @IsNumber()
    user_id: number;

    @IsString()
    profile_img_url: string;

    @IsString()
    nickname: string;

    @IsNumber()
    temperature: number;

    @IsNumber()
    moisture: number;

    @IsString()
    temp_state: string;

    @IsString()
    mois_state: string;

    @IsNumber()
    last_water: number;

    @IsString()
    planting_day: Date;

    @IsNumber()
    together_day: number;

    @IsNumber()
    last_talk: number;
}


