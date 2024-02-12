import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildSaveDto, CreateUserDto, UpdateUserDto, UserWithUserLoginDto } from './user-req.dto';
import { SimpleUserListDto, UserDetailDto, UserListDto } from './user-res.dto';
import { plainToInstance } from 'class-transformer';
import { AllUserDto } from 'src/user-login/user-login.dto';
import { Pot } from 'src/pot/pot.entity';
import { UserWithAlarmDto } from 'src/alarm/alarm-res.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findByParent(user_id: number):Promise<UserListDto[]>{
        const child = await this.userRepository.findBy({parent_id:user_id})
        child.push( await this.userRepository.findOneBy({user_id}) )
        return plainToInstance(UserListDto, child);
    }

    async find(user_id: number): Promise<UserDetailDto>{
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.user_id= :user_id', {user_id})
            .leftJoinAndSelect('user.pots', 'pot', 'pot.user_id = user.user_id')
            .select(['user', 'pot.pot_id', 'pot.pot_name', 'pot.pot_species'])
            .getOne()
        
        if (!user) throw new HttpException('Check User_Id', HttpStatus.BAD_REQUEST)
        
        return user;
    }

    async save(data: CreateUserDto, file?: Express.Multer.File): Promise<number>{
        await this.userRepository.save(data);
        const [user] = await this.userRepository.find({where:{...data},take:1})
        const filePath = join(process.cwd(), '/upload/profile/')
        if (!fs.existsSync(filePath)) fs.mkdir(filePath, (e)=>{if (e) throw e})
        await this.userRepository.save(user)
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const fileName = user.user_id + '.' + extension
            fs.writeFileSync(filePath+fileName, file.buffer);
            user.profile_img_url = filePath+fileName
        } catch (e){
            user.profile_img_url = join(process.cwd(), '/upload/profile/noImg.png')
        }
        await this.userRepository.update(user.user_id,{...user})
        return user.user_id;
    }

    async saveChild(data: ChildSaveDto, file?: Express.Multer.File): Promise<number>{   
        const child = this.userRepository.create(data);
        try{            
            await this.userRepository.save(data)            
            try{
                const split = file.originalname.split('.')
                const extension = split[split.length -1]
                const filePath = join(process.cwd(), '/upload/profile/')
                const fileName = child.user_id + '.' + extension
                fs.writeFileSync(filePath+fileName, file.buffer);
                data.profile_img_url = filePath+fileName
            } catch (e){
                data.profile_img_url = join(process.cwd(), '/upload/profile/noImg.png')
            }
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }


    async update(user_id: number, data: UpdateUserDto, file?: Express.Multer.File): Promise<number>{
        const user = await this.userRepository.findOneBy({user_id})
        if (!user) throw new HttpException('Bad_REQUEST', HttpStatus.NOT_FOUND)
        
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const filePath = join(process.cwd(), '/upload/profile/')
            const fileName = user.user_id + '.' + extension
            fs.writeFileSync(filePath+fileName, file.buffer);
            data.profile_img_url = filePath+fileName
        } catch (e){
            data.profile_img_url = join(process.cwd(), '/upload/profile/noImg.png')
        }
        try{
            this.userRepository.update(user_id, {...data})
            return 1;
        }catch (e){
            return -1;
        }
    }

    async delete(user_id: number): Promise<number>{
        try {
            await this.userRepository.delete(user_id)
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }

    async findPot(user_id: number): Promise<User>{
        const user: User = await this.userRepository.createQueryBuilder('user')
            .where('user.user_id= :user_id', {user_id})
            .leftJoinAndSelect('user.pots', 'pot', 'pot.user_id=user.user_id')
            .select([
                'user', 'pot.pot_id', 'pot.pot_name', 'pot.pot_species'
            ])
            .getOne()
        return user;
    }

    async findByUserIdInTalk(user_id: number): Promise<User>{
        return await this.userRepository.findOne({
            relations: {talk: true},
            where: {user_id: user_id},
        })
    }

    // 화분이 없는 유저 목록
    async unMappingUser(user_id: number): Promise<UserListDto[]>{
        const result = await this.userRepository
            .createQueryBuilder('user')
            .where((qb: SelectQueryBuilder<User>) => {
                const subQuery = qb
                .subQuery()
                .select('pot.user_id')
                .from(Pot, 'pot')
                .where('pot.user_id = user.user_id')
                .getQuery();
                return `user.user_id NOT IN ${subQuery}`;
            })
            .andWhere('user.user_id= :user_id', {user_id})
            .select(['user.user_id', 'user.nickname'])
            .getMany();
        return result;
    }

    async findUserWithInfo(): Promise<AllUserDto[]>{
        const result = await this.userRepository.find({
            relations: {userLogin: true}
        });
        return result;
    }

    async findAllUser(): Promise<User[]>{
        return await this.userRepository.find({
            relations: {pots: true}
        })
    }

    async simpleUserList(user_id: number): Promise<SimpleUserListDto[]>{
        const dtos = new Array<SimpleUserListDto>();
        const dto = await this.userRepository.createQueryBuilder('user')
            .select(['user.user_id', 'user.nickname', 'user.profile_img_url',
                    'pot.pot_id', 'pot.pot_name', 'pot.pot_img_url', 'user.parent_id'])
            .leftJoin('user.pots', 'pot', 'user.user_id = pot.user_id')
            .where('user.user_id= :user_id', {user_id})
            .orWhere('user.parent_id= :user_id', {user_id})
            .getMany();

        for(let i = 0; i < dto.length; i++){
            const tempDto = new SimpleUserListDto();
            const element = dto[i];

            element.pots.forEach(pot => {
                tempDto.pot_id = pot.pot_id;
                tempDto.pot_img_url = pot.pot_img_url;
                tempDto.pot_name = pot.pot_name;
            });

            tempDto.user_id = element.user_id;
            tempDto.nickname = element.nickname;
            tempDto.profile_img_url = element.profile_img_url;
            tempDto.parent_id = element.parent_id;
            dtos.push(tempDto);
        }
        return dtos;
    }


    // user의 모든 알람을 표시
    // alarm controller에서 사용중
    async allAlarmOfUser(user_id: number): Promise<UserWithAlarmDto[]>{
        const dtos = new Array<UserWithAlarmDto>();
        const result = await this.userRepository.createQueryBuilder('user')
            .where('user.user_id= :user_id', {user_id})
            .orWhere('user.parent_id= :user_id', {user_id})
            .leftJoin('user.pots', 'pot', 'user.user_id=pot.user_id')
            .leftJoinAndSelect('pot.alarm', 'alarm', 'pot.pot_id=alarm.pot_id')
            .select(['user', 'pot', 'alarm'])
            .getMany();

        // result.forEach(arr => {
        //     const dto = new UserWithAlarmDto();
        //     dto.user_id = arr.user_id;
        //     dto.nickname = arr.nickname;            
        //     arr.pots.forEach(pot =>{
        //         dto.pot_id = pot.pot_id;
        //         dto.pot_name = pot.pot_name;
        //         pot.alarm.forEach(alarm => {
        //             dto.alarm_id = alarm.alarm_id
        //             dto.alarm_name = alarm.alarm_name
        //             dto.alarm_content = alarm.alarm_content
        //             dto.active_FG = alarm.active_FG
        //             dto.alarm_date = alarm.alarm_date
        //             dto.routine = alarm.routine
        //         })
        //     });
        //     dtos.push(dto);
        // })

        result.forEach(arr => {
            const userDto = plainToInstance(UserWithAlarmDto, arr, {excludeExtraneousValues: true});
            dtos.push(userDto);
        })

        return dtos;
    }
}
