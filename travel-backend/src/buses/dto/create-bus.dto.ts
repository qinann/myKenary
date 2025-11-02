import { IsString, IsOptional, IsInt, IsDateString, Min, Max } from 'class-validator';

export class CreateBusDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  plateNumber?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  capacity?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  occupancy?: number;

  @IsOptional()
  @IsString()
  currentLocation?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  driver?: string;

  @IsOptional()
  @IsString()
  tourLeader?: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  fuelLevel?: number;

  @IsOptional()
  @IsDateString()
  lastMaintenance?: string;

  @IsOptional()
  @IsDateString()
  nextMaintenance?: string;
}