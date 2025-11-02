export interface TourLeader {
    id: string
    name: string
    phone: string
    whatsapp: string
    email?: string
    bus?: string
    status?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateTourLeaderDto {
    name: string
    phone: string
    whatsapp: string
    email?: string
    bus?: string
    status?: string
}

export interface UpdateTourLeaderDto {
    name?: string
    phone?: string
    whatsapp?: string
    email?: string
    bus?: string
    status?: string
}

export interface TourLeadersResponse {
    data: TourLeader[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}
