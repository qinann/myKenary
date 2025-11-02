import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { CreateSeatAssignmentDto, UpdateSeatAssignmentDto } from './dto/seat-assignment.dto';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.busesService.findAll(pageNumber, limitNumber, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busesService.update(id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busesService.remove(id);
  }

  @Patch(':id/occupancy')
  updateOccupancy(
    @Param('id') id: string,
    @Body('occupancy') occupancy: number,
  ) {
    return this.busesService.updateOccupancy(id, occupancy);
  }

  @Patch(':id/location')
  updateLocation(
    @Param('id') id: string,
    @Body('currentLocation') currentLocation: string,
  ) {
    return this.busesService.updateLocation(id, currentLocation);
  }

  // Seat Assignment Endpoints
  @Post('seat-assignments')
  assignSeat(@Body() createSeatAssignmentDto: CreateSeatAssignmentDto) {
    return this.busesService.assignSeat(createSeatAssignmentDto);
  }

  @Get(':id/seat-assignments')
  getSeatAssignments(@Param('id') busId: string) {
    return this.busesService.getSeatAssignments(busId);
  }

  @Get(':id/seats/:seatNumber')
  getSeatAssignment(
    @Param('id') busId: string,
    @Param('seatNumber') seatNumber: string,
  ) {
    const seatNum = parseInt(seatNumber, 10);
    return this.busesService.getSeatAssignment(busId, seatNum);
  }

  @Delete(':id/seats/:seatNumber')
  removeSeatAssignment(
    @Param('id') busId: string,
    @Param('seatNumber') seatNumber: string,
  ) {
    const seatNum = parseInt(seatNumber, 10);
    return this.busesService.removeSeatAssignment(busId, seatNum);
  }

  @Patch(':id/seats/:seatNumber')
  updateSeatAssignment(
    @Param('id') busId: string,
    @Param('seatNumber') seatNumber: string,
    @Body() updateSeatAssignmentDto: UpdateSeatAssignmentDto,
  ) {
    const seatNum = parseInt(seatNumber, 10);
    return this.busesService.updateSeatAssignment(busId, seatNum, updateSeatAssignmentDto);
  }
}