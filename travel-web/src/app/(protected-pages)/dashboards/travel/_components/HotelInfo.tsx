'use client'

import { Card } from '@/components/ui/Card'
import { TbBuilding, TbStar, TbUsers, TbCurrencyDollar } from 'react-icons/tb'

type HotelData = {
    id: string
    name: string
    location: string
    rating: number
    availableRooms: number
    totalRooms: number
    price: number
    checkedInStudents: number
}

type HotelInfoProps = {
    data: HotelData[]
}

const HotelInfo = ({ data }: HotelInfoProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const getRoomAvailabilityPercentage = (available: number, total: number) => {
        return Math.round((available / total) * 100)
    }

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <TbStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            )
        }

        if (hasHalfStar) {
            stars.push(
                <TbStar key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
            )
        }

        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <TbStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            )
        }

        return stars
    }

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <TbBuilding className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Hotel Partner
                </h3>
            </div>
            
            <div className="space-y-4">
                {data.map((hotel) => {
                    const availabilityPercentage = getRoomAvailabilityPercentage(
                        hotel.availableRooms,
                        hotel.totalRooms
                    )
                    
                    return (
                        <div
                            key={hotel.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <div className="mb-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {hotel.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {hotel.location}
                                </p>
                                
                                <div className="flex items-center gap-1 mt-1">
                                    {renderStars(hotel.rating)}
                                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                        ({hotel.rating})
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbUsers className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Siswa check-in
                                        </span>
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {hotel.checkedInStudents}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbBuilding className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Kamar tersedia
                                        </span>
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {hotel.availableRooms}/{hotel.totalRooms}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TbCurrencyDollar className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Harga/malam
                                        </span>
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {formatPrice(hotel.price)}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Room Availability Progress Bar */}
                            <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                    <span>Ketersediaan Kamar</span>
                                    <span>{availabilityPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            availabilityPercentage <= 20
                                                ? 'bg-red-500'
                                                : availabilityPercentage <= 50
                                                ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                        }`}
                                        style={{ width: `${availabilityPercentage}%` }}
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

export default HotelInfo