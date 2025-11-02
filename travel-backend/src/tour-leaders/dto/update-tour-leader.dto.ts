import { PartialType } from '@nestjs/mapped-types';
import { CreateTourLeaderDto } from './create-tour-leader.dto';

export class UpdateTourLeaderDto extends PartialType(CreateTourLeaderDto) {}