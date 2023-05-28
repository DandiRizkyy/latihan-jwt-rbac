import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUser } from './dto/create-user.dto';
import { AuthGuard, RoleGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard)
  @Post('login/user')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.loginUser(email, password);
  }

  @Post('register/user')
  async registerUser(@Body() createUserDto: CreateUser) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login/admin')
  async loginAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.loginAdmin(email, password);
  }

  @Post('register/admin')
  async registerAdmin(@Body() createUserDto: CreateUser) {
    return this.authService.registerAdmin(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profileuser')
  getProfileUser(@Request() req) {
    return req.user;
  }

  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get('profileadmin')
  getProfileAdmin(@Request() req) {
    return req.user;
  }
}
