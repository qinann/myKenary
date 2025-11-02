import { NextResponse, NextRequest } from 'next/server'
import { studentsData } from '@/mock/data/studentsData'
import type { UpdateStudentDto, Student } from '@/@types/student'

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const student = studentsData.find((s) => s.id === id)
        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 })
        }
        return NextResponse.json(student)
    } catch (error) {
        console.error('Error fetching student:', error)
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const body = (await request.json()) as UpdateStudentDto
        const idx = studentsData.findIndex((s) => s.id === id)
        if (idx === -1) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 })
        }

        const now = new Date().toISOString()
        const updated: Student = {
            ...studentsData[idx],
            ...body,
            updatedAt: now,
        }
        studentsData[idx] = updated
        return NextResponse.json(updated)
    } catch (error) {
        console.error('Error updating student:', error)
        return NextResponse.json({ error: 'Failed to update student' }, { status: 500 })
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const idx = studentsData.findIndex((s) => s.id === id)
        if (idx === -1) {
            // Return 200 to keep UI happy in mock environment
            return NextResponse.json({ message: 'Student already deleted or not found' })
        }

        studentsData.splice(idx, 1)
        return NextResponse.json({ message: 'Student deleted successfully' })
    } catch (error) {
        console.error('Error deleting student:', error)
        return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 })
    }
}

