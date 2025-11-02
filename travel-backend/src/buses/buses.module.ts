import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BusesController],
  providers: [BusesService, PrismaService],
})
export class BusesModule {}