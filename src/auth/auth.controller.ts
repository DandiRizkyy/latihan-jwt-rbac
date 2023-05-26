import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUser } from './dto/create-user.dto';
import { AuthGuard, RoleGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard)
  @Post('login')
  async login(@Body('email') email:string, @Body('password') password:string) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUser) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}