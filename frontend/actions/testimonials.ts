'use server'

// ============================================================
// Testimonials Server Actions
// ============================================================

import { client } from "../lib/sanity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const clientName = formData.get('clientName') as string;
  const feedback = formData.get('feedback') as string;

  if (!clientName || !feedback) throw new Error("جميع الحقول مطلوبة");

  try {
    await client.create({
      _type: 'testimonial',
      clientName,
      feedback,
      isActive: true
    });

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  } catch (e) { console.error(e); }

  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  await client.delete(id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function updateTestimonial(id: string, formData: FormData) {
  const clientName = formData.get('clientName') as string;
  const feedback = formData.get('feedback') as string;

  try {
    await client
      .patch(id)
      .set({ clientName, feedback })
      .commit();

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
