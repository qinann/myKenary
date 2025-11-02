import { NextResponse } from 'next/server'

// Mock data for drivers - in real implementation, this would come from database
const driversData = [
    {
        id: 'drv_001',
        name: 'Ahmad Suryadi',
        phone: '+62812-3456-7890',
        whatsapp: '+62812-3456-7890',
        email: 'ahmad.suryadi@email.com',
        licenseNumber: 'B123456789',
        bus: null,
        status: 'active'
    },
    {
        id: 'drv_002',
        name: 'Budi Santoso',
        phone: '+62813-4567-8901',
        whatsapp: '+62813-4567-8901',
        email: 'budi.santoso@email.com',
        licenseNumber: 'B234567890',
        bus: 'A1',
        status: 'active'
    },
    {
        id: 'drv_003',
        name: 'Candra Wijaya',
        phone: '+62814-5678-9012',
        whatsapp: '+62814-5678-9012',
        email: 'candra.wijaya@email.com',
        licenseNumber: 'B345678901',
        bus: null,
        status: 'active'
    },
    {
        id: 'drv_004',
        name: 'Dedi Kurniawan',
        phone: '+62815-6789-0123',
        whatsapp: '+62815-6789-0123',
        email: 'dedi.kurniawan@email.com',
        licenseNumber: 'B456789012',
        bus: 'B1',
        status: 'active'
    },
    {
        id: 'drv_005',
        name: 'Eko Prasetyo',
        phone: '+62816-7890-1234',
        whatsapp: '+62816-7890-1234',
        email: 'eko.prasetyo@email.com',
        licenseNumber: 'B567890123',
        bus: null,
        status: 'active'
    }
]

export async function GET() {
    try {
        // Filter only active drivers
        const activeDrivers = driversData.filter(driver => driver.status === 'active')
        
        // Return simplified data for dropdown
        const driversForDropdown = activeDrivers.map(driver => ({
            id: driver.id,
            name: driver.name,
            phone: driver.phone,
            isAvailable: !driver.bus // Available if not assigned to any bus
        }))

        return NextResponse.json({
            success: true,
            data: driversForDropdown
        })
    } catch (error) {
        console.error('Error fetching drivers:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch drivers' },
            { status: 500 }
        )
    }
}