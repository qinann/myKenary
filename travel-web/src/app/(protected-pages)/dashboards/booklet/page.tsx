'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbBook, TbDownload, TbEye, TbEdit, TbShare, TbFileText, TbCalendar, TbUsers, TbStar, TbBook2, TbPlus, TbSearch } from 'react-icons/tb'
import { useState } from 'react'

// Dummy data untuk booklets
const bookletData = [
    {
        id: 'BK001',
        title: 'Jakarta Travel Guide',
        description: 'Comprehensive guide for exploring Jakarta including historical sites, museums, and cultural landmarks',
        category: 'Travel Guide',
        type: 'Digital',
        pages: 45,
        version: '2.1',
        language: 'Indonesian',
        createdDate: '2024-01-15',
        lastUpdated: '2024-02-10',
        author: 'Travel Team',
        status: 'Published',
        downloads: 156,
        rating: 4.8,
        size: '12.5 MB',
        format: 'PDF',
        targetAudience: ['Students', 'Teachers'],
        topics: ['History', 'Culture', 'Transportation', 'Food'],
        chapters: [
            'Introduction to Jakarta',
            'Historical Sites',
            'Museums and Galleries',
            'Cultural Centers',
            'Transportation Guide',
            'Local Cuisine',
            'Safety Tips'
        ]
    },
    {
        id: 'BK002',
        title: 'Bandung Cultural Heritage',
        description: 'Detailed exploration of Bandung\'s rich cultural heritage and architectural wonders',
        category: 'Cultural Guide',
        type: 'Digital',
        pages: 32,
        version: '1.5',
        language: 'Indonesian',
        createdDate: '2024-01-20',
        lastUpdated: '2024-02-08',
        author: 'Cultural Team',
        status: 'Published',
        downloads: 89,
        rating: 4.6,
        size: '8.2 MB',
        format: 'PDF',
        targetAudience: ['Students', 'Researchers'],
        topics: ['Architecture', 'Culture', 'Art', 'History'],
        chapters: [
            'Bandung Overview',
            'Colonial Architecture',
            'Traditional Arts',
            'Cultural Sites',
            'Local Traditions'
        ]
    },
    {
        id: 'BK003',
        title: 'Yogyakarta Palace Study',
        description: 'In-depth study of Kraton Yogyakarta and traditional Javanese royal culture',
        category: 'Historical Study',
        type: 'Digital',
        pages: 28,
        version: '1.0',
        language: 'Indonesian',
        createdDate: '2024-02-01',
        lastUpdated: '2024-02-05',
        author: 'History Department',
        status: 'Draft',
        downloads: 23,
        rating: 4.9,
        size: '15.3 MB',
        format: 'PDF',
        targetAudience: ['Students', 'History Enthusiasts'],
        topics: ['Royal Culture', 'Architecture', 'Traditions', 'History'],
        chapters: [
            'Palace History',
            'Royal Architecture',
            'Court Traditions',
            'Cultural Significance',
            'Modern Preservation'
        ]
    },
    {
        id: 'BK004',
        title: 'Indonesian Cuisine Explorer',
        description: 'Culinary journey through traditional Indonesian dishes and cooking techniques',
        category: 'Culinary Guide',
        type: 'Interactive',
        pages: 52,
        version: '3.0',
        language: 'Indonesian',
        createdDate: '2024-01-10',
        lastUpdated: '2024-02-12',
        author: 'Culinary Team',
        status: 'Published',
        downloads: 234,
        rating: 4.7,
        size: '25.8 MB',
        format: 'Interactive PDF',
        targetAudience: ['Students', 'Food Enthusiasts', 'Teachers'],
        topics: ['Cooking', 'Culture', 'Nutrition', 'Traditions'],
        chapters: [
            'Indonesian Spices',
            'Regional Cuisines',
            'Cooking Techniques',
            'Traditional Recipes',
            'Food Culture',
            'Nutritional Values'
        ]
    }
]

