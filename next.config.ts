import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'i.ytimg.com', 'yt3.googleusercontent.com', 'yt3.ggpht.com'],
  },
}

export default nextConfig
