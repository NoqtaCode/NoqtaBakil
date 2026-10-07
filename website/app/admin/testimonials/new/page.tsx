import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createTestimonial } from "../actions";
import SubmitButton from "../../projects/new/SubmitButton";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/testimonials" className="bg-white p-3 rounded-xl border border-gray-200">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">إضافة رأي عميل</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
        <form action={createTestimonial} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">اسم العميل *</label>
            <input name="clientName" required type="text" placeholder="مثال: فهد القحطاني" className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-gray-50/50" />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">رأي العميل في العمل *</label>
            <textarea name="feedback" required rows={5} placeholder="اكتب ما قاله العميل عن جودة التنفيذ..." className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-gray-50/50"></textarea>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}