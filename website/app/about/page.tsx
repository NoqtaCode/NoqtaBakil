import { client } from "../../lib/sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

export default async function AboutPage() {
  // 1. جلب الإعدادات مع فك تشفير رابط الصورة بشكل صحيح
  const settings = await client.fetch(`*[_type == "settings"][0]{
    ...,
    "aboutImageUrl": aboutImage.asset->url,
    "logoUrl": logo.asset->url
  }`);

  // 2. جلب إحصائيات المشاريع الحقيقية
  const projectsCount = await client.fetch(`count(*[_type == "project"])`);

  const waNumber = settings?.whatsapp || "966500000000";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900" dir="rtl">
      {/* تمرير الإعدادات للنيفبار */}
      <Navbar settings={settings} />
      
      <main className="flex-1 pt-32 pb-20">
        <section id="about" className="py-16 md:py-24 bg-white scroll-mt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              
              {/* الجزء العلوي: الصورة والشارة */}
              <div className="relative group mx-auto lg:mx-0 w-full max-w-[500px] order-1">
                <div className="relative h-[350px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                  <Image
                    // ✅ الآن الصورة تأتي من لوحة التحكم
                    src={settings?.aboutImageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"}
                    alt="About Us"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                {/* شارة سنوات الخبرة */}
                <div className="absolute -bottom-4 -right-2 md:bottom-12 md:-right-10 bg-yellow-500 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-blue-950 shadow-2xl z-10">
                  <p className="text-4xl md:text-6xl font-black leading-none italic">+5</p>
                  <p className="text-xs md:text-sm font-bold mt-1 md:mt-2 tracking-tighter text-center">سنوات تميز</p>
                </div>
              </div>

              {/* الجزء السفلي: النصوص */}
              <div className="text-center lg:text-right pt-6 md:pt-0 order-2">
                <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                  <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
                  <span className="text-blue-600 font-extrabold tracking-widest uppercase text-xs">من نحن</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                  الجودة هي محركنا الأول <br />{" "}
                  <span className="text-blue-700">والإتقان هويتنا</span>
                </h2>

                <div className="text-slate-600 text-base md:text-xl leading-loose mb-10 font-light max-w-3xl mx-auto lg:mx-0">
                  <p className="mb-6">
                    عندك مزرعة وحاب تحط لها سور سياجي أو تريد تأسيسها من البداية
                    حتى النهاية؟ إليك الحل. نحن متخصصون في{" "}
                    <span className="font-bold text-slate-900 text-lg underline decoration-yellow-500/30">
                      توريد وتركيب الشبوك والسياجات الأمنية
                    </span>{" "}
                    بأعلى معايير الأمان.
                  </p>

                  <p className="mb-6 border-r-4 border-green-500 pr-4 bg-green-50/30 py-2 rounded-l-xl">
                    كما نوفر قسماً خاصاً لـ{" "}
                    <span className="font-bold text-green-800 text-lg">
                      توريد وزراعة النخيل العربي والواشنطني
                    </span>{" "}
                    بكافة المقاسات لتنسيق حدائقكم.
                  </p>

                  <p className="mb-8 border-r-4 border-stone-400 pr-4 bg-stone-50 py-2 rounded-l-xl">
                    ونتميز في{" "}
                    <span className="font-bold text-slate-900 text-lg">
                      أعمال الحجر الطبيعي
                    </span>{" "}
                    وتلبيس المباني بدقة هندسية عالية.
                  </p>

                  {/* رابط التواصل الذكي */}
                  <div className="text-slate-900 font-black text-xl mt-10 flex items-center gap-3 justify-center lg:justify-start bg-blue-50 p-6 rounded-3xl inline-flex w-full md:w-auto shadow-sm">
                    <span>للتواصل</span>
                    <Link
                      href="/contact" // ✅ التوجيه لصفحة تواصل معنا المستقلة
                      className="text-blue-600 underline decoration-blue-200 underline-offset-[12px] hover:text-yellow-600 transition-colors"
                    >
                      انقر هنا
                    </Link>
                  </div>
                </div>

                {/* الإحصائيات الفخمة */}
                <div className="grid grid-cols-2 gap-4 md:gap-8 pt-6 border-t border-slate-100">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <p className="text-3xl md:text-5xl font-black text-blue-900 mb-1">
                      +5
                    </p>
                    <p className="text-slate-500 font-bold text-xs md:text-sm uppercase"> سنوات تميز</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <p className="text-3xl md:text-5xl font-black text-blue-900 mb-1">
                      100%
                    </p>
                    <p className="text-slate-500 font-bold text-xs md:text-sm uppercase">رضا العملاء</p>
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