import Link from "next/link";
import { 
  FolderKanban, 
  Plus, 
  Users, 
  Briefcase, 
  ArrowUpRight, 
  Image as ImageIcon,
  Settings as SettingsIcon,
  CheckCircle2
} from "lucide-react";
import { client } from "../../../lib/sanity";
import Image from "next/image";

export const revalidate = 0;

async function getStats() {
  const [projectsCount, servicesCount, testimonialsCount, latestProjects] = await Promise.all([
    client.fetch(`count(*[_type == "project"])`),
    client.fetch(`count(*[_type == "service"])`),
    client.fetch(`count(*[_type == "testimonial"])`),
    client.fetch(`*[_type == "project"] | order(_createdAt desc)[0...4] { _id, title, category, "imageUrl": mainImage.asset->url }`),
  ]);
  return { projectsCount, servicesCount, testimonialsCount, latestProjects };
}

export default async function DashboardHome() {
  const { projectsCount, servicesCount, testimonialsCount, latestProjects } = await getStats();

  return (
    <div className="pb-10 font-sans rtl">
      
      {/* 1. الترحيب (Banner) */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black mb-4">أهلاً بك يا ريس! 👋</h1>
            <p className="text-slate-400 text-lg max-w-md font-light">إليك ملخص سريع لأداء موقعك ومشاريعك الحالية اليوم.</p>
         </div>
         {/* خلفية جمالية */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-[80px] opacity-10"></div>
      </div>

      {/* 2. الإحصائيات (Quick Stats) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12">
        
        {/* بطاقة المشاريع */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <FolderKanban size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">إجمالي الأعمال</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mt-1">{projectsCount}</h3>
          </div>
        </div>

        {/* بطاقة الخدمات */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">خدماتنا</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mt-1">{servicesCount}</h3>
          </div>
        </div>

        {/* بطاقة الشهادات (تأخذ عرض كامل في الجوال) */}
        <div className="col-span-2 md:col-span-1 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition text-right">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">آراء العملاء</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mt-1">{testimonialsCount}</h3>
          </div>
        </div>

      </div>

      {/* 3. الوصول السريع (Quick Actions) */}
      <div className="mb-12">
         <h2 className="text-xl font-black text-slate-800 mb-6 px-2 flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" size={20} />
            إجراءات سريعة
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/projects/new" className="group bg-blue-600 text-white p-6 rounded-[2rem] flex items-center justify-between hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl"><Plus size={24} /></div>
                  <span className="font-black text-lg">إضافة مشروع جديد</span>
               </div>
               <ArrowUpRight className="opacity-50 group-hover:opacity-100 transition" />
            </Link>
            
            <Link href="/admin/settings" className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-blue-600 transition shadow-sm">
               <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:text-blue-600 transition"><SettingsIcon size={24} /></div>
                  <span className="font-black text-lg">تعديل الإعدادات</span>
               </div>
               <ArrowUpRight className="opacity-20 group-hover:opacity-100 text-blue-600 transition" />
            </Link>
         </div>
      </div>

      {/* 4. أحدث المشاريع (Recent Projects Table) */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-xl font-black text-slate-800">أحدث الأعمال المضافة</h2>
           <Link href="/admin/projects" className="text-blue-600 font-bold text-sm hover:underline">عرض الكل</Link>
        </div>
        
        <div className="space-y-4">
          {latestProjects.map((project: any) => (
            <div key={project._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200">
              <div className="flex items-center gap-4">
                 {project.imageUrl ? (
                   <Image src={project.imageUrl} alt={project.title} width={50} height={50} className="rounded-xl object-cover h-12 w-12 border" />
                 ) : <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>}
                 <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">{project.title}</h4>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">{project.category}</span>
                 </div>
              </div>
              <Link href={`/admin/projects`} className="p-2 text-slate-400 hover:text-blue-600 transition">
                 <ArrowUpRight size={20} />
              </Link>
            </div>
          ))}
          {latestProjects.length === 0 && <p className="text-center text-slate-400 py-10">لا توجد أعمال لعرضها</p>}
        </div>
      </div>

    </div>
  );
}