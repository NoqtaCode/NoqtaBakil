import { safeFetch } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import GalleryPreview from "../components/GalleryPreview";

import {
  ArrowLeft,
  ArrowDownRight,
  Sparkles,
  PhoneCall,
  BriefcaseBusiness,
  Star,
  Quote
} from "lucide-react";

export const revalidate = 10;

async function getData() {
  try {
    const settingsPromise = safeFetch(`*[_type == "settings"][0]{
      siteName, whatsapp, phone, email, address, description,
      heroTitle, heroSubTitle, heroDescription,
      "logoUrl": logo.asset->url,
      "heroUrl": heroImage.asset->url,
      "aboutUrl": aboutImage.asset->url,
      "ctaImageUrl": ctaImage.asset->url
    }`, null);

    const testimonialsPromise = safeFetch(`*[_type == "testimonial" && isActive == true]{_id, clientName, feedback}`, []);
    
    const shaboukPromise = safeFetch(`*[_type == "project" && category == "shabouk" && status == "published"] | order(_createdAt desc)[0...4]{_id, title, "imageUrl": mainImage.asset->url}`, []);
    const nakheelPromise = safeFetch(`*[_type == "project" && category == "nakheel" && status == "published"] | order(_createdAt desc)[0...4]{_id, title, "imageUrl": mainImage.asset->url}`, []);
    const hajarPromise = safeFetch(`*[_type == "project" && category == "hajar" && status == "published"] | order(_createdAt desc)[0...4]{_id, title, "imageUrl": mainImage.asset->url}`, []);
    const hanajerPromise = safeFetch(`*[_type == "project" && category == "hanajer" && status == "published"] | order(_createdAt desc)[0...4]{_id, title, "imageUrl": mainImage.asset->url}`, []);
    const sawaterPromise = safeFetch(`*[_type == "project" && category == "sawater" && status == "published"] | order(_createdAt desc)[0...4]{_id, title, "imageUrl": mainImage.asset->url}`, []);

    const [settings, testimonials, shabouk, nakheel, hajar, hanajer, sawater] = await Promise.all([
      settingsPromise, testimonialsPromise, shaboukPromise, nakheelPromise, hajarPromise, hanajerPromise, sawaterPromise
    ]);

    return { settings, testimonials, shabouk, nakheel, hajar, hanajer, sawater };
  } catch (error) {
    console.error("Fetch failed:", error);
    return {
      settings: null, testimonials: [], shabouk: [], nakheel: [], hajar: [], hanajer: [], sawater: [],
    };
  }
}

