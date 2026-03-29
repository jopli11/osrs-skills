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
                source: '/ca/:path*',
                destination: 'https://crumbless.io/:path*',
            },
        ]
    },
};

export default nextConfig;