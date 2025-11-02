import ApiService from './ApiService'
import type { Bus, CreateBusDto, UpdateBusDto, BusesResponse, UpdateBusOccupancyDto, UpdateBusLocationDto } from '@/@types/bus'
import type { DriversResponse } from '@/@types/driver'
import type { TourLeadersResponse } from '@/@types/tour-leader'
import type { TableQueries } from '@/@types/common'

export async function getBuses(params?: TableQueries): Promise<BusesResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.pageIndex) queryParams.append('page', params.pageIndex)
    if (params?.pageSize) queryParams.append('limit', params.pageSize)
    if (params?.query) queryParams.append('search', params.query)
    if (params?.sortKey) queryParams.append('sortBy', String(params.sortKey))
    if (params?.order) queryParams.append('order', params.order)

    const queryString = queryParams.toString()
    const url = queryString ? `/buses?${queryString}` : '/buses'

    return ApiService.fetchDataWithAxios<BusesResponse>({
        url,
        method: 'get',
    })
}

export async function getBus(id: string): Promise<Bus> {
    return ApiService.fetchDataWithAxios<Bus>({
        url: `/buses/${id}`,
        method: 'get',
    })
}

export async function createBus(data: CreateBusDto): Promise<Bus> {
    // Backend mewajibkan field `id` dan hanya menerima `tourLeader` (string),
    // sementara frontend memakai `tourLeaders` (string[]). Map agar kompatibel.
    const generatedId = data.id ?? (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`)

    const payload: any = {
        id: generatedId,
        name: data.name,
        plateNumber: data.plateNumber,
        capacity: data.capacity,
        occupancy: data.occupancy,
        currentLocation: data.currentLocation,
        status: data.status,
        driver: data.driver,
        route: data.route,
        fuelLevel: data.fuelLevel,
        lastMaintenance: data.lastMaintenance,
        nextMaintenance: data.nextMaintenance,
    }

    // Map `tourLeaders` array ke field tunggal `tourLeader` untuk backend
    if (Array.isArray(data.tourLeaders) && data.tourLeaders.length > 0) {
        payload.tourLeader = data.tourLeaders[0]
    }

    return ApiService.fetchDataWithAxios<Bus>({
        url: '/buses',
        method: 'post',
        data: payload,
    })
}

export async function updateBus(id: string, data: UpdateBusDto): Promise<Bus> {
    // Map kemungkinan `tourLeaders` (array) ke field tunggal `tourLeader` agar kompatibel dengan backend
    const payload: UpdateBusDto & { tourLeader?: string } = { ...data }
    if (Array.isArray((data as any).tourLeaders) && (data as any).tourLeaders.length > 0) {
        payload.tourLeader = (data as any).tourLeaders[0]
        // Opsional: hapus field array agar tidak ditolak oleh ValidationPipe forbidNonWhitelisted
        delete (payload as any).tourLeaders
    }

    return ApiService.fetchDataWithAxios<Bus, typeof payload>({
        url: `/buses/${id}`,
        method: 'patch',
        data: payload,
    })
}

export async function deleteBus(id: string): Promise<void> {
    return ApiService.fetchDataWithAxios<void>({
        url: `/buses/${id}`,
        method: 'delete',
    })
}

export async function updateBusOccupancy(id: string, data: UpdateBusOccupancyDto): Promise<Bus> {
    return ApiService.fetchDataWithAxios<Bus, UpdateBusOccupancyDto>({
        url: `/buses/${id}/occupancy`,
        method: 'patch',
        data,
    })
}

export async function updateBusLocation(id: string, data: UpdateBusLocationDto): Promise<Bus> {
    return ApiService.fetchDataWithAxios<Bus, UpdateBusLocationDto>({
        url: `/buses/${id}/location`,
        method: 'patch',
        data,
    })
}

export async function getDrivers(): Promise<any[]> {
    // Fetch drivers
    const res = await ApiService.fetchDataWithAxios<DriversResponse>({
        url: '/drivers',
        method: 'get',
    })

    // Fetch buses to compute current assignments
    const busesRes = await ApiService.fetchDataWithAxios<BusesResponse>({
        url: '/buses',
        method: 'get',
    })

    const assignedDriverMap = new Map<string, string>()
    ;(busesRes.data || []).forEach((b: any) => {
        if (b.driver) {
            assignedDriverMap.set(b.driver, b.name || b.id)
        }
    })

    return res.data.map(driver => ({
        ...driver,
        // Consider unavailable if driver is referenced by any bus
        isAvailable: !assignedDriverMap.has(driver.name),
        assignedBus: assignedDriverMap.get(driver.name) || null,
    }))
}

export async function getTourLeaders(): Promise<any[]> {
    // Fetch tour leaders (now include tl.bus when available)
    const res = await ApiService.fetchDataWithAxios<TourLeadersResponse>({
        url: '/tour-leaders',
        method: 'get',
    })

    // Fetch buses to compute fallback assignments when tl.bus tidak tersedia
    const busesRes = await ApiService.fetchDataWithAxios<BusesResponse>({
        url: '/buses',
        method: 'get',
    })

    const assignedTLMap = new Map<string, string>()
    ;(busesRes.data || []).forEach((b: any) => {
        const list: string[] = Array.isArray(b.tourLeaders)
            ? b.tourLeaders
            : (b.tourLeader ? [b.tourLeader] : [])
        list.forEach((tlName) => {
            if (tlName) {
                assignedTLMap.set(tlName, b.name || b.id)
            }
        })
    })

    return res.data.map(tl => {
        const assignedBusFromTL = (tl as any).bus || null
        const assignedBusFromBusList = assignedTLMap.get(tl.name) || null
        const finalAssignedBus = assignedBusFromTL ?? assignedBusFromBusList
        return {
            ...tl,
            isAvailable: !finalAssignedBus,
            assignedBus: finalAssignedBus,
        }
    })
}

const BusService = {
    getBuses,
    getBus,
    createBus,
    updateBus,
    deleteBus,
    updateBusOccupancy,
    updateBusLocation,
    getDrivers,
    getTourLeaders,
}

export default BusService
