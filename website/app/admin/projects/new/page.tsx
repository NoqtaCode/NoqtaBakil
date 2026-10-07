import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createProject } from "../actions"; 
import SubmitButton from "./SubmitButton"; 

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto px-2 pb-20">
      
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/projects" className="bg-white p-3 rounded-xl border border-gray-200 text-gray-600 shadow-sm">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">إضافة مشروع جديد</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-6 md:p-10">
        <form action={createProject} className="space-y-8">
          
          {/* عنوان المشروع */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-3 pr-2">عنوان العمل *</label>
            <input name="title" required type="text" placeholder="مثال: تسوير مزرعة بالخرج" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition bg-gray-50/50 text-black" />
          </div>

          {/* القسم */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-3 pr-2">القسم المخصص *</label>
            <select 
              name="category" 
              required 
              defaultValue="" 
              className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none bg-gray-50/50 text-black"
            >
              <option value="" disabled>-- اختر القسم --</option>
              <option value="shabouk">🚧 أعمال الشبوك والمزارع</option>
              <option value="nakheel">🌴 تنسيق حدائق ونخيل</option>
              <option value="hajar">🧱 أعمال الحجر الطبيعي</option>
            </select>
          </div>

          {/* صورة المشروع */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-3 pr-2">صورة المشروع *</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/30 hover:bg-gray-50 transition">
              <input type="file" name="image" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="text-gray-400">
                 <p className="font-bold text-blue-600">اضغط لرفع صورة العمل</p>
                 <p className="text-xs mt-1">يفضل صورة واضحة</p>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <SubmitButton />

        </form>
      </div>
    </div>
  );
}