import { NextResponse, NextRequest } from 'next/server'

// Simple mock dataset for individual tour leader operations
// Note: This is independent of the list route and simulates basic CRUD behavior
const tourLeadersData = [
    {
        id: 'tl_001',
        name: 'Sari Indrawati',
        phone: '+62821-1234-5678',
        whatsapp: '+62821-1234-5678',
        email: 'sari.indrawati@email.com',
        bus: null,
        status: 'active',
    },
    {
        id: 'tl_002',
        name: 'Maya Sari',
        phone: '+62822-2345-6789',
        whatsapp: '+62822-2345-6789',
        email: 'maya.sari@email.com',
        bus: 'A1',
        status: 'active',
    },
    {
        id: 'tl_003',
        name: 'Rina Kusuma',
        phone: '+62823-3456-7890',
        whatsapp: '+62823-3456-7890',
        email: 'rina.kusuma@email.com',
        bus: null,
        status: 'active',
    },
    {
        id: 'tl_004',
        name: 'Dewi Lestari',
        phone: '+62824-4567-8901',
        whatsapp: '+62824-4567-8901',
        email: 'dewi.lestari@email.com',
        bus: 'B1',
        status: 'active',
    },
    {
        id: 'tl_005',
        name: 'Fitri Handayani',
        phone: '+62825-5678-9012',
        whatsapp: '+62825-5678-9012',
        email: 'fitri.handayani@email.com',
        bus: null,
        status: 'active',
    },
    {
        id: 'tl_006',
        name: 'Nurul Hidayah',
        phone: '+62826-6789-0123',
        whatsapp: '+62826-6789-0123',
        email: 'nurul.hidayah@email.com',
        bus: null,
        status: 'active',
    },
]

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const tl = tourLeadersData.find((t) => t.id === id)
        if (!tl) {
            return NextResponse.json({ error: 'Tour leader not found' }, { status: 404 })
        }

        // Return a simplified detail that matches frontend expectations
        return NextResponse.json({
            id: tl.id,
            name: tl.name,
            phone: tl.phone,
            whatsapp: tl.whatsapp,
            email: tl.email,
            status: tl.status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error fetching tour leader:', error)
        return NextResponse.json({ error: 'Failed to fetch tour leader' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const updateData = await request.json()
        const idx = tourLeadersData.findIndex((t) => t.id === id)
        if (idx === -1) {
            return NextResponse.json({ error: 'Tour leader not found' }, { status: 404 })
        }

        const current = tourLeadersData[idx]
        tourLeadersData[idx] = {
            ...current,
            name: updateData.name ?? current.name,
            phone: updateData.phone ?? current.phone,
            whatsapp: updateData.whatsapp ?? current.whatsapp,
            email: updateData.email ?? current.email,
            status: updateData.status ?? current.status,
        }

        return NextResponse.json({
            id,
            name: tourLeadersData[idx].name,
            phone: tourLeadersData[idx].phone,
            whatsapp: tourLeadersData[idx].whatsapp,
            email: tourLeadersData[idx].email,
            status: tourLeadersData[idx].status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error updating tour leader:', error)
        return NextResponse.json({ error: 'Failed to update tour leader' }, { status: 500 })
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id

    try {
        const idx = tourLeadersData.findIndex((t) => t.id === id)
        if (idx === -1) {
            // Respond 200 to keep UI happy in mock environment
            return NextResponse.json({ message: 'Tour leader already deleted or not found' })
        }

        tourLeadersData.splice(idx, 1)
        return NextResponse.json({ message: 'Tour leader deleted successfully' })
    } catch (error) {
        console.error('Error deleting tour leader:', error)
        return NextResponse.json({ error: 'Failed to delete tour leader' }, { status: 500 })
    }
}
