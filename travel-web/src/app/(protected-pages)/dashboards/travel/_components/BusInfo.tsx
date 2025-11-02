'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { TbBus, TbUsers, TbMapPin } from 'react-icons/tb'

type BusData = {
    id: string
    name: string
    capacity: number
    occupied: number
    driver: string
    status: string
    route: string
    currentLocation: string
}

type BusInfoProps = {
    data: BusData[]
}

const BusInfo = ({ data }: BusInfoProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }
    }

    const getOccupancyPercentage = (occupied: number, capacity: number) => {
        return Math.round((occupied / capacity) * 100)
    }

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <TbBus className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informasi Bus
                </h3>
            </div>
            
            <div className="space-y-4">
                {data.map((bus) => {
                    const occupancyPercentage = getOccupancyPercentage(bus.occupied, bus.capacity)
                    
                    return (
                        <div
                            key={bus.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {bus.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {bus.id}
                                    </p>
                                </div>
                                <Badge className={getStatusColor(bus.status)}>
                                    {bus.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <TbUsers className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {bus.occupied}/{bus.capacity} penumpang ({occupancyPercentage}%)
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <TbMapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {bus.currentLocation}
                                    </span>
                                </div>
                                
                                <div className="pt-2">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Driver:</span> {bus.driver}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Rute:</span> {bus.route}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Occupancy Progress Bar */}
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    <span>Kapasitas</span>
                                    <span>{occupancyPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            occupancyPercentage >= 90
                                                ? 'bg-red-500'
                                                : occupancyPercentage >= 70
                                                ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                        }`}
                                        style={{ width: `${occupancyPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default BusInfo