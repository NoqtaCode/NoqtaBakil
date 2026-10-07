import Link from "next/link";
import { client } from "../lib/sanity"; 
import { MapPin, Phone, Mail, MessageCircle, Facebook } from "lucide-react"; // استيراد الأيقونات

export default async function Footer() {
  const settings = await client.fetch(`*[_type == "settings"][0]`);

  const waNumber = settings?.whatsapp || "966500000000";
  const phoneNumber = settings?.phone || "0500000000";
  const email = settings?.email || "info@mqalatpro.com";
  const address = settings?.address || "الرياض، المملكة العربية السعودية";

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans border-t border-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* 1. هوية الشركة (ثابتة) */}
        <div className="space-y-6">
          <Link href="/" className="inline-block group">
            <h2 className="text-3xl font-black text-white tracking-tighter group-hover:text-yellow-500 transition-colors">
              مقاول <span className="text-yellow-500 group-hover:text-white transition-colors">شبوك</span>
            </h2>
            <p className="text-[11px] font-bold text-slate-500 tracking-widest mt-1 uppercase">وسياجات أمنية</p>
          </Link>
          <p className="text-slate-400 leading-relaxed text-sm font-light">
خبرة عريقة في تسوير المزارع بأجود أنواع الشبوك، وتنسيق الحدائق بأفضل أصناف النخيل، وتنفيذ أرقى واجهات الحجر الطبيعي.          </p>
          
          {/* روابط التواصل (فيسبوك وواتساب فقط) */}
          <div className="flex gap-4 pt-2">
            {settings?.facebook && (
              <a href={settings.facebook} target="_blank" className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Facebook size={24} />
              </a>
            )}
            <a href={`https://wa.me/${waNumber}`} target="_blank" className="w-12 h-12 rounded-2xl bg-green-600/10 text-green-500 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

        {/* 2. خدماتنا */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
            خدماتنا
          </h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/#shabouk" className="hover:text-white hover:translate-x-[-5px] transition-all inline-block italic">أعمال الشبوك </Link></li>
            <li><Link href="/#nakheel" className="hover:text-white hover:translate-x-[-5px] transition-all inline-block italic">اعمال النخيل</Link></li>
            <li><Link href="/#hajar" className="hover:text-white hover:translate-x-[-5px] transition-all inline-block italic">أعمال الحجر </Link></li>
          </ul>
        </div>

        {/* 3. روابط هامة */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            روابط هامة
          </h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors font-bold">الرئيسية</Link></li>
            <li><Link href="/projects/all" className="hover:text-white transition-colors font-bold">معرض الأعمال</Link></li>
            {/* <li><Link href="/login" className="hover:text-white transition-colors font-bold">لوحة التحكم</Link></li> */}
          </ul>
        </div>

        {/* 4. بيانات التواصل */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            تواصل معنا
          </h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-yellow-500 shrink-0" />
              <span className="text-slate-400">{address}</span>
            </li>
            <li className="flex items-center gap-4 italic">
              <Phone size={18} className="text-blue-500 shrink-0" />
              <span dir="ltr" className="text-slate-200 font-bold">{phoneNumber}</span>
            </li>
            <li className="flex items-center gap-4">
              {/* <Mail size={18} className="text-purple-500 shrink-0" /> */}
              {/* <span className="text-slate-400 truncate">{email}</span> */}
            </li>
          </ul>
        </div>
      </div>

{/* الجزء السفلي: الحقوق وتوقيع المطور */}
      <div className="border-t border-slate-800/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-6">
        
        {/* حقوق العميل (يمين) */}
        <p className="text-xs text-slate-500 font-light order-2 md:order-1">
          جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-slate-300 font-bold"> مقاول شبوك</span>
        </p>

        {/* توقيع شركتكم (يسار - لمسة فخامة) */}
        <div className="order-1 md:order-2 flex items-center gap-2 group">
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">مطور بواسطة</span>
          <Link 
            href="https://wa.me/967737543563" // رابط واتساب شركتكم أو موقعكم
            target="_blank"
            className="flex items-center gap-1.5 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 hover:bg-blue-600 hover:border-blue-500 transition-all duration-500 shadow-sm"
          >
            <span className="text-sm font-black text-slate-300 group-hover:text-white tracking-tighter">Noqta<span className="text-blue-500 group-hover:text-white transition-colors">Code</span></span>
            {/* أيقونة كود صغيرة */}
            <svg className="w-3.5 h-3.5 text-blue-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </Link>
        </div>

      </div>
    </footer>
  );
}