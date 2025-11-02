import { NextResponse, NextRequest } from 'next/server'
import { travelDashboardData } from '@/mock/data/travelDashboardData'

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        // Find bus by ID
        const busData = travelDashboardData.busData.find(bus => bus.id === id)
        
        if (!busData) {
            return NextResponse.json({ error: 'Bus not found' }, { status: 404 })
        }

        // Transform bus data to match the expected format
        const bus = {
            id: busData.id,
            name: busData.name,
            plateNumber: `B ${Math.floor(Math.random() * 9000) + 1000} ABC`,
            capacity: busData.id === 'A1' ? 52 : busData.capacity, // Set capacity to 52 for bus A1
            occupancy: busData.id === 'A1' ? 35 : busData.occupied, // Set occupancy to 35 for bus A1
            currentLocation: busData.currentLocation,
            status: busData.id === 'A1' ? 'Available' : busData.status, // Set status to Available for bus A1
            driver: busData.id === 'A1' ? 'Ahmad Susanto' : busData.driver, // Set driver to Ahmad Susanto for bus A1
            tourLeaders: [`Tour Leader ${busData.id}`, `Pendamping ${busData.id}`],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        return NextResponse.json({
            data: bus
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const updateData = await request.json()
        
        // Find bus index in mock data
        const busIndex = travelDashboardData.busData.findIndex(bus => bus.id === id)
        
        if (busIndex === -1) {
            return NextResponse.json({ error: 'Bus not found' }, { status: 404 })
        }

        // Update bus data in mock data
        const currentBus = travelDashboardData.busData[busIndex]
        travelDashboardData.busData[busIndex] = {
            ...currentBus,
            name: updateData.name || currentBus.name,
            capacity: updateData.capacity || currentBus.capacity,
            occupied: updateData.occupancy !== undefined ? updateData.occupancy : currentBus.occupied,
            currentLocation: updateData.currentLocation || currentBus.currentLocation,
            status: updateData.status || currentBus.status,
            driver: updateData.driver || currentBus.driver
        }

        // Return updated bus in expected format
        const updatedBus = {
            id: id,
            name: travelDashboardData.busData[busIndex].name,
            plateNumber: updateData.plateNumber || `B ${Math.floor(Math.random() * 9000) + 1000} ABC`,
            capacity: travelDashboardData.busData[busIndex].capacity,
            occupancy: travelDashboardData.busData[busIndex].occupied,
            currentLocation: travelDashboardData.busData[busIndex].currentLocation,
            status: travelDashboardData.busData[busIndex].status,
            driver: travelDashboardData.busData[busIndex].driver,
            tourLeaders: Array.isArray(updateData.tourLeaders)
                ? updateData.tourLeaders
                : (updateData.tourLeader ? [updateData.tourLeader] : [`Tour Leader ${id}`]),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        return NextResponse.json(updatedBus)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to update bus' }, { status: 500 })
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        // Find bus index in mock data
        const busIndex = travelDashboardData.busData.findIndex(bus => bus.id === id)
        
        if (busIndex === -1) {
            return NextResponse.json({ error: 'Bus not found' }, { status: 404 })
        }

        // Remove bus from mock data
        travelDashboardData.busData.splice(busIndex, 1)

        return NextResponse.json({ message: 'Bus deleted successfully' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to delete bus' }, { status: 500 })
    }
}
