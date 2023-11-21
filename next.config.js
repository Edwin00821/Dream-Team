// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

import('./src/env.mjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** Linting and typechecking are already done as separate tasks in the CI pipeline */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = withContentlayer(nextConfig)
