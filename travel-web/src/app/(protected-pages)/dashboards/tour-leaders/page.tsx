'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TbSearch, TbPhone, TbMail, TbUser, TbPlus, TbEdit, TbTrash, TbEye, TbX } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import TourLeadersService from '@/services/TourLeadersService'
import type { TourLeader, CreateTourLeaderDto, UpdateTourLeaderDto } from '@/@types/tour-leader'

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Active':
            return 'bg-green-100 text-green-800'
        case 'Inactive':
            return 'bg-red-100 text-red-800'
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function TourLeadersPage() {
    const [tourLeaders, setTourLeaders] = useState<TourLeader[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalTourLeaders, setTotalTourLeaders] = useState(0)
    const [pageSize] = useState(10)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedTourLeader, setSelectedTourLeader] = useState<TourLeader | null>(null)
    const [editFormData, setEditFormData] = useState<TourLeader | null>(null)
    const [addFormData, setAddFormData] = useState<CreateTourLeaderDto>({
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        status: 'Active'
    })

    // Load tour leaders data on component mount
    useEffect(() => {
        loadTourLeaders()
    }, [currentPage, searchTerm])

    const loadTourLeaders = async () => {
        try {
            setLoading(true)
            const response = await TourLeadersService.getTourLeaders({
                pageIndex: currentPage.toString(),
                pageSize: pageSize.toString(),
                query: searchTerm
            })
            setTourLeaders(response.data || [])
            setTotalPages(response.pagination.totalPages)
            setTotalTourLeaders(response.pagination.total)
        } catch (error) {
            console.error('Error loading tour leaders:', error)
            // Fallback to empty array if API fails
            setTourLeaders([])
            setTotalPages(1)
            setTotalTourLeaders(0)
        } finally {
            setLoading(false)
        }
    }

    // Handle search with debounce
    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page when searching
    }

    const openDetailModal = (tourLeader: TourLeader) => {
        setSelectedTourLeader(tourLeader)
        setShowDetailModal(true)
    }

    const openEditModal = (tourLeader: TourLeader) => {
        setEditFormData({ ...tourLeader })
        setShowEditModal(true)
    }

    const handleEditSubmit = async () => {
        if (editFormData) {
            try {
                const updateData: UpdateTourLeaderDto = {
                    name: editFormData.name,
                    phone: editFormData.phone,
                    whatsapp: editFormData.whatsapp,
                    email: editFormData.email,
                    status: editFormData.status
                }
                
                await TourLeadersService.updateTourLeader(editFormData.id, updateData)
                
                // Refresh data setelah update
                await loadTourLeaders()
                
                setShowEditModal(false)
                setEditFormData(null)
                alert('Data tour leader berhasil diperbarui!')
            } catch (error) {
                console.error('Error updating tour leader:', error)
                alert('Gagal memperbarui data tour leader. Silakan coba lagi.')
            }
        }
    }

    const handleEditChange = (field: keyof TourLeader, value: string) => {
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [field]: value
            })
        }
    }

    const openAddModal = () => {
        setAddFormData({
            name: '',
            phone: '',
            whatsapp: '',
            email: '',
            status: 'Active'
        })
        setShowAddModal(true)
    }

    const handleAddSubmit = async () => {
        if (addFormData.name && addFormData.phone && addFormData.whatsapp) {
            try {
                await TourLeadersService.createTourLeader(addFormData)
                
                // Refresh data setelah create
                await loadTourLeaders()
                
                setShowAddModal(false)
                setAddFormData({
                    name: '',
                    phone: '',
                    whatsapp: '',
                    email: '',
                    status: 'Active'
                })
                alert('Tour leader baru berhasil ditambahkan!')
            } catch (error) {
                console.error('Error creating tour leader:', error)
                alert('Gagal menambahkan tour leader baru. Silakan coba lagi.')
            }
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi (Nama, Telepon, WhatsApp)')
        }
    }

    const handleAddChange = (field: keyof CreateTourLeaderDto, value: string) => {
        setAddFormData({
            ...addFormData,
            [field]: value
        })
    }

    const handleDeleteTourLeader = async (tourLeaderId: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus data tour leader ini?')) {
            try {
                await TourLeadersService.deleteTourLeader(tourLeaderId)
                
                // Refresh data setelah delete
                await loadTourLeaders()
                
                alert('Data tour leader berhasil dihapus!')
            } catch (error) {
                console.error('Error deleting tour leader:', error)
                alert('Gagal menghapus data tour leader. Silakan coba lagi.')
            }
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour Leaders</h1>
                <p className="text-gray-600">Kelola data tour leader untuk perjalanan wisata</p>
            </div>

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
                        <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Cari tour leader..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700">
                    <TbPlus className="w-4 h-4 mr-2" />
                    Tambah Tour Leader
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 mr-4">
                            <TbUser className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Tour Leaders</p>
                            <p className="text-2xl font-bold text-gray-900">{totalTourLeaders}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 mr-4">
                            <TbUser className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {tourLeaders.filter(tl => tl.status === 'Active').length}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 mr-4">
                            <TbUser className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {tourLeaders.filter(tl => tl.status === 'Pending').length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tour Leaders Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tourLeaders.map((tourLeader) => (
                        <Card key={tourLeader.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-semibold">
                                            {getInitials(tourLeader.name)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{tourLeader.name}</h3>
                                        <Badge className={getStatusColor(tourLeader.status || 'Active')}>
                                            {tourLeader.status || 'Active'}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openDetailModal(tourLeader)}
                                    >
                                        <TbEye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openEditModal(tourLeader)}
                                    >
                                        <TbEdit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDeleteTourLeader(tourLeader.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <TbTrash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <TbPhone className="w-4 h-4 mr-2" />
                                    {tourLeader.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <TbPhone className="w-4 h-4 mr-2" />
                                    WhatsApp: {tourLeader.whatsapp}
                                </div>
                                {tourLeader.email && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <TbMail className="w-4 h-4 mr-2" />
                                        {tourLeader.email}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center px-4 py-2 text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedTourLeader && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Detail Tour Leader</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowDetailModal(false)}
                            >
                                <TbX className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <p className="text-gray-900">{selectedTourLeader.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Telepon</label>
                                <p className="text-gray-900">{selectedTourLeader.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                                <p className="text-gray-900">{selectedTourLeader.whatsapp}</p>
                            </div>
                            {selectedTourLeader.email && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="text-gray-900">{selectedTourLeader.email}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <Badge className={getStatusColor(selectedTourLeader.status || 'Active')}>
                                    {selectedTourLeader.status || 'Active'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editFormData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Edit Tour Leader</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowEditModal(false)}
                            >
                                <TbX className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama *
                                </label>
                                <Input
                                    value={editFormData.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                    placeholder="Nama tour leader"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Telepon *
                                </label>
                                <Input
                                    value={editFormData.phone}
                                    onChange={(e) => handleEditChange('phone', e.target.value)}
                                    placeholder="Nomor telepon"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    WhatsApp *
                                </label>
                                <Input
                                    value={editFormData.whatsapp}
                                    onChange={(e) => handleEditChange('whatsapp', e.target.value)}
                                    placeholder="Nomor WhatsApp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Input
                                    value={editFormData.email || ''}
                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                    placeholder="Email (opsional)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={editFormData.status || 'Active'}
                                    onChange={(e) => handleEditChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowEditModal(false)}
                            >
                                Batal
                            </Button>
                            <Button onClick={handleEditSubmit}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Tambah Tour Leader</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAddModal(false)}
                            >
                                <TbX className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama *
                                </label>
                                <Input
                                    value={addFormData.name}
                                    onChange={(e) => handleAddChange('name', e.target.value)}
                                    placeholder="Nama tour leader"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Telepon *
                                </label>
                                <Input
                                    value={addFormData.phone}
                                    onChange={(e) => handleAddChange('phone', e.target.value)}
                                    placeholder="Nomor telepon"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    WhatsApp *
                                </label>
                                <Input
                                    value={addFormData.whatsapp}
                                    onChange={(e) => handleAddChange('whatsapp', e.target.value)}
                                    placeholder="Nomor WhatsApp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Input
                                    value={addFormData.email || ''}
                                    onChange={(e) => handleAddChange('email', e.target.value)}
                                    placeholder="Email (opsional)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={addFormData.status || 'Active'}
                                    onChange={(e) => handleAddChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowAddModal(false)}
                            >
                                Batal
                            </Button>
                            <Button onClick={handleAddSubmit}>
                                Tambah
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}