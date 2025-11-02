import type { ReactNode } from 'react'

interface TravelLayoutProps {
    children: ReactNode
}

export default function TravelLayout({ children }: TravelLayoutProps) {
    // Return children without any layout wrapper to bypass PostLoginLayout
    return <div className="w-full h-screen overflow-hidden">{children}</div>
}