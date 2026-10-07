'use server'

import { client } from "../../../lib/sanity"; // تأكد من المسار
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string; // استلام القسم
  const imageFile = formData.get('image') as File;

  if (!title || !imageFile || !category) {
    return { success: false, message: "الرجاء تعبئة العنوان والصورة واختيار القسم" };
  }

  try {
    const imageAsset = await client.assets.upload('image', imageFile, {
      filename: imageFile.name,
    });

    await client.create({
      _type: 'project',
      title: title,
      // 👇👇 حفظ القسم في قاعدة البيانات 👇👇
      category: category, 
      slug: { current: title.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() },
      description: description,
      mainImage: {
        _type: 'image',
        asset: {
          _type: "reference",
          _ref: imageAsset._id
        }
      }
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/'); // تحديث الصفحة الرئيسية أيضاً
    return { success: true, message: "تم نشر المشروع بنجاح! 🎉" };

  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, message: "حدث خطأ أثناء الرفع" };
  }
}