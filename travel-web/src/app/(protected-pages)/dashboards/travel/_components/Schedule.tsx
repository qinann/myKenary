'use client'

import { Card } from '@/components/ui/Card'
import { TbCalendar, TbClock, TbMapPin, TbCircleCheck, TbCircle, TbCircleDot } from 'react-icons/tb'

type ScheduleData = {
    id: string
    time: string
    activity: string
    status: string
    location: string
}

type ScheduleProps = {
    data: ScheduleData[]
}

const Schedule = ({ data }: ScheduleProps) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <TbCircleCheck className="w-5 h-5 text-green-500" />
            case 'current':
                return <TbCircleDot className="w-5 h-5 text-blue-500" />
            case 'upcoming':
                return <TbCircle className="w-5 h-5 text-gray-400" />
            default:
                return <TbCircle className="w-5 h-5 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 dark:text-green-400'
            case 'current':
                return 'text-blue-600 dark:text-blue-400'
            case 'upcoming':
                return 'text-gray-600 dark:text-gray-400'
            default:
                return 'text-gray-600 dark:text-gray-400'
        }
    }

    const getConnectorColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500'
            case 'current':
                return 'bg-blue-500'
            default:
                return 'bg-gray-300 dark:bg-gray-600'
        }
    }

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <TbCalendar className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Jadwal Perjalanan
                </h3>
            </div>
            
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={item.id} className="relative">
                        {/* Timeline connector */}
                        {index < data.length - 1 && (
                            <div 
                                className={`absolute left-2.5 top-8 w-0.5 h-8 ${getConnectorColor(item.status)}`}
                            />
                        )}
                        
                        <div className="flex items-start gap-4">
                            {/* Status Icon */}
                            <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(item.status)}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TbClock className="w-4 h-4 text-gray-500" />
                                            <span className={`font-semibold ${getStatusColor(item.status)}`}>
                                                {item.time}
                                            </span>
                                        </div>
                                        
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                            {item.activity}
                                        </h4>
                                        
                                        <div className="flex items-center gap-2">
                                            <TbMapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {item.location}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        item.status === 'completed'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                            : item.status === 'current'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                    }`}>
                                        {item.status === 'completed' && 'Selesai'}
                                        {item.status === 'current' && 'Sedang Berlangsung'}
                                        {item.status === 'upcoming' && 'Akan Datang'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                            {data.filter(item => item.status === 'completed').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Selesai
                        </div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {data.filter(item => item.status === 'current').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Berlangsung
                        </div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                            {data.filter(item => item.status === 'upcoming').length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            Akan Datang
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Schedule