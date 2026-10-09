import { safeFetch, type SiteSettings } from "../../lib/sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 10;

export default async function AboutPage() {
  const settings = await safeFetch<SiteSettings | null>(`*[_type == "settings"][0]{
    ...,
    "aboutImageUrl": aboutImage.asset->url,
    "logoUrl": logo.asset->url
  }`, null);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-200 selection:text-emerald-950" dir="rtl">
      <Navbar settings={settings} />
      
      <main className="flex-1 pt-32 pb-20">
        <section id="about" className="py-16 md:py-24 bg-slate-50 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              
              {/* الجزء العلوي: الصورة والشارة */}
              <div className="relative group mx-auto lg:mx-0 w-full max-w-[500px] order-1">
                <div className="relative h-[350px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src={settings?.aboutImageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"}
                    alt="عن المؤسسة"
                    fill
                    className="object-cover transition duration-1000 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                </div>
                
                {/* شارة سنوات الخبرة */}
                <div className="absolute -bottom-3 right-3 md:bottom-10 md:-right-8 bg-emerald-900 p-4 md:p-8 rounded-2xl md:rounded-[1.75rem] text-white shadow-[0_20px_50px_rgba(6,78,59,0.3)] z-10 text-center border border-emerald-800/50 backdrop-blur-sm">
                  <p className="text-4xl md:text-5xl font-black text-amber-400 leading-none">+5</p>
                  <p className="text-xs md:text-sm font-bold mt-2 tracking-wider">سنوات من الإتقان</p>
                </div>
              </div>

              {/* الجزء السفلي: النصوص */}
              <div className="text-center lg:text-right pt-6 md:pt-0 order-2">
                <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                  <span className="w-16 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
                  <span className="text-emerald-900 font-black tracking-widest uppercase text-sm">من نحن</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.2] tracking-tight">
                  قوة في البناء.. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-950">دقة في التنفيذ.. وريادة تصنع الفارق</span>
                </h2>

                <div className="text-slate-600 text-base md:text-xl leading-loose mb-10 font-light max-w-3xl mx-auto lg:mx-0 space-y-6">
                  <p className="mb-6">
                    في <span className="font-bold text-emerald-800">المؤسسة للمقاولات العامة</span> لا نبني مجرد منشآت، بل نرسّخ معايير متقدمة في القوة والصلابة والإتقان الهندسي. انطلقنا برؤية راسخة لنكون الخيار الأول والوجهة الموثوقة للمشاريع الإنشائية والتطويرية الكبرى في مختلف القطاعات.
                  </p>

                  <p className="mb-6 border-r-4 border-emerald-600 pr-4 bg-emerald-50/50 py-3 rounded-l-xl">
                    نعتمد على خبرات ميدانية صلبة، وكوادر فنية متمرسة، وأحدث المعدات والتقنيات؛ لننجز مشاريعكم وفق أعلى معايير السلامة والجودة، مع الالتزام بالدقة في المواعيد والمواصفات.
                  </p>

                  {/* رابط التواصل الذكي */}
                  <div className="mt-12 flex justify-center lg:justify-start">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 px-10 py-4 bg-amber-500 text-emerald-950 rounded-full font-black text-lg shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:bg-amber-400 transition-all active:scale-95"
                    >
                      <span>تواصل معنا للاستشارة</span>
                      <ArrowLeft size={20} />
                    </Link>
                  </div>
                </div>

                {/* الإحصائيات الفخمة */}
                <div className="grid grid-cols-2 gap-4 md:gap-8 pt-8 border-t border-slate-200">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                    <p className="text-4xl md:text-5xl font-black text-emerald-900 mb-2">
                      100%
                    </p>
                    <p className="text-slate-500 font-bold text-sm">نسبة الإنجاز</p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                    <p className="text-4xl md:text-5xl font-black text-emerald-900 mb-2">
                      +100
                    </p>
                    <p className="text-slate-500 font-bold text-sm">عميلًا وأكثر</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
