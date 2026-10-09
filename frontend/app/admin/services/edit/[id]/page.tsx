import { safeFetch } from "../../../../../lib/sanity";
import { updateService } from "../../../../../actions/services";
import SaveSubmitButton from "../../../../../components/admin/SaveSubmitButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const service = await safeFetch<any>(`*[_id == $id][0]`, null, { id: params.id });

  if (!service) return <div>الخدمة غير موجودة</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/services" className="bg-white p-3 rounded-xl border border-gray-200">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">تعديل الخدمة</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <form action={async (formData) => {
            'use server';
            await updateService(params.id, formData);
            redirect('/admin/services');
        }} className="space-y-6">
          <input name="title" defaultValue={service.title} required className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 outline-none" />
          <textarea name="description" defaultValue={service.description} rows={4} className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black bg-gray-50/50 outline-none"></textarea>
          <input type="file" name="image" accept="image/*" className="w-full border-2 border-gray-100 rounded-2xl p-3 bg-gray-50/50" />
          <SaveSubmitButton label="حفظ التعديلات" />
        </form>
      </div>
    </div>
  );
}
