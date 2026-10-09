import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react"; 
import { safeFetch } from "../../../lib/sanity";
import { deleteProject } from "../../../actions/projects";
import DeleteButton from "../../../components/admin/DeleteButton";

export const revalidate = 0;

export default async function ProjectsList() {
  const projects = await safeFetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      category,
      status,
      "imageUrl": mainImage.asset->url
    }
  `, []);

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      shabouk: 'شبوك', 
      nakheel: 'نخيل', 
      hanajer: 'هناجر', 
      sawater: 'سواتر ومظلات', 
      hajar: 'حجر', 
      other: 'أخرى'
    };
    return names[cat] || 'عام';
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 px-2">
        <h1 className="text-2xl font-bold text-slate-800">إدارة المشاريع</h1>
        <Link href="/admin/projects/new" className="w-full md:w-auto bg-blue-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg">
          <Plus size={20} />
          <span>إضافة مشروع جديد</span>
        </Link>
      </div>

      {/* --- عرض الموبايل (كروت) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {projects.map((project: any) => (
          <div key={project._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            
            <div className="flex gap-4 items-center">
              {project.imageUrl ? (
                <Image src={project.imageUrl} alt={project.title} width={80} height={80} className="rounded-xl object-cover h-20 w-20 border" />
              ) : <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>}
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{project.title}</h3>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">
                  {getCategoryName(project.category)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
               <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {project.status === 'draft' ? '⏳ مسودة' : '✅ منشور'}
               </span>
               
               <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/projects/edit/${project._id}`} 
                    className="p-2 text-blue-600 bg-blue-50 rounded-lg"
                  >
                    <Pencil size={18} />
                  </Link>

                  <form action={async () => {
                      'use server';
                      await deleteProject(project._id);
                  }}>
                      <DeleteButton />
                  </form>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- عرض الكمبيوتر (جدول) --- */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">العنوان</th>
              <th className="p-4">القسم</th>
              <th className="p-4">الحالة</th>
              <th className="p-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project: any) => (
              <tr key={project._id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  {project.imageUrl && (
                    <Image src={project.imageUrl} alt={project.title} width={50} height={50} className="rounded-lg object-cover h-12 w-12 border" />
                  )}
                </td>
                <td className="p-4 font-bold text-gray-800">{project.title}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    {getCategoryName(project.category)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {project.status === 'draft' ? 'مسودة' : 'منشور'}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                   <Link 
                    href={`/admin/projects/edit/${project._id}`} 
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                    title="تعديل"
                   >
                    <Pencil size={18} />
                   </Link>

                   <form action={async () => {
                      'use server';
                      await deleteProject(project._id);
                   }}>
                      <DeleteButton />
                   </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {projects.length === 0 && (
          <div className="p-10 text-center text-gray-400 mt-4">
            لا توجد مشاريع مضافة حالياً.
          </div>
      )}
    </div>
  );
}
