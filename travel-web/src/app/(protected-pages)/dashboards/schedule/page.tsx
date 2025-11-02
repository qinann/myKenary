'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbClock, TbMapPin, TbUsers, TbBus, TbCalendar, TbArrowRight, TbRoute, TbUser } from 'react-icons/tb'

// Dummy data untuk schedule
const scheduleData = [
    {
        id: 'SCH001',
        title: 'Jakarta - Bandung Trip',
        date: '2024-02-15',
        time: '06:00',
        duration: '3 hours',
        route: 'Jakarta → Bandung',
        busId: 'BUS001',
        driver: 'Ahmad Wijaya',
        participants: 45,
        maxCapacity: 45,
        status: 'Scheduled',
        description: 'Educational trip to Bandung for cultural learning',
        stops: ['Jakarta', 'Rest Area KM 72', 'Bandung'],
        estimatedArrival: '09:00'
    },
    {
        id: 'SCH002',
        title: 'Yogyakarta Cultural Tour',
        date: '2024-02-16',
        time: '07:30',
        duration: '4 hours',
        route: 'Jakarta → Yogyakarta',
        busId: 'BUS002',
        driver: 'Budi Santoso',
        participants: 38,
        maxCapacity: 40,
        status: 'In Progress',
        description: 'Visit to Borobudur and Prambanan temples',
        stops: ['Jakarta', 'Rest Area KM 156', 'Solo', 'Yogyakarta'],
        estimatedArrival: '11:30'
    },
    {
        id: 'SCH003',
        title: 'Surabaya Business Visit',
        date: '2024-02-17',
        time: '05:00',
        duration: '5 hours',
        route: 'Jakarta → Surabaya',
        busId: 'BUS003',
        driver: 'Siti Rahayu',
        participants: 42,
        maxCapacity: 45,
        status: 'Scheduled',
        description: 'Industrial visit to manufacturing companies',
        stops: ['Jakarta', 'Cikampek', 'Semarang', 'Surabaya'],
        estimatedArrival: '10:00'
    },
    {
        id: 'SCH004',
        title: 'Bali Adventure Trip',
        date: '2024-02-18',
        time: '04:30',
        duration: '6 hours',
        route: 'Jakarta → Bali',
        busId: 'BUS001',
        driver: 'Eko Prasetyo',
        participants: 40,
        maxCapacity: 45,
        status: 'Completed',
        description: 'Beach and cultural exploration in Bali',
        stops: ['Jakarta', 'Yogyakarta', 'Surabaya', 'Banyuwangi', 'Denpasar'],
        estimatedArrival: '10:30'
    },
    {
        id: 'SCH005',
        title: 'Malang Mountain Trip',
        date: '2024-02-19',
        time: '06:30',
        duration: '4.5 hours',
        route: 'Jakarta → Malang',
        busId: 'BUS002',
        driver: 'Dewi Lestari',
        participants: 35,
        maxCapacity: 40,
        status: 'Cancelled',
        description: 'Mountain hiking and nature exploration',
        stops: ['Jakarta', 'Bogor', 'Sukabumi', 'Malang'],
        estimatedArrival: '11:00'
    }
]

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Scheduled':
            return 'bg-blue-100 text-blue-800'
        case 'In Progress':
            return 'bg-green-100 text-green-800'
        case 'Completed':
            return 'bg-gray-100 text-gray-800'
        case 'Cancelled':
            return 'bg-red-100 text-red-800'
        case 'Delayed':
            return 'bg-yellow-100 text-yellow-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const getOccupancyPercentage = (participants: number, maxCapacity: number) => {
    return Math.round((participants / maxCapacity) * 100)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export default function SchedulePage() {
    const scheduledTrips = scheduleData.filter(trip => trip.status === 'Scheduled').length
    const inProgressTrips = scheduleData.filter(trip => trip.status === 'In Progress').length
    const completedTrips = scheduleData.filter(trip => trip.status === 'Completed').length
    const totalParticipants = scheduleData.reduce((sum, trip) => sum + trip.participants, 0)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Trip Schedule</h1>
                <Button>Add New Schedule</Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{scheduleData.length}</p>
                        <p className="text-sm text-gray-600">Total Trips</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{scheduledTrips}</p>
                        <p className="text-sm text-gray-600">Scheduled</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{inProgressTrips}</p>
                        <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{totalParticipants}</p>
                        <p className="text-sm text-gray-600">Total Participants</p>
                    </div>
                </Card>
            </div>

            {/* Schedule Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {scheduleData.map((trip) => {
                    const occupancyPercentage = getOccupancyPercentage(trip.participants, trip.maxCapacity)
                    
                    return (
                        <Card key={trip.id} className="hover:shadow-lg transition-shadow p-6">
                            <div className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{trip.title}</h3>
                                    <Badge className={getStatusColor(trip.status)}>
                                        {trip.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{trip.id}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <TbCalendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{formatDate(trip.date)}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TbClock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">
                                        Departure: {trip.time} | Duration: {trip.duration}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TbRoute className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{trip.route}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TbBus className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">Bus: {trip.busId}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TbUser className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">Driver: {trip.driver}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <TbUsers className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">
                                        {trip.participants}/{trip.maxCapacity} participants ({occupancyPercentage}%)
                                    </span>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-700">{trip.description}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium mb-2">Route Stops:</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        {trip.stops.map((stop, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span>{stop}</span>
                                                {index < trip.stops.length - 1 && (
                                                    <TbArrowRight className="h-3 w-3" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <p className="text-xs text-gray-500">
                                        Estimated Arrival: {trip.estimatedArrival}
                                    </p>
                                </div>

                                <div className="pt-2 flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        View Details
                                    </Button>
                                    <Button size="sm" className="flex-1">
                                        Edit Schedule
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* Schedule Statistics */}
            <Card className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Schedule Statistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium mb-2">By Status</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Scheduled</span>
                                <span className="font-medium text-blue-600">{scheduledTrips}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>In Progress</span>
                                <span className="font-medium text-green-600">{inProgressTrips}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Completed</span>
                                <span className="font-medium text-gray-600">{completedTrips}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Occupancy Rates</h4>
                        <div className="space-y-2">
                            {scheduleData.slice(0, 3).map((trip) => {
                                const occupancy = getOccupancyPercentage(trip.participants, trip.maxCapacity)
                                return (
                                    <div key={trip.id} className="flex justify-between text-sm">
                                        <span>{trip.title}</span>
                                        <span className="font-medium">{occupancy}%</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Upcoming Trips</h4>
                        <div className="space-y-2">
                            {scheduleData
                                .filter(trip => trip.status === 'Scheduled')
                                .slice(0, 3)
                                .map((trip) => (
                                    <div key={trip.id} className="flex justify-between text-sm">
                                        <span>{trip.title}</span>
                                        <span className="font-medium">{trip.date}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}