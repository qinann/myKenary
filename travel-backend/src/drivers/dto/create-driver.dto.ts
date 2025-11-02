import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  whatsapp: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  bus?: string;

  @IsOptional()
  @IsString()
  status?: string;
}