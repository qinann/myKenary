export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    locale: string
    activeNavTranslation: boolean
}

const appConfig: AppConfig = {
    apiPrefix: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006',
    authenticatedEntryPath: '/dashboards/travel',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: true,
}

export default appConfig
