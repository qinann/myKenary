'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TbSearch, TbPhone, TbMail, TbMapPin, TbCalendar, TbSchool, TbUser, TbBus, TbBuilding, TbUpload, TbQrcode, TbDownload, TbX, TbEye, TbEdit, TbHeart, TbPlus, TbTrash } from 'react-icons/tb'
import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import StudentsService from '@/services/StudentsService'
import type { Student, CreateStudentDto, UpdateStudentDto } from '@/@types/student'

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

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalStudents, setTotalStudents] = useState(0)
    const [pageSize] = useState(10)
    const [showQRModal, setShowQRModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [editFormData, setEditFormData] = useState<Student | null>(null)
    const [addFormData, setAddFormData] = useState<CreateStudentDto>({
        id: '',
        name: '',
        email: '',
        phone: '',
        school: '',
        grade: '',
        address: '',
        emergencyContact: '',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        assignedBus: 'BUS001',
        assignedHotel: 'HTL001',
        medicalHistory: ''
    })
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Load students data on component mount
    useEffect(() => {
        loadStudents()
    }, [currentPage, searchTerm])

    const loadStudents = async () => {
        try {
            setLoading(true)
            const response = await StudentsService.getStudents({
                pageIndex: currentPage.toString(),
                pageSize: pageSize.toString(),
                query: searchTerm
            })
            setStudents(response.data || [])
            setTotalPages(response.pagination.totalPages)
            setTotalStudents(response.pagination.total)
        } catch (error) {
            console.error('Error loading students:', error)
            // Fallback to empty array if API fails
            setStudents([])
            setTotalPages(1)
            setTotalStudents(0)
        } finally {
            setLoading(false)
        }
    }

    // Handle search with debounce
    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setCurrentPage(1) // Reset to first page when searching
    }

    // Handle CSV file upload
    const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const response = await StudentsService.uploadStudentsCsv(file)
            alert(`Berhasil menambahkan ${response.created} siswa dari CSV`)
            await loadStudents() // Reload data after upload
        } catch (error: any) {
            console.error('Error uploading CSV:', error)
            
            // Extract more specific error message
            let errorMessage = 'Gagal mengupload file CSV'
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message
            } else if (error?.message) {
                errorMessage = error.message
            }
            
            alert(errorMessage)
        }
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }



    // Generate QR Code for student
    const generateQRCode = async (student: Student) => {
        try {
            const qrData = {
                id: student.id,
                name: student.name,
                class: student.grade,
                school: student.school
            }
            
            const qrString = JSON.stringify(qrData)
            const qrCodeDataUrl = await QRCode.toDataURL(qrString, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            })
            
            setQrCodeUrl(qrCodeDataUrl)
            setSelectedStudent(student)
            setShowQRModal(true)
        } catch (error) {
            console.error('Error generating QR code:', error)
            alert('Gagal membuat QR code')
        }
    }

    // Download QR Code
    const downloadQRCode = () => {
        if (!qrCodeUrl || !selectedStudent) return
        
        const link = document.createElement('a')
        link.download = `QR_${selectedStudent.name}_${selectedStudent.id}.png`
        link.href = qrCodeUrl
        link.click()
    }

    const openDetailModal = (student: Student) => {
        setSelectedStudent(student)
        setShowDetailModal(true)
    }

    const openEditModal = (student: Student) => {
        setEditFormData({ ...student })
        setShowEditModal(true)
    }

    const handleEditSubmit = async () => {
        if (editFormData) {
            try {
                const updateData: UpdateStudentDto = {
                    name: editFormData.name,
                    email: editFormData.email,
                    phone: editFormData.phone,
                    school: editFormData.school,
                    grade: editFormData.grade,
                    address: editFormData.address,
                    emergencyContact: editFormData.emergencyContact,
                    assignedBus: editFormData.assignedBus,
            assignedHotel: editFormData.assignedHotel,
                    medicalHistory: editFormData.medicalHistory
                }
                
                await StudentsService.updateStudent(editFormData.id, updateData)
                
                // Refresh data setelah update
                await loadStudents()
                
                setShowEditModal(false)
                setEditFormData(null)
                alert('Data siswa berhasil diperbarui!')
            } catch (error) {
                console.error('Error updating student:', error)
                alert('Gagal memperbarui data siswa. Silakan coba lagi.')
            }
        }
    }

    const handleEditChange = (field: keyof Student, value: string) => {
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [field]: value
            })
        }
    }

    const openAddModal = () => {
        setAddFormData({
            id: `STD${Date.now()}`,
            name: '',
            email: '',
            phone: '',
            school: '',
            grade: '',
            address: '',
            emergencyContact: '',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: '/img/avatars/thumb-1.jpg',
            assignedBus: 'BUS001',
            assignedHotel: 'HTL001',
            medicalHistory: ''
        })
        setShowAddModal(true)
    }

    const handleAddSubmit = async () => {
        if (addFormData.name && addFormData.email && addFormData.phone && addFormData.school && addFormData.grade) {
            try {
                const createData: CreateStudentDto = {
                    id: addFormData.id,
                    name: addFormData.name,
                    email: addFormData.email,
                    phone: addFormData.phone,
                    school: addFormData.school,
                    grade: addFormData.grade,
                    address: addFormData.address,
                    emergencyContact: addFormData.emergencyContact,
                    assignedBus: addFormData.assignedBus,
            assignedHotel: addFormData.assignedHotel,
                    medicalHistory: addFormData.medicalHistory
                }
                
                await StudentsService.createStudent(createData)
                
                // Refresh data setelah create
                await loadStudents()
                
                setShowAddModal(false)
                setAddFormData({
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    school: '',
                    grade: '',
                    address: '',
                    emergencyContact: '',
                    status: 'Active',
                    joinDate: new Date().toISOString().split('T')[0],
                    avatar: '/img/avatars/thumb-1.jpg',
                    assignedBus: 'BUS001',
            assignedHotel: 'HTL001',
                    medicalHistory: ''
                })
                alert('Siswa baru berhasil ditambahkan!')
            } catch (error) {
                console.error('Error creating student:', error)
                alert('Gagal menambahkan siswa baru. Silakan coba lagi.')
            }
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi')
        }
    }

    const handleAddChange = (field: keyof Student, value: string) => {
        setAddFormData({
            ...addFormData,
            [field]: value
        })
    }

    const requestDeleteStudent = (studentId: string) => {
        setConfirmDeleteId(studentId)
        setShowDeleteModal(true)
    }

    const confirmDeleteStudent = async () => {
        if (!confirmDeleteId) return
        try {
            await StudentsService.deleteStudent(confirmDeleteId)
            
            // Refresh data setelah delete
            await loadStudents()
            
            setShowDeleteModal(false)
            setConfirmDeleteId(null)
            alert('Data siswa berhasil dihapus!')
        } catch (error) {
            console.error('Error deleting student:', error)
            alert('Gagal menghapus data siswa. Silakan coba lagi.')
        }
    }

    const cancelDeleteStudent = () => {
        setShowDeleteModal(false)
        setConfirmDeleteId(null)
    }

    // Download CSV template
    const downloadCSVTemplate = () => {
        const csvContent = "id,name,email,phone,school,grade,address,emergencyContact\nSTD001,Contoh Nama,contoh@email.com,+62812345678,SMA Negeri 1 Jakarta,XII IPA 1,Jakarta,+62812345679"
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'template_siswa.csv'
        link.href = url
        link.click()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-6">
            {/* Hidden file input for CSV upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
            />

            {/* Search Bar */}
            <div className="relative">
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search students by name, school, class, or ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Data Siswa</h1>
                    <p className="text-gray-600 mt-1">{totalStudents} siswa terdaftar</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={downloadCSVTemplate}>
                        <TbDownload className="h-4 w-4 mr-2" />
                        Download Template CSV
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <TbUpload className="h-4 w-4 mr-2" />
                        Upload CSV
                    </Button>
                    <Button className="flex items-center space-x-2" onClick={openAddModal}>
                        <TbPlus className="h-4 w-4" />
                        <span>Tambah Siswa</span>
                    </Button>
                </div>
            </div>

            {/* Students Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">No</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Kelas</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Kontak Darurat</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium">{(currentPage - 1) * pageSize + index + 1}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-blue-600">{student.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm">{student.grade}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm">{student.emergencyContact}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDetailModal(student)}
                          title="Detail Siswa"
                        >
                          <TbEye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateQRCode(student)}
                          title="Generate QR Code"
                        >
                          <TbQrcode className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => requestDeleteStudent(student.id)}
                          title="Hapus Siswa"
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
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
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-700">
              Menampilkan {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalStudents)} dari {totalStudents} siswa
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Konfirmasi Hapus</h3>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={cancelDeleteStudent}
                            >
                                <TbX className="h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text-sm text-gray-700">Apakah Anda yakin ingin menghapus data siswa ini?</p>

                        <div className="flex gap-2 mt-6 justify-end">
                            <Button
                                variant="outline"
                                onClick={cancelDeleteStudent}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="solid"
                                className="bg-red-600 hover:bg-red-700"
                                onClick={confirmDeleteStudent}
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {showQRModal && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">QR Code - {selectedStudent.name}</h3>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setShowQRModal(false)}
                            >
                                <TbX className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <img src={qrCodeUrl} alt="QR Code" className="border rounded" />
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                <p><strong>ID:</strong> {selectedStudent.id}</p>
                                <p><strong>Nama:</strong> {selectedStudent.name}</p>
                                <p><strong>Kelas:</strong> {selectedStudent.grade}</p>
                                <p><strong>Sekolah:</strong> {selectedStudent.school}</p>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={downloadQRCode}
                                >
                                    <TbDownload className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                                <Button 
                                    className="flex-1"
                                    onClick={() => setShowQRModal(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Detail Siswa</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowDetailModal(false)}
                            >
                                <TbX className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Informasi Dasar */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg border-b pb-2">Informasi Dasar</h4>
                                <div>
                                    <h5 className="font-semibold text-lg">{selectedStudent.name}</h5>
                                    <p className="text-gray-600">ID: {selectedStudent.id}</p>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <TbSchool className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Sekolah</p>
                                            <p className="text-gray-600">{selectedStudent.school}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <TbCalendar className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Kelas</p>
                                            <p className="text-gray-600">{selectedStudent.grade}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <TbCalendar className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Tanggal Bergabung</p>
                                            <p className="text-gray-600">{new Date(selectedStudent.joinDate).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kontak */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg border-b pb-2">Kontak</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <TbMail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-gray-600">{selectedStudent.email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <TbPhone className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Telepon</p>
                                            <p className="text-gray-600">{selectedStudent.phone}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <TbPhone className="h-5 w-5 text-red-400" />
                                        <div>
                                            <p className="font-medium">Kontak Darurat</p>
                                            <p className="text-gray-600">{selectedStudent.emergencyContact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg border-b pb-2">Alamat</h4>
                                <div className="flex items-start space-x-2">
                                    <TbMapPin className="h-5 w-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="font-medium">Alamat Lengkap</p>
                                        <p className="text-gray-600">{selectedStudent.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Riwayat Penyakit */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg border-b pb-2">Riwayat Penyakit</h4>
                                <div className="flex items-start space-x-2">
                                    <TbHeart className="h-5 w-5 text-red-400 mt-1" />
                                    <div>
                                        <p className="font-medium">Riwayat Medis</p>
                                        <p className="text-gray-600">
                                            {selectedStudent.medicalHistory || 'Tidak ada riwayat penyakit khusus'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Travel */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg border-b pb-2">Informasi Travel</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <TbBus className="h-5 w-5 text-blue-400" />
                                        <div>
                                            <p className="font-medium">Bus</p>
                                            <p className="text-gray-600">{selectedStudent.assignedBus}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <TbBuilding className="h-5 w-5 text-green-400" />
                                        <div>
                                            <p className="font-medium">Hotel</p>
                                            <p className="text-gray-600">{selectedStudent.assignedHotel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                            <Button 
                                variant="outline"
                                onClick={() => {
                                    setShowDetailModal(false);
                                    openEditModal(selectedStudent);
                                }}
                            >
                                <TbEdit className="h-4 w-4 mr-2" />
                                Edit Data
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => setShowDetailModal(false)}
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editFormData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Edit Data Siswa</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowEditModal(false)}
                            >
                                <TbX className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama</label>
                                <Input
                                    value={editFormData.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <Input
                                    value={editFormData.email}
                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Telepon</label>
                                <Input
                                    value={editFormData.phone}
                                    onChange={(e) => handleEditChange('phone', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Sekolah</label>
                                <Input
                                    value={editFormData.school}
                                    onChange={(e) => handleEditChange('school', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Kelas</label>
                                <Input
                                    value={editFormData.grade}
                                    onChange={(e) => handleEditChange('grade', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Kontak Darurat</label>
                                <Input
                                    value={editFormData.emergencyContact}
                                    onChange={(e) => handleEditChange('emergencyContact', e.target.value)}
                                />
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Alamat</label>
                                <Input
                                    value={editFormData.address}
                                    onChange={(e) => handleEditChange('address', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Bus</label>
                                <Input
                                    value={editFormData.assignedBus}
                                onChange={(e) => handleEditChange('assignedBus', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Hotel</label>
                                <Input
                                    value={editFormData.assignedHotel}
                                onChange={(e) => handleEditChange('assignedHotel', e.target.value)}
                                />
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Riwayat Penyakit</label>
                                <Input
                                    value={editFormData.medicalHistory || ''}
                                    onChange={(e) => handleEditChange('medicalHistory', e.target.value)}
                                    placeholder="Masukkan riwayat penyakit atau kondisi medis khusus"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                            <Button 
                                variant="outline"
                                onClick={() => setShowEditModal(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                onClick={handleEditSubmit}
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Tambah Siswa Baru</h2>
                        </div>
                        
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">ID Siswa *</label>
                                <Input
                                    value={addFormData.id}
                                    onChange={(e) => handleAddChange('id', e.target.value)}
                                    placeholder="Masukkan ID siswa"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                                <Input
                                    value={addFormData.name}
                                    onChange={(e) => handleAddChange('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <Input
                                    type="email"
                                    value={addFormData.email}
                                    onChange={(e) => handleAddChange('email', e.target.value)}
                                    placeholder="Masukkan email"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Nomor Telepon *</label>
                                <Input
                                    value={addFormData.phone}
                                    onChange={(e) => handleAddChange('phone', e.target.value)}
                                    placeholder="Masukkan nomor telepon"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Sekolah *</label>
                                <Input
                                    value={addFormData.school}
                                    onChange={(e) => handleAddChange('school', e.target.value)}
                                    placeholder="Masukkan nama sekolah"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Kelas *</label>
                                <Input
                                    value={addFormData.grade}
                                    onChange={(e) => handleAddChange('grade', e.target.value)}
                                    placeholder="Contoh: 12 IPA"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Alamat</label>
                                <Input
                                    value={addFormData.address}
                                    onChange={(e) => handleAddChange('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Kontak Darurat</label>
                                <Input
                                    value={addFormData.emergencyContact}
                                    onChange={(e) => handleAddChange('emergencyContact', e.target.value)}
                                    placeholder="Masukkan kontak darurat"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    value={addFormData.status}
                                    onChange={(e) => handleAddChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Tanggal Bergabung</label>
                                <Input
                                    type="date"
                                    value={addFormData.joinDate}
                                    onChange={(e) => handleAddChange('joinDate', e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Bus yang Ditugaskan</label>
                                <select
                                    value={addFormData.assignedBus}
                                onChange={(e) => handleAddChange('assignedBus', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="BUS001">BUS001</option>
                                    <option value="BUS002">BUS002</option>
                                    <option value="BUS003">BUS003</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Hotel yang Ditugaskan</label>
                                <select
                                    value={addFormData.assignedHotel}
                                onChange={(e) => handleAddChange('assignedHotel', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="HTL001">HTL001</option>
                                    <option value="HTL002">HTL002</option>
                                    <option value="HTL003">HTL003</option>
                                </select>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Riwayat Penyakit</label>
                                <Input
                                    value={addFormData.medicalHistory || ''}
                                    onChange={(e) => handleAddChange('medicalHistory', e.target.value)}
                                    placeholder="Masukkan riwayat penyakit atau kondisi medis khusus"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 p-6 pt-4 border-t">
                            <Button 
                                variant="outline"
                                onClick={() => setShowAddModal(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                onClick={handleAddSubmit}
                            >
                                Tambah Siswa
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* CSV Upload Instructions */}
            <Card className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Petunjuk Upload CSV</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>1. Download template CSV terlebih dahulu</p>
                    <p>2. Isi data siswa sesuai format: <strong>id, name, email, phone, school, grade, address, emergencyContact</strong></p>
                    <p>3. Simpan file dalam format CSV</p>
                    <p>4. Upload file CSV menggunakan tombol "Upload CSV"</p>
                    <p className="text-orange-600">⚠️ Pastikan format header CSV sesuai template (gunakan bahasa Inggris)</p>
                </div>
            </Card>
        </div>
    )
}
