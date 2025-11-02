export interface Bus {
    id: string
    name: string
    plateNumber: string
    capacity: number
    occupancy: number
    currentLocation?: string
    status: string
    driver?: string
    tourLeaders?: string[]
    route?: string
    fuelLevel?: number
    lastMaintenance?: string
    nextMaintenance?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateBusDto {
    id?: string
    name: string
    plateNumber: string
    capacity: number
    occupancy?: number
    currentLocation?: string
    status: string
    driver?: string
    tourLeaders?: string[]
    route?: string
    fuelLevel?: number
    lastMaintenance?: string
    nextMaintenance?: string
}

export interface UpdateBusDto {
    name?: string
    plateNumber?: string
    capacity?: number
    occupancy?: number
    currentLocation?: string
    status?: string
    driver?: string
    tourLeaders?: string[]
    route?: string
    fuelLevel?: number
    lastMaintenance?: string
    nextMaintenance?: string
}

export interface BusesResponse {
    data: Bus[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

export interface UpdateBusOccupancyDto {
    occupancy: number
}

export interface UpdateBusLocationDto {
    currentLocation: string
}
