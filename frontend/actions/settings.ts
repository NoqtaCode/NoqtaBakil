'use server'

// ============================================================
// Settings Server Actions
// ============================================================

import { client } from "../lib/sanity";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateGeneralSettings(formData: FormData) {
  const fields = ['siteName', 'phone', 'whatsapp', 'email', 'address', 'facebook', 'heroTitle', 'heroSubTitle', 'heroDescription'];
  const patchData: any = {};

  fields.forEach(field => {
    const value = formData.get(field) as string;
    if (value && value.trim() !== "") {
      patchData[field] = value.trim();
    }
  });

  const heroFile = formData.get('heroImage') as File;
  const aboutFile = formData.get('aboutImage') as File;
  const logoFile = formData.get('logo') as File;

  try {
    const existingSettingsId: string | null = await client.fetch(`*[_type == "settings"][0]._id`);
    const settingsId = existingSettingsId || 'siteSettings';
    await client.createIfNotExists({ _id: settingsId, _type: 'settings' });
    let patch = client.patch(settingsId).set(patchData);

    if (logoFile && logoFile.size > 0) {
      const asset = await client.assets.upload('image', logoFile);
      patch = patch.set({ logo: { _type: 'image', asset: { _type: "reference", _ref: asset._id } } });
    }

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
    revalidatePath('/', 'layout');
    revalidatePath('/about');
    revalidatePath('/admin/settings');
    return { success: true, message: "تم تحديث البيانات بنجاح" };
  } catch (error) {
    return { success: false, message: "حدث خطأ في السيرفر" };
  }
}

export async function updateAccountSettings(formData: FormData) {
  const newUsername = formData.get('username') as string;
  const newPassword = formData.get('password') as string;
  const securityCode = formData.get('securityCode') as string;

  if (securityCode !== process.env.ADMIN_SECURITY_CODE) {
    return { success: false, message: "⚠️ كود الأمان غير صحيح! لا تملك صلاحية التغيير." };
  }

  if (!newUsername || !newPassword) {
    return { success: false, message: "يجب كتابة اسم المستخدم وكلمة المرور الجديدة" };
  }

  try {
    const existingSettingsId: string | null = await client.fetch(`*[_type == "settings"][0]._id`);
    const settingsId = existingSettingsId || 'siteSettings';
    await client.createIfNotExists({ _id: settingsId, _type: 'settings' });
    await client
      .patch(settingsId)
      .set({ username: newUsername, password: newPassword })
      .commit();

    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    
  } catch (error) {
    return { success: false, message: "فشل تحديث الحساب" };
  }

  redirect('/login');
}
