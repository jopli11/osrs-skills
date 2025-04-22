/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'oldschool.runescape.wiki',
            pathname: '/images/**',
        }, ],
    },
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block',
                },
            ],
        }, ];
    },
};

module.exports = nextConfig;