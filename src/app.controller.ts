import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
      private readonly authService: AuthService,
      private readonly appService: AppService,
    ) {}

  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/upload')
  async filterCsv(@Request() req, @Response() res) {
    return this.appService.streamCsv(req, res);
  }
}
 