import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { CreateSeatAssignmentDto, UpdateSeatAssignmentDto } from './dto/seat-assignment.dto';

@Injectable()
export class BusesService {
  constructor(private prisma: PrismaService) {}

  async create(createBusDto: CreateBusDto) {
    try {
      // Enforce that a driver or tour leader can only be assigned to one bus
      if (createBusDto.driver) {
        const existingDriverBus = await this.prisma.bus.findFirst({
          where: { driver: createBusDto.driver },
        });
        if (existingDriverBus) {
          throw new ConflictException('Driver is already assigned to another bus');
        }
      }

      if (createBusDto.tourLeader) {
        const existingTourLeaderBus = await this.prisma.bus.findFirst({
          where: { tourLeader: createBusDto.tourLeader },
        });
        if (existingTourLeaderBus) {
          throw new ConflictException('Tour Leader is already assigned to another bus');
        }
      }

      const bus = await this.prisma.bus.create({
        data: createBusDto,
      });
      return bus;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Bus with this information already exists');
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { plateNumber: { contains: search, mode: 'insensitive' as const } },
        { driver: { contains: search, mode: 'insensitive' as const } },
        { currentLocation: { contains: search, mode: 'insensitive' as const } },
        { route: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [buses, total] = await Promise.all([
      this.prisma.bus.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.bus.count({ where }),
    ]);

    return {
      data: buses,
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
    const bus = await this.prisma.bus.findUnique({
      where: { id },
    });

    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }

    return bus;
  }

  async update(id: string, updateBusDto: UpdateBusDto) {
    try {
      // Enforce uniqueness of driver and tour leader across buses (excluding current bus)
      if (updateBusDto.driver) {
        const existingDriverBus = await this.prisma.bus.findFirst({
          where: {
            driver: updateBusDto.driver,
            NOT: { id },
          },
        });
        if (existingDriverBus) {
          throw new ConflictException('Driver is already assigned to another bus');
        }
      }

      if (updateBusDto.tourLeader) {
        const existingTourLeaderBus = await this.prisma.bus.findFirst({
          where: {
            tourLeader: updateBusDto.tourLeader,
            NOT: { id },
          },
        });
        if (existingTourLeaderBus) {
          throw new ConflictException('Tour Leader is already assigned to another bus');
        }
      }

      const bus = await this.prisma.bus.update({
        where: { id },
        data: updateBusDto,
      });
      return bus;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Bus with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Bus with this information already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.bus.delete({
        where: { id },
      });
      return { message: `Bus with ID ${id} has been deleted` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Bus with ID ${id} not found`);
      }
      throw error;
    }
  }

  async updateOccupancy(id: string, occupancy: number) {
    try {
      const bus = await this.prisma.bus.update({
        where: { id },
        data: { occupancy },
      });
      return bus;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Bus with ID ${id} not found`);
      }
      throw error;
    }
  }

  async updateLocation(id: string, currentLocation: string) {
    try {
      const bus = await this.prisma.bus.update({
        where: { id },
        data: { currentLocation },
      });
      return bus;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Bus with ID ${id} not found`);
      }
      throw error;
    }
  }

  // Seat Assignment Methods
  async assignSeat(createSeatAssignmentDto: CreateSeatAssignmentDto) {
    const { busId, seatNumber, studentId, studentName, studentGrade, studentSchool } = createSeatAssignmentDto;

    // Check if bus exists
    const bus = await this.prisma.bus.findUnique({ where: { id: busId } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${busId} not found`);
    }

    // Check if student exists
    let student = await this.prisma.student.findUnique({ where: { id: studentId } });
    
    // If student doesn't exist and we have student data, create the student
    if (!student && studentName && studentGrade && studentSchool) {
      try {
        student = await this.prisma.student.create({
          data: {
            id: studentId,
            name: studentName,
            grade: studentGrade,
            school: studentSchool,
            status: 'active',
            joinDate: new Date(),
            // Set default values for required fields
            email: `${studentId}@student.temp`,
            phone: '-',
            address: '-',
            emergencyContact: '-',
          },
        });
      } catch (error) {
        if (error.code === 'P2002') {
          // Student was created by another request, fetch it
          student = await this.prisma.student.findUnique({ where: { id: studentId } });
        } else {
          throw error;
        }
      }
    }

    // If student still doesn't exist, throw error
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found. Please provide student data (name, grade, school) to auto-create the student.`);
    }

    try {
      const seatAssignment = await this.prisma.seatAssignment.create({
        data: {
          busId,
          seatNumber,
          studentId,
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              grade: true,
              school: true,
            },
          },
        },
      });

      // Update bus occupancy
      await this.updateOccupancyFromAssignments(busId);

      return seatAssignment;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Seat is already occupied or student is already assigned to a seat in this bus');
      }
      throw error;
    }
  }

  async getSeatAssignments(busId: string) {
    const bus = await this.prisma.bus.findUnique({ where: { id: busId } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${busId} not found`);
    }

    const assignments = await this.prisma.seatAssignment.findMany({
      where: { busId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            grade: true,
            school: true,
          },
        },
      },
      orderBy: { seatNumber: 'asc' },
    });

    return assignments;
  }

  async getSeatAssignment(busId: string, seatNumber: number) {
    const assignment = await this.prisma.seatAssignment.findUnique({
      where: {
        busId_seatNumber: {
          busId,
          seatNumber,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            grade: true,
            school: true,
          },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException(`No student assigned to seat ${seatNumber} in bus ${busId}`);
    }

    return assignment;
  }

  async removeSeatAssignment(busId: string, seatNumber: number) {
    try {
      await this.prisma.seatAssignment.delete({
        where: {
          busId_seatNumber: {
            busId,
            seatNumber,
          },
        },
      });

      // Update bus occupancy
      await this.updateOccupancyFromAssignments(busId);

      return { message: `Student removed from seat ${seatNumber}` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No student assigned to seat ${seatNumber} in bus ${busId}`);
      }
      throw error;
    }
  }

  async updateSeatAssignment(busId: string, seatNumber: number, updateSeatAssignmentDto: UpdateSeatAssignmentDto) {
    const { studentId } = updateSeatAssignmentDto;

    // Check if student exists
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    try {
      const assignment = await this.prisma.seatAssignment.update({
        where: {
          busId_seatNumber: {
            busId,
            seatNumber,
          },
        },
        data: { studentId },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              grade: true,
              school: true,
            },
          },
        },
      });

      return assignment;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`No student assigned to seat ${seatNumber} in bus ${busId}`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Student is already assigned to another seat in this bus');
      }
      throw error;
    }
  }

  private async updateOccupancyFromAssignments(busId: string) {
    const count = await this.prisma.seatAssignment.count({
      where: { busId },
    });

    await this.prisma.bus.update({
      where: { id: busId },
      data: { occupancy: count },
    });
  }
}
