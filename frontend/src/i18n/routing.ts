import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh'],     // 支援的語系
  defaultLocale: 'zh',         // 預設語系
  //localePrefix: 'always' // 強制所有 Link 都補上語系前綴
});

// 匯出增強版的 Link, useRouter 等，之後跳轉頁面要用這些
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);