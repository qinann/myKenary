'use server'
import type { SignInCredential } from '@/@types/auth'
import appConfig from '@/configs/app.config'

const validateCredential = async (values: SignInCredential) => {
    const { email, password } = values

    try {
        // Call backend API via configured base URL
        const response = await fetch(`${appConfig.apiPrefix}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            return null
        }

        const data = await response.json()
        
        if (data.success && data.user) {
            // Return user in the format expected by the frontend
            return {
                id: data.user.id.toString(),
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                avatar: '/img/avatars/thumb-1.jpg', // Default avatar
            }
        }

        return null
    } catch (error) {
        console.error('Login error:', error)
        return null
    }
}

export default validateCredential
