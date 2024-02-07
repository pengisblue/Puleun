import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user-req.dto';
import { UserDetailDto, UserListDto } from './user-res.dto';
import { plainToInstance } from 'class-transformer';
import { AllUserDto } from 'src/user-login/user-login.dto';
import { Pot } from 'src/pot/pot.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    async save(data: CreateUserDto): Promise<number>{
        const user = this.userRepository.create(data)
        try{
            if (user.parent_id == 0) user.parent_id = null // parent_id==null인 경우 사용자 본인
            await this.userRepository.save(user)
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }

    async update(user_id: number, data: UpdateUserDto): Promise<number>{
        const user = await this.userRepository.findOneBy({user_id})

        if (!user) throw new HttpException('Bad_REQUEST', HttpStatus.NOT_FOUND)
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
}
