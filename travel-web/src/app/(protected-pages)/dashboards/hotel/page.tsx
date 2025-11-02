'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbMapPin, TbStar, TbUsers, TbWifi, TbCar, TbCoffee, TbToolsKitchen2, TbBuilding } from 'react-icons/tb'

// Dummy data untuk hotel
const hotelData = [
    {
        id: 'HTL001',
        name: 'Grand Hotel Jakarta',
        location: 'Jakarta Pusat',
        rating: 4.5,
        totalRooms: 150,
        availableRooms: 45,
        pricePerNight: 850000,
        amenities: ['WiFi', 'Parking', 'Restaurant', 'Pool'],
        contact: '+62 21 1234567',
        email: 'info@grandhoteljakarta.com',
        status: 'Available'
    },
    {
        id: 'HTL002',
        name: 'Bandung Resort & Spa',
        location: 'Bandung',
        rating: 4.8,
        totalRooms: 80,
        availableRooms: 12,
        pricePerNight: 650000,
        amenities: ['WiFi', 'Spa', 'Restaurant', 'Garden'],
        contact: '+62 22 7654321',
        email: 'reservation@bandungresort.com',
        status: 'Limited'
    },
    {
        id: 'HTL003',
        name: 'Yogyakarta Heritage Hotel',
        location: 'Yogyakarta',
        rating: 4.3,
        totalRooms: 60,
        availableRooms: 0,
        pricePerNight: 450000,
        amenities: ['WiFi', 'Cultural Tours', 'Restaurant'],
        contact: '+62 274 987654',
        email: 'booking@yogyaheritage.com',
        status: 'Full'
    },
    {
        id: 'HTL004',
        name: 'Surabaya Business Hotel',
        location: 'Surabaya',
        rating: 4.2,
        totalRooms: 120,
        availableRooms: 67,
        pricePerNight: 750000,
        amenities: ['WiFi', 'Business Center', 'Gym', 'Restaurant'],
        contact: '+62 31 5555555',
        email: 'info@surabayabusiness.com',
        status: 'Available'
    }
]

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Available':
            return 'bg-green-100 text-green-800'
        case 'Limited':
            return 'bg-yellow-100 text-yellow-800'
        case 'Full':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
        case 'wifi':
            return <TbWifi className="h-4 w-4" />
        case 'parking':
            return <TbCar className="h-4 w-4" />
        case 'restaurant':
            return <TbToolsKitchen2 className="h-4 w-4" />
        default:
            return <TbCoffee className="h-4 w-4" />
    }
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

export default function HotelPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Hotel Information</h1>
                <Button>Add New Hotel</Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">4</p>
                        <p className="text-sm text-gray-600">Total Hotels</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">124</p>
                        <p className="text-sm text-gray-600">Available Rooms</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">286</p>
                        <p className="text-sm text-gray-600">Total Rooms</p>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">4.4</p>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                </Card>
            </div>

            {/* Hotel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelData.map((hotel) => (
                    <Card key={hotel.id} className="hover:shadow-lg transition-shadow p-6">
                        <div className="pb-3">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                                <Badge className={getStatusColor(hotel.status)}>
                                    {hotel.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{hotel.id}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <TbMapPin className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{hotel.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbStar className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{hotel.rating}/5.0</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <TbUsers className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">
                                    {hotel.availableRooms}/{hotel.totalRooms} rooms available
                                </span>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    {formatPrice(hotel.pricePerNight)}/night
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                                            {getAmenityIcon(amenity)}
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                    {hotel.amenities.length > 3 && (
                                        <span className="text-xs text-gray-500">
                                            +{hotel.amenities.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1 text-xs text-gray-600">
                                <p>📞 {hotel.contact}</p>
                                <p>✉️ {hotel.email}</p>
                            </div>

                            <div className="pt-2">
                                <Button className="w-full">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Hotel Statistics */}
            <Card className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Hotel Statistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium mb-2">Occupancy Rate</h4>
                        <div className="space-y-2">
                            {hotelData.map((hotel) => {
                                const occupancyRate = ((hotel.totalRooms - hotel.availableRooms) / hotel.totalRooms * 100).toFixed(1)
                                return (
                                    <div key={hotel.id} className="flex justify-between text-sm">
                                        <span>{hotel.name}</span>
                                        <span className="font-medium">{occupancyRate}%</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Price Range</h4>
                        <div className="space-y-2">
                            {hotelData.map((hotel) => (
                                <div key={hotel.id} className="flex justify-between text-sm">
                                    <span>{hotel.name}</span>
                                    <span className="font-medium">{formatPrice(hotel.pricePerNight)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Ratings</h4>
                        <div className="space-y-2">
                            {hotelData.map((hotel) => (
                                <div key={hotel.id} className="flex justify-between text-sm">
                                    <span>{hotel.name}</span>
                                    <div className="flex items-center gap-1">
                                        <TbStar className="h-3 w-3 text-yellow-500" />
                                        <span className="font-medium">{hotel.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}