import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { async } from 'rxjs';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    useFactory: async()=>({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' }
    }),
  })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
