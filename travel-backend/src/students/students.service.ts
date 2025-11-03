import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.prisma.student.create({
        data: {
          ...createStudentDto,
          joinDate: createStudentDto.joinDate ? new Date(createStudentDto.joinDate) : new Date(),
        },
      });
      return student;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Student with this ID or email already exists');
      }
      throw error;
    }
  }

<<<<<<< HEAD
=======
  async removeAll() {
    // Delete all students; seat assignments referencing students will cascade
    return this.prisma.student.deleteMany({});
  }

>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { id: { contains: search, mode: 'insensitive' as const } },
        { school: { contains: search, mode: 'insensitive' as const } },
        { grade: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students,
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
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.prisma.student.update({
        where: { id },
        data: {
          ...updateStudentDto,
          joinDate: updateStudentDto.joinDate ? new Date(updateStudentDto.joinDate) : undefined,
        },
      });
      return student;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Student with this email already exists');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.student.delete({
        where: { id },
      });
      return { message: `Student with ID ${id} has been deleted` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      throw error;
    }
  }

  async createMany(students: CreateStudentDto[]) {
    try {
      const result = await this.prisma.student.createMany({
        data: students.map(student => ({
          ...student,
          joinDate: student.joinDate ? new Date(student.joinDate) : new Date(),
        })),
        skipDuplicates: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}