import type { AxiosError } from 'axios'

const AxiosResponseIntrceptorErrorCallback = (error: AxiosError) => {
    console.error('Axios Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method,
        data: error.response?.data,
        headers: error.response?.headers
    })
    console.error('Full error:', error)
}

export default AxiosResponseIntrceptorErrorCallback
