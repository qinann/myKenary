'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { TbUsers, TbPlus, TbBus, TbBuilding, TbClock } from 'react-icons/tb'

type StudentData = {
    id: string
    name: string
    class: string
    bus: string
    hotel: string
    status: string
    checkInTime: string
}

type StudentsProps = {
    data: StudentData[]
}

const Students = ({ data }: StudentsProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            case 'absent':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            case 'late':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'present':
                return 'Hadir'
            case 'absent':
                return 'Tidak Hadir'
            case 'late':
                return 'Terlambat'
            default:
                return 'Tidak Diketahui'
        }
    }

    const totalStudents = data.length
    const presentStudents = data.filter(student => student.status === 'present').length
    const absentStudents = data.filter(student => student.status === 'absent').length
    const lateStudents = data.filter(student => student.status === 'late').length

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <TbUsers className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Daftar Siswa
                    </h3>
                </div>
                <Button size="sm" className="flex items-center gap-2">
                    <TbPlus className="w-4 h-4" />
                    Tambah Siswa
                </Button>
            </div>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {totalStudents}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                        Total Siswa
                    </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {presentStudents}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                        Hadir
                    </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {lateStudents}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        Terlambat
                    </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {absentStudents}
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400">
                        Tidak Hadir
                    </div>
                </div>
            </div>
            
            {/* Students Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Nama Siswa
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Kelas
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Bus
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Hotel
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Check-in
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr 
                                key={student.id} 
                                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                                <td className="py-3 px-4">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {student.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {student.id}
                                    </div>
                                </td>
                                
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {student.class}
                                </td>
                                
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <TbBus className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {student.bus}
                                        </span>
                                    </div>
                                </td>
                                
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <TbBuilding className="w-4 h-4 text-purple-600" />
                                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                                            {student.hotel}
                                        </span>
                                    </div>
                                </td>
                                
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <TbClock className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                                            {student.checkInTime}
                                        </span>
                                    </div>
                                </td>
                                
                                <td className="py-3 px-4">
                                    <Badge className={getStatusColor(student.status)}>
                                        {getStatusText(student.status)}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination or Load More */}
            <div className="mt-6 flex justify-center">
                <Button variant="plain" size="sm">
                    Lihat Semua Siswa
                </Button>
            </div>
        </Card>
    )
}

export default Students