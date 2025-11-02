'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TbFileText, TbDownload, TbUpload, TbCalendar, TbUsers, TbCheck, TbClock, TbAlertTriangle, TbEye, TbEdit, TbPlus } from 'react-icons/tb'
import { useState } from 'react'

// Dummy data untuk worksheets
const worksheetData = [
    {
        id: 'WS001',
        title: 'Jakarta Historical Sites Research',
        description: 'Research and document historical sites visited in Jakarta',
        subject: 'History',
        type: 'Research',
        dueDate: '2024-02-16',
        assignedDate: '2024-02-15',
        assignedTo: ['Student Group A', 'Student Group B'],
        totalStudents: 45,
        submittedCount: 38,
        pendingCount: 7,
        status: 'Active',
        difficulty: 'Medium',
        estimatedTime: '2 hours',
        instructions: 'Visit at least 3 historical sites in Jakarta and write a 500-word report about each location.',
        attachments: ['jakarta_sites_list.pdf', 'research_template.docx'],
        submissions: [
            { studentName: 'Ahmad Rizki', submittedAt: '2024-02-15 20:30', status: 'Submitted', grade: null },
            { studentName: 'Siti Nurhaliza', submittedAt: '2024-02-15 21:15', status: 'Submitted', grade: 'A' },
            { studentName: 'Budi Santoso', submittedAt: null, status: 'Pending', grade: null }
        ]
    },
    {
        id: 'WS002',
        title: 'Bandung Cultural Observation',
        description: 'Observe and analyze cultural differences between Jakarta and Bandung',
        subject: 'Social Studies',
        type: 'Observation',
        dueDate: '2024-02-17',
        assignedDate: '2024-02-15',
        assignedTo: ['Student Group A'],
        totalStudents: 22,
        submittedCount: 20,
        pendingCount: 2,
        status: 'Active',
        difficulty: 'Easy',
        estimatedTime: '1.5 hours',
        instructions: 'Compare and contrast cultural aspects observed in Bandung with those in Jakarta.',
        attachments: ['observation_form.pdf'],
        submissions: [
            { studentName: 'Dewi Sari', submittedAt: '2024-02-16 14:20', status: 'Submitted', grade: 'B+' },
            { studentName: 'Eko Prasetyo', submittedAt: '2024-02-16 16:45', status: 'Submitted', grade: 'A-' }
        ]
    },
    {
        id: 'WS003',
        title: 'Travel Journal Documentation',
        description: 'Daily journal entries documenting the travel experience',
        subject: 'Language Arts',
        type: 'Journal',
        dueDate: '2024-02-20',
        assignedDate: '2024-02-15',
        assignedTo: ['Student Group A', 'Student Group B', 'Student Group C'],
        totalStudents: 67,
        submittedCount: 45,
        pendingCount: 22,
        status: 'Active',
        difficulty: 'Easy',
        estimatedTime: '30 minutes daily',
        instructions: 'Write daily journal entries (minimum 200 words) about your travel experiences.',
        attachments: ['journal_template.docx', 'writing_guidelines.pdf'],
        submissions: [
            { studentName: 'Fitri Handayani', submittedAt: '2024-02-18 19:30', status: 'Submitted', grade: 'A' },
            { studentName: 'Gita Sari', submittedAt: '2024-02-18 20:15', status: 'Submitted', grade: null }
        ]
    },
    {
        id: 'WS004',
        title: 'Mathematics in Architecture',
        description: 'Analyze geometric patterns in traditional Indonesian architecture',
        subject: 'Mathematics',
        type: 'Analysis',
        dueDate: '2024-02-18',
        assignedDate: '2024-02-16',
        assignedTo: ['Student Group B'],
        totalStudents: 23,
        submittedCount: 23,
        pendingCount: 0,
        status: 'Completed',
        difficulty: 'Hard',
        estimatedTime: '3 hours',
        instructions: 'Identify and analyze geometric patterns in at least 5 traditional buildings visited.',
        attachments: ['geometry_worksheet.pdf', 'measurement_tools.pdf'],
        submissions: [
            { studentName: 'Hadi Wijaya', submittedAt: '2024-02-17 22:00', status: 'Submitted', grade: 'A+' },
            { studentName: 'Indra Kusuma', submittedAt: '2024-02-17 23:30', status: 'Submitted', grade: 'B' }
        ]
    }
]

