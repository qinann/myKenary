'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { TbArrowLeft, TbMapPin, TbUsers, TbUser, TbSteeringWheel } from 'react-icons/tb'
import BusService from '@/services/BusService'
import StudentSelectionModal from '@/components/view/StudentSelectionModal'
import type { Bus } from '@/@types/bus'
import type { TourLeader } from '@/@types/tour-leader'
import type { Student } from '@/@types/student'

// Mock data siswa untuk kursi yang terisi
const studentData = {
    'A1': {
        1: { name: 'Andi Pratama', class: '5A' },
        2: { name: 'Sari Indah', class: '5B' },
        3: { name: 'Budi Santoso', class: '4A' },
        4: { name: 'Maya Sari', class: '4B' },
        5: { name: 'Rudi Hermawan', class: '5A' },
        6: { name: 'Eko Prasetyo', class: '3B' },
        7: { name: 'Dina Kartika', class: '4A' },
        8: { name: 'Agus Wijaya', class: '5B' },
        9: { name: 'Rina Sari', class: '4B' },
        10: { name: 'Tono Sugiarto', class: '3A' },
        11: { name: 'Wati Kusuma', class: '5A' },
        12: { name: 'Joko Susilo', class: '4A' },
        13: { name: 'Ani Rahayu', class: '3B' },
        14: { name: 'Dedi Kurniawan', class: '5B' },
        15: { name: 'Sinta Dewi', class: '4B' },
        16: { name: 'Bayu Pratama', class: '3A' },
        17: { name: 'Lia Permata', class: '5A' },
        18: { name: 'Hendra Wijaya', class: '4A' },
        19: { name: 'Nita Sari', class: '3B' },
        20: { name: 'Reza Pratama', class: '5B' },
        21: { name: 'Dewi Lestari', class: '4B' },
        22: { name: 'Adi Nugroho', class: '3A' },
        23: { name: 'Fitri Handayani', class: '5A' },
        24: { name: 'Yudi Santoso', class: '4A' },
        25: { name: 'Mega Putri', class: '3B' },
        26: { name: 'Rizki Ramadan', class: '5B' },
        27: { name: 'Indah Sari', class: '4B' },
        28: { name: 'Fajar Sidik', class: '3A' },
        29: { name: 'Ratna Dewi', class: '5A' },
        30: { name: 'Bambang Eko', class: '4A' },
        31: { name: 'Siska Amelia', class: '3B' },
        32: { name: 'Dimas Pratama', class: '5B' },
        33: { name: 'Yuni Astuti', class: '4B' },
        34: { name: 'Arif Rahman', class: '3A' },
        35: { name: 'Lina Dewi', class: '5A' }
    },
    'B1': {
        1: { name: 'Putri Maharani', class: '6A' },
        3: { name: 'Galih Pratama', class: '6B' },
        5: { name: 'Sari Wulandari', class: '5A' },
        7: { name: 'Andi Setiawan', class: '5B' },
        9: { name: 'Rina Kartika', class: '6A' },
        11: { name: 'Budi Hartono', class: '4A' },
        13: { name: 'Maya Indah', class: '4B' },
        15: { name: 'Doni Prasetyo', class: '6B' },
        17: { name: 'Lestari Dewi', class: '5A' },
        19: { name: 'Eko Susanto', class: '5B' },
        21: { name: 'Winda Sari', class: '6A' },
        23: { name: 'Rudi Wijaya', class: '4A' },
        25: { name: 'Dina Permata', class: '4B' },
        27: { name: 'Agus Pratama', class: '6B' },
        29: { name: 'Sinta Rahayu', class: '5A' },
        31: { name: 'Joko Santoso', class: '5B' },
        33: { name: 'Ani Kusuma', class: '6A' },
        35: { name: 'Bayu Nugroho', class: '4A' },
        37: { name: 'Lia Handayani', class: '4B' },
        39: { name: 'Hendra Sidik', class: '6B' },
        41: { name: 'Nita Lestari', class: '5A' },
        43: { name: 'Reza Wijaya', class: '5B' },
        45: { name: 'Dewi Maharani', class: '6A' },
        47: { name: 'Adi Pratama', class: '4A' },
        49: { name: 'Fitri Sari', class: '4B' },
        51: { name: 'Yudi Ramadan', class: '6B' },
        52: { name: 'Mega Dewi', class: '5A' },
        50: { name: 'Rizki Santoso', class: '5B' }
    },
    'C1': {
        2: { name: 'Ahmad Fauzi', class: '7A' },
        4: { name: 'Bella Sari', class: '7B' },
        6: { name: 'Citra Dewi', class: '6A' },
        8: { name: 'Doni Pratama', class: '6B' },
        10: { name: 'Eka Putri', class: '7A' },
        12: { name: 'Farid Rahman', class: '5A' },
        14: { name: 'Gita Sari', class: '5B' },
        16: { name: 'Hadi Wijaya', class: '7B' },
        18: { name: 'Ira Lestari', class: '6A' },
        20: { name: 'Jaka Santoso', class: '6B' },
        22: { name: 'Kiki Amelia', class: '7A' },
        24: { name: 'Luki Pratama', class: '5A' },
        26: { name: 'Mira Handayani', class: '5B' },
        28: { name: 'Nanda Sari', class: '7B' },
        30: { name: 'Oki Nugroho', class: '6A' },
        32: { name: 'Prita Dewi', class: '6B' },
        34: { name: 'Qori Rahman', class: '7A' },
        36: { name: 'Rina Kusuma', class: '5A' },
        38: { name: 'Sandi Wijaya', class: '5B' },
        40: { name: 'Tina Sari', class: '7B' },
        42: { name: 'Udin Pratama', class: '6A' },
        44: { name: 'Vina Lestari', class: '6B' },
        46: { name: 'Wawan Santoso', class: '7A' },
        48: { name: 'Yani Handayani', class: '5A' }
    },
    'D1': {
        1: { name: 'Arif Budiman', class: '8A' },
        3: { name: 'Bela Kartika', class: '8B' },
        5: { name: 'Candra Wijaya', class: '7A' },
        7: { name: 'Desi Rahayu', class: '7B' },
        9: { name: 'Edi Susanto', class: '8A' },
        11: { name: 'Fira Dewi', class: '6A' },
        13: { name: 'Gilang Pratama', class: '6B' },
        15: { name: 'Hesti Sari', class: '8B' },
        17: { name: 'Ivan Nugroho', class: '7A' },
        19: { name: 'Jeni Lestari', class: '7B' },
        21: { name: 'Koko Rahman', class: '8A' },
        23: { name: 'Lala Handayani', class: '6A' },
        25: { name: 'Miko Santoso', class: '6B' },
        27: { name: 'Nina Kusuma', class: '8B' },
        29: { name: 'Oki Wijaya', class: '7A' },
        31: { name: 'Peni Sari', class: '7B' },
        33: { name: 'Qiqi Pratama', class: '8A' },
        35: { name: 'Rara Dewi', class: '6A' },
        37: { name: 'Soni Nugroho', class: '6B' },
        39: { name: 'Tari Lestari', class: '8B' },
        41: { name: 'Uci Rahman', class: '7A' },
        43: { name: 'Vivi Handayani', class: '7B' },
        45: { name: 'Widi Santoso', class: '8A' },
        47: { name: 'Yesi Kusuma', class: '6A' }
    }
}



