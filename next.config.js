/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:5328/api/:path*'
              : '/api/',
        },
      ]
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(mp4|mp3|ogv|oga|webm)$/i,
        type: 'asset/resource',
        generator: {
          emit: true,
          filename: (options.isServer ? '../' : '') + 'static/media/[name].[contenthash:8][ext]',
          publicPath: (config.assetPrefix ?? config.basePath ?? '') + '/_next/static/media/',
        },
      });
      return config;
    },
  }
  
  module.exports = nextConfig