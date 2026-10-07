'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryPreview({ projects }: { projects: any[] }) {
  const [index, setIndex] = useState(-1); // -1 يعني المغلق، وأي رقم آخر يفتح الصورة المقابلة

  // تجهيز الروابط للمكتبة
  const slides = projects.map((p) => ({ src: p.imageUrl }));

  return (
    <>
      {/* شبكة الصور */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
        {projects.map((p: any, i: number) => (
          <div 
            key={p._id} 
            onClick={() => setIndex(i)} // فتح الصورة عند الضغط
            className="group relative aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-sm cursor-pointer border border-slate-50"
          >
            <Image 
              src={p.imageUrl} 
              alt={p.title} 
              fill 
              className="object-cover transition duration-700 group-hover:scale-110" 
            />
            {/* طبقة تجميلية خفيفة */}
            <div className="absolute inset-0 bg-black/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-4">
               <p className="text-white font-bold text-xs md:text-lg drop-shadow-md">{p.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة التكبير (Lightbox) */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        // إعدادات إضافية لجعلها فخمة
        animation={{ fade: 500, swipe: 500 }}
      />
    </>
  );
}