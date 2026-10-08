import Link from "next/link";
import Image from "next/image";
import { Plus, ImageIcon } from "lucide-react";
import { safeFetch } from "../../../lib/sanity";
import { deleteGalleryImage } from "./actions";
import DeleteButton from "./DeleteButton"; // تأكد من وجود ملف DeleteButton.tsx بجانبه

export const revalidate = 0;

export default async function AdminGallery() {
  // جلب الصور مع منع التخزين المؤقت لضمان ظهور الصور فور رفعها
  const images = await safeFetch(
    `*[_type == "gallery"] | order(_createdAt desc) {
      _id,
      category,
      "url": image.asset->url
    }`,
    [],
  );

  // دالة لترجمة الأكواد لأسماء عربية
  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      shabouk: 'شبوك',
      nakheel: 'نخيل',
      hanajer: 'هناجر',
      sawater: 'سواتر ومظلات',
      hajar: 'حجر'
    };
    return labels[cat] || 'عام';
  };

  return (
    <div className="pb-20">
      {/* 1. رأس الصفحة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ImageIcon className="text-blue-600" />
          معرض الصور
        </h1>
        <Link 
          href="/admin/gallery/new" 
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>رفع صور جديدة</span>
        </Link>
      </div>

      {/* 2. شبكة الصور */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {images.map((img: any) => (
          <div key={img._id} className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-md">
            
            {/* عرض الصورة */}
            <Image 
              src={img.url} 
              alt="Gallery" 
              fill 
              className="object-cover transition duration-500 group-hover:scale-110" 
            />
            
            {/* ملصق التصنيف */}
            <div className="absolute top-2 right-2 px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] md:text-xs text-white rounded-full font-bold">
               {getCategoryLabel(img.category)}
            </div>

            {/* طبقة الحذف (تظهر عند تمرير الماوس في الكمبيوتر) */}
            <div className="hidden md:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
               <form action={deleteGalleryImage.bind(null, img._id)}>
                  <DeleteButton />
               </form>
            </div>

            {/* زر الحذف في الجوال (يظهر دائماً في زاوية الصورة) */}
            <div className="md:hidden absolute bottom-2 left-2">
                <form action={deleteGalleryImage.bind(null, img._id)}>
                  <DeleteButton />
                </form>
            </div>

          </div>
        ))}
      </div>

      {/* 3. حالة المعرض الفارغ */}
      {images.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
           <ImageIcon size={60} className="mx-auto text-gray-200 mb-4" />
           <h3 className="text-gray-400 font-bold text-lg">المعرض لا يحتوي على صور</h3>
           <p className="text-gray-300 text-sm mt-1">ابدأ برفع صور أعمالك ليراها الزبائن</p>
        </div>
      )}
    </div>
  );
}
