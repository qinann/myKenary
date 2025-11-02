import type { Student } from '@/@types/student'

// In-memory mock data for students used by Next.js API routes
export const studentsData: Student[] = [
    {
        id: 'STD001',
        name: 'Andi Saputra',
        email: 'andi.saputra@email.com',
        phone: '+62812-0000-0001',
        school: 'SMA Negeri 1 Jakarta',
        grade: 'X IPA 1',
        address: 'Jakarta',
        emergencyContact: '+62812-1111-1111',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        assignedBus: 'BUS001',
        assignedHotel: 'HTL001',
        medicalHistory: '',
        avatar: '/img/avatars/thumb-1.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'STD002',
        name: 'Budi Santoso',
        email: 'budi.santoso@email.com',
        phone: '+62812-0000-0002',
        school: 'SMA Negeri 2 Bandung',
        grade: 'XI IPS 2',
        address: 'Bandung',
        emergencyContact: '+62812-2222-2222',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        assignedBus: 'BUS002',
        assignedHotel: 'HTL001',
        medicalHistory: '',
        avatar: '/img/avatars/thumb-2.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'STD003',
        name: 'Cindy Paramitha',
        email: 'cindy.paramitha@email.com',
        phone: '+62812-0000-0003',
        school: 'SMA Negeri 3 Surabaya',
        grade: 'XII IPA 3',
        address: 'Surabaya',
        emergencyContact: '+62812-3333-3333',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        assignedBus: 'A1',
        assignedHotel: 'HTL002',
        medicalHistory: '',
        avatar: '/img/avatars/thumb-3.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

export function searchAndPaginateStudents(
    query: string | null,
    page: number,
    limit: number,
) {
    const q = (query || '').toLowerCase()
    const filtered = studentsData.filter((s) => {
        if (!q) return true
        return (
            s.name.toLowerCase().includes(q) ||
            s.school.toLowerCase().includes(q) ||
            s.grade.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q)
        )
    })

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)

    return {
        data,
        pagination: {
            page: safePage,
            limit,
            total,
            totalPages,
            hasNext: safePage < totalPages,
            hasPrev: safePage > 1,
        },
    }
}

