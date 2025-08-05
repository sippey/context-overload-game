/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/context-overload-game' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/context-overload-game/' : '',
}

module.exports = nextConfig