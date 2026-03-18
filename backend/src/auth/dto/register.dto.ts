import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum Role {
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}