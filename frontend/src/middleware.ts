import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from "next/server";

/*
第三方登入可以使用這款
https://www.npmjs.com/package/next-auth
https://authjs.dev/getting-started/installation
*/

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 2. 定義後台路徑的規則 (檢查是否包含 /admin)
  // 這會匹配例如 /zh/admin 或 /en/admin
  const isAdminPage = pathname.match(/^\/(zh|en)\/admin(\/.*)?$/);
  const isLoginPage = pathname.match(/^\/(zh|en)\/login$/);

  // 3. 檢查有沒有登入用的 Cookie
  const token = req.cookies.get("auth_token")?.value;
  console.log(token)

  // 找出目前是哪種語言 (從路徑抓第一個段落，沒抓到就預設 zh)
  const locale = pathname.split("/")[1] || "zh";

  // 4. 如果是去後台，但「沒有」證件 (Token)
  if (isAdminPage && !token) {
    // 把他踢回登入頁面
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
  }

  // 5. 如果是去前台，或者有證件，就照常跑「語系處理」
  return intlMiddleware(req);
}

// 匹配所有路徑
export const config = {
  matcher: [
    '/', 
    '/(zh|en)/:path*',
    "/((?!api|_next|.*\\..*).*)"
    //'/((?!_next|_vercel|.*\\..*).*)' // 攔截所有非靜態檔案的路徑 api 會異常
  ]  
};
