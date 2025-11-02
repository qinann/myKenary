'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbMapPin, TbNavigation, TbClock, TbUsers, TbGasStation, TbAlertTriangle, TbCircleCheck, TbRadio, TbBus, TbRoute, TbUser, TbRefresh } from 'react-icons/tb'

// Dummy data untuk live location tracking
const liveLocationData = [
    {
        id: 'BUS001',
        busNumber: 'TW-001',
        route: 'Jakarta - Bandung',
        driver: 'Ahmad Wijaya',
        currentLocation: 'Rest Area KM 72, Tol Cipularang',
        coordinates: { lat: -6.7024, lng: 107.3431 },
        status: 'On Route',
        speed: 65,
        passengers: 45,
        maxCapacity: 45,
        fuelLevel: 75,
        lastUpdate: '2024-02-15 08:30:00',
        estimatedArrival: '09:15',
        nextStop: 'Bandung Terminal',
        distanceToDestination: 45,
        tripProgress: 60,
        alerts: [],
        engineStatus: 'Good',
        gpsSignal: 'Strong'
    },
    {
        id: 'BUS002',
        busNumber: 'TW-002',
        route: 'Jakarta - Yogyakarta',
        driver: 'Budi Santoso',
        currentLocation: 'Rest Area KM 156, Tol Trans Jawa',
        coordinates: { lat: -6.8650, lng: 109.1401 },
        status: 'On Route',
        speed: 70,
        passengers: 38,
        maxCapacity: 40,
        fuelLevel: 60,
        lastUpdate: '2024-02-15 08:32:00',
        estimatedArrival: '11:45',
        nextStop: 'Solo',
        distanceToDestination: 180,
        tripProgress: 45,
        alerts: ['Low Fuel Warning'],
        engineStatus: 'Good',
        gpsSignal: 'Strong'
    },
    {
        id: 'BUS003',
        busNumber: 'TW-003',
        route: 'Jakarta - Surabaya',
        driver: 'Siti Rahayu',
        currentLocation: 'Terminal Bungurasih, Surabaya',
        coordinates: { lat: -7.3447, lng: 112.7297 },
        status: 'Arrived',
        speed: 0,
        passengers: 42,
        maxCapacity: 45,
        fuelLevel: 30,
        lastUpdate: '2024-02-15 08:35:00',
        estimatedArrival: 'Arrived',
        nextStop: 'Final Destination',
        distanceToDestination: 0,
        tripProgress: 100,
        alerts: ['Refuel Required'],
        engineStatus: 'Good',
        gpsSignal: 'Strong'
    },
    {
        id: 'BUS004',
        busNumber: 'TW-004',
        route: 'Jakarta - Bali',
        driver: 'Eko Prasetyo',
        currentLocation: 'Terminal Mengwi, Bali',
        coordinates: { lat: -8.5069, lng: 115.1775 },
        status: 'Maintenance',
        speed: 0,
        passengers: 0,
        maxCapacity: 45,
        fuelLevel: 85,
        lastUpdate: '2024-02-15 08:28:00',
        estimatedArrival: 'N/A',
        nextStop: 'Maintenance Bay',
        distanceToDestination: 0,
        tripProgress: 0,
        alerts: ['Scheduled Maintenance', 'Engine Check'],
        engineStatus: 'Under Maintenance',
        gpsSignal: 'Strong'
    },
    {
        id: 'BUS005',
        busNumber: 'TW-005',
        route: 'Jakarta - Malang',
        driver: 'Dewi Lestari',
        currentLocation: 'Terminal Arjosari, Malang',
        coordinates: { lat: -7.9666, lng: 112.6326 },
        status: 'Idle',
        speed: 0,
        passengers: 0,
        maxCapacity: 40,
        fuelLevel: 90,
        lastUpdate: '2024-02-15 08:25:00',
        estimatedArrival: 'N/A',
        nextStop: 'Awaiting Schedule',
        distanceToDestination: 0,
        tripProgress: 0,
        alerts: [],
        engineStatus: 'Good',
        gpsSignal: 'Strong'
    }
]

