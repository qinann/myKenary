'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Link from 'next/link'
import { FormItem, Form } from '@/components/ui/Form'
import { 
    TbPhone, 
    TbUser, 
    TbUsers,
    TbBus,
    TbStar,
    TbMessage,
    TbPlus,
    TbEdit,
    TbTrash
} from 'react-icons/tb'
import { useState, useEffect } from 'react'
import TourLeadersService from '@/services/TourLeadersService'
import DriversService from '@/services/DriversService'
import BusService from '@/services/BusService'
import { TourLeader } from '@/@types/tour-leader'
import { Driver } from '@/@types/driver'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState('tour-leaders')
    const [tourLeaders, setTourLeaders] = useState<TourLeader[]>([])
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [loading, setLoading] = useState(true)
    const [showTourLeaderModal, setShowTourLeaderModal] = useState(false)
    const [showDriverModal, setShowDriverModal] = useState(false)
    const [showEditTourLeaderModal, setShowEditTourLeaderModal] = useState(false)
    const [editingTourLeader, setEditingTourLeader] = useState<TourLeader | null>(null)
    const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null)
    
    // Bus options (akan diisi dari API)
    const [busOptions, setBusOptions] = useState<{ value: string; label: string }[]>([])
    const [tourLeaderForm, setTourLeaderForm] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        bus: ''
    })
    
    const [driverForm, setDriverForm] = useState({
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        licenseNumber: '',
        bus: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [tourLeadersResponse, driversResponse, busesResponse] = await Promise.all([
                    TourLeadersService.getTourLeaders(),
                    DriversService.getDrivers(),
                    BusService.getBuses()
                ])
                setTourLeaders(tourLeadersResponse.data)
                setDrivers(driversResponse.data)
                // Map bus options: gunakan id sebagai value, name sebagai label
                const options = (busesResponse?.data || []).map((b: any) => ({
                    value: b?.id ?? '',
                    label: b?.name || b?.id || '',
                }))
                setBusOptions(options)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'bg-green-100 text-green-800'
            case 'Busy':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const openWhatsApp = (whatsapp: string, name: string) => {
        const message = encodeURIComponent(`Halo ${name}, saya ingin menanyakan tentang layanan travel.`)
        window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank')
    }

    const handleTourLeaderSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await TourLeadersService.createTourLeader(tourLeaderForm)
            setShowTourLeaderModal(false)
            setTourLeaderForm({ name: '', phone: '', whatsapp: '', email: '', bus: '' })
            // Refresh data
            const response = await TourLeadersService.getTourLeaders()
            setTourLeaders(response.data)
        } catch (error) {
            console.error('Error creating tour leader:', error)
        }
    }

    const handleDriverSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await DriversService.createDriver(driverForm)
            setShowDriverModal(false)
            setDriverForm({ name: '', phone: '', whatsapp: '', email: '', licenseNumber: '', bus: '' })
            // Refresh data
            const response = await DriversService.getDrivers()
            setDrivers(response.data)
        } catch (error) {
            console.error('Error creating driver:', error)
        }
    }

    const callPhone = (phone: string) => {
        window.open(`tel:${phone}`, '_self')
    }

    const handleEditTourLeader = (tourLeader: TourLeader) => {
        setEditingTourLeader(tourLeader)
        setShowEditTourLeaderModal(true)
    }

    const handleUpdateTourLeader = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingTourLeader) return

        try {
            await TourLeadersService.updateTourLeader(editingTourLeader.id, {
                name: editingTourLeader.name,
                phone: editingTourLeader.phone,
                whatsapp: editingTourLeader.whatsapp,
                email: editingTourLeader.email,
                status: editingTourLeader.status,
                bus: editingTourLeader.bus
            })
            setShowEditTourLeaderModal(false)
            setEditingTourLeader(null)
            // Refresh data
            const response = await TourLeadersService.getTourLeaders()
            setTourLeaders(response.data)
        } catch (error) {
            console.error('Error updating tour leader:', error)
            alert('Gagal memperbarui data tour leader')
        }
    }

    const handleDeleteTourLeader = async (tourLeaderId: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus tour leader ini?')) {
            try {
                await TourLeadersService.deleteTourLeader(tourLeaderId)
                // Refresh data
                const response = await TourLeadersService.getTourLeaders()
                setTourLeaders(response.data)
                alert('Tour leader berhasil dihapus')
            } catch (error) {
                console.error('Error deleting tour leader:', error)
                alert('Gagal menghapus tour leader')
            }
        }
    }

    const handleDeleteDriver = async (driverId: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus driver ini?')) {
            try {
                await DriversService.deleteDriver(driverId)
                // Refresh data
                const response = await DriversService.getDrivers()
                setDrivers(response.data)
                alert('Driver berhasil dihapus')
            } catch (error) {
                console.error('Error deleting driver:', error)
                alert('Gagal menghapus driver')
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Kontak Travel</h1>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{tourLeaders.length}</p>
                            <p className="text-sm text-gray-600">Total Tour Leader</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {tourLeaders.filter(tl => tl.status === 'active').length}
                            </p>
                            <p className="text-sm text-gray-600">Tour Leader Tersedia</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{drivers.length}</p>
                            <p className="text-sm text-gray-600">Total Supir</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {drivers.filter(d => d.status === 'active').length}
                            </p>
                            <p className="text-sm text-gray-600">Supir Tersedia</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setActiveTab('tour-leaders')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'tour-leaders'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <TbUsers className="h-4 w-4 inline mr-2" />
                    Tour Leader
                </button>
                <button
                    onClick={() => setActiveTab('driver')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'driver'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <TbBus className="h-4 w-4 inline mr-2" />
                    Supir
                </button>
            </div>

            {/* Tour Leader Table */}
            {activeTab === 'tour-leaders' && (
                <Card>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Daftar Tour Leader</h2>
                            <Button
                                 onClick={() => setShowTourLeaderModal(true)}
                                 variant="outline"
                                 className="flex items-center space-x-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                             >
                                 <TbPlus className="h-4 w-4" />
                                 <span>Tambah Tour Leader</span>
                             </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                 <thead>
                                     <tr className="border-b border-gray-200">
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">Nama</th>
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">No. Telepon</th>
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">Bus</th>
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">Kontak</th>
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {tourLeaders.map((tourLeader) => (
                                         <tr key={tourLeader.id} className="border-b border-gray-100 hover:bg-gray-50">
                                             <td className="py-4 px-4">
                                                 <div className="flex items-center space-x-3">
                                                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                         <TbUser className="h-5 w-5 text-blue-600" />
                                                     </div>
                                                     <div>
                                                         <p className="font-medium text-gray-900">{tourLeader.name}</p>
                                                         <p className="text-sm text-gray-500">{tourLeader.email}</p>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td className="py-4 px-4">
                                                 <span className="text-gray-900">{tourLeader.phone}</span>
                                             </td>
                                             <td className="py-4 px-4">
                                                 {(() => {
                                                     const opt = busOptions.find(option => option.value === tourLeader.bus || option.label === tourLeader.bus)
                                                     if (!opt || !opt.value) {
                                                         return <span className="text-gray-500">-</span>
                                                     }
                                                     return (
                                                         <Link href={`/dashboards/bus-info/${opt.value}`} className="text-blue-600 hover:underline">
                                                             {opt.label}
                                                         </Link>
                                                     )
                                                 })()}
                                             </td>
                                             <td className="py-4 px-4">
                                                 <div className="flex space-x-2">
                                                     <Button
                                                         onClick={() => callPhone(tourLeader.phone)}
                                                         size="sm"
                                                         variant="outline"
                                                         className="text-green-600 border-green-600 hover:bg-green-50 p-2"
                                                         title="Call"
                                                     >
                                                         <TbPhone className="h-4 w-4" />
                                                     </Button>
                                                     <Button
                                                         onClick={() => openWhatsApp(tourLeader.whatsapp, tourLeader.name)}
                                                         size="sm"
                                                         variant="outline"
                                                         className="text-blue-600 border-blue-600 hover:bg-blue-50 p-2"
                                                         title="WhatsApp"
                                                     >
                                                         <TbMessage className="h-4 w-4" />
                                                     </Button>
                                                 </div>
                                             </td>
                                             <td className="py-4 px-4">
                                                 <div className="flex space-x-2">
                                                     <Button
                                                         onClick={() => handleEditTourLeader(tourLeader)}
                                                         size="sm"
                                                         variant="outline"
                                                         className="text-blue-600 border-blue-600 hover:bg-blue-50 p-2"
                                                         title="Edit"
                                                     >
                                                         <TbEdit className="h-4 w-4" />
                                                     </Button>
                                                     <Button
                                                         onClick={() => handleDeleteTourLeader(tourLeader.id)}
                                                         size="sm"
                                                         variant="outline"
                                                         className="text-red-600 border-red-600 hover:bg-red-50 p-2"
                                                         title="Delete"
                                                     >
                                                         <TbTrash className="h-4 w-4" />
                                                     </Button>
                                                 </div>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                        </div>
                    </div>
                </Card>
            )}

            {/* Driver Table */}
            {activeTab === 'driver' && (
                <Card>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Daftar Supir</h2>
                            <Button
                                 onClick={() => setShowDriverModal(true)}
                                 variant="outline"
                                 className="flex items-center space-x-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                             >
                                 <TbPlus className="h-4 w-4" />
                                 <span>Tambah Driver</span>
                             </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                 <thead>
                                     <tr className="border-b border-gray-200">
                                         <th className="text-left py-3 px-4 font-medium text-gray-600">Nama</th>
                                          <th className="text-left py-3 px-4 font-medium text-gray-600">No. Telepon</th>
                                          <th className="text-left py-3 px-4 font-medium text-gray-600">Bus</th>
                                          <th className="text-left py-3 px-4 font-medium text-gray-600">Kontak</th>
                                          <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {drivers.map((driver) => (
                                          <tr key={driver.id} className="border-b border-gray-100 hover:bg-gray-50">
                                              <td className="py-4 px-4">
                                                  <div className="flex items-center space-x-3">
                                                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                          <TbBus className="h-5 w-5 text-orange-600" />
                                                      </div>
                                                      <div>
                                                          <p className="font-medium text-gray-900">{driver.name}</p>
                                                          <p className="text-sm text-gray-500">{driver.email}</p>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="py-4 px-4">
                                                  <span className="text-gray-900">{driver.phone}</span>
                                              </td>
                                              <td className="py-4 px-4">
                                                  {(() => {
                                                      const opt = busOptions.find(option => option.value === driver.bus || option.label === driver.bus)
                                                      if (!opt || !opt.value) {
                                                          return <span className="text-gray-500">-</span>
                                                      }
                                                      return (
                                                          <Link href={`/dashboards/bus-info/${opt.value}`} className="text-blue-600 hover:underline">
                                                              {opt.label}
                                                          </Link>
                                                      )
                                                  })()}
                                              </td>
                                              <td className="py-4 px-4">
                                                  <div className="flex space-x-2">
                                                      <Button
                                                          onClick={() => callPhone(driver.phone)}
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-green-600 border-green-600 hover:bg-green-50 p-2"
                                                          title="Call"
                                                      >
                                                          <TbPhone className="h-4 w-4" />
                                                      </Button>
                                                      <Button
                                                          onClick={() => openWhatsApp(driver.whatsapp, driver.name)}
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-blue-600 border-blue-600 hover:bg-blue-50 p-2"
                                                          title="WhatsApp"
                                                      >
                                                          <TbMessage className="h-4 w-4" />
                                                      </Button>
                                                  </div>
                                              </td>
                                              <td className="py-4 px-4">
                                                  <div className="flex space-x-2">
                                                      <Button
                                                          onClick={() => window.open(`/dashboards/drivers/${driver.id}`, '_blank')}
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-blue-600 border-blue-600 hover:bg-blue-50 p-2"
                                                          title="Edit"
                                                      >
                                                          <TbEdit className="h-4 w-4" />
                                                      </Button>
                                                      <Button
                                                          onClick={() => setDriverToDelete(driver)}
                                                          size="sm"
                                                          variant="outline"
                                                          className="text-red-600 border-red-600 hover:bg-red-50 p-2"
                                                          title="Delete"
                                                      >
                                                          <TbTrash className="h-4 w-4" />
                                                      </Button>
                                                  </div>
                                              </td>
                                          </tr>
                                      ))}
                                 </tbody>
                             </table>
                        </div>
                        {/* Delete Confirmation Dialog */}
                        <ConfirmDialog
                            isOpen={!!driverToDelete}
                            onClose={() => setDriverToDelete(null)}
                            onCancel={() => setDriverToDelete(null)}
                            onConfirm={async () => {
                                if (!driverToDelete) return
                                try {
                                    await DriversService.deleteDriver(driverToDelete.id)
                                    const response = await DriversService.getDrivers()
                                    setDrivers(response.data)
                                } catch (error) {
                                    console.error('Error deleting driver:', error)
                                    alert('Gagal menghapus driver')
                                } finally {
                                    setDriverToDelete(null)
                                }
                            }}
                            title="Hapus Driver"
                            confirmText="Hapus"
                            cancelText="Batal"
                            type="danger"
                        >
                            <p>
                                Apakah Anda yakin ingin menghapus driver <strong>{driverToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </ConfirmDialog>
                    </div>
                </Card>
            )}

             {/* Modal Tambah Tour Leader */}
             <Dialog
                 isOpen={showTourLeaderModal}
                 onClose={() => setShowTourLeaderModal(false)}
                 className="max-w-md"
             >
                 <div className="p-6">
                     <h2 className="text-xl font-semibold mb-4">Tambah Tour Leader</h2>
                     <Form onSubmit={handleTourLeaderSubmit}>
                         <FormItem label="Nama">
                             <Input
                                 type="text"
                                 value={tourLeaderForm.name}
                                 onChange={(e) => setTourLeaderForm({...tourLeaderForm, name: e.target.value})}
                                 placeholder="Masukkan nama"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Telepon">
                             <Input
                                 type="tel"
                                 value={tourLeaderForm.phone}
                                 onChange={(e) => setTourLeaderForm({...tourLeaderForm, phone: e.target.value})}
                                 placeholder="Masukkan nomor telepon"
                                 required
                             />
                         </FormItem>
                         <FormItem label="WhatsApp">
                             <Input
                                 type="tel"
                                 value={tourLeaderForm.whatsapp}
                                 onChange={(e) => setTourLeaderForm({...tourLeaderForm, whatsapp: e.target.value})}
                                 placeholder="Masukkan nomor WhatsApp"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Email">
                              <Input
                                  type="email"
                                  value={tourLeaderForm.email}
                                  onChange={(e) => setTourLeaderForm({...tourLeaderForm, email: e.target.value})}
                                  placeholder="Masukkan email"
                                  required
                              />
                          </FormItem>
                          <FormItem label="Bus">
                              <Select
                                  placeholder="Pilih Bus"
                                  options={busOptions}
                                  value={busOptions.find(option => option.value === tourLeaderForm.bus || option.label === tourLeaderForm.bus)}
                                  onChange={(option) => setTourLeaderForm({
                                      ...tourLeaderForm,
                                      bus: option?.value || ''
                                  })}
                              />
                          </FormItem>
                         <FormItem>
                             <div className="flex gap-2 pt-4">
                                 <Button type="submit" variant="solid">
                                     Simpan
                                 </Button>
                                 <Button 
                                     type="button" 
                                     variant="outline"
                                     onClick={() => setShowTourLeaderModal(false)}
                                 >
                                     Batal
                                 </Button>
                             </div>
                         </FormItem>
                     </Form>
                 </div>
             </Dialog>

             {/* Modal Tambah Driver */}
             <Dialog
                 isOpen={showDriverModal}
                 onClose={() => setShowDriverModal(false)}
                 className="max-w-md"
             >
                 <div className="p-6">
                     <h2 className="text-xl font-semibold mb-4">Tambah Driver</h2>
                     <Form onSubmit={handleDriverSubmit}>
                         <FormItem label="Nama">
                             <Input
                                 type="text"
                                 value={driverForm.name}
                                 onChange={(e) => setDriverForm({...driverForm, name: e.target.value})}
                                 placeholder="Masukkan nama"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Telepon">
                             <Input
                                 type="tel"
                                 value={driverForm.phone}
                                 onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})}
                                 placeholder="Masukkan nomor telepon"
                                 required
                             />
                         </FormItem>
                         <FormItem label="WhatsApp">
                             <Input
                                 type="tel"
                                 value={driverForm.whatsapp}
                                 onChange={(e) => setDriverForm({...driverForm, whatsapp: e.target.value})}
                                 placeholder="Masukkan nomor WhatsApp"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Email">
                             <Input
                                 type="email"
                                 value={driverForm.email}
                                 onChange={(e) => setDriverForm({...driverForm, email: e.target.value})}
                                 placeholder="Masukkan email"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Nomor Lisensi">
                              <Input
                                  type="text"
                                  value={driverForm.licenseNumber}
                                  onChange={(e) => setDriverForm({...driverForm, licenseNumber: e.target.value})}
                                  placeholder="Masukkan nomor lisensi"
                                  required
                              />
                          </FormItem>
                          <FormItem label="Bus">
                             <Select
                                 placeholder="Pilih Bus"
                                 options={busOptions}
                                 value={busOptions.find(option => option.value === driverForm.bus || option.label === driverForm.bus)}
                                 onChange={(option) => setDriverForm({
                                     ...driverForm,
                                     bus: option?.value || ''
                                 })}
                             />
                          </FormItem>
                         <FormItem>
                             <div className="flex gap-2 pt-4">
                                 <Button type="submit" variant="solid">
                                     Simpan
                                 </Button>
                                 <Button 
                                     type="button" 
                                     variant="outline"
                                     onClick={() => setShowDriverModal(false)}
                                 >
                                     Batal
                                 </Button>
                             </div>
                         </FormItem>
                     </Form>
                 </div>
             </Dialog>

             {/* Modal Edit Tour Leader */}
             <Dialog
                 isOpen={showEditTourLeaderModal}
                 onClose={() => setShowEditTourLeaderModal(false)}
                 className="max-w-md"
             >
                 <div className="p-6">
                     <h2 className="text-xl font-semibold mb-4">Edit Tour Leader</h2>
                     <Form onSubmit={handleUpdateTourLeader}>
                         <FormItem label="Nama">
                             <Input
                                 type="text"
                                 value={editingTourLeader?.name || ''}
                                 onChange={(e) => setEditingTourLeader(prev => prev ? {...prev, name: e.target.value} : null)}
                                 placeholder="Masukkan nama"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Telepon">
                             <Input
                                 type="tel"
                                 value={editingTourLeader?.phone || ''}
                                 onChange={(e) => setEditingTourLeader(prev => prev ? {...prev, phone: e.target.value} : null)}
                                 placeholder="Masukkan nomor telepon"
                                 required
                             />
                         </FormItem>
                         <FormItem label="WhatsApp">
                             <Input
                                 type="tel"
                                 value={editingTourLeader?.whatsapp || ''}
                                 onChange={(e) => setEditingTourLeader(prev => prev ? {...prev, whatsapp: e.target.value} : null)}
                                 placeholder="Masukkan nomor WhatsApp"
                                 required
                             />
                         </FormItem>
                         <FormItem label="Email">
                             <Input
                                 type="email"
                                 value={editingTourLeader?.email || ''}
                                 onChange={(e) => setEditingTourLeader(prev => prev ? {...prev, email: e.target.value} : null)}
                                 placeholder="Masukkan email"
                             />
                         </FormItem>
                         <FormItem label="Status">
                             <Select
                                 placeholder="Pilih Status"
                                 options={[
                                     { value: 'active', label: 'Active' },
                                     { value: 'inactive', label: 'Inactive' }
                                 ]}
                                 value={editingTourLeader?.status ? { value: editingTourLeader.status, label: editingTourLeader.status } : null}
                                 onChange={(option) => setEditingTourLeader(prev => prev ? {...prev, status: option?.value || ''} : null)}
                             />
                         </FormItem>
                         <FormItem label="Bus">
                             <Select
                                 placeholder="Pilih Bus"
                                 options={busOptions}
                                 value={busOptions.find(option => option.value === editingTourLeader?.bus || option.label === editingTourLeader?.bus)}
                                 onChange={(option) => setEditingTourLeader(prev => prev ? {
                                     ...prev,
                                     bus: option?.value || ''
                                 } : null)}
                             />
                         </FormItem>
                         <FormItem>
                             <div className="flex gap-2 pt-4">
                                 <Button type="submit" variant="solid">
                                     Update
                                 </Button>
                                 <Button 
                                     type="button" 
                                     variant="outline"
                                     onClick={() => setShowEditTourLeaderModal(false)}
                                 >
                                     Batal
                                 </Button>
                             </div>
                         </FormItem>
                     </Form>
                 </div>
             </Dialog>
         </div>
     )
 }
