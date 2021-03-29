import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

    async findAll() {
        return await this.userRepo.find();
    }

    async findOne(username: string): Promise<any | undefined> {
        const user: UserEntity = await this.userRepo.findOne({username: username})
        return user;
    }

    async create(userData: any): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        try {
            await this.userRepo.insert({
                username: userData.username,
                firstname: userData.firstname,
                lastname: userData.lastname,
                password: hashedPassword
            });
        }
        catch {
            throw new BadRequestException("Username busy");
        }

        return true;
    }
}
