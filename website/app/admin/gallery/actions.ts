'use server'

import { client } from "../../../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// دالة الرفع المتعدد
export async function uploadImages(formData: FormData) {
  const category = formData.get('category') as string;
  const files = formData.getAll('images') as File[]; // جلب كل الصور المختارة

  if (!category || files.length === 0) {
    throw new Error("الرجاء اختيار القسم والصور");
  }

  try {
    // دوران (Loop) لرفع كل صورة على حدة
    for (const file of files) {
      if (file.size === 0) continue;

      // 1. رفع الصورة لـ Sanity
      const asset = await client.assets.upload('image', file);

      // 2. إنشاء وثيقة في المعرض لكل صورة
      await client.create({
        _type: 'gallery',
        category: category,
        image: {
          _type: 'image',
          asset: { _type: "reference", _ref: asset._id }
        }
      });
    }

    revalidatePath('/admin/gallery');
  } catch (error) {
    console.error("Gallery Upload Error:", error);
  }

  redirect('/admin/gallery');
}

// دالة حذف صورة من المعرض
export async function deleteGalleryImage(id: string) {
  await client.delete(id);
  revalidatePath('/admin/gallery');
}