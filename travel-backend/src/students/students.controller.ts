import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import csv from 'csv-parser';
import { Readable } from 'stream';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.studentsService.findAll(pageNumber, limitNumber, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

<<<<<<< HEAD
=======
  // Danger: bulk delete all students (place before ':id' to avoid route clash)
  @Delete('all')
  removeAll() {
    return this.studentsService.removeAll();
  }

>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
      throw new BadRequestException('File must be a CSV');
    }

    const students: CreateStudentDto[] = [];
    
    return new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer);
      
      stream
        .pipe(csv())
        .on('data', (row) => {
          // Map CSV columns to student object
          const student: CreateStudentDto = {
            id: row.id || row.ID,
            name: row.name || row.Name,
            email: row.email || row.Email,
            phone: row.phone || row.Phone,
            school: row.school || row.School,
            grade: row.grade || row.Grade,
            address: row.address || row.Address,
            emergencyContact: row.emergencyContact || row['Emergency Contact'] || row.emergency_contact,
            status: row.status || row.Status || 'active',
            joinDate: row.joinDate || row['Join Date'] || row.join_date,
            assignedBus: row.assignedBus || row['Assigned Bus'] || row.assigned_bus,
            assignedHotel: row.assignedHotel || row['Assigned Hotel'] || row.assigned_hotel,
            medicalHistory: row.medicalHistory || row['Medical History'] || row.medical_history,
            avatar: row.avatar || row.Avatar,
          };
          
<<<<<<< HEAD
          // Validate required fields
          if (student.id && student.name && student.email && student.phone && 
              student.school && student.grade && student.address && student.emergencyContact) {
            students.push(student);
=======
          // Loosen validation: accept rows with at least ID and Name,
          // fill defaults for missing required fields to satisfy DB constraints
          if (student.id) {
            const normalized: CreateStudentDto = {
              ...student,
              name: student.name || `Unknown-${student.id}`,
              email: student.email || `${String(student.id).toLowerCase()}@students.local`,
              phone: student.phone || '-',
              school: student.school || '-',
              grade: student.grade || '-',
              address: student.address || '-',
              emergencyContact: student.emergencyContact || '-',
              status: student.status || 'active',
            };
            students.push(normalized);
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
          }
        })
        .on('end', async () => {
          try {
            if (students.length === 0) {
              throw new BadRequestException('No valid student data found in CSV');
            }
            
            const result = await this.studentsService.createMany(students);
            resolve({
              message: `Successfully processed ${students.length} students`,
              created: result.count,
              skipped: students.length - result.count,
            });
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(new BadRequestException(`Error parsing CSV: ${error.message}`));
        });
    });
  }
}