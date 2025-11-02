import { NextResponse, NextRequest } from 'next/server'
import { travelDashboardData } from '@/mock/data/travelDashboardData'

export async function GET() {
    try {
        // Transform bus data to match the expected format
        const buses = travelDashboardData.busData.map(bus => ({
            id: bus.id,
            name: bus.name,
            plateNumber: `B ${Math.floor(Math.random() * 9000) + 1000} ABC`,
            capacity: bus.capacity,
            occupancy: bus.occupied,
            currentLocation: bus.currentLocation,
            status: bus.status,
            driver: bus.driver,
            tourLeaders: ['Tour Leader ' + bus.id],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }))

        return NextResponse.json({
            data: buses,
            total: buses.length,
            page: 1,
            limit: 10
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const busData = await request.json()
        
        // Generate new ID
        const newId = `B${travelDashboardData.busData.length + 1}`
        
        // Create new bus object
        const newBus = {
            id: newId,
            name: busData.name,
            plateNumber: busData.plateNumber || `B ${Math.floor(Math.random() * 9000) + 1000} ABC`,
            capacity: busData.capacity,
            occupancy: busData.occupancy || 0,
            currentLocation: busData.currentLocation || 'Jakarta',
            status: busData.status || 'Available',
            driver: busData.driver || 'Belum ditentukan',
            tourLeaders: Array.isArray(busData.tourLeaders)
                ? busData.tourLeaders
                : (busData.tourLeader ? [busData.tourLeader] : [`Tour Leader ${newId}`]),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        // Add to mock data (in real app, this would be saved to database)
        travelDashboardData.busData.push({
            id: newId,
            name: busData.name,
            capacity: busData.capacity,
            occupied: busData.occupancy || 0,
            currentLocation: busData.currentLocation || 'Jakarta',
            status: busData.status || 'Available',
            driver: busData.driver || 'Belum ditentukan'
        })

        return NextResponse.json(newBus, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create bus' }, { status: 500 })
    }
}