export default async function Home() {
  const data = await getData();
  const { settings, testimonials, shabouk, nakheel, hajar, hanajer, sawater } = data;
  const waNumber = settings?.whatsapp || "966500000000";

  const sections = [
    {
      id: "shabouk",
      title: "أعمال الشبوك",
      desc: "تسوير وحماية المزارع والأراضي بأعلى معايير الأمان باستخدام شبوك مجلفنة مقاومة للعوامل الجوية.",
      projects: shabouk,
      color: "from-blue-600 to-indigo-900",
      accent: "text-blue-500",
      bg: "bg-slate-50"
    },
    {
      id: "nakheel",
      title: "تنسيق النخيل",
      desc: "نحول مساحتك إلى واحة خضراء. توريد وزراعة كافة أنواع النخيل بأيدي خبراء زراعيين.",
      projects: nakheel,
      color: "from-emerald-500 to-green-900",
      accent: "text-emerald-500",
      bg: "bg-white"
    },
    {
      id: "hanajer",
      title: "الهناجر والمستودعات",
      desc: "حلول إنشائية معدنية متكاملة. تصميم وتشييد الهناجر والمصانع وفق أدق الحسابات الهندسية لضمان أقصى اتساع وأمان.",
      projects: hanajer,
      color: "from-slate-600 to-slate-900",
      accent: "text-slate-600",
      bg: "bg-slate-50"
    },
    {
      id: "sawater",
      title: "سواتر ومظلات",
      desc: "حماية من الشمس بأناقة. تركيب مظلات السيارات والسواتر الجدارية بتصاميم عصرية ومواد عالية الجودة.",
      projects: sawater,
      color: "from-amber-500 to-orange-700",
      accent: "text-amber-500",
      bg: "bg-white"
    },
    {
      id: "hajar",
      title: "الحجر الطبيعي",
      desc: "واجهات تعكس الفخامة والأصالة. تنفيذ أعمال الحجر الطبيعي للفلل والقصور بتصاميم هندسية دقيقة تدوم طويلاً.",
      projects: hajar,
      color: "from-stone-500 to-stone-800",
      accent: "text-stone-500",
      bg: "bg-stone-50"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-amber-400 selection:text-black overflow-x-hidden w-full" dir="rtl">
      <Navbar settings={settings} />

      {/* --- 1. HERO SECTION --- */}
      <section id="home" className="relative min-h-[100svh] pt-32 lg:pt-40 pb-20 px-4 md:px-8 flex items-center bg-[#0a0a0a] overflow-hidden w-full">
        <Image
          src={settings?.heroUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#071827]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/45 via-transparent to-[#071827]/25" />
        <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-center">
          <div className="w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm mb-6 lg:mb-8">
              <Sparkles className="text-amber-400" size={16} />
              <span className="text-white font-bold text-xs lg:text-sm tracking-widest uppercase">رؤية هندسية مبتكرة</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.15] tracking-tight mb-6 lg:mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              {settings?.heroTitle || "مقاولات"}<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 via-amber-400 to-amber-500 block mt-2">
                {settings?.heroSubTitle || "عصرية متكاملة"}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-2xl text-white font-medium leading-[1.8] max-w-4xl mx-auto mb-10 lg:mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {settings?.heroDescription || "نضع بين يديك خبرة سنوات في إنجاز أعقد المشاريع من شبوك، هناجر، زراعة النخيل، وواجهات الحجر الطبيعي، بدقة متناهية وجودة تفوق التوقعات."}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mx-auto">
              <Link href="#expertise" className="group flex items-center justify-center sm:justify-between gap-4 lg:gap-6 px-6 lg:px-8 py-4 lg:py-5 bg-white text-black rounded-full font-black text-base lg:text-lg hover:bg-amber-400 transition-all duration-300 w-full sm:w-auto">
                 <span>استكشف أعمالنا</span>
                 <div className="w-8 h-8 lg:w-10 lg:h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                   <ArrowDownRight size={18} />
                 </div>
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-3 px-6 lg:px-8 py-4 lg:py-5 border border-white/20 text-white rounded-full font-bold text-base lg:text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                 <PhoneCall size={18} />
                 <span>اطلب استشارة مجانية</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. ABOUT STATEMENT --- */}
      <section className="py-20 lg:py-32 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-center text-center md:text-right">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-6 lg:gap-8">
             <div className="w-20 h-20 lg:w-24 lg:h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2">
               <BriefcaseBusiness size={36} className="lg:w-10 lg:h-10" />
             </div>
             <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">شريكك الموثوق <br className="hidden md:block" />في كل بناء وتأسيس.</h2>
             <Link href="/about" className="inline-flex items-center justify-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
               اقرأ قصتنا <ArrowLeft size={18} />
             </Link>
          </div>
          <div className="w-full md:w-2/3 md:border-r-4 border-slate-100 md:pr-8 lg:pr-16 pt-6 md:pt-0 border-t-4 md:border-t-0 border-slate-100/50">
             <p className="text-xl lg:text-4xl font-light text-slate-500 leading-[1.7] lg:leading-[1.8]">
               نحن لا نبني مجرد هياكل، بل نؤسس <span className="font-bold text-slate-900">حلولاً هندسية مستدامة</span>. من الشبوك الأمنية، للهناجر الضخمة، لتنسيق النخيل والحجر الفاخر، نجمع بين <span className="text-amber-500 font-bold border-b-2 border-amber-200">الدقة المطلقة</span> والجمال.
             </p>
          </div>
        </div>
      </section>

      {/* --- 3. THE ZIG-ZAG EXPERTISE SECTIONS --- */}
      <section id="expertise" className="relative overflow-hidden w-full">
        {sections.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          
          return (
            <div key={sec.id} id={sec.id} className={`py-16 lg:py-36 px-4 md:px-8 ${sec.bg} border-b border-slate-200/50 w-full`}>
              <div className={`max-w-7xl mx-auto flex flex-col gap-10 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* Text Content */}
                <div className="w-full lg:w-5/12 flex flex-col items-center text-center lg:items-start lg:text-right relative">
                   {/* Background Number */}
                   <div className="text-[5rem] lg:text-[8rem] font-black text-slate-100 leading-none mb-[-2rem] lg:mb-[-3rem] select-none -z-10 absolute lg:relative top-0 lg:top-auto opacity-50 lg:opacity-100">
                     0{idx + 1}
                   </div>
                   
                   <h3 className="text-3xl lg:text-6xl font-black text-slate-900 mb-4 lg:mb-8 tracking-tight relative z-10 pt-4 lg:pt-0">
                     {sec.title}
                   </h3>
                   <p className="text-base lg:text-2xl text-slate-500 font-light leading-[1.7] lg:leading-[1.8] mb-8 lg:mb-10 max-w-lg relative z-10">
                     {sec.desc}
                   </p>
                   
                   <div className="grid grid-cols-2 gap-3 lg:gap-4 w-full max-w-sm lg:max-w-full mb-8 lg:mb-10 relative z-10">
                      <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-center items-center lg:items-start">
                         <span className={`block text-xl lg:text-2xl font-black mb-1 ${sec.accent}`}>متانة</span>
                         <span className="text-xs lg:text-sm text-slate-500 font-bold">مواد معتمدة</span>
                      </div>
                      <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-center items-center lg:items-start">
                         <span className={`block text-xl lg:text-2xl font-black mb-1 ${sec.accent}`}>ضمان</span>
                         <span className="text-xs lg:text-sm text-slate-500 font-bold">تنفيذ دقيق</span>
                      </div>
                   </div>

                   <Link href={`/projects/${sec.id}`} className="inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all duration-300 w-full sm:w-auto relative z-10">
                      تصفح الألبوم الكامل <ArrowLeft size={18} />
                   </Link>
                </div>

                {/* Visual / Projects Grid */}
                <div className="w-full lg:w-7/12 relative mt-8 lg:mt-0">
                   {sec.projects.length > 0 ? (
                     <div className="bg-white p-3 lg:p-8 rounded-[1.5rem] lg:rounded-[3rem] shadow-[0_15px_30px_rgba(0,0,0,0.04)] lg:shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate-100 relative z-10">
                        <GalleryPreview projects={sec.projects.slice(0, 4)} />
                     </div>
                   ) : (
                     <div className="aspect-video bg-slate-100 rounded-[1.5rem] lg:rounded-[3rem] flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400 font-bold text-lg lg:text-xl relative z-10">
                        سيتم إضافة الصور قريباً
                     </div>
                   )}
                   {/* Decorative gradient blob */}
                   <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-tr ${sec.color} opacity-5 lg:opacity-5 blur-[60px] lg:blur-[100px] -z-0 pointer-events-none`}></div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* --- 4. TESTIMONIALS --- */}
      <section className="py-20 lg:py-32 px-4 md:px-8 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-20 gap-6 text-center lg:text-right">
            <div>
               <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black tracking-tight mb-4">آراء شركاء النجاح</h2>
               <p className="text-base lg:text-xl text-slate-400 font-light max-w-xl mx-auto lg:mx-0">شهادات نعتز بها من عملاء وثقوا بنا في تنفيذ مشاريعهم الكبرى، فكانت النتيجة إنجازاً يفوق التوقعات.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t: any) => (
              <div key={t._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] hover:bg-white/10 transition-colors">
                <Quote className="text-amber-500 mb-4 lg:mb-6" size={36} />
                <p className="text-slate-300 text-base lg:text-xl font-light leading-relaxed mb-6 lg:mb-8 min-h-[80px] lg:min-h-[100px]">"{t.feedback}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-black text-lg lg:text-xl border border-white/20 shrink-0">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base lg:text-lg">{t.clientName}</h4>
                    <div className="flex gap-1 text-amber-500 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MASSIVE CTA --- */}
      <section id="contact" className="min-h-[600px] flex items-center justify-center py-20 sm:py-24 lg:py-32 px-5 md:px-8 bg-slate-950 text-white text-center relative isolate overflow-hidden">
        {settings?.ctaImageUrl && (
          <>
            <Image src={settings.ctaImageUrl} alt="" fill unoptimized sizes="100vw" className="object-cover object-left lg:object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/85" />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/60 via-transparent to-slate-950/30" />
          </>
        )}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 w-full">
           <h2 className="text-4xl sm:text-5xl lg:text-[6rem] font-black leading-[1.2] mb-5 sm:mb-7 lg:mb-8 tracking-tight drop-shadow-lg">
             لنبني معًا <br /><span className="text-amber-400">المشروع القادم!</span>
           </h2>
           <p className="text-base sm:text-xl lg:text-3xl font-medium leading-relaxed mb-8 sm:mb-10 lg:mb-14 text-white/90 drop-shadow-md max-w-2xl mx-auto">
             فريقنا مستعد لتلبية احتياجاتك، تواصل الآن للحصول على استشارة فنية وتسعيرة مجانية.
           </p>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-full max-w-2xl mx-auto">
             <Link href={`https://wa.me/${waNumber}`} target="_blank" className="w-full md:w-auto md:min-w-64 px-7 lg:px-12 py-4 lg:py-5 bg-amber-400 text-slate-950 rounded-full font-black text-base sm:text-lg lg:text-xl hover:bg-amber-300 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center">
                تواصل عبر واتساب
             </Link>
             <Link href="/contact" className="w-full md:w-auto md:min-w-64 px-7 lg:px-12 py-4 lg:py-5 bg-white/10 backdrop-blur-sm border border-white/50 text-white rounded-full font-black text-base sm:text-lg lg:text-xl hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center">
                تصفح معلومات الاتصال
             </Link>
           </div>
        </div>
      </section>

      <FloatingActions settings={settings} />
      <Footer />
    </div>
  );
}