export default function WorksheetPage() {
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [selectedWorksheet, setSelectedWorksheet] = useState<string | null>(null)

    const filters = ['All', 'Active', 'Completed', 'Overdue']
    const subjects = ['All', 'History', 'Social Studies', 'Language Arts', 'Mathematics', 'Science']

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-800'
            case 'Completed': return 'bg-green-100 text-green-800'
            case 'Overdue': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Hard': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getSubmissionStatusColor = (status: string) => {
        switch (status) {
            case 'Submitted': return 'bg-green-100 text-green-800'
            case 'Pending': return 'bg-yellow-100 text-yellow-800'
            case 'Late': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredWorksheets = worksheetData.filter(worksheet => {
        if (selectedFilter === 'All') return true
        return worksheet.status === selectedFilter
    })

    // Statistics
    const totalWorksheets = worksheetData.length
    const activeWorksheets = worksheetData.filter(w => w.status === 'Active').length
    const completedWorksheets = worksheetData.filter(w => w.status === 'Completed').length
    const totalSubmissions = worksheetData.reduce((sum, w) => sum + w.submittedCount, 0)
    const pendingSubmissions = worksheetData.reduce((sum, w) => sum + w.pendingCount, 0)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Worksheets & Assignments</h1>
                <Button>
                    <TbPlus className="h-4 w-4 mr-2" />
                    Create New Worksheet
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{totalWorksheets}</p>
                            <p className="text-sm text-gray-600">Total Worksheets</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{activeWorksheets}</p>
                            <p className="text-sm text-gray-600">Active</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{completedWorksheets}</p>
                            <p className="text-sm text-gray-600">Completed</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{totalSubmissions}</p>
                            <p className="text-sm text-gray-600">Submissions</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{pendingSubmissions}</p>
                            <p className="text-sm text-gray-600">Pending</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filter Buttons */}
            <Card>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <Button
                                key={filter}
                                variant={selectedFilter === filter ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedFilter(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Worksheets List */}
            <div className="space-y-4">
                {filteredWorksheets.map((worksheet) => (
                    <Card key={worksheet.id} className="hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{worksheet.title}</h3>
                                        <Badge className={getStatusColor(worksheet.status)}>
                                            {worksheet.status}
                                        </Badge>
                                        <Badge className={getDifficultyColor(worksheet.difficulty)}>
                                            {worksheet.difficulty}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-600 mb-3">{worksheet.description}</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <TbFileText className="h-4 w-4 text-gray-400" />
                                            <span>{worksheet.subject}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TbCalendar className="h-4 w-4 text-gray-400" />
                                            <span>Due: {worksheet.dueDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TbUsers className="h-4 w-4 text-gray-400" />
                                            <span>{worksheet.totalStudents} students</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TbClock className="h-4 w-4 text-gray-400" />
                                            <span>{worksheet.estimatedTime}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedWorksheet(
                                            selectedWorksheet === worksheet.id ? null : worksheet.id
                                        )}
                                    >
                                        <TbEye className="h-4 w-4 mr-1" />
                                        {selectedWorksheet === worksheet.id ? 'Hide' : 'View'} Details
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <TbEdit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Submission Progress</span>
                                    <span>{worksheet.submittedCount}/{worksheet.totalStudents}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${(worksheet.submittedCount / worksheet.totalStudents) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Assigned Groups */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-sm text-gray-600">Assigned to:</span>
                                {worksheet.assignedTo.map((group) => (
                                    <Badge key={group} variant="outline">
                                        {group}
                                    </Badge>
                                ))}
                            </div>

                            {/* Expanded Details */}
                            {selectedWorksheet === worksheet.id && (
                                <div className="border-t pt-4 space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Instructions</h4>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                            {worksheet.instructions}
                                        </p>
                                    </div>

                                    {worksheet.attachments && worksheet.attachments.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-2">Attachments</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {worksheet.attachments.map((attachment, index) => (
                                                    <Button key={index} variant="outline" size="sm">
                                                        <TbDownload className="h-3 w-3 mr-1" />
                                                        {attachment}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-medium mb-3">Recent Submissions</h4>
                                        {worksheet.submissions.length > 0 ? (
                                            <div className="space-y-3">
                                                {worksheet.submissions.map((submission, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-xs font-medium text-blue-600">
                                                                    {submission.studentName.split(' ').map(n => n[0]).join('')}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{submission.studentName}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {submission.submittedAt || 'Not submitted'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {submission.grade && (
                                                                <Badge variant="outline">
                                                                    Grade: {submission.grade}
                                                                </Badge>
                                                            )}
                                                            <Badge className={getSubmissionStatusColor(submission.status)}>
                                                                {submission.status}
                                                            </Badge>
                                                            {submission.status === 'Submitted' && (
                                                                <Button variant="outline" size="sm">
                                                                    <TbEye className="h-3 w-3 mr-1" />
                                                                    Review
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                {worksheet.submissions.length < worksheet.totalStudents && (
                                                    <div className="text-center py-4 text-gray-500">
                                                        <p className="text-sm">
                                                            {worksheet.totalStudents - worksheet.submissions.length} more students haven't submitted yet
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <TbFileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                                <p>No submissions yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbUpload className="h-6 w-6" />
                            <span>Bulk Upload</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-2">
                            <TbDownload className="h-6 w-6" />
                            <span>Export Results</span>
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