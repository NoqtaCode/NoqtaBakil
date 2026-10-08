import Link from "next/link";
import { safeFetch } from "../lib/sanity";
import { MapPin, Phone, MessageCircle, Facebook, Layers, Trees, Factory, Tent, Diamond } from "lucide-react";

export default async function Footer() {
  const settings = await safeFetch(`*[_type == "settings"][0]`, null);

  const waNumber = settings?.whatsapp || "966537302795";
  const phoneNumber = settings?.phone || "+966537302795";
  const address = settings?.address || "المملكة العربية السعودية";

  return (
    <footer className="bg-emerald-950 text-slate-300 pt-20 pb-8 font-sans border-t border-emerald-900 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* 1. هوية الشركة */}
        <div className="space-y-6">
          <Link href="/" className="inline-block group">
            <h2 className="text-3xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
              {settings?.siteName || "مؤسسة للمقاولات العامة"}
            </h2>
            <p className="text-[11px] font-bold text-emerald-400/80 tracking-widest mt-1 uppercase">رائدة في التنفيذ والإنجاز</p>
          </Link>
          <p className="text-emerald-100/60 leading-relaxed text-sm font-light">
            خبرة عريقة في توريد الشبوك، تنسيق الحدائق والنخيل، بناء الهناجر والمستودعات، تركيب السواتر والمظلات، وتنفيذ أرقى الواجهات الحجرية.
          </p>
          
          {/* روابط التواصل */}
          <div className="flex gap-4 pt-2">
            {settings?.facebook && (
              <a href={settings.facebook} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-white/10">
                <Facebook size={20} />
              </a>
            )}
            <a href={`https://wa.me/${waNumber}`} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 text-green-400 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm border border-white/10">
              <MessageCircle size={22} />
            </a>
          </div>
        </div>

        {/* 2. خدماتنا */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
            مجالات العمل
          </h3>
          <ul className="space-y-4 text-sm text-emerald-200/70">
            <li><Link href="/#shabouk" className="hover:text-amber-400 hover:translate-x-[-5px] transition-all flex items-center gap-2"><Layers size={14}/> الشبوك والسياجات</Link></li>
            <li><Link href="/#nakheel" className="hover:text-amber-400 hover:translate-x-[-5px] transition-all flex items-center gap-2"><Trees size={14}/> زراعة وتنسيق النخيل</Link></li>
            <li><Link href="/#hanajer" className="hover:text-amber-400 hover:translate-x-[-5px] transition-all flex items-center gap-2"><Factory size={14}/> الهناجر والمستودعات</Link></li>
            <li><Link href="/#sawater" className="hover:text-amber-400 hover:translate-x-[-5px] transition-all flex items-center gap-2"><Tent size={14}/> السواتر والمظلات</Link></li>
            <li><Link href="/#hajar" className="hover:text-amber-400 hover:translate-x-[-5px] transition-all flex items-center gap-2"><Diamond size={14}/> الحجر الطبيعي</Link></li>
          </ul>
        </div>

        {/* 3. روابط هامة */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            روابط هامة
          </h3>
          <ul className="space-y-4 text-sm text-emerald-200/70">
            <li><Link href="/about" className="hover:text-white transition-colors">من نحن</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">المعرض الشامل</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">الخدمات</Link></li>
          </ul>
        </div>

        {/* 4. بيانات التواصل */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            تواصل معنا
          </h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-emerald-100/80 leading-relaxed">{address}</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-blue-400 shrink-0" />
              <span dir="ltr" className="text-white font-bold tracking-wider">{phoneNumber}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* الجزء السفلي: الحقوق وتوقيع المطور */}
      <div className="border-t border-emerald-800/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-6 relative z-10 max-w-7xl mx-auto">
        <p className="text-xs text-emerald-300/50 font-light order-2 md:order-1">
          جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-emerald-200 font-bold">{settings?.siteName || "مؤسسة للمقاولات العامة"}</span>
        </p>

        <div className="order-1 md:order-2 flex items-center gap-2 group">
          <span className="text-[10px] text-emerald-400/60 uppercase tracking-widest font-bold">تطوير وتصميم</span>
          <Link 
            href="https://wa.me/967737543563"
            target="_blank"
            className="flex items-center gap-1.5 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 hover:bg-emerald-800 hover:border-emerald-600 transition-all duration-500 shadow-sm"
          >
            <span className="text-sm font-black text-slate-300 group-hover:text-white tracking-tighter">Noqta<span className="text-amber-500 group-hover:text-amber-400 transition-colors">Code</span></span>
            <svg className="w-3.5 h-3.5 text-amber-500 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
