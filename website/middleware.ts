import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. جلب الختم من المتصفح
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // 2. إذا حاول دخول أي صفحة تبدأ بـ /admin
  if (pathname.startsWith('/admin')) {
    // إذا لم يكن مسجلاً (لا يوجد ختم)، اطرده لصفحة الدخول
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. إذا كان مسجلاً وحاول العودة لصفحة الدخول، أرسله للداشبورد مباشرة
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// تحديد الصفحات التي يراقبها الحارس (كل ما هو داخل admin)
export const config = {
  matcher: ['/admin/:path*', '/login'],
};