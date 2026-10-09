import Link from "next/link";
import { Plus, Users, Quote, Pencil } from "lucide-react"; // أضفنا Pencil هنا
import { safeFetch } from "../../../lib/sanity";
import { deleteTestimonial } from "../../../actions/testimonials";
import DeleteButton from "../../../components/admin/DeleteButton";

export const revalidate = 0;

export default async function TestimonialsAdmin() {
  const testimonials = await safeFetch(`*[_type == "testimonial"] | order(_createdAt desc)`, []);

  return (
    <div className="pb-20 pt-4">
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-blue-600" />
          إدارة آراء العملاء
        </h1>
        <Link href="/admin/testimonials/new" className="bg-blue-600 text-white p-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          <span>إضافة رأي جديد</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t: any) => (
          <div key={t._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
               <Quote className="text-blue-100 mb-2" size={32} />
               <p className="text-slate-600 italic leading-relaxed">"{t.feedback}"</p>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
               <span className="font-bold text-blue-900">{t.clientName}</span>
               
               {/* أزرار التحكم: تعديل وحذف */}
               <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/testimonials/edit/${t._id}`} 
                    className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    title="تعديل"
                  >
                    <Pencil size={18} />
                  </Link>

                  <form action={deleteTestimonial.bind(null, t._id)}>
                    <DeleteButton />
                  </form>
               </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[2rem] text-gray-400 border-2 border-dashed">
          لا توجد شهادات عملاء حالياً.. ابدأ بإضافة أول رأي!
        </div>
      )}
    </div>
  );
}
