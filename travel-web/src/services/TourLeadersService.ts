import ApiService from './ApiService'
import type { TourLeader, CreateTourLeaderDto, UpdateTourLeaderDto, TourLeadersResponse } from '@/@types/tour-leader'
import type { TableQueries } from '@/@types/common'

export async function getTourLeaders(params?: TableQueries): Promise<TourLeadersResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.pageIndex) queryParams.append('page', params.pageIndex)
    if (params?.pageSize) queryParams.append('limit', params.pageSize)
    if (params?.query) queryParams.append('search', params.query)
    if (params?.sortKey) queryParams.append('sortBy', String(params.sortKey))
    if (params?.order) queryParams.append('order', params.order)

    const queryString = queryParams.toString()
    const url = queryString ? `/tour-leaders?${queryString}` : '/tour-leaders'

    return ApiService.fetchDataWithAxios<TourLeadersResponse>({
        url,
        method: 'get',
    })
}

export async function getTourLeader(id: string): Promise<TourLeader> {
    return ApiService.fetchDataWithAxios<TourLeader>({
        url: `/tour-leaders/${id}`,
        method: 'get',
    })
}

export async function createTourLeader(data: CreateTourLeaderDto): Promise<TourLeader> {
    return ApiService.fetchDataWithAxios<TourLeader>({
        url: '/tour-leaders',
        method: 'post',
        data,
    })
}

export async function updateTourLeader(id: string, data: UpdateTourLeaderDto): Promise<TourLeader> {
    return ApiService.fetchDataWithAxios<TourLeader>({
        url: `/tour-leaders/${id}`,
        method: 'patch',
        data,
    })
}

export async function deleteTourLeader(id: string): Promise<void> {
    return ApiService.fetchDataWithAxios<void>({
        url: `/tour-leaders/${id}`,
        method: 'delete',
    })
}

const TourLeadersService = {
    getTourLeaders,
    getTourLeader,
    createTourLeader,
    updateTourLeader,
    deleteTourLeader,
}

export default TourLeadersService