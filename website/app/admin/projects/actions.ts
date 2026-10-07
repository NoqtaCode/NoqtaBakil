'use server'

import { client } from "../../../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- دالة الإضافة ---
export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !category || !imageFile || imageFile.size === 0) {
    throw new Error("البيانات ناقصة");
  }

  try {
    const imageAsset = await client.assets.upload('image', imageFile);

    await client.create({
      _type: 'project',
      title: title,
      category: category,
      status: 'published', // نشر تلقائي
      date: new Date().toISOString().split('T')[0], // 👈 التاريخ أوتوماتيكي (اليوم)
      slug: { 
        _type: 'slug',
        current: encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now())
      },
      mainImage: {
        _type: 'image',
        asset: { _type: "reference", _ref: imageAsset._id }
      }
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return; 
  }

  revalidatePath('/admin/projects');
  revalidatePath('/'); 
  redirect('/admin/projects');
}

// --- دالة التحديث ---
export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const imageFile = formData.get('image') as File;

  try {
    let patch = client.patch(id).set({
      title,
      category,
      // لا نحدث التاريخ عند التعديل، نتركه كما كان
    });

    if (imageFile && imageFile.size > 0) {
      const asset = await client.assets.upload('image', imageFile);
      patch = patch.set({
        mainImage: { _type: 'image', asset: { _type: "reference", _ref: asset._id } }
      });
    }

    await patch.commit();
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- دالة الحذف ---
export async function deleteProject(id: string) {
  try {
    await client.delete(id);
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}