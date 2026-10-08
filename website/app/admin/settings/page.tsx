import { safeFetch } from "../../../lib/sanity";
import { updateGeneralSettings, updateAccountSettings } from "./actions";
import SubmitButton from "./SubmitButton"; 
import { Globe, Phone, ShieldCheck, ImageIcon, Key, ShieldAlert } from "lucide-react";
import Image from "next/image";

export const revalidate = 0;

export default async function SettingsPage() {
  const settings = (await safeFetch(`*[_type == "settings"][0]{
    ..., 
    "heroImageUrl": heroImage.asset->url, 
    "aboutImageUrl": aboutImage.asset->url,
    "ctaImageUrl": ctaImage.asset->url
  }`, {})) ?? {};

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4" dir="rtl">
      <div className="mb-12 pt-8 text-right font-sans">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800">إعدادات المنصة</h1>
        <p className="text-slate-500 mt-2">تحديث هوية الموقع، بيانات التواصل، وحماية الحساب</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* العمود الأيمن: البيانات والصور (Form 1) */}
        <div className="lg:col-span-2 space-y-10">
          <form action={async (formData) => {
            'use server';
            await updateGeneralSettings(formData);
          }} className="space-y-10">
            
            {/* نصوص الواجهة */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2 mb-4">
                <Globe size={22} className="text-blue-500" /> نصوص الواجهة والصور
              </h2>
              <div className="space-y-4 font-sans">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2 uppercase">العنوان الرئيسي</label>
                  <input name="heroTitle" placeholder={settings.heroTitle || "إتقان في العمل.."} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 mr-2 uppercase">العنوان الفرعي (الأصفر)</label>
                  <input name="heroSubTitle" placeholder={settings.heroSubTitle || "وفخامة في التنفيذ"} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 mr-2 uppercase">الوصف التعريفي</label>
                   <textarea name="heroDescription" rows={3} placeholder={settings.heroDescription || "اكتب وصفاً جذاباً ..."} className="w-full border-2 border-slate-100 rounded-2xl p-4 text-black outline-none focus:border-blue-500 bg-slate-50 transition"></textarea>
                </div>
              </div>  

              {/* صور الهوية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> خلفية الواجهة الرئيسية كاملة </label>
                  <input type="file" name="heroImage" accept="image/jpeg,image/png,image/webp" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> صورة صفحة «عن الشركة» </label>
                  <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={settings.aboutImageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"}
                      alt="الصورة الحالية في صفحة عن الشركة"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-slate-500">الصورة الحالية في أعلى صفحة «عن الشركة». اختر صورة جديدة لاستبدالها.</p>
                  <input type="file" name="aboutImage" accept="image/jpeg,image/png,image/webp" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 flex items-center gap-2"> <ImageIcon size={14}/> صورة خلفية قسم «لنبني معًا» أسفل الصفحة </label>
                  <div className="relative h-40 overflow-hidden rounded-2xl border border-slate-100 bg-amber-500">
                    {settings.ctaImageUrl ? (
                      <Image src={settings.ctaImageUrl} alt="الصورة الحالية لقسم لنبني معًا" fill unoptimized className="object-cover" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-900 font-bold">لا توجد صورة مضافة — سيظهر اللون البرتقالي الحالي</div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">اختر صورة مناسبة، ثم اضغط «حفظ التغييرات» أسفل بيانات التواصل.</p>
                  <input type="file" name="ctaImage" accept="image/jpeg,image/png,image/webp" className="w-full border-2 border-dashed border-slate-100 rounded-2xl p-3 bg-slate-50 text-xs" />
                </div>
              </div>
            </div>

            {/* معلومات التواصل */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
                <Phone size={22} /> أرقام التواصل والروابط
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                <input name="whatsapp" placeholder={`واتساب: ${settings.whatsapp || 'لا يوجد'}`} className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black" />
                <input name="phone" placeholder={`اتصال: ${settings.phone || 'لا يوجد'}`} className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black" />
                <input name="facebook" placeholder={`رابط فيسبوك: ${settings.facebook || ''}`} className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:bg-white outline-none transition text-black md:col-span-2" />
              </div>
              <SubmitButton />
            </div>
          </form>
        </div>

        {/* العمود الأيسر: أمان الحساب (Form 2) */}
        <div className="lg:col-span-1">
          <form action={async (formData) => {
            'use server';
            await updateAccountSettings(formData);
          }} className="lg:sticky lg:top-24 font-sans">
            
            <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white space-y-8 border border-white/10 relative overflow-hidden">
              <h2 className="text-2xl font-black flex items-center gap-3 text-yellow-500">
                <ShieldCheck size={28} /> أمان الحساب
              </h2>
              
              <div className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">اسم المستخدم الجديد</label>
                  <input name="username" type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 mr-2 uppercase tracking-widest">كلمة المرور الجديدة</label>
                  <input name="password" type="password" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-yellow-500 transition" />
                </div>

                <div className="pt-6 border-t border-white/10">
                  <label className="text-xs font-bold text-red-400 flex items-center gap-2 mb-3">
                    <Key size={16} /> كود الأمان (مطلوب للتغيير)
                  </label>
                  <input name="securityCode" type="password" required placeholder="أدخل الكود السري" className="w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-white outline-none focus:border-red-500 transition" />
                </div>
              </div>

              <button type="submit" className="relative z-10 w-full bg-yellow-500 text-slate-900 font-black py-5 rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95">
                تحديث بيانات الدخول 🔐
              </button>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-start gap-3">
                 <ShieldAlert className="text-yellow-500 shrink-0" size={18} />
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">سيتم خروجك من النظام تلقائياً بعد نجاح العملية لضمان تطبيق الحماية الجديدة.</p>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
