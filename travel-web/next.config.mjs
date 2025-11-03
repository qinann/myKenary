import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/admin',
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
<<<<<<< HEAD
    async rewrites() {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3006';
        return [
            {
                source: '/api/((?!buses).*)',
=======
    env: {
        NEXT_PUBLIC_BASE_PATH: '/admin',
    },
    async rewrites() {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3006';
        return [
            // Proxy all API requests to backend EXCEPT specific local routes
            {
                source: '/api/((?!buses|booklet).*)',
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
                destination: `${apiBase}/$1`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
