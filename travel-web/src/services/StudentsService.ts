import ApiService from './ApiService'
import type { Student, CreateStudentDto, UpdateStudentDto, StudentsResponse } from '@/@types/student'
import type { TableQueries } from '@/@types/common'

export async function getStudents(params?: TableQueries): Promise<StudentsResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.pageIndex) queryParams.append('page', params.pageIndex)
    if (params?.pageSize) queryParams.append('limit', params.pageSize)
    if (params?.query) queryParams.append('search', params.query)
    if (params?.sortKey) queryParams.append('sortBy', String(params.sortKey))
    if (params?.order) queryParams.append('order', params.order)

    const queryString = queryParams.toString()
    const url = queryString ? `/students?${queryString}` : '/students'

    return ApiService.fetchDataWithAxios<StudentsResponse>({
        url,
        method: 'get',
    })
}

export async function getStudent(id: string): Promise<Student> {
    return ApiService.fetchDataWithAxios<Student>({
        url: `/students/${id}`,
        method: 'get',
    })
}

export async function createStudent(data: CreateStudentDto): Promise<Student> {
    return ApiService.fetchDataWithAxios<Student>({
        url: '/students',
        method: 'post',
        data,
    })
}

export async function updateStudent(id: string, data: UpdateStudentDto): Promise<Student> {
    return ApiService.fetchDataWithAxios<Student>({
        url: `/students/${id}`,
        method: 'patch',
        data,
    })
}

export async function deleteStudent(id: string): Promise<void> {
    return ApiService.fetchDataWithAxios<void>({
        url: `/students/${id}`,
        method: 'delete',
    })
}

export async function uploadStudentsCsv(file: File): Promise<{ message: string; created: number }> {
    const formData = new FormData()
    formData.append('file', file)

    return ApiService.fetchDataWithAxios<{ message: string; created: number }>({
        url: '/students/upload-csv',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const StudentsService = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    uploadStudentsCsv,
}

export default StudentsService