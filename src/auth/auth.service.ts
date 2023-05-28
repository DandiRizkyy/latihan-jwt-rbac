import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUser } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { instanceToPlain } from 'class-transformer';
import { CreateAdmin } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  private readonly bcryptRound: number;
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {
    this.bcryptRound = parseInt(process.env['BCRYPT_SALT_ROUND']) || 10;
  }

  // Business Logic Register User
  async registerUser(createUserDto: CreateUser) {
    const hashPassword = bcrypt.hashSync(
      createUserDto.password,
      this.bcryptRound,
    );
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: hashPassword,
          roles: createUserDto.roles,
        },
      });

      return instanceToPlain(user, { excludePrefixes: ['password'] });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  // Business Logic Login User
  async loginUser(loginUserDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const isPasswordMatch = bcrypt.compareSync(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const payload = { userId: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Business Logic Register Admin
  async registerAdmin(createAdminDto: CreateAdmin) {
    const hashPassword = bcrypt.hashSync(
      createAdminDto.password,
      this.bcryptRound,
    );
    try {
      const admin = await this.prismaService.admin.create({
        data: {
          email: createAdminDto.email,
          password: hashPassword,
          roles: createAdminDto.roles,
        },
      });

      return instanceToPlain(admin, { excludePrefixes: ['password'] });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  // Business Logic Login Admin
  async loginAdmin(loginAdminDto: LoginDto) {
    const admin = await this.prismaService.admin.findUnique({
      where: { email: loginAdminDto.email },
    });
    if (!admin) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const isPasswordMatch = bcrypt.compareSync(
      loginAdminDto.password,
      admin.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    const payload = { adminId: admin.id, roles: admin.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
