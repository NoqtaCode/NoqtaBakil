import { client } from "../../../lib/sanity";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import GalleryPreview from "../../../components/GalleryPreview";
import Link from "next/link";
import { Home } from "lucide-react"; 

const getTitle = (cat: string) => {
  if (cat === 'all') return "معرض الأعمال الشامل"; // عنوان خاص لصفحة الكل
  
  const titles: any = {
    shabouk: "ألبوم أعمال الشبوك والمزارع",
    nakheel: "ألبوم تنسيق الحدائق والنخيل",
    hajar: "ألبوم أعمال الحجر الطبيعي",
  };
  return titles[cat] || "معرض الأعمال";
};

export default async function FullGalleryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const category = params.category;
  const isAll = category === 'all'; // هل الزائر طلب "كل الصور"؟

  // 1. تحديد الاستعلام المناسب (جلب الكل أو جلب قسم محدد)
  const query = isAll 
    ? `*[_type == "project" && status == "published"] | order(_createdAt desc) {
        _id, title, "imageUrl": mainImage.asset->url
      }`
    : `*[_type == "project" && category == $category && status == "published"] | order(_createdAt desc) {
        _id, title, "imageUrl": mainImage.asset->url
      }`;

  // 2. تنفيذ الاستعلام
  const projects = await client.fetch(query, isAll ? {} : { category });

  // 3. جلب الإعدادات (لكي يظهر اللوجو في النيفبار)
  const settings = await client.fetch(`*[_type == "settings"][0]{ siteName, whatsapp, "logoUrl": logo.asset->url }`);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative" dir="rtl">
      <Navbar settings={settings} />

      {/* زر العودة العائم */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[150]">
         <Link 
           href={isAll ? "/" : `/#${category}`} // إذا كان في المعرض الشامل يرجع لأعلى الصفحة
           className="flex items-center gap-3 bg-blue-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-yellow-500 hover:text-blue-950 transition-all duration-300 group border border-white/10 active:scale-95 animate-bounce"
         >
            <span className="font-bold text-sm md:text-base">العودة للرئيسية</span>
            <Home size={20} />
         </Link>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-right">
           <div>
             <h1 className="text-3xl md:text-5xl font-black text-slate-900 border-r-0 md:border-r-8 border-yellow-500 pr-0 md:pr-4 leading-tight">
               {getTitle(category)}
             </h1>
             <p className="text-slate-500 mt-2 font-medium">عدد الصور: {projects.length}</p>
           </div>
        </div>

        {projects.length > 0 ? (
          <div className="bg-slate-50 p-4 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-inner">
             <GalleryPreview projects={projects} />
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50 rounded-[3rem] text-slate-400 font-bold border-2 border-dashed">
             لا توجد صور لعرضها حالياً
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}