// Komponen untuk seat individual
interface SeatProps {
    seatNumber: number
    isOccupied: boolean
    studentInfo?: { name: string; class: string }
    onClick?: () => void
}

function Seat({ seatNumber, isOccupied, studentInfo, onClick }: SeatProps) {
    const getSeatColor = () => {
        if (isOccupied) return 'bg-red-400 text-white border-red-500'
        return 'bg-green-400 text-white border-green-500 hover:bg-green-500 cursor-pointer'
    }

    const getTooltipText = () => {
        if (isOccupied && studentInfo) {
            return `Kursi ${seatNumber}: ${studentInfo.name} (${studentInfo.class})`
        }
        return `Kursi ${seatNumber}: ${isOccupied ? 'Terisi' : 'Kosong'}`
    }

    return (
        <div
            className={`
                ${isOccupied ? 'w-20 h-16' : 'w-12 h-12'} rounded-lg border-2 text-xs font-semibold
                transition-all duration-200 flex flex-col items-center justify-center
                ${getSeatColor()}
            `}
            title={getTooltipText()}
            onClick={!isOccupied ? onClick : undefined}
        >
            {isOccupied && studentInfo ? (
                <>
                    <div className="text-[10px] font-bold leading-tight">{studentInfo.name}</div>
                    <div className="text-[9px] opacity-90">{studentInfo.class}</div>
                </>
            ) : (
                <span className="text-xs">{seatNumber}</span>
            )}
        </div>
    )
}

