import { safeFetch } from "../../lib/sanity";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import GalleryPreview from "../../components/sections/GalleryPreview";
import Link from "next/link";
import { ImageIcon, ArrowRight } from "lucide-react";

export const revalidate = 10;

export default async function GalleryPage() {
  // 1. جلب الإعدادات (للهيدر) وصور كل المشاريع المكتملة
  const settings = await safeFetch(`*[_type == "settings"][0]`, null);
  
  const projects = await safeFetch(`
    (*[_type == "project" && status == "published"] | order(_createdAt desc) {
      _id, title, "imageUrl": mainImage.asset->url
    }) + (*[_type == "gallery"] | order(_createdAt desc) {
      _id, "title": category, "imageUrl": image.asset->url
    })
  `, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900" dir="rtl">
      
      {/* الهيدر العلوي */}
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-20">
        
        {/* رأس الصفحة (Header) */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl text-blue-600 mb-6">
            <ImageIcon size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">معرض الإنجازات</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            نسعد بعرض مقتطفات من أعمالنا الميدانية في مختلف التخصصات (شبوك، نخيل، حجر طبيعي) المنفذة بأعلى جودة.
          </p>
        </div>

        {/* شبكة الصور (Gallery Grid) باستخدام المكون التفاعلي */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 p-4 md:p-10 rounded-[3rem] border border-slate-100 shadow-inner">
            {projects.length > 0 ? (
              <GalleryPreview projects={projects} />
            ) : (
              <div className="text-center py-40 text-gray-400 font-bold border-2 border-dashed rounded-[2.5rem]">
                لا توجد صور لعرضها حالياً
              </div>
            )}
          </div>
        </section>

        {/* قسم دعوة للتواصل في أسفل المعرض */}
        <div className="mt-20 max-w-4xl mx-auto px-6 text-center">
           <div className="bg-blue-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-2xl md:text-3xl font-black mb-6 relative z-10">هل أعجبتك جودة أعمالنا؟</h3>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-yellow-500 text-blue-950 px-10 py-4 rounded-full font-black text-xl hover:bg-white transition-all shadow-xl relative z-10"
              >
                <span>اطلب مشروعك الآن</span>
                <ArrowRight size={24} />
              </Link>
              {/* زخرفة خلفية */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
