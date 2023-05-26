import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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

  // register user
  async registerUser(createUserDto: CreateUser) {
    try{
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          roles: createUserDto.roles,
        }
      })
     
      return user;
    } catch(error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
    
  }

  // login user
  async loginUser(email: string, password: string) {
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

  
  // register admin
  async registerAdmin(createUserDto: CreateUser) {
    try{
      const user = await this.prismaService.admin.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          roles: createUserDto.roles,
        }
      })

      return user;
    } catch(error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
    
  }

  //login admin
  async loginAdmin(email: string, password: string) {
    const user = await this.prismaService.admin.findUnique({
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


}