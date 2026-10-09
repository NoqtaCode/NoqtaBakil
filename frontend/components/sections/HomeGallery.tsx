'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function HomeGallery({ images }: { images: any[] }) {
  const [index, setIndex] = useState(-1);
  const slides = images.map((img) => ({ src: img.url }));

  if (images.length === 0) return null;

  return (
    <div className="w-full">
      {/* شبكة البنتو (Bento Grid) الفاخرة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-[400px] md:h-[500px]">
        
        {/* الصورة الأولى (الكبيرة - الماستر) */}
        {/* في الجوال تأخذ العرض كامل (col-span-2)، في الكمبيوتر تأخذ النصف (col-span-2) */}
        <div 
          onClick={() => setIndex(0)}
          className="relative col-span-2 md:col-span-2 row-span-2 rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg"
        >
          <Image 
            src={images[0]?.url} 
            alt="Main Project" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <div className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <ZoomIn className="text-white w-6 h-6" />
             </div>
          </div>
        </div>

        {/* الصورة الثانية (مربع علوي يمين في الكمبيوتر / مربع يسار في الجوال) */}
        {images.length > 1 && <div
          onClick={() => setIndex(1)}
          className="relative col-span-1 md:col-span-2 row-span-1 rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg"
        >
          <Image 
            src={images[1]?.url} 
            alt="Project 2" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        </div>}

        {/* الصورة الثالثة (مربع سفلي يمين في الكمبيوتر / مربع يمين في الجوال) */}
        {images.length > 2 && <div
          onClick={() => setIndex(2)}
          className="relative col-span-1 md:col-span-2 row-span-1 rounded-[2rem] overflow-hidden cursor-pointer group shadow-lg"
        >
          <Image 
            src={images[2]?.url} 
            alt="Project 3" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            unoptimized
          />
          {/* طبقة شفافة تظهر "+ المزيد" إذا كان هناك صور أكثر، أو تجميلية */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-4">
             <span className="text-white text-xs font-bold md:hidden">مشاهدة</span>
          </div>
        </div>}

      </div>

      {/* زر عرض المزيد */}
      <div className="mt-10 text-center">
        <Link 
          href="/projects/all" // أو الرابط الذي تريده للمعرض الكامل
          className="inline-flex items-center gap-3 bg-white/5 border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all shadow-xl"
        >
          <span>تصفح المعرض الكامل</span>
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* عارض الصور (Lightbox) */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        animation={{ fade: 300 }}
      />
    </div>
  );
}
