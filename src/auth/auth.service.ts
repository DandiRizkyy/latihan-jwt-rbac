import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUser } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  // async validateUser(email: string, password: string) {
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (user && bcrypt.compareSync(password, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }

  //   return null;
  // }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {email: email}
    });
    if(!user){
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const isPasswordValid = await this.prismaService.user.findFirst({
      where: {password: password}
    });

    if(!isPasswordValid){
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const payload = { userId: user.id, roles: user.roles }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUser) {
    const user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        roles: createUserDto.roles,
      }
    })
    const payload = {userId: user.id, role: user.roles}
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser() {
    
  }
}