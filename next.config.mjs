/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // For SVG as JSX element (default behavior)
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /raw/ }, // exclude files with '?raw' suffix
      use: ['@svgr/webpack'],
    })

    // For SVG as string (when ?raw is appended)
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /raw/, // only apply raw-loader if '?raw' is present in import
      use: 'raw-loader',
    })

    return config
  },
}

export default nextConfig
