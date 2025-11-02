import ApiService from './ApiService'
import type { Driver, CreateDriverDto, UpdateDriverDto, DriversResponse } from '@/@types/driver'
import type { TableQueries } from '@/@types/common'

export async function getDrivers(params?: TableQueries): Promise<DriversResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.pageIndex) queryParams.append('page', params.pageIndex)
    if (params?.pageSize) queryParams.append('limit', params.pageSize)
    if (params?.query) queryParams.append('search', params.query)
    if (params?.sortKey) queryParams.append('sortBy', String(params.sortKey))
    if (params?.order) queryParams.append('order', params.order)

    const queryString = queryParams.toString()
    const url = queryString ? `/drivers?${queryString}` : '/drivers'

    return ApiService.fetchDataWithAxios<DriversResponse>({
        url,
        method: 'get',
    })
}

export async function getDriver(id: string): Promise<Driver> {
    return ApiService.fetchDataWithAxios<Driver>({
        url: `/drivers/${id}`,
        method: 'get',
    })
}

export async function createDriver(data: CreateDriverDto): Promise<Driver> {
    return ApiService.fetchDataWithAxios<Driver>({
        url: '/drivers',
        method: 'post',
        data,
    })
}

export async function updateDriver(id: string, data: UpdateDriverDto): Promise<Driver> {
    return ApiService.fetchDataWithAxios<Driver>({
        url: `/drivers/${id}`,
        method: 'patch',
        data,
    })
}

export async function deleteDriver(id: string): Promise<void> {
    return ApiService.fetchDataWithAxios<void>({
        url: `/drivers/${id}`,
        method: 'delete',
    })
}

const DriversService = {
    getDrivers,
    getDriver,
    createDriver,
    updateDriver,
    deleteDriver,
}

export default DriversService