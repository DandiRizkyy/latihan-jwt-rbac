import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../enums/user.enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdmin {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  roles?: Role;
}
