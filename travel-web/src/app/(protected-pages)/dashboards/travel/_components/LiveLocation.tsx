'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TbMapPin, TbBus, TbClock } from 'react-icons/tb'

type LocationData = {
    buses: {
        id: string
        name: string
        lat: number
        lng: number
        status: string
        speed: number
        destination: string
    }[]
}

type LiveLocationProps = {
    data: LocationData
}

const LiveLocation = ({ data }: LiveLocationProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'moving':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'stopped':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            case 'arrived':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'moving':
                return 'Bergerak'
            case 'stopped':
                return 'Berhenti'
            case 'arrived':
                return 'Tiba'
            default:
                return 'Tidak Diketahui'
        }
    }

    const formatCoordinates = (lat: number, lng: number) => {
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    }

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <TbMapPin className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Live Location Bus
                </h3>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 mb-4 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                    <TbMapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Peta live location akan ditampilkan di sini
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        Integrasi dengan Google Maps atau Leaflet
                    </p>
                </div>
            </div>
            
            {/* Bus List */}
            <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">
                    Status Bus Real-time
                </h4>
                
                {data.buses.map((bus) => (
                    <div
                        key={bus.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <TbBus className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white">
                                        {bus.name}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {bus.id}
                                    </p>
                                </div>
                            </div>
                            <Badge className={getStatusColor(bus.status)}>
                                {getStatusText(bus.status)}
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <TbMapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Koordinat: {formatCoordinates(bus.lat, bus.lng)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <TbClock className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Kecepatan: {bus.speed} km/h
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Tujuan:</span> {bus.destination}
                                </p>
                                
                                <div className="mt-2">
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                        bus.speed > 0 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                    }`}>
                                        <div className={`w-2 h-2 rounded-full ${
                                            bus.speed > 0 ? 'bg-green-500' : 'bg-gray-500'
                                        }`} />
                                        {bus.speed > 0 ? 'Dalam Perjalanan' : 'Berhenti'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default LiveLocation