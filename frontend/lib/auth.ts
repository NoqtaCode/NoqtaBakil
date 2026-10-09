'use server'

// ============================================================
// Auth Server Actions (login / logout)
// ============================================================

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from "./sanity";

export async function login(formData: FormData) {
  const inputUsername = formData.get('username') as string;
  const inputPassword = formData.get('password') as string;

  try {
    // جلب بيانات الدخول المخزنة في إعدادات قاعدة البيانات
    const settings = await client.fetch(`*[_type == "settings"][0]{username, password}`);

    // البيانات الصحيحة: قاعدة البيانات أولاً ثم متغيرات البيئة كخيار احتياطي
    const validUsername = settings?.username || process.env.ADMIN_USER || "admin";
    const validPassword = settings?.password || process.env.ADMIN_PASS;

    if (validPassword && inputUsername === validUsername && inputPassword === validPassword) {
      const cookieStore = await cookies();
      
      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // أسبوع واحد
        path: '/',
      });
      
      return { success: true };
    } 
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "حدث خطأ فني أثناء تسجيل الدخول" };
  }
  
  return { success: false };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
