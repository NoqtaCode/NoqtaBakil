'use server'

// ============================================================
// Gallery Server Actions
// ============================================================

import { client } from "../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadImages(formData: FormData) {
  const category = formData.get('category') as string;
  const files = formData.getAll('images') as File[];

  if (!category || files.length === 0) {
    throw new Error("الرجاء اختيار القسم والصور");
  }

  try {
    for (const file of files) {
      if (file.size === 0) continue;
      const asset = await client.assets.upload('image', file);
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

export async function deleteGalleryImage(id: string) {
  await client.delete(id);
  revalidatePath('/admin/gallery');
}
