/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'oldschool.runescape.wiki',
            pathname: '/images/**',
        }, ],
    },
    async rewrites() {
        return [
            {
                source: '/api/crumbless/:path*',
                destination: 'https://www.crumbless.io/api/:path*',
            },
        ]
    },
};

export default nextConfig;