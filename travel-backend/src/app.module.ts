import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { TourLeadersModule } from './tour-leaders/tour-leaders.module';
import { DriversModule } from './drivers/drivers.module';
import { BusesModule } from './buses/buses.module';

@Module({
  imports: [AuthModule, StudentsModule, TourLeadersModule, DriversModule, BusesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
