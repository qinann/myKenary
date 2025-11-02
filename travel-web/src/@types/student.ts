export interface Student {
    id: string
    name: string
    email: string
    phone: string
    school: string
    grade: string
    address: string
    emergencyContact: string
    status?: string
    joinDate?: string
    assignedBus?: string
    assignedHotel?: string
    medicalHistory?: string
    avatar?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateStudentDto {
    id: string
    name: string
    email: string
    phone: string
    school: string
    grade: string
    address: string
    emergencyContact: string
    status?: string
    joinDate?: string
    assignedBus?: string
    assignedHotel?: string
    medicalHistory?: string
    avatar?: string
}

export interface UpdateStudentDto {
    name?: string
    email?: string
    phone?: string
    school?: string
    grade?: string
    address?: string
    emergencyContact?: string
    status?: string
    joinDate?: string
    assignedBus?: string
    assignedHotel?: string
    medicalHistory?: string
    avatar?: string
}

export interface StudentsResponse {
    data: Student[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}