import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async register(userData: any): Promise<any> {
        return await this.userService.create(userData);
    }

    async login(reqBody: any): Promise<any> {
        const user = await this.validateUser(reqBody.username, reqBody.password);
        if (!user) throw new UnauthorizedException();
        const payload = {username: user.username, id: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
