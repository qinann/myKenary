'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { HiPlus } from 'react-icons/hi'
import BusService from '@/services/BusService'
import TourLeadersService from '@/services/TourLeadersService'
import type { TourLeader } from '@/@types/tour-leader'
import type { Bus } from '@/@types/bus'
import BusModal from '@/components/view/BusModal'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { toast } from 'react-hot-toast'

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Available':
            return 'bg-green-100 text-green-800'
        case 'On Route':
            return 'bg-blue-100 text-blue-800'
        case 'Maintenance':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const getFuelColor = (level: number) => {
    if (level >= 70) return 'text-green-600'
    if (level >= 40) return 'text-yellow-600'
    return 'text-red-600'
}





export default function BusInfoPage() {
    const router = useRouter()
    const [buses, setBuses] = useState<Bus[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBus, setEditingBus] = useState<Bus | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [busToDelete, setBusToDelete] = useState<Bus | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [tourLeaders, setTourLeaders] = useState<(TourLeader & { isAvailable?: boolean; assignedBus?: string | null })[]>([])

    useEffect(() => {
        fetchBuses()
    }, [])

    const fetchBuses = async () => {
        try {
            setLoading(true)
            const [busesRes, tlRes] = await Promise.all([
                BusService.getBuses(),
                BusService.getTourLeaders(),
            ])
            setBuses(busesRes.data)
            setTourLeaders(tlRes)
        } catch (err) {
            setError('Failed to fetch buses data')
            console.error('Error fetching buses:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddBus = () => {
        setEditingBus(null)
        setIsModalOpen(true)
    }

    const handleEditBus = (bus: Bus) => {
        setEditingBus(bus)
        setIsModalOpen(true)
    }

    const handleDeleteBus = (bus: Bus) => {
        setBusToDelete(bus)
        setIsDeleteDialogOpen(true)
    }

    const confirmDeleteBus = async () => {
        if (!busToDelete) return

        try {
            setIsDeleting(true)
            await BusService.deleteBus(busToDelete.id)
            setBuses(buses.filter(bus => bus.id !== busToDelete.id))
            toast.success('Bus berhasil dihapus')
        } catch (err) {
            console.error('Error deleting bus:', err)
            toast.error('Gagal menghapus bus')
        } finally {
            setIsDeleting(false)
            setIsDeleteDialogOpen(false)
            setBusToDelete(null)
        }
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setEditingBus(null)
    }

    const handleBusSubmit = async (busData: Partial<Bus>) => {
        try {
            let savedBus: Bus | null = null
            if (editingBus) {
                // Update existing bus
                const updatedBus = await BusService.updateBus(editingBus.id, busData)
                setBuses(buses.map(bus => bus.id === editingBus.id ? updatedBus : bus))
                savedBus = updatedBus
                toast.success('Bus berhasil diperbarui')
            } else {
                // Create new bus
                const newBus = await BusService.createBus(busData)
                setBuses([...buses, newBus])
                savedBus = newBus
                toast.success('Bus berhasil ditambahkan')
            }

            // Assign tour leaders to this bus by updating tl.bus
            if (savedBus && Array.isArray(busData.tourLeaders)) {
                try {
                    const tlRes = await TourLeadersService.getTourLeaders()
                    const allTLs = tlRes.data || []

                    // Find TLs currently assigned to this bus (by name or id) from state
                    const currentlyAssignedTLNames = tourLeaders
                        .filter(tl => tl.assignedBus === savedBus!.name || tl.assignedBus === savedBus!.id)
                        .map(tl => tl.name)

                    const selectedTLNames = busData.tourLeaders

                    // Assign selected TLs to this bus
                    const assignPromises = selectedTLNames.map(name => {
                        const tl = allTLs.find(t => t.name === name)
                        return tl ? TourLeadersService.updateTourLeader(tl.id, { bus: savedBus!.id }) : Promise.resolve(null)
                    })

                    // Unassign TLs that were previously on this bus but now removed
                    const removedTLNames = currentlyAssignedTLNames.filter(name => !selectedTLNames.includes(name))
                    const unassignPromises = removedTLNames.map(name => {
                        const tl = allTLs.find(t => t.name === name)
                        return tl ? TourLeadersService.updateTourLeader(tl.id, { bus: undefined }) : Promise.resolve(null)
                    })

                    await Promise.all([...assignPromises, ...unassignPromises])
                } catch (e) {
                    console.error('Gagal meng-assign tour leader ke bus:', e)
                    // Tidak gagal total; hanya beri info
                    toast.error('Sebagian assignment Tour Leader mungkin tidak tersimpan')
                }
            }

            // Refresh list agar tampilan sinkron dengan assignment terbaru
            await fetchBuses()
            handleModalClose()
        } catch (err) {
            console.error('Error saving bus:', err)
            toast.error(editingBus ? 'Gagal memperbarui bus' : 'Gagal menambahkan bus')
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Bus Information</h1>
                    <Button>Add New Bus</Button>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading buses...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Bus Information</h1>
                    <Button>Add New Bus</Button>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">{error}</div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Bus Information</h1>
                <Button onClick={handleAddBus}>Tambah Bus</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {buses.map((bus) => (
                    <Card key={bus.id} className="hover:shadow-lg transition-shadow p-4">
                        <div className="pb-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{bus.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{bus.id}</p>
                        </div>
                        
                        <div className="space-y-3">
                            {/* ID Bus */}
                            <div>
                                <span className="text-sm text-gray-600">ID Bus: </span>
                                <span className="text-sm font-medium">{bus.id}</span>
                            </div>
                            
                            {/* Live Location */}
                            <div>
                                <span className="text-sm text-gray-600">Live Location: </span>
                                <button 
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                    onClick={() => window.open('https://maps.google.com/?q=-6.2088,106.8456', '_blank')}
                                >
                                    📍 Lihat Lokasi
                                </button>
                            </div>
                            
                            {/* Capacity */}
                            <div>
                                <span className="text-sm text-gray-600">Capacity: </span>
                                <span className="text-sm font-medium">{bus.capacity} seats</span>
                            </div>

                            {/* Occupancy */}
                            <div>
                                <span className="text-sm text-gray-600">Occupancy: </span>
                                <span className="text-sm font-medium">{bus.occupancy}/{bus.capacity} passengers</span>
                            </div>

                            {/* Driver */}
                            <div>
                                <span className="text-sm text-gray-600">Driver: </span>
                                <span className="text-sm font-medium">{bus.driver || 'Belum ditentukan'}</span>
                            </div>

                            {/* Tour Leader */}
                            <div>
                                <span className="text-sm text-gray-600">Tour Leader: </span>
                                <span className="text-sm font-medium">
                                    {(() => {
                                        // Ambil semua TL yang ter-assign ke bus ini berdasarkan nama atau id bus
                                        const assignedTLs = tourLeaders.filter(
                                            (tl) => tl.assignedBus === bus.name || tl.assignedBus === bus.id,
                                        )

                                        if (assignedTLs.length > 0) {
                                            return assignedTLs.map((tl) => tl.name).join(', ')
                                        }

                                        // Fallback: gunakan data yang ada di objek bus bila tersedia
                                        if (Array.isArray((bus as any).tourLeaders) && (bus as any).tourLeaders.length > 0) {
                                            return (bus as any).tourLeaders.join(', ')
                                        }

                                        return (bus as any).tourLeader || 'Belum ditentukan'
                                    })()}
                                </span>
                            </div>

                            <div className="pt-2 space-y-2">
                                <Button 
                                    className="w-full"
                                    onClick={() => router.push(`/dashboards/bus-info/${bus.id}`)}
                                >
                                    View Details
                                </Button>
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleEditBus(bus)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 text-red-600 hover:text-red-700"
                                        onClick={() => handleDeleteBus(bus)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>



            <Card className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Bus Fleet Summary</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{buses.length}</p>
                        <p className="text-sm text-gray-600">Total Buses</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                            {buses.filter(bus => bus.status === 'Available').length}
                        </p>
                        <p className="text-sm text-gray-600">Available</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">
                            {buses.filter(bus => bus.status === 'Maintenance').length}
                        </p>
                        <p className="text-sm text-gray-600">Maintenance</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                            {buses.reduce((total, bus) => total + bus.capacity, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Seats</p>
                    </div>
                </div>
            </Card>

            {/* Bus Modal */}
            <BusModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleBusSubmit}
                bus={editingBus}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onCancel={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDeleteBus}
                title="Hapus Bus"
                confirmText="Hapus"
                cancelText="Batal"
                type="danger"
                confirmButtonProps={{
                    loading: isDeleting,
                    color: 'red-600'
                }}
            >
                <p>Apakah Anda yakin ingin menghapus bus <strong>{busToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            </ConfirmDialog>
        </div>
    )
}
