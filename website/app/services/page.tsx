import { client } from "../../lib/sanity";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";
import { Briefcase } from "lucide-react";

export const revalidate = 10;

export default async function ServicesPage() {
  // 1. جلب الإعدادات (لكي نحصل على رقم الواتساب)
  const settings = await client.fetch(`*[_type == "settings"][0]{
    siteName, whatsapp, "logoUrl": logo.asset->url
  }`);

  // 👇 تعريف المتغير waNumber لكي يختفي الخطأ الأحمر
  const waNumber = settings?.whatsapp || "966500000000";

  // 2. جلب كل الخدمات
  const services = await client.fetch(`
    *[_type == "service"] | order(_createdAt desc) {
      _id,
      title,
      description,
      "iconUrl": icon.asset->url
    }
  `);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900" dir="rtl">
      
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-20">
        
        {/* رأس الصفحة */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl text-blue-600 mb-6">
            <Briefcase size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">خدماتنا الاحترافية</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            نقدم حلولاً هندسية وإنشائية متكاملة تلبي تطلعاتكم.
          </p>
        </div>

        {/* شبكة الخدمات */}
        <section className="py-10 bg-[#FCFCFC]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
              {services.length > 0 ? (
                services.map((service: any, index: number) => (
                  <ServiceCard 
                    key={service._id} 
                    service={service} 
                    index={index} 
                    waNumber={waNumber} // ✅ الآن المتغير أصبح معروفاً هنا
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400 font-bold">
                  لا توجد خدمات مضافة حالياً.
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}