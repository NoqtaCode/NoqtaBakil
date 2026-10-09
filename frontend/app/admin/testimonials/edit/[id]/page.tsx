import { safeFetch } from "../../../../../lib/sanity";
import { updateTestimonial } from "../../../../../actions/testimonials";
import SaveSubmitButton from "../../../../../components/admin/SaveSubmitButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EditTestimonialPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const testimonial = await safeFetch<any>(`*[_id == $id][0]`, null, { id: params.id });

  if (!testimonial) return <div className="p-10 text-center">الرأي غير موجود</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/testimonials" className="bg-white p-3 rounded-xl border border-gray-200">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">تعديل رأي العميل</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
        <form action={async (formData) => {
            'use server';
            await updateTestimonial(params.id, formData);
            redirect('/admin/testimonials');
        }} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">اسم العميل</label>
            <input name="clientName" defaultValue={testimonial.clientName} required className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الرأي / التقييم</label>
            <textarea name="feedback" defaultValue={testimonial.feedback} required rows={5} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 outline-none"></textarea>
          </div>

          <SaveSubmitButton label="حفظ التعديلات" />
        </form>
      </div>
    </div>
  );
}
