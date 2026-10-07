'use server'

import { client } from "../../../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createService(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!title) throw new Error("اسم الخدمة مطلوب");

  try {
    let imageAsset;
    if (imageFile && imageFile.size > 0) {
      imageAsset = await client.assets.upload('image', imageFile);
    }

    await client.create({
      _type: 'service',
      title,
      description,
      icon: imageAsset ? { _type: 'image', asset: { _type: "reference", _ref: imageAsset._id } } : undefined
    });

    revalidatePath('/admin/services');
    revalidatePath('/');
  } catch (e) { console.error(e); }

  redirect('/admin/services');
}

export async function deleteService(id: string) {
  await client.delete(id);
  revalidatePath('/admin/services');
  revalidatePath('/');
}


export async function updateService(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  try {
    let patch = client.patch(id).set({ title, description });

    if (imageFile && imageFile.size > 0) {
      const asset = await client.assets.upload('image', imageFile);
      patch = patch.set({
        icon: { _type: 'image', asset: { _type: "reference", _ref: asset._id } }
      });
    }

    await patch.commit();
    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}