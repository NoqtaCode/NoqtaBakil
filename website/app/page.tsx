import { client } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import GalleryPreview from "../components/GalleryPreview";
import FloatingActions from "../components/FloatingActions";
import HomeGallery from "../components/HomeGallery";

import {
  Quote,
  CheckCircle2,
  Phone,
  MessageCircle,
  Star,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";

export const revalidate = 10;

// --- دالات جلب البيانات الديناميكية الشاملة ---
async function getData() {
  try {
    const settings = await client.fetch(`*[_type == "settings"][0]{
      siteName, whatsapp, phone, email, address, description,
      heroTitle, heroSubTitle, heroDescription,
      "logoUrl": logo.asset->url,
      "heroUrl": heroImage.asset->url,
      "aboutUrl": aboutImage.asset->url
    }`);

    const services = await client.fetch(
      `*[_type == "service"] | order(_createdAt desc)[0...12]{_id, title, description, "iconUrl": icon.asset->url}`,
    );

    const testimonials = await client.fetch(
      `*[_type == "testimonial" && isActive == true]{_id, clientName, feedback}`,
    );

    const gallery = await client.fetch(
      `*[_type == "project" && status == "published"] | order(_createdAt desc)[0...3]{ _id, title, "url": mainImage.asset->url }`,
    );

    const shabouk = await client.fetch(`*[_type == "project" && category == "shabouk" && status == "published"] | order(_createdAt desc)[0...6]{_id, title, slug, "imageUrl": mainImage.asset->url}`);
    const nakheel = await client.fetch(`*[_type == "project" && category == "nakheel" && status == "published"] | order(_createdAt desc)[0...6]{_id, title, slug, "imageUrl": mainImage.asset->url}`);
    const hajar = await client.fetch(`*[_type == "project" && category == "hajar" && status == "published"] | order(_createdAt desc)[0...6]{_id, title, slug, "imageUrl": mainImage.asset->url}`);

    const stats = { projects: await client.fetch(`count(*[_type == "project"])`), clients: 150 };

    return { settings, services, testimonials, gallery, shabouk, nakheel, hajar, stats };
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getData();
  if (!data) return <div className="text-center py-40 font-bold text-2xl">جاري تحميل المنصة الفاخرة...</div>;
  
  const { settings, services, testimonials, gallery, shabouk, nakheel, hajar, stats } = data;
  const waNumber = settings?.whatsapp || "966500000000";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-yellow-200 selection:text-blue-900" dir="rtl">
      
      {/* 🧭 الهيدر الاحترافي */}
      <Navbar settings={settings} />

      {/* 🎯 1. Hero Section - واجهة تليق بكبار المقاولين */}
      <section id="home" className="relative h-[95vh] md:h-screen flex items-center justify-center overflow-hidden">
        <Image 
          src={settings?.heroUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"}
          alt="Hero" fill className="object-cover scale-105" priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-950/40 to-white/10 backdrop-blur-[1px]"></div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-bold animate-pulse">
            <ShieldCheck size={16} /> 🏗️  ثقه ومصداقية عاليه 
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl">
            {settings?.heroTitle || "نصمم الأرض.."} <br />
            <span className="text-yellow-500 font-light italic">
              {settings?.heroSubTitle || "وننحت الجمال"}
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            {settings?.heroDescription || "خبرة عريقة في تسوير المزارع بأجود أنواع الشبوك، وتنسيق الحدائق بأفضل أصناف النخيل، وتنفيذ أرقى واجهات الحجر الطبيعي."}
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="#gallery" className="w-full md:w-auto px-12 py-5 bg-yellow-500 text-blue-950 rounded-full font-black text-xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(234,179,8,0.4)] hover:-translate-y-1 active:scale-95">
               استعراض المعرض
            </Link>
            <Link href="#contact" className="w-full md:w-auto px-12 py-5 bg-white/10 border-2 border-white/30 text-white rounded-full font-black text-xl backdrop-blur-md hover:bg-white hover:text-blue-950 transition-all active:scale-95">
               تواصل معنا
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
           <ArrowLeft className="-rotate-90" size={32} />
        </div>
      </section>

      {/* ℹ️ 2. من نحن - التصميم المتوازن للهاتف */}
      <section id="about" className="py-20 md:py-32 bg-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            
            <div className="relative group mx-auto lg:mx-0 w-full max-w-[550px]">
              <div className="relative h-[400px] md:h-[650px] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-[12px] border-slate-50">
                <Image 
                  src={settings?.aboutUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"} 
                  alt="About Us" fill className="object-cover transition duration-1000 group-hover:scale-110" 
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:bottom-12 md:-right-12 bg-yellow-500 p-7 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-blue-950 shadow-2xl z-10 text-center">
                 <p className="text-5xl md:text-7xl font-black leading-none">+5</p>
                 <p className="text-sm md:text-base font-black mt-2 uppercase tracking-tighter">سنوات تميز</p>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <span className="w-16 h-1.5 bg-blue-600 rounded-full"></span>
                <span className="text-blue-600 font-black tracking-[0.2em] uppercase text-sm">عن المؤسسة</span>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.2]">
                الجودة هي <span className="text-blue-700">محركنا الأول</span> <br/>والإتقان هويتنا الراسخة
              </h2>

              <div className="text-slate-500 text-base md:text-xl leading-[2] mb-12 font-light space-y-6">
                <p>
                  عندك مزرعة وحاب تحط لها سور سياجي أو تريد تأسيسها من البداية حتى النهاية؟ إليك الحل. نحن متخصصون في <span className="font-bold text-slate-900">توريد وتركيب الشبوك والسياجات الأمنية</span> (مزارع، ملاعب، كسارات، محميات) بشبك مجلفن ضد الصدأ والرطوبة وملبس PVC أخضر.
                </p>
                <p>
                   كما نوفر قسماً خاصاً لـ <span className="font-bold text-green-700">توريد وزراعة النخيل العربي والواشنطني</span> (خلاص، سكري، فسائل مثمرة) بكافة المقاسات، ونتميز في <span className="font-bold text-slate-900">أعمال الحجر الطبيعي</span> وتلبيس المباني.
                </p>
                

              </div>

              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                 <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <p className="text-4xl md:text-5xl font-black text-blue-900 mb-1">100%</p>
                    <p className="text-slate-500 font-bold text-sm uppercase">رضا عملائنا</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <p className="text-4xl md:text-5xl font-black text-blue-900 mb-1">+5</p>
                    <p className="text-slate-500 font-bold text-sm uppercase"> سنوات من التميز</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧰 3. الخدمات - نسخة الفخامة المتجاوبة */}
      <section id="services" className="py-20 md:py-32 bg-[#F8FAFC] scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-20 gap-10">
            <div className="text-center md:text-right">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <span className="w-12 h-1.5 bg-yellow-500 rounded-full"></span>
                <span className="text-yellow-600 font-black uppercase tracking-widest text-sm">احترافية التنفيذ</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-none">خدماتنا <span className="text-blue-900 font-light">المتميزة</span></h2>
            </div>
            <p className="text-slate-400 text-lg md:max-w-sm border-r-4 border-blue-600/20 pr-6 hidden md:block">دقة في التفاصيل، جودة في المواد، واحترافية في التنفيذ لضمان استدامة مشاريعكم.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
            {services.map((service: any, index: number) => (
              <ServiceCard key={service._id} service={service} index={index} waNumber={waNumber} />
            ))}
          </div>
        </div>
      </section>

      {/* 🚧 4. قسم الشبوك المتخصص */}
      <section id="shabouk" className="py-24 bg-slate-900 text-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-right border-r-8 border-yellow-500 pr-8">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white uppercase tracking-tighter">أعمال الشبوك والمزارع</h2>
            <p className="text-slate-400 text-xl leading-relaxed font-light">نحن ركيزتك في الحماية. تسوير المزارع والمواقع الكبرى بأجود خامات الحديد المجلفن المقاوم للصدأ.</p>
          </div>
          <GalleryPreview projects={shabouk} />
          <div className="mt-16 text-center md:text-right px-4">
            <Link href="/projects/shabouk" className="inline-flex items-center gap-3 text-yellow-500 font-black text-xl group">
               <span>استكشاف كافة أعمال الشبوك</span>
               <ArrowLeft className="group-hover:-translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🌴 5. قسم النخيل المتخصص */}
      <section id="nakheel" className="py-24 bg-[#F0F5F2] scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto mb-20">
             <span className="inline-block px-5 py-1 bg-green-100 text-green-700 rounded-full text-sm font-black mb-6">جمالية الطبيعة</span>
             <h2 className="text-4xl md:text-7xl font-black text-green-950 mb-8 leading-tight">تنسيق الحدائق والنخيل</h2>
             <p className="text-green-800/60 text-xl font-light leading-relaxed">توريد وزراعة أجود أنواع النخيل وتصميم شبكات ري ذكية تحول مساحتك إلى واحة حقيقية.</p>
          </div>
          <GalleryPreview projects={nakheel} />
<div className="mt-12 text-center px-4">
  <Link 
    href="/projects/nakheel" 
    className="inline-block px-6 py-4 md:px-12 md:py-5 bg-green-700 text-white rounded-full font-black text-sm md:text-xl shadow-xl hover:bg-green-800 transition-all active:scale-95 whitespace-nowrap"
  >
    تصفح معرض النخيل والحدائق الكامل
  </Link>
</div>
        </div>
      </section>

      {/* 🧱 6. قسم الحجر المتخصص */}
      <section id="hajar" className="py-24 bg-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <GalleryPreview projects={hajar} />
          </div>
          <div className="order-1 lg:order-2 text-right">
            <div className="flex items-center gap-3 mb-6 justify-end">
               <span className="text-stone-400 font-black uppercase text-sm tracking-[0.3em]">الفخامة الحجرية</span>
               <span className="w-12 h-1.5 bg-stone-800 rounded-full"></span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">واجهات حجرية <br/>تخلد عبر الزمن</h2>
            <p className="text-slate-500 text-xl leading-[2] mb-12 font-light">بناء وتلبيس المباني بالحجر الطبيعي الفاخر، وتنفيذ مجاري السيول بدقة هندسية تضمن المتانة والجمال.</p>
            <Link href="/projects/hajar" className="inline-flex items-center gap-3 px-10 py-5 bg-stone-800 text-white rounded-full font-black text-xl hover:bg-stone-950 transition-all shadow-2xl">
               <span>معرض صور الحجر</span>
               <ArrowLeft size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* 🖼️ 7. المعرض العام (Bento Grid) */}
      <section id="gallery" className="py-24 bg-slate-900 text-white scroll-mt-20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-2xl border border-white/10 px-6">
               <Zap className="text-yellow-500" size={20} />
               <span className="text-sm font-bold tracking-widest uppercase">العدسة الميدانية</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">لقطات من الميدان</h2>
            <p className="text-slate-400 text-xl font-light">صور حقيقية ومباشرة من أحدث مشاريعنا المكتملة في مختلف المناطق.</p>
         </div>
         <div className="max-w-6xl mx-auto px-4">
            <HomeGallery images={gallery} />
         </div>
      </section>

{/* ⭐ 8. الشهادات - نسخة "الرسائل الذكية" فائقة النحافة */}
      <section className="py-10 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
           
           <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="h-px bg-slate-200 flex-1"></div>
              <h2 className="text-xl font-black text-slate-800 shrink-0 flex items-center gap-2">
                 <Star className="text-yellow-500 fill-yellow-500" size={18} />
                 آراء العملاء
              </h2>
              <div className="h-px bg-slate-200 flex-1"></div>
           </div>
           
           {/* عرض مرن: في الجوال تظهر الكروت صغيرة جداً */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
             {testimonials.map((t: any) => (
               <div key={t._id} className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-300 items-start">
                 
                 {/* الأفاتار صغير جداً 10x10 */}
                 <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-sm uppercase">
                    {t.clientName.charAt(0)}
                 </div>

                 <div className="flex flex-col gap-1 w-full">
                    {/* الاسم والنجوم في سطر واحد */}
                    <div className="flex justify-between items-center w-full">
                       <span className="font-bold text-slate-900 text-sm">{t.clientName}</span>
                       <div className="flex gap-0.5 text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                       </div>
                    </div>

                    {/* النص بخط صغير ومرتب */}
                    <p className="text-slate-600 text-[12px] md:text-sm leading-snug font-light italic pr-1">
                      "{t.feedback}"
                    </p>
                 </div>

               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 📞 9. CTA - التواصل النهائي */}
      <section id="contact" className="py-24 bg-blue-950 text-center relative overflow-hidden px-6 scroll-mt-20">
          <div className="relative z-10 max-w-5xl mx-auto">
             <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-tight">جاهز لبدء <br/><span className="text-yellow-500">مشروعك القادم؟</span></h2>
             <p className="text-blue-100/60 text-xl mb-16 max-w-2xl mx-auto font-light">نسعد دائماً بخدمتكم وتقديم الاستشارات الفنية المجانية لضمان نجاح مشاريعكم الإنشائية.</p>
             <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <Link href={`https://wa.me/${waNumber}`} target="_blank" className="w-full md:w-auto flex items-center justify-center gap-4 px-14 py-6 bg-green-600 text-white rounded-[2rem] font-black text-2xl shadow-[0_20px_50px_rgba(22,163,74,0.3)] hover:bg-green-500 transition-all hover:-translate-y-1 active:scale-95">
                 واتساب مباشر <MessageCircle size={28} />
               </Link>
               <Link href={`tel:${settings?.phone}`} className="w-full md:w-auto flex items-center justify-center gap-4 px-14 py-6 bg-white text-blue-950 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-slate-100 transition-all hover:-translate-y-1 active:scale-95">
                 اتصال هاتفي <Phone size={28} />
               </Link>
             </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500 rounded-full blur-[180px] opacity-10"></div>
      </section>

      {/* 🔘 الأزرار العائمة الذكية */}
      <FloatingActions settings={settings} />

      <Footer />
    </div>
  );
}