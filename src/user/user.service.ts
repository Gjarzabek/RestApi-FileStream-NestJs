import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: any[];

    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
        this.users = [];
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }

    async findOne(username: string): Promise<any | undefined> {
        return this.users.find(user => user.name == username);
    }

    async create(userData: any): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const userId = Math.random(); // TODO: gen ID with proper lib

        this.users.push({
            id: userId,
            password: hashedPassword,
            name: userData.name
        });
        return true;
    }
}
