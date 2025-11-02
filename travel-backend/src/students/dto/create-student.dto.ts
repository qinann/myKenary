import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  school: string;

  @IsString()
  grade: string;

  @IsString()
  address: string;

  @IsString()
  emergencyContact: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  joinDate?: string;

  @IsOptional()
  @IsString()
  assignedBus?: string;

  @IsOptional()
  @IsString()
  assignedHotel?: string;

  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}