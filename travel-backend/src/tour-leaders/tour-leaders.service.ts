import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTourLeaderDto } from './dto/create-tour-leader.dto';
import { UpdateTourLeaderDto } from './dto/update-tour-leader.dto';

@Injectable()
export class TourLeadersService {
  constructor(private prisma: PrismaService) {}

  async create(createTourLeaderDto: CreateTourLeaderDto) {
    try {
      const tourLeader = await this.prisma.tourLeader.create({
        data: createTourLeaderDto,
      });
      return tourLeader;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Tour Leader with this information already exists');
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [tourLeaders, total] = await Promise.all([
      this.prisma.tourLeader.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.tourLeader.count({ where }),
    ]);

    return {
      data: tourLeaders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const tourLeader = await this.prisma.tourLeader.findUnique({
      where: { id },
    });

    if (!tourLeader) {
      throw new NotFoundException(`Tour Leader with ID ${id} not found`);
    }

    return tourLeader;
  }

  async update(id: string, updateTourLeaderDto: UpdateTourLeaderDto) {
    try {
      const tourLeader = await this.prisma.tourLeader.update({
        where: { id },
        data: updateTourLeaderDto,
      });
      return tourLeader;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Tour Leader with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Tour Leader with this information already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.tourLeader.delete({
        where: { id },
      });
      return { message: `Tour Leader with ID ${id} has been deleted` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Tour Leader with ID ${id} not found`);
      }
      throw error;
    }
  }
}