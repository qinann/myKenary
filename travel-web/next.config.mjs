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
    async rewrites() {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3006';
        return [
            {
                source: '/api/((?!buses).*)',
                destination: `${apiBase}/$1`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
