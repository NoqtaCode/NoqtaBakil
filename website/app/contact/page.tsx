import { safeFetch } from "../../lib/sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { MessageCircle, Phone, MapPin, Mail, Clock } from "lucide-react";

export const revalidate = 10;

export default async function ContactPage() {
  // 1. جلب البيانات من Sanity
  const settings = await safeFetch(`*[_type == "settings"][0]{
    siteName, whatsapp, phone, email, address
  }`, null);

  const waNumber = settings?.whatsapp || "966500000000";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900" dir="rtl">
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-20">
        {/* رأس الصفحة */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">تواصل معنا</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتكم وتقديم عرض سعر لمشاريعكم في أسرع وقت ممكن.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* القسم الأول: أزرار التواصل السريع (CTA) */}
          <div className="space-y-8">
            <div className="bg-blue-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <h2 className="text-3xl font-black mb-8 relative z-10 text-center md:text-right">ابدأ تنفيذ مشروعك اليوم</h2>
               
               <div className="flex flex-col gap-4 relative z-10">
                  {/* زر واتساب */}
                  <Link 
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-green-500 text-white rounded-2xl font-black text-xl hover:bg-green-600 transition-all shadow-xl"
                  >
                    <span>تحدث معنا واتساب</span>
                    <MessageCircle size={28} />
                  </Link>

                  {/* زر اتصال */}
                  <Link 
                    href={`tel:${settings?.phone}`}
                    className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-blue-900 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-xl"
                  >
                    <span>اتصال هاتفي مباشر</span>
                    <Phone size={28} />
                  </Link>
               </div>

               {/* خلفية تجميلية */}
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* ساعات العمل */}
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
               <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm"><Clock size={32}/></div>
               <div>
                  <h4 className="font-black text-xl text-slate-800">أوقات العمل</h4>
                  <p className="text-slate-500 mt-1">نسعد باستقبال اتصالاتكم على مدار 24 ساعة   </p>
               </div>
            </div>
          </div>

          {/* القسم الثاني: معلومات المقر والبريد */}
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col justify-center gap-10">
            <div className="flex gap-6 items-start group">
              <div className="p-5 bg-slate-50 rounded-2xl text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">الموقع</p>
                <p className="text-xl font-black text-slate-800">{settings?.address || "الرياض، المملكة العربية السعودية"}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="p-5 bg-slate-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">البريد الإلكتروني</p>
                <p className="text-xl font-black text-slate-800">{settings?.email || "info@mqalatpro.com"}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
