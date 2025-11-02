import { NextResponse, NextRequest } from 'next/server'
import { studentsData, searchAndPaginateStudents } from '@/mock/data/studentsData'
import type { CreateStudentDto, Student } from '@/@types/student'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = Number(searchParams.get('page') || 1)
    const limit = Number(searchParams.get('limit') || 10)
    const search = searchParams.get('search')

    try {
        const result = searchAndPaginateStudents(search, page, limit)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Error fetching students:', error)
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as CreateStudentDto

        if (!body || !body.id || !body.name) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
        }

        const exists = studentsData.find((s) => s.id === body.id)
        if (exists) {
            return NextResponse.json({ error: 'Student ID already exists' }, { status: 409 })
        }

        const now = new Date().toISOString()
        const newStudent: Student = {
            id: body.id,
            name: body.name,
            email: body.email,
            phone: body.phone,
            school: body.school,
            grade: body.grade,
            address: body.address,
            emergencyContact: body.emergencyContact,
            status: body.status || 'Active',
            joinDate: body.joinDate || now.split('T')[0],
            assignedBus: body.assignedBus,
            assignedHotel: body.assignedHotel,
            medicalHistory: body.medicalHistory,
            avatar: body.avatar || '/img/avatars/thumb-1.jpg',
            createdAt: now,
            updatedAt: now,
        }

        studentsData.push(newStudent)
        return NextResponse.json(newStudent)
    } catch (error) {
        console.error('Error creating student:', error)
        return NextResponse.json({ error: 'Failed to create student' }, { status: 500 })
    }
}

