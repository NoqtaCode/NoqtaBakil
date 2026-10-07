'use server'

import { client } from "../../../lib/sanity";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 1. تحديث الإعدادات العامة (حماية من القيم الفارغة)
export async function updateGeneralSettings(formData: FormData) {
  const fields = ['phone', 'whatsapp', 'email', 'address', 'facebook'];
  const patchData: any = {};

  // ذكاء برمجى: لا نحدث الحقل إلا إذا كتب المستخدم قيمة جديدة
  fields.forEach(field => {
    const value = formData.get(field) as string;
    if (value && value.trim() !== "") {
      patchData[field] = value.trim();
    }
  });

  const heroFile = formData.get('heroImage') as File;
  const aboutFile = formData.get('aboutImage') as File;

  try {
    let patch = client.patch('siteSettings').set(patchData);

    if (heroFile && heroFile.size > 0) {
      const asset = await client.assets.upload('image', heroFile);
      patch = patch.set({ heroImage: { _type: 'image', asset: { _type: "reference", _ref: asset._id } } });
    }

    if (aboutFile && aboutFile.size > 0) {
      const asset = await client.assets.upload('image', aboutFile);
      patch = patch.set({ aboutImage: { _type: 'image', asset: { _type: "reference", _ref: asset._id } } });
    }

    await patch.commit();
    revalidatePath('/');
    return { success: true, message: "تم تحديث البيانات بنجاح" };
  } catch (error) {
    return { success: false, message: "حدث خطأ في السيرفر" };
  }
}

// 2. تحديث الحساب (أمان فائق + خروج إجباري)
export async function updateAccountSettings(formData: FormData) {
  const newUsername = formData.get('username') as string;
  const newPassword = formData.get('password') as string;
  const securityCode = formData.get('securityCode') as string;

  // فحص كود الأمان من ملف الـ .env
  if (securityCode !== process.env.ADMIN_SECURITY_CODE) {
    return { success: false, message: "⚠️ كود الأمان غير صحيح! لا تملك صلاحية التغيير." };
  }

  if (!newUsername || !newPassword) {
    return { success: false, message: "يجب كتابة اسم المستخدم وكلمة المرور الجديدة" };
  }

  try {
    await client
      .patch('siteSettings')
      .set({ username: newUsername, password: newPassword })
      .commit();

    // تسجيل الخروج فوراً لمزيد من الأمان
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    
  } catch (error) {
    return { success: false, message: "فشل تحديث الحساب" };
  }

  // التوجيه لصفحة الدخول بعد النجاح
  redirect('/login');
}