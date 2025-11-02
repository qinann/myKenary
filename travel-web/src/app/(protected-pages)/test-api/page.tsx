'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function TestApiPage() {
    const [result, setResult] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const testDirectFetch = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:3005/students', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const data = await response.json()
            setResult(`Direct fetch success: ${data.data?.length || 0} students found`)
        } catch (error) {
            setResult(`Direct fetch error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    const testAxios = async () => {
        setLoading(true)
        try {
            const { getStudents } = await import('@/services/StudentsService')
            const response = await getStudents()
            setResult(`Axios success: ${response.data?.length || 0} students found`)
        } catch (error) {
            setResult(`Axios error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">Test API Connection</h1>
                
                <div className="space-y-4">
                    <Button onClick={testDirectFetch} disabled={loading}>
                        Test Direct Fetch
                    </Button>
                    
                    <Button onClick={testAxios} disabled={loading}>
                        Test Axios Service
                    </Button>
                    
                    {result && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <pre>{result}</pre>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}