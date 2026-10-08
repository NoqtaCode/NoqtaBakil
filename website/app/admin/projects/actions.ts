'use server'

import { client } from "../../../lib/sanity";
import { revalidatePath } from "next/cache";

// Each request is kept small; the client sends as many batches as needed.
export async function createProjectBatch(formData: FormData): Promise<{ createdIndices: number[]; error?: string }> {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const imageFiles = (formData.getAll('image') as File[]).filter((file) => file.size > 0);
  const imageIndices = formData.getAll('imageIndex').map((value) => Number(value));
  const totalCount = Number(formData.get('totalCount') ?? imageFiles.length);

  if (!title || !category || imageFiles.length === 0) {
    return { createdIndices: [], error: 'أدخل عنوان المشروع واختر القسم وصورة واحدة على الأقل.' };
  }
  if (imageFiles.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type))) {
    return { createdIndices: [], error: 'استخدم صور JPG أو PNG أو WebP.' };
  }
  if (imageIndices.length !== imageFiles.length || imageIndices.some((index) => !Number.isInteger(index) || index < 0 || index >= totalCount)) {
    return { createdIndices: [], error: 'تعذر قراءة ترتيب الصور. أعد المحاولة.' };
  }
  if (imageFiles.reduce((total, file) => total + file.size, 0) > 15 * 1024 * 1024) {
    return { createdIndices: [], error: 'حجم الدفعة أكبر من الحد المسموح. أعد المحاولة لتقسيم الصور تلقائيًا.' };
  }

  const createdIndices: number[] = [];
  const failures: unknown[] = [];
  let nextImage = 0;
  const worker = async () => {
    while (nextImage < imageFiles.length) {
      const position = nextImage++;
      const imageFile = imageFiles[position];
      const imageNumber = imageIndices[position] + 1;
      const projectTitle = totalCount > 1 ? `${title} - ${imageNumber}` : title;
      try {
        const imageAsset = await client.assets.upload('image', imageFile);
        await client.create({
          _type: 'project',
          title: projectTitle,
          category,
          status: 'published',
          date: new Date().toISOString().split('T')[0],
          slug: {
            _type: 'slug',
            current: encodeURIComponent(projectTitle.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '-' + imageNumber)
          },
          mainImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageAsset._id }
          }
        });
        createdIndices.push(imageIndices[position]);
      } catch (error) {
        console.error('Project image upload failed:', error);
        failures.push(error);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(3, imageFiles.length) }, () => worker()));
  if (createdIndices.length) {
    revalidatePath('/admin/projects');
    revalidatePath('/');
  }
  return {
    createdIndices,
    ...(failures.length ? { error: 'تعذر رفع بعض الصور. تم حفظ الصور المكتملة؛ اضغط متابعة لإكمال الباقي.' } : {})
  };
}

// --- تعديل مشروع ---
export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  const imageFile = formData.get('image') as File;

  try {
    let patch = client.patch(id).set({
      title,
      category,
      status: status || 'published',
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

// --- حذف مشروع ---
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
