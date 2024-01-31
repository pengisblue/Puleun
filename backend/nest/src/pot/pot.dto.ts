import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString, Length } from "class-validator";
import { Pot } from "./pot.entity";
import { Exclude, Expose, Type } from "class-transformer";


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
    @IsInt()
    @ApiProperty()
    user_id: number;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '푸른'})
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '소나무'})
    pot_species: string;
    
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
    @ApiProperty({example: 'noimage.jpg'})
    pot_img_url: string;
}

@Exclude()
export class SelectPotDto{
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

    // user_id가 0 이라면 이 화분은 부모가 키우고 있다는 것!
    // user_id가 존재한다면 아이가 키우고 있다는 것
    // @IsInt()
    // @IsOptional()
    // @ApiProperty()
    // user_id ? : number = 0;    

    @Type(() => PotUserDto)
    @Expose()
    user: PotUserDto;
}



export class CollectionDto{

    static fromEntity(entity: Pot): CollectionDto {
        const potDto = new Pot();
        potDto.pot_name = entity.pot_name;
        potDto.pot_species = entity.pot_species;
        potDto.createdAt = entity.createdAt;
        potDto.deletedAt = entity.deletedAt;
        potDto.pot_img_url = entity.pot_img_url;
        potDto.happy_cnt = entity.happy_cnt;
        return potDto;
    }

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