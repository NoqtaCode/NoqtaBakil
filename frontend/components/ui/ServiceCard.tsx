'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, X, MessageCircle, ArrowLeft } from 'lucide-react';

export default function ServiceCard({ service, index, waNumber }: { service: any, index: number, waNumber: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative bg-white p-5 md:p-10 rounded-2xl md:rounded-[3rem] shadow-sm md:shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-xl md:hover:shadow-[0_30px_60px_rgba(5,150,105,0.08)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center text-center md:items-start md:text-right hover:-translate-y-1"
      >
        <span className="hidden md:block absolute top-8 left-10 text-8xl font-black text-slate-50 group-hover:text-emerald-50 transition-colors duration-500 pointer-events-none select-none">
          0{index + 1}
        </span>

        <div className="relative z-10 w-full">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-[2rem] flex items-center justify-center mb-6 mx-auto md:mr-0 group-hover:bg-emerald-900 group-hover:shadow-2xl transition-all duration-500 shadow-inner border border-slate-100 group-hover:border-transparent">
            {service.iconUrl ? (
              <img src={service.iconUrl} alt={service.title} className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all" />
            ) : (
              <CheckCircle2 className="text-emerald-800 group-hover:text-amber-400 transition-colors w-7 h-7 md:w-10 md:h-10" />
            )}
          </div>

          <h3 className="text-base md:text-2xl font-black text-slate-800 mb-3 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-tight">
            {service.title}
          </h3>
          
          <p className="hidden md:block text-slate-500 leading-relaxed font-light text-base line-clamp-3">
            {service.description}
          </p>

          <span className="md:hidden text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1 opacity-80 justify-center">
            عرض التفاصيل <ArrowLeft size={12} />
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in slide-in-from-bottom-10 duration-500 border border-slate-100"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 left-6 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mt-4">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
                <CheckCircle2 className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 font-light">
                {service.description || "نقدم هذه الخدمة بأعلى معايير الجودة والاحترافية لضمان رضاكم التام."}
              </p>
              
              <Link 
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`أهلاً، أود الاستفسار عن خدمة: ${service.title}`)}`}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-[0_10px_20px_rgba(5,150,105,0.2)] hover:bg-emerald-700 transition-all active:scale-95"
              >
                <span>اطلب الخدمة الآن</span>
                <MessageCircle size={22} />
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}