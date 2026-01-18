import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'pic.616pic.com', // 允許的外部圖片域名
      'images.storm.mg', // 你其他網址也要加
      'smiletaiwan.cw.com.tw'
    ]
  }
};

export default withNextIntl(nextConfig);
