import { NextResponse } from 'next/server'

// Mock data for tour leaders - in real implementation, this would come from database
const tourLeadersData = [
    {
        id: 'tl_001',
        name: 'Sari Indrawati',
        phone: '+62821-1234-5678',
        whatsapp: '+62821-1234-5678',
        email: 'sari.indrawati@email.com',
        bus: null,
        status: 'active'
    },
    {
        id: 'tl_002',
        name: 'Maya Sari',
        phone: '+62822-2345-6789',
        whatsapp: '+62822-2345-6789',
        email: 'maya.sari@email.com',
        bus: 'A1',
        status: 'active'
    },
    {
        id: 'tl_003',
        name: 'Rina Kusuma',
        phone: '+62823-3456-7890',
        whatsapp: '+62823-3456-7890',
        email: 'rina.kusuma@email.com',
        bus: null,
        status: 'active'
    },
    {
        id: 'tl_004',
        name: 'Dewi Lestari',
        phone: '+62824-4567-8901',
        whatsapp: '+62824-4567-8901',
        email: 'dewi.lestari@email.com',
        bus: 'B1',
        status: 'active'
    },
    {
        id: 'tl_005',
        name: 'Fitri Handayani',
        phone: '+62825-5678-9012',
        whatsapp: '+62825-5678-9012',
        email: 'fitri.handayani@email.com',
        bus: null,
        status: 'active'
    },
    {
        id: 'tl_006',
        name: 'Nurul Hidayah',
        phone: '+62826-6789-0123',
        whatsapp: '+62826-6789-0123',
        email: 'nurul.hidayah@email.com',
        bus: null,
        status: 'active'
    }
]

export async function GET() {
    try {
        // Filter only active tour leaders
        const activeTourLeaders = tourLeadersData.filter(tl => tl.status === 'active')
        
        // Return simplified data for dropdown
        const tourLeadersForDropdown = activeTourLeaders.map(tl => ({
            id: tl.id,
            name: tl.name,
            phone: tl.phone,
            isAvailable: !tl.bus // Available if not assigned to any bus
        }))

        return NextResponse.json({
            success: true,
            data: tourLeadersForDropdown
        })
    } catch (error) {
        console.error('Error fetching tour leaders:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch tour leaders' },
            { status: 500 }
        )
    }
}