/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 1000
    config.watchOptions.aggregateTimeout = 300
    return config
  },
}

module.exports = nextConfig
