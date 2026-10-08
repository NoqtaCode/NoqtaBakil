import Link from "next/link";
import { Plus, Briefcase, Pencil } from "lucide-react"; // Added Pencil
import { safeFetch } from "../../../lib/sanity";
import { deleteService } from "./actions";
import DeleteButton from "./DeleteButton";

export const revalidate = 0;

export default async function ServicesAdmin() {
  const services = await safeFetch(`*[_type == "service"] | order(_createdAt desc)`, []);

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          إدارة الخدمات
        </h1>
        <Link href="/admin/services/new" className="bg-blue-600 text-white p-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <Plus size={20} />
          <span>إضافة خدمة</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service: any) => (
          <div key={service._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start justify-between">
            <div className="flex items-start gap-4">
               <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Briefcase size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-lg text-slate-800">{service.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1">{service.description}</p>
               </div>
            </div>
            
            {/* Added Flex container for Actions */}
            <div className="flex items-center gap-2">
              <Link 
                href={`/admin/services/edit/${service._id}`} 
                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                title="تعديل"
              >
                <Pencil size={18} />
              </Link>
              <form action={deleteService.bind(null, service._id)}>
                 <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 border-2 border-dashed">
          لا توجد خدمات مضافة حالياً
        </div>
      )}
    </div>
  );
}
