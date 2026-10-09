'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryPreview({ projects }: { projects: any[] }) {
  const [index, setIndex] = useState(-1);

  const slides = projects.map((p) => ({ src: p.imageUrl }));

  // نحدد شكل الشبكة بناءً على عدد الصور الممررة
  // إذا كانت 4 صور فقط (كما في الصفحة الرئيسية)، نجعلها 2x2
  // غير ذلك، نجعلها 2 و 3 في الأجهزة الأكبر
  const gridClass = projects.length === 4 
    ? "grid grid-cols-2 gap-3 md:gap-5" 
    : "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6";

  return (
    <>
      <div className={gridClass}>
        {projects.map((p: any, i: number) => (
          <div 
            key={p._id} 
            onClick={() => setIndex(i)}
            className="group relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm cursor-pointer border border-slate-100"
          >
            <Image 
              src={p.imageUrl} 
              alt={p.title} 
              fill 
              className="object-cover transition duration-1000 group-hover:scale-110" 
              unoptimized
            />
            {/* طبقة تجميلية - تأثير متطور */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-bold text-sm md:text-lg leading-tight">{p.title}</p>
               </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        animation={{ fade: 500, swipe: 500 }}
      />
    </>
  );
}
