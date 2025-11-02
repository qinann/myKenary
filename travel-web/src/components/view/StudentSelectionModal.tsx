'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import StudentsService from '@/services/StudentsService'
import type { Student } from '@/@types/student'

interface StudentSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectStudent: (student: Student) => void
    seatNumber: number
}

export default function StudentSelectionModal({ 
    isOpen, 
    onClose, 
    onSelectStudent, 
    seatNumber 
}: StudentSelectionModalProps) {
    const [students, setStudents] = useState<Student[]>([])
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
    const [selectedName, setSelectedName] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Get unique classes from students
    const uniqueClasses = [...new Set(students.map(student => student.grade))].sort()

    useEffect(() => {
        if (isOpen) {
            fetchStudents()
        }
    }, [isOpen])

    useEffect(() => {
        // Filter students based on selected class
        if (selectedClass) {
            const filtered = students.filter(student => student.grade === selectedClass)
            setFilteredStudents(filtered)
        } else {
            setFilteredStudents(students)
        }
        setSelectedName('') // Reset name selection when class changes
    }, [selectedClass, students])

    const fetchStudents = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await StudentsService.getStudents({
                pageSize: '1000' // Get all students
            })
            setStudents(response.data || [])
        } catch (err) {
            console.error('Error fetching students:', err)
            setError('Gagal memuat data siswa')
        } finally {
            setLoading(false)
        }
    }

    const handleAssignStudent = () => {
        const selectedStudent = filteredStudents.find(student => student.id === selectedName)
        if (selectedStudent) {
            onSelectStudent(selectedStudent)
            handleClose()
        }
    }

    const handleClose = () => {
        setSelectedName('')
        setSelectedClass('')
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Pilih Siswa untuk Kursi {seatNumber}</h3>
                    <p className="text-sm text-gray-600">Pilih kelas terlebih dahulu, kemudian pilih nama siswa</p>
                </div>

                {loading && (
                    <div className="text-center py-4">
                        <div className="text-sm">Memuat data siswa...</div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-4">
                        <div className="text-sm text-red-600">{error}</div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={fetchStudents}
                        >
                            Coba Lagi
                        </Button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-4">
                        {/* Class Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kelas</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Pilih Kelas</option>
                                {uniqueClasses.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Student Name Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Siswa</label>
                            <select
                                value={selectedName}
                                onChange={(e) => setSelectedName(e.target.value)}
                                disabled={!selectedClass}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">
                                    {selectedClass ? 'Pilih Nama Siswa' : 'Pilih kelas terlebih dahulu'}
                                </option>
                                {filteredStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Student Info Preview */}
                        {selectedName && (
                            <div className="p-3 bg-gray-50 rounded-md">
                                <div className="text-sm">
                                    <strong>Preview:</strong>
                                    <br />
                                    {filteredStudents.find(s => s.id === selectedName)?.name} - {selectedClass}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleClose}
                    >
                        Batal
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={handleAssignStudent}
                        disabled={!selectedName || loading}
                    >
                        Assign Siswa
                    </Button>
                </div>
            </Card>
        </div>
    )
}