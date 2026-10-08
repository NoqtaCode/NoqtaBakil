import { safeFetch } from "../../../lib/sanity";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import GalleryPreview from "../../../components/GalleryPreview";
import Link from "next/link";
import { Home } from "lucide-react"; 

const getTitle = (cat: string) => {
  if (cat === 'all') return "معرض الأعمال الشامل";
  
  const titles: any = {
    shabouk: "ألبوم أعمال الشبوك والمزارع",
    nakheel: "ألبوم تنسيق الحدائق والنخيل",
    hanajer: "ألبوم الهناجر والمستودعات",
    sawater: "ألبوم السواتر والمظلات",
    hajar: "ألبوم أعمال الحجر الطبيعي",
  };
  return titles[cat] || "معرض الأعمال";
};

export default async function FullGalleryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const category = params.category;
  const isAll = category === 'all'; 

  const query = isAll 
    ? `*[_type == "project" && status == "published"] | order(_createdAt desc) {
        _id, title, "imageUrl": mainImage.asset->url
      }`
    : `*[_type == "project" && category == $category && status == "published"] | order(_createdAt desc) {
        _id, title, "imageUrl": mainImage.asset->url
      }`;

  const projects = await safeFetch(query, [], isAll ? {} : { category });

  const settings = await safeFetch(`*[_type == "settings"][0]{ siteName, whatsapp, "logoUrl": logo.asset->url }`, null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative" dir="rtl">
      <Navbar settings={settings} />

      {/* زر العودة العائم */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[150]">
         <Link 
           href={isAll ? "/" : `/#${category}`} 
           className="flex items-center gap-3 bg-emerald-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-amber-500 hover:text-emerald-950 transition-all duration-300 group border border-white/10 active:scale-95 animate-bounce"
         >
            <span className="font-bold text-sm md:text-base">العودة للرئيسية</span>
            <Home size={20} />
         </Link>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-32 md:py-40 w-full relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-right">
           <div>
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 border-r-0 md:border-r-8 border-amber-500 pr-0 md:pr-6 leading-tight tracking-tight">
               {getTitle(category)}
             </h1>
             <p className="text-slate-500 mt-4 font-bold text-lg">إجمالي الصور المتوفرة: <span className="text-emerald-700">{projects.length}</span></p>
           </div>
        </div>

        {projects.length > 0 ? (
           <GalleryPreview projects={projects} />
        ) : (
          <div className="text-center py-40 bg-white rounded-[3rem] text-slate-400 font-bold border-2 border-dashed border-slate-200 shadow-sm">
             لا توجد صور لعرضها في هذا القسم حالياً.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
