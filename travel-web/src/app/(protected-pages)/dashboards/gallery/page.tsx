'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbCamera, TbCalendar, TbMapPin, TbUsers, TbDownload, TbShare2, TbHeart, TbEye, TbFilter, TbSearch } from 'react-icons/tb'
import { useState } from 'react'

// Dummy data untuk gallery
const galleryData = [
    {
        id: 'IMG001',
        title: 'Departure from Jakarta',
        description: 'Students gathering at Jakarta Terminal before the journey begins',
        imageUrl: '/api/placeholder/400/300',
        category: 'Departure',
        location: 'Jakarta Terminal',
        date: '2024-02-15',
        photographer: 'Ahmad Wijaya',
        tags: ['departure', 'jakarta', 'students', 'terminal'],
        likes: 45,
        views: 120,
        participants: ['Student Group A', 'Student Group B']
    },
    {
        id: 'IMG002',
        title: 'Journey to Bandung',
        description: 'Beautiful scenery during the bus ride to Bandung',
        imageUrl: '/api/placeholder/400/300',
        category: 'Journey',
        location: 'Jakarta-Bandung Highway',
        date: '2024-02-15',
        photographer: 'Budi Santoso',
        tags: ['journey', 'bandung', 'highway', 'scenery'],
        likes: 32,
        views: 89,
        participants: ['Student Group A']
    },
    {
        id: 'IMG003',
        title: 'Bandung City Tour',
        description: 'Exploring the beautiful city of Bandung',
        imageUrl: '/api/placeholder/400/300',
        category: 'Sightseeing',
        location: 'Bandung City Center',
        date: '2024-02-15',
        photographer: 'Candra Kusuma',
        tags: ['bandung', 'city', 'tour', 'sightseeing'],
        likes: 67,
        views: 156,
        participants: ['Student Group B', 'Student Group C']
    },
    {
        id: 'IMG004',
        title: 'Hotel Check-in',
        description: 'Students checking in at the hotel in Bandung',
        imageUrl: '/api/placeholder/400/300',
        category: 'Accommodation',
        location: 'Grand Hotel Bandung',
        date: '2024-02-15',
        photographer: 'Dewi Sari',
        tags: ['hotel', 'checkin', 'accommodation', 'bandung'],
        likes: 28,
        views: 75,
        participants: ['Student Group A', 'Student Group B', 'Student Group C']
    },
    {
        id: 'IMG005',
        title: 'Cultural Performance',
        description: 'Traditional dance performance at cultural center',
        imageUrl: '/api/placeholder/400/300',
        category: 'Culture',
        location: 'Bandung Cultural Center',
        date: '2024-02-16',
        photographer: 'Eko Prasetyo',
        tags: ['culture', 'dance', 'traditional', 'performance'],
        likes: 89,
        views: 203,
        participants: ['Student Group A', 'Student Group B']
    },
    {
        id: 'IMG006',
        title: 'Group Dinner',
        description: 'Students enjoying dinner together at local restaurant',
        imageUrl: '/api/placeholder/400/300',
        category: 'Food',
        location: 'Sundanese Restaurant',
        date: '2024-02-16',
        photographer: 'Fitri Handayani',
        tags: ['dinner', 'food', 'restaurant', 'group'],
        likes: 54,
        views: 134,
        participants: ['Student Group A', 'Student Group B', 'Student Group C']
    }
]

export default function GalleryPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const categories = ['All', 'Departure', 'Journey', 'Sightseeing', 'Accommodation', 'Culture', 'Food']

    const filteredImages = galleryData.filter(image => {
        const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory
        
        return matchesSearch && matchesCategory
    })

    // Statistics
    const totalImages = galleryData.length
    const totalViews = galleryData.reduce((sum, img) => sum + img.views, 0)
    const totalLikes = galleryData.reduce((sum, img) => sum + img.likes, 0)
    const uniqueLocations = new Set(galleryData.map(img => img.location)).size

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Travel Gallery</h1>
                <Button>
                    <TbCamera className="h-4 w-4 mr-2" />
                    Upload Photos
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{totalImages}</p>
                            <p className="text-sm text-gray-600">Total Photos</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{totalViews}</p>
                            <p className="text-sm text-gray-600">Total Views</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{totalLikes}</p>
                            <p className="text-sm text-gray-600">Total Likes</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{uniqueLocations}</p>
                            <p className="text-sm text-gray-600">Locations</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search photos by title, description, or tags..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image) => (
                    <Card 
                        key={image.id} 
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedImage(selectedImage === image.id ? null : image.id)}
                    >
                        <div className="relative">
                            <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
                                <TbCamera className="h-12 w-12 text-gray-400" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-black/50 text-white">
                                        {image.category}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <p className="text-sm font-medium">{image.title}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <TbMapPin className="h-3 w-3" />
                                    <span>{image.location}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <TbCalendar className="h-3 w-3" />
                                    <span>{image.date}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>By {image.photographer}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <TbHeart className="h-3 w-3" />
                                            <span>{image.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TbEye className="h-3 w-3" />
                                            <span>{image.views}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {image.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            #{tag}
                                        </Badge>
                                    ))}
                                    {image.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{image.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>

                                {selectedImage === image.id && (
                                    <div className="pt-2 border-t space-y-2">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium">Participants:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {image.participants.map((participant) => (
                                                    <Badge key={participant} variant="outline" className="text-xs">
                                                        {participant}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1">
                                                <TbDownload className="h-3 w-3 mr-1" />
                                                Download
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                <TbShare2 className="h-3 w-3 mr-1" />
                                                Share
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredImages.length === 0 && (
                <Card>
                    <div className="p-12 text-center">
                        <TbCamera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Photos Found</h3>
                        <p className="text-gray-500">
                            {searchTerm || selectedCategory !== 'All' 
                                ? 'Try adjusting your search or filter criteria'
                                : 'No photos have been uploaded yet'
                            }
                        </p>
                    </div>
                </Card>
            )}

            {/* Recent Activity */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                            <TbCamera className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium">12 new photos uploaded</p>
                                <p className="text-xs text-gray-600">From Surabaya trip - 2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                            <TbHeart className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium">Group Photo at Museum reached 95 likes</p>
                                <p className="text-xs text-gray-600">Most liked photo this week - 4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded">
                            <TbShare2 className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-sm font-medium">Malioboro Street photo shared 15 times</p>
                                <p className="text-xs text-gray-600">Popular on social media - 6 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}