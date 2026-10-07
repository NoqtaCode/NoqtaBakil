'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, X, MessageCircle, ArrowLeft } from 'lucide-react';

// أضفنا waNumber هنا لكي يستقبله المكون من الصفحة الرئيسية
export default function ServiceCard({ service, index, waNumber }: { service: any, index: number, waNumber: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- الكرت الصغير في الشبكة --- */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative bg-white p-5 md:p-12 rounded-2xl md:rounded-[3.5rem] shadow-sm md:shadow-[0_30px_100px_rgba(0,0,0,0.03)] border border-slate-50 hover:shadow-md md:hover:shadow-[0_40px_120px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center text-center md:items-start md:text-right"
      >
        {/* رقم الخدمة في الخلفية (كمبيوتر فقط) */}
        <span className="hidden md:block absolute top-8 left-10 text-8xl font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 pointer-events-none select-none">
          0{index + 1}
        </span>

        <div className="relative z-10 w-full">
          {/* الأيقونة */}
          <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-[2rem] flex items-center justify-center mb-4 md:mb-10 mx-auto md:mr-0 group-hover:bg-blue-900 group-hover:shadow-2xl transition-all duration-500 shadow-inner">
            {service.iconUrl ? (
              <img src={service.iconUrl} alt={service.title} className="w-6 h-6 md:w-10 md:h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all" />
            ) : (
              <CheckCircle2 className="text-blue-900 group-hover:text-yellow-500 transition-colors w-6 h-6 md:w-8 md:h-8" />
            )}
          </div>

          {/* العنوان */}
          <h3 className="text-sm md:text-3xl font-black text-slate-800 mb-2 md:mb-6 group-hover:text-blue-900 transition-colors line-clamp-2 leading-tight">
            {service.title}
          </h3>
          
          {/* الوصف (يظهر فقط في الكمبيوتر) */}
          <p className="hidden md:block text-slate-500 leading-relaxed font-light text-lg">
            {service.description}
          </p>

          {/* تنبيه صغير للجوال */}
          <span className="md:hidden text-[9px] text-blue-500 font-bold mt-2 flex items-center gap-1 opacity-70 justify-center">
            اضغط للتفاصيل <ArrowLeft size={10} />
          </span>
        </div>
      </div>

      {/* --- النافذة المنبثقة (Modal) للوصف --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* زر الإغلاق */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mt-4">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="text-blue-600" size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 font-light">
                {service.description || "نقدم هذه الخدمة بأعلى معايير الجودة والاحترافية لضمان رضاكم التام."}
              </p>
              
              {/* ✅ الزر الآن يستخدم الرقم الديناميكي الممرر من لوحة التحكم */}
              <Link 
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`أهلاً، أود الاستفسار عن خدمة: ${service.title}`)}`}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95"
              >
                <span>اطلب الخدمة الآن</span>
                <MessageCircle size={22} />
              </Link>
            </div>
          </div>
          {/* إغلاق عند الضغط على الخلفية */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}