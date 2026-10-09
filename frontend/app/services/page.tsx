import { safeFetch, type SiteSettings } from "../../lib/sanity";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ServiceCard from "../../components/ui/ServiceCard";
import Link from "next/link";
import { ArrowLeft, Briefcase, Factory, Fence, Gem, MessageCircle, Trees } from "lucide-react";

export const revalidate = 10;

export default async function ServicesPage() {
  const settings = await safeFetch<SiteSettings | null>(`*[_type == "settings"][0]{
    siteName, whatsapp, "logoUrl": logo.asset->url
  }`, null);

  const waNumber = settings?.whatsapp || "966537302795";

  const businessServices = [
    {
      title: "الشبوك والسياجات",
      description: "توريد وتركيب الشبوك الأمنية والزراعية لتسوير المزارع والأراضي، مع تنفيذ يناسب طبيعة الموقع واحتياجك.",
      icon: Fence,
      number: "01",
    },
    {
      title: "زراعة وتنسيق النخيل",
      description: "توريد وزراعة النخيل وتنسيق الحدائق والمساحات الزراعية بعناية، لتكون المساحة أجمل وأسهل في الاستخدام.",
      icon: Trees,
      number: "02",
    },
    {
      title: "الهناجر والمستودعات",
      description: "تصميم وتنفيذ الهناجر والمستودعات والمنشآت المعدنية بما يلائم مساحة المشروع وطبيعة استخدامه.",
      icon: Factory,
      number: "03",
    },
    {
      title: "السواتر والمظلات",
      description: "توريد وتركيب السواتر والمظلات للمنازل والمواقف والمساحات الخارجية، بخيارات عملية ومظهر متناسق.",
      icon: Briefcase,
      number: "04",
    },
    {
      title: "الحجر الطبيعي",
      description: "تنفيذ وتركيب واجهات الحجر الطبيعي بتشطيبات دقيقة تضيف للواجهات طابعًا أنيقًا وأصيلًا.",
      icon: Gem,
      number: "05",
    },
  ];

  const services = await safeFetch(`
    *[_type == "service"] | order(_createdAt desc) {
      _id,
      title,
      description,
      "iconUrl": icon.asset->url
    }
  `, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900" dir="rtl">
      
      <Navbar settings={settings} />

      <main className="flex-1 pt-32 pb-20">
        
        {/* رأس الصفحة */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl text-emerald-700 mb-6 shadow-sm border border-emerald-100">
            <Briefcase size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">الخدمات</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            خدماتنا تغطي مجالات أعمالنا؛ من الشبوك والنخيل إلى الهناجر والسواتر والحجر الطبيعي.
          </p>
        </div>

        {/* شبكة الخدمات */}
        <section className="py-10 bg-slate-50 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {businessServices.map((service) => {
                const Icon = service.icon;
                const message = encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة ${service.title}.`);

                return (
                  <article key={service.title} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
                    <span className="absolute left-5 top-3 text-6xl font-black text-slate-50 transition-colors group-hover:text-emerald-50" aria-hidden="true">{service.number}</span>
                    <div className="relative">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 transition-colors group-hover:bg-emerald-900 group-hover:text-amber-400">
                        <Icon size={28} strokeWidth={1.8} />
                      </div>
                      <h2 className="mb-3 text-xl font-black text-slate-900 md:text-2xl">{service.title}</h2>
                      <p className="min-h-[84px] text-sm leading-7 text-slate-600 md:text-base">{service.description}</p>
                      <Link href={`https://wa.me/${waNumber}?text=${message}`} target="_blank" className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800">
                        <MessageCircle size={17} />
                        اطلب هذه الخدمة
                        <ArrowLeft size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {services.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 text-2xl font-black text-slate-900">خدمات إضافية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                  {services.map((service: any, index: number) => (
                    <ServiceCard key={service._id} service={service} index={index} waNumber={waNumber} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