// Komponen layout kursi bus
interface BusLayoutProps {
    capacity: number
    occupancy: number
    busId: string
}

function BusLayout({ capacity, occupancy, busId }: BusLayoutProps) {
    const [assignedStudents, setAssignedStudents] = useState<{[key: number]: {name: string, class: string}}>({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null)
    
    // Initialize with mock data for demonstration
    useEffect(() => {
        const busStudents = studentData[busId as keyof typeof studentData] || {}
        setAssignedStudents(busStudents)
    }, [busId])
    
    // Generate array kursi yang terisi berdasarkan data siswa
    const occupiedSeats = Object.keys(assignedStudents).map(Number)
    
    const handleSeatClick = (seatNumber: number) => {
        setSelectedSeat(seatNumber)
        setIsModalOpen(true)
    }
    
    const handleStudentAssignment = (student: Student) => {
        if (selectedSeat) {
            setAssignedStudents(prev => ({
                ...prev,
                [selectedSeat]: {
                    name: student.name,
                    class: student.grade
                }
            }))
        }
        setIsModalOpen(false)
        setSelectedSeat(null)
    }
    
    // Layout bus: 4 kursi per baris (2-2 dengan lorong di tengah)
    const rows = Math.ceil(capacity / 4)
    
    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            {/* Header bus */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <TbSteeringWheel className="h-5 w-5" />
                    <span className="text-sm font-semibold">SOPIR</span>
                </div>
            </div>
            
            {/* Informasi Kapasitas */}
            <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                    Kapasitas Bus: <span className="font-semibold">{capacity} kursi</span> | 
                    Terisi: <span className="font-semibold text-red-600">{occupiedSeats.length}</span> | 
                    Kosong: <span className="font-semibold text-green-600">{capacity - occupiedSeats.length}</span>
                </p>
            </div>
            
            {/* Layout kursi */}
            <div className="space-y-3">
                {Array.from({ length: rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-4">
                        {/* Kursi kiri (2 kursi) */}
                        <div className="flex gap-2">
                            {Array.from({ length: 2 }, (_, seatIndex) => {
                                const seatNumber = rowIndex * 4 + seatIndex + 1
                                if (seatNumber > capacity) return null
                                
                                return (
                                    <Seat
                                        key={seatNumber}
                                        seatNumber={seatNumber}
                                        isOccupied={occupiedSeats.includes(seatNumber)}
                                        studentInfo={assignedStudents[seatNumber]}
                                        onClick={() => handleSeatClick(seatNumber)}
                                    />
                                )
                            })}
                        </div>
                        
                        {/* Lorong - hanya tampilkan jika ada kursi di kedua sisi */}
                        {(rowIndex * 4 + 3 <= capacity) && <div className="w-8"></div>}
                        
                        {/* Kursi kanan (2 kursi) */}
                        <div className="flex gap-2">
                            {Array.from({ length: 2 }, (_, seatIndex) => {
                                const seatNumber = rowIndex * 4 + seatIndex + 3
                                if (seatNumber > capacity) return null
                                
                                return (
                                    <Seat
                                        key={seatNumber}
                                        seatNumber={seatNumber}
                                        isOccupied={occupiedSeats.includes(seatNumber)}
                                        studentInfo={assignedStudents[seatNumber]}
                                        onClick={() => handleSeatClick(seatNumber)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded border-2 border-green-500"></div>
                    <span>Kosong (Klik untuk assign siswa)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded border-2 border-red-500"></div>
                    <span>Terisi</span>
                </div>
            </div>
            
            {/* Student Selection Modal */}
            <StudentSelectionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedSeat(null)
                }}
                onSelectStudent={handleStudentAssignment}
                seatNumber={selectedSeat || 0}
            />
        </div>
    )
}

export default function BusDetailPage() {
    const params = useParams()
    const router = useRouter()
    const busId = params.busId as string

    const [bus, setBus] = useState<Bus | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [tourLeaders, setTourLeaders] = useState<(TourLeader & { assignedBus?: string | null })[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [busRes, tlRes] = await Promise.all([
                    BusService.getBus(busId),
                    BusService.getTourLeaders(),
                ])
                setBus(busRes)
                setTourLeaders(tlRes)
            } catch (err) {
                console.error('Error fetching bus/tour leaders:', err)
                setError('Gagal memuat data bus')
            } finally {
                setLoading(false)
            }
        }

        if (busId) {
            fetchData()
        }
    }, [busId])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat data bus...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !bus) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {error || 'Bus Tidak Ditemukan'}
                        </h1>
                        <p className="text-gray-600 mb-6">
                            {error || `Bus dengan ID ${busId} tidak ditemukan.`}
                        </p>
                        <Button onClick={() => router.back()}>
                            <TbArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
    
    // Hitung statistik berdasarkan data siswa yang sebenarnya
    const busStudents = studentData[bus.id as keyof typeof studentData] || {}
    const actualOccupancy = Object.keys(busStudents).length
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800'
            case 'On Route': return 'bg-blue-100 text-blue-800'
            case 'Maintenance': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboards/bus-info')}
                    className="flex items-center gap-2"
                >
                    <TbArrowLeft className="h-4 w-4" />
                    Kembali
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">{bus.name}</h1>
                    <p className="text-gray-600">{bus.id}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Info Bus */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Informasi Bus</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Status</span>
                                <Badge className={getStatusColor(bus.status)}>
                                    {bus.status}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <TbMapPin className="h-4 w-4 text-blue-500" />
                                <button 
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                    onClick={() => window.open('https://maps.google.com/?q=-6.2088,106.8456', '_blank')}
                                >
                                    📍 Live Location (Klik untuk lihat peta)
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <TbUsers className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Kapasitas: {bus.capacity} kursi</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <TbUser className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Sopir: {bus.driver}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbUser className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">
                                    Tour Leader: {(() => {
                                        // Prioritas: ambil dari daftar TL yang assigned ke bus ini
                                        const assignedTLs = tourLeaders.filter(
                                            (tl) => tl.assignedBus === bus.name || tl.assignedBus === bus.id,
                                        )
                                        if (assignedTLs.length > 0) {
                                            return assignedTLs.map((tl) => tl.name).join(', ')
                                        }
                                        // Fallback: gunakan data di objek bus bila tersedia
                                        if (Array.isArray((bus as any).tourLeaders) && (bus as any).tourLeaders.length > 0) {
                                            return (bus as any).tourLeaders.join(', ')
                                        }
                                        return (bus as any).tourLeader || '-'
                                    })()}
                                </span>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="text-sm text-gray-600 mb-2">Statistik Kursi</div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Terisi:</span>
                                        <span className="text-sm font-semibold text-red-600">{actualOccupancy} kursi</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Kosong:</span>
                                        <span className="text-sm font-semibold text-green-600">{bus.capacity - actualOccupancy} kursi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Layout Kursi */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Layout Kursi Bus</h3>
                        <BusLayout
                            capacity={bus.capacity}
                            occupancy={actualOccupancy}
                            busId={bus.id}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
