import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    try {
      const driver = await this.prisma.driver.create({
        data: createDriverDto,
      });
      return driver;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Driver with this information already exists');
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

    const [drivers, total] = await Promise.all([
      this.prisma.driver.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.driver.count({ where }),
    ]);

    return {
      data: drivers,
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
    const driver = await this.prisma.driver.findUnique({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    try {
      const driver = await this.prisma.driver.update({
        where: { id },
        data: updateDriverDto,
      });
      return driver;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Driver with this information already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.driver.delete({
        where: { id },
      });
      return { message: `Driver with ID ${id} has been deleted` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Driver with ID ${id} not found`);
      }
      throw error;
    }
  }
}