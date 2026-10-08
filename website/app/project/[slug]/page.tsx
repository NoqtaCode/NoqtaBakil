import { safeFetch } from "./../../../lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// دالة جلب البيانات
async function getProject(slug: string) {
  const query = `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      description,
      "imageUrl": mainImage.asset->url,
      _createdAt
    }
  `;
  const project = await safeFetch(query, null, { slug });
  return project;
}

export default async function ProjectDetails(props: { params: Promise<{ slug: string }> }) {
  
  const params = await props.params;
  const decodedSlug = decodeURIComponent(params.slug); 
  const project = await getProject(decodedSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* 1. الشريط العلوي (زر العودة) */}
      <div className="max-w-4xl mx-auto px-4 pt-8 mb-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-bold">
           <span>&rarr;</span>
           العودة للقائمة الرئيسية
        </Link>
      </div>

      {/* 2. كرت المشروع (Container) */}
      <main className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* الصورة الرئيسية للمشروع */}
        {project.imageUrl && (
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority 
              unoptimized
            />
            {/* تدرج لوني خفيف فوق الصورة ليبرز العنوان */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* العنوان يظهر فوق الصورة في الأسفل */}
            <div className="absolute bottom-0 right-0 p-8 w-full">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                {project.title}
              </h1>
              <p className="text-gray-300 text-sm">
                تاريخ التنفيذ: {new Date(project._createdAt).toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>
        )}

        {/* محتوى النص */}
        <div className="p-8 md:p-12">
          
          {/* الوصف */}
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-r-4 border-blue-500 pr-4">
              تفاصيل العمل
            </h3>
            <p className="text-gray-600 leading-loose text-lg whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* خط فاصل */}
          <hr className="my-10 border-gray-200" />

          {/* قسم اتخاذ الإجراء (CTA) */}
          <div className="bg-blue-50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-xl text-blue-900 mb-1">هل أعجبك هذا التشطيب؟</h3>
              <p className="text-gray-600 text-sm">نحن مستعدون لتنفيذ مشروعك بنفس الجودة.</p>
            </div>
            
            <Link 
              href="https://wa.me/966537302795"
              target="_blank"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg transform hover:scale-105"
            >
              {/* أيقونة واتساب بسيطة */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              تواصل معنا واتساب
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
