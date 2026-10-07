import Link from "next/link";
import { ArrowRight, ImagePlus } from "lucide-react";
import { uploadImages } from "../actions";
import SubmitButton from "./SubmitButton"; // سننشئه بالخطوة التالية

export default function NewGalleryUpload() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/gallery" className="bg-white p-3 rounded-xl border border-gray-200">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">رفع صور للمعرض</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
        <form action={uploadImages} className="space-y-8">
          
          {/* اختيار القسم */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-3">تصنيف الصور المرفوعة *</label>
            <select name="category" required defaultValue="" className="w-full border-2 border-gray-100 rounded-2xl p-4 bg-gray-50/50 text-black outline-none focus:border-blue-500">
              <option value="" disabled>-- اختر القسم --</option>
              <option value="shabouk">شبوك ومزارع</option>
              <option value="nakheel">نخيل وحدائق</option>
              <option value="hajar">حجر طبيعي</option>
            </select>
          </div>

          {/* حقل اختيار صور متعددة */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-3">اختيار الصور (يمكنك اختيار أكثر من صورة) *</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/30 hover:bg-gray-50 transition">
              <input 
                type="file" 
                name="images" 
                accept="image/*" 
                multiple // <--- هذا السطر يسمح باختيار صور كثيرة
                required 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <div className="text-gray-400">
                 <ImagePlus size={48} className="mx-auto mb-4 text-blue-500" />
                 <p className="font-bold text-slate-700">اضغط هنا واصبعك مطول لاختيار الصور</p>
                 <p className="text-xs mt-1">يمكنك رفع حتى 10 صور في المرة الواحدة</p>
              </div>
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}