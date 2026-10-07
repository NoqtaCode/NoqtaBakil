import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createService } from "../actions";
import SubmitButton from "../../projects/new/SubmitButton"; // سنعيد استخدام نفس الزر الجميل

export default function NewServicePage() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/services" className="bg-white p-3 rounded-xl border border-gray-200">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">إضافة خدمة جديدة</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
        <form action={createService} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">اسم الخدمة *</label>
            <input name="title" required type="text" placeholder="مثال: تركيب شبوك زراعية" className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-gray-50/50" />
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">وصف مختصر للخدمة</label>
            <textarea name="description" rows={4} placeholder="اشرح للزبون ماذا تقدم في هذه الخدمة..." className="w-full border-2 border-gray-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-gray-50/50"></textarea>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">أيقونة أو صورة توضيحية</label>
            <input type="file" name="image" accept="image/*" className="w-full border-2 border-gray-100 rounded-2xl p-3 text-black bg-gray-50/50" />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}