export interface Driver {
    id: string
    name: string
    phone: string
    whatsapp: string
    email?: string
    status?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateDriverDto {
    name: string
    phone: string
    whatsapp: string
    email?: string
    status?: string
}

export interface UpdateDriverDto {
    name?: string
    phone?: string
    whatsapp?: string
    email?: string
    status?: string
}

export interface DriversResponse {
    data: Driver[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}