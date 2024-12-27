/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  webpack: (config: any, { dev, isServer }: { dev: boolean, isServer: boolean }) => {
    // 테스트 파일과 스토리북 파일 제외
    config.module.rules.push({
      test: /\.(test|spec|stories)\.(ts|tsx)$/,
      loader: 'ignore-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
