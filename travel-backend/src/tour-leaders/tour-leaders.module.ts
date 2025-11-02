import { Module } from '@nestjs/common';
import { TourLeadersController } from './tour-leaders.controller';
import { TourLeadersService } from './tour-leaders.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TourLeadersController],
  providers: [TourLeadersService, PrismaService],
})
export class TourLeadersModule {}