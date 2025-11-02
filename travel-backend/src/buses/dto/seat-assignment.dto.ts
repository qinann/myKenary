import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateSeatAssignmentDto {
  @IsString()
  busId: string;

  @IsNumber()
  @Min(1)
  @Max(52)
  seatNumber: number;

  @IsString()
  studentId: string;

  // Optional student data for auto-creation if student doesn't exist
  @IsOptional()
  @IsString()
  studentName?: string;

  @IsOptional()
  @IsString()
  studentGrade?: string;

  @IsOptional()
  @IsString()
  studentSchool?: string;
}

export class UpdateSeatAssignmentDto {
  @IsString()
  studentId: string;
}