export default function BookletPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedBooklet, setSelectedBooklet] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const categories = ['All', 'Travel Guide', 'Cultural Guide', 'Historical Study', 'Culinary Guide']
    const statuses = ['All', 'Published', 'Draft', 'Under Review']

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800'
            case 'Draft': return 'bg-yellow-100 text-yellow-800'
            case 'Under Review': return 'bg-blue-100 text-blue-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Travel Guide': return 'bg-blue-100 text-blue-800'
            case 'Cultural Guide': return 'bg-purple-100 text-purple-800'
            case 'Historical Study': return 'bg-orange-100 text-orange-800'
            case 'Culinary Guide': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredBooklets = bookletData.filter(booklet => {
        const matchesCategory = selectedCategory === 'All' || booklet.category === selectedCategory
        const matchesSearch = booklet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             booklet.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Statistics
    const totalBooklets = bookletData.length
    const publishedBooklets = bookletData.filter(b => b.status === 'Published').length
    const draftBooklets = bookletData.filter(b => b.status === 'Draft').length
    const totalDownloads = bookletData.reduce((sum, b) => sum + b.downloads, 0)
    const averageRating = (bookletData.reduce((sum, b) => sum + b.rating, 0) / bookletData.length).toFixed(1)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Digital Booklets</h1>
                <Button>
                    <TbPlus className="h-4 w-4 mr-2" />
                    Create New Booklet
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{totalBooklets}</p>
                            <p className="text-sm text-gray-600">Total Booklets</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{publishedBooklets}</p>
                            <p className="text-sm text-gray-600">Published</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">{draftBooklets}</p>
                            <p className="text-sm text-gray-600">Drafts</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{totalDownloads}</p>
                            <p className="text-sm text-gray-600">Downloads</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{averageRating}</p>
                            <p className="text-sm text-gray-600">Avg Rating</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search booklets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
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

            {/* Booklets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBooklets.map((booklet) => (
                    <Card key={booklet.id} className="hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <TbBook className="h-6 w-6 text-blue-600" />
                                        <h3 className="text-lg font-semibold">{booklet.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-3">{booklet.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge className={getStatusColor(booklet.status)}>
                                            {booklet.status}
                                        </Badge>
                                        <Badge className={getCategoryColor(booklet.category)}>
                                            {booklet.category}
                                        </Badge>
                                        <Badge variant="outline">
                                            v{booklet.version}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedBooklet(
                                            selectedBooklet === booklet.id ? null : booklet.id
                                        )}
                                    >
                                        <TbEye className="h-4 w-4 mr-1" />
                                        {selectedBooklet === booklet.id ? 'Hide' : 'View'}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <TbEdit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                    <TbFileText className="h-4 w-4 text-gray-400" />
                                    <span>{booklet.pages} pages</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbDownload className="h-4 w-4 text-gray-400" />
                                    <span>{booklet.downloads} downloads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbStar className="h-4 w-4 text-yellow-400" />
                                    <span>{booklet.rating}/5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TbCalendar className="h-4 w-4 text-gray-400" />
                                    <span>{booklet.lastUpdated}</span>
                                </div>
                            </div>

                            {/* Topics */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Topics:</p>
                                <div className="flex flex-wrap gap-1">
                                    {booklet.topics.map((topic) => (
                                        <Badge key={topic} variant="outline" className="text-xs">
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button size="sm" className="flex-1">
                                    <TbDownload className="h-4 w-4 mr-1" />
                                    Download
                                </Button>
                                <Button variant="outline" size="sm">
                                    <TbShare className="h-4 w-4 mr-1" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm">
                                     <TbBook2 className="h-4 w-4 mr-1" />
                                     Preview
                                 </Button>
                            </div>

                            {/* Expanded Details */}
                            {selectedBooklet === booklet.id && (
                                <div className="border-t pt-4 mt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium text-gray-700">Author</p>
                                            <p className="text-gray-600">{booklet.author}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Language</p>
                                            <p className="text-gray-600">{booklet.language}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Format</p>
                                            <p className="text-gray-600">{booklet.format}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">File Size</p>
                                            <p className="text-gray-600">{booklet.size}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-700 mb-2">Target Audience</p>
                                        <div className="flex flex-wrap gap-1">
                                            {booklet.targetAudience.map((audience) => (
                                                <Badge key={audience} variant="outline" className="text-xs">
                                                    {audience}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-700 mb-2">Chapters</p>
                                        <div className="bg-gray-50 p-3 rounded">
                                            <ol className="list-decimal list-inside space-y-1 text-sm">
                                                {booklet.chapters.map((chapter, index) => (
                                                    <li key={index} className="text-gray-600">
                                                        {chapter}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Created: {booklet.createdDate}</span>
                                        <span>Last Updated: {booklet.lastUpdated}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {filteredBooklets.length === 0 && (
                <Card>
                    <div className="p-12 text-center">
                        <TbBook className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No booklets found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm ? 'Try adjusting your search terms' : 'No booklets match the selected filters'}
                        </p>
                        <Button>
                            <TbPlus className="h-4 w-4 mr-2" />
                            Create First Booklet
                        </Button>
                    </div>
                </Card>
            )}

            {/* Quick Actions */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbPlus className="h-6 w-6" />
                            <span>Create Booklet</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbDownload className="h-6 w-6" />
                            <span>Bulk Download</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbShare className="h-6 w-6" />
                            <span>Share Collection</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbFileText className="h-6 w-6" />
                            <span>Generate Report</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}