const getStatusColor = (status: string) => {
    switch (status) {
        case 'On Route':
            return 'bg-green-100 text-green-800'
        case 'Arrived':
            return 'bg-blue-100 text-blue-800'
        case 'Idle':
            return 'bg-gray-100 text-gray-800'
        case 'Maintenance':
            return 'bg-red-100 text-red-800'
        case 'Emergency':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const getFuelLevelColor = (level: number) => {
    if (level <= 25) return 'text-red-600'
    if (level <= 50) return 'text-yellow-600'
    return 'text-green-600'
}

const getSpeedColor = (speed: number) => {
    if (speed === 0) return 'text-gray-600'
    if (speed > 80) return 'text-red-600'
    if (speed > 60) return 'text-yellow-600'
    return 'text-green-600'
}

const formatLastUpdate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

export default function LiveLocationPage() {
    const onRouteBuses = liveLocationData.filter(bus => bus.status === 'On Route').length
    const arrivedBuses = liveLocationData.filter(bus => bus.status === 'Arrived').length
    const maintenanceBuses = liveLocationData.filter(bus => bus.status === 'Maintenance').length
    const totalAlerts = liveLocationData.reduce((sum, bus) => sum + bus.alerts.length, 0)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Live Location Tracking</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <TbRefresh className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button>View Map</Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{liveLocationData.length}</p>
                        <p className="text-sm text-gray-600">Total Buses</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{onRouteBuses}</p>
                        <p className="text-sm text-gray-600">On Route</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{arrivedBuses}</p>
                        <p className="text-sm text-gray-600">Arrived</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{totalAlerts}</p>
                        <p className="text-sm text-gray-600">Active Alerts</p>
                    </div>
                </Card>
            </div>

            {/* Live Location Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveLocationData.map((bus) => (
                    <Card key={bus.id} className="hover:shadow-lg transition-shadow p-6">
                        <div className="pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{bus.busNumber}</h3>
                                <Badge className={getStatusColor(bus.status)}>
                                    {bus.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{bus.route}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <TbMapPin className="h-4 w-4 text-red-500" />
                                <span className="text-sm">{bus.currentLocation}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbUser className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Driver: {bus.driver}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <TbNavigation className={`h-4 w-4 ${getSpeedColor(bus.speed)}`} />
                                    <span className="text-sm">{bus.speed} km/h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbGasStation className={`h-4 w-4 ${getFuelLevelColor(bus.fuelLevel)}`} />
                                    <span className="text-sm">{bus.fuelLevel}%</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbUsers className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">
                                    {bus.passengers}/{bus.maxCapacity} passengers
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbRoute className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">Next: {bus.nextStop}</span>
                            </div>

                            {bus.status === 'On Route' && (
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Trip Progress</span>
                                        <span>{bus.tripProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${bus.tripProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {bus.distanceToDestination > 0 && (
                                <div className="flex items-center gap-2">
                                    <TbMapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">
                                        {bus.distanceToDestination} km to destination
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <TbClock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">
                                    ETA: {bus.estimatedArrival}
                                </span>
                            </div>

                            {/* Alerts */}
                            {bus.alerts.length > 0 && (
                                <div className="bg-red-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TbAlertTriangle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm font-medium text-red-700">Alerts</span>
                                    </div>
                                    <div className="space-y-1">
                                        {bus.alerts.map((alert, index) => (
                                            <p key={index} className="text-xs text-red-600">• {alert}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Status Information */}
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <TbCircleCheck className="h-3 w-3 text-green-500" />
                                        <span>Engine: {bus.engineStatus}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TbRadio className="h-3 w-3 text-blue-500" />
                                        <span>GPS: {bus.gpsSignal}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 border-t">
                                <p className="text-xs text-gray-500">
                                    Last Update: {formatLastUpdate(bus.lastUpdate)}
                                </p>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    Track on Map
                                </Button>
                                <Button size="sm" className="flex-1">
                                    Contact Driver
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Fleet Status Summary */}
            <Card className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Fleet Status Summary</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium mb-2">By Status</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>On Route</span>
                                <span className="font-medium text-green-600">{onRouteBuses}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Arrived</span>
                                <span className="font-medium text-blue-600">{arrivedBuses}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Maintenance</span>
                                <span className="font-medium text-red-600">{maintenanceBuses}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Fuel Levels</h4>
                        <div className="space-y-2">
                            {liveLocationData.slice(0, 3).map((bus) => (
                                <div key={bus.id} className="flex justify-between text-sm">
                                    <span>{bus.busNumber}</span>
                                    <span className={`font-medium ${getFuelLevelColor(bus.fuelLevel)}`}>
                                        {bus.fuelLevel}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Current Speeds</h4>
                        <div className="space-y-2">
                            {liveLocationData
                                .filter(bus => bus.speed > 0)
                                .slice(0, 3)
                                .map((bus) => (
                                    <div key={bus.id} className="flex justify-between text-sm">
                                        <span>{bus.busNumber}</span>
                                        <span className={`font-medium ${getSpeedColor(bus.speed)}`}>
                                            {bus.speed} km/h
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}