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
      "aboutUrl": aboutImage.asset->url
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
  const waNumber = settings?.whatsapp || "966537302795";

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
      <section id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-[#071827] px-4 pb-12 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:px-8 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(16,185,129,0.2),transparent_42%),radial-gradient(ellipse_at_85%_10%,rgba(245,158,11,0.15),transparent_34%),linear-gradient(135deg,#071827_0%,#0b2530_55%,#071827_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="order-1 w-full text-center lg:text-right">
            <span className="mb-5 inline-flex items-center rounded-full border border-amber-300/25 bg-white/5 px-4 py-2 text-sm font-bold text-amber-200 backdrop-blur-sm md:mb-7">
              جودة في التنفيذ وثقة في الإنجاز
            </span>
            <h1 className="mb-5 text-4xl font-black leading-[1.2] tracking-tight text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl">
              {settings?.heroTitle || "مقاولات"}
              <span className="mt-2 block bg-gradient-to-l from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {settings?.heroSubTitle || "عصرية متكاملة"}
              </span>
            </h1>

            <p className="mx-auto mb-7 max-w-2xl text-base font-medium leading-[1.9] text-slate-200 sm:text-lg md:mb-9 md:text-xl lg:mx-0 lg:text-2xl">
              {settings?.heroDescription || "نضع بين يديك خبرة سنوات في إنجاز أعقد المشاريع من شبوك، هناجر، زراعة النخيل، وواجهات الحجر الطبيعي، بدقة متناهية وجودة تفوق التوقعات."}
            </p>

            <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-lg md:flex-row md:gap-4 lg:mx-0 lg:justify-start">
              <Link href="#expertise" className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-5 py-3.5 text-base font-black text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300 md:w-auto md:px-6 lg:px-8 lg:text-lg">
                <span>استكشف أعمالنا</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition group-hover:bg-white group-hover:text-slate-950">
                  <ArrowDownRight size={18} />
                </span>
              </Link>
              <Link href="/contact" className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-base font-bold text-white shadow-lg backdrop-blur-md transition hover:border-white/40 hover:bg-white/15 md:w-auto md:px-6 lg:px-8 lg:text-lg">
                <PhoneCall size={18} />
                <span>اطلب استشارة مجانية</span>
              </Link>
            </div>
          </div>

          <div className="relative order-2 mx-auto w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[460px]">
            <div className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/20 via-transparent to-amber-400/20 blur-2xl" />
            <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:rounded-[2.5rem] sm:p-3">
              <Image
                src={settings?.heroUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"}
                alt="صورة من أعمال المؤسسة"
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 390px, 460px"
                className="rounded-[1.5rem] object-contain sm:rounded-[2rem]"
              />
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
      {testimonials?.length > 0 && <section className="py-20 lg:py-32 px-4 md:px-8 bg-slate-950 text-white relative overflow-hidden">
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
      </section>}

      {/* --- 5. MASSIVE CTA --- */}
      <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 px-5 py-16 text-center text-white sm:py-20 md:px-8 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-4xl">
           <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
             لنبني معًا <span className="text-amber-400">المشروع القادم!</span>
           </h2>
           <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:mb-10 md:text-xl">
             فريقنا مستعد لتلبية احتياجاتك. تواصل معنا للحصول على استشارة فنية وتسعيرة مجانية.
           </p>
           <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
             <Link href={`https://wa.me/${waNumber}`} target="_blank" className="flex min-h-14 flex-1 items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-base font-black text-slate-950 shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:bg-amber-300 active:scale-95 sm:text-lg">
                تواصل معنا عبر واتساب
             </Link>
             <Link href="/contact" className="flex min-h-14 flex-1 items-center justify-center rounded-full border border-white/40 bg-white/5 px-6 py-3 text-base font-bold text-white transition-all hover:-translate-y-1 hover:bg-white/10 active:scale-95 sm:text-lg">
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
