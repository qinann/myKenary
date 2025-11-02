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
import { TourLeadersService } from './tour-leaders.service';
import { CreateTourLeaderDto } from './dto/create-tour-leader.dto';
import { UpdateTourLeaderDto } from './dto/update-tour-leader.dto';

@Controller('tour-leaders')
export class TourLeadersController {
  constructor(private readonly tourLeadersService: TourLeadersService) {}

  @Post()
  create(@Body() createTourLeaderDto: CreateTourLeaderDto) {
    return this.tourLeadersService.create(createTourLeaderDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.tourLeadersService.findAll(pageNumber, limitNumber, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourLeadersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourLeaderDto: UpdateTourLeaderDto) {
    return this.tourLeadersService.update(id, updateTourLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourLeadersService.remove(id);
  }
}