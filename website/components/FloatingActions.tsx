'use client';

import { MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function FloatingActions({ settings }: { settings: any }) {
  const waNumber = settings?.whatsapp || "966500000000";
  const phone = settings?.phone || "0500000000";

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-[100] md:bottom-10 md:left-10">
      
      {/* زر الاتصال الهاتفي */}
      <Link 
        href={`tel:${phone}`}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all duration-300 hover:scale-110 active:scale-90 border border-white/20"
      >
        <PhoneCall size={24} className="md:w-7 md:h-7" />
        {/* نص يظهر عند التحويم في الكمبيوتر */}
        <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          اتصال مباشر
        </span>
      </Link>

      {/* زر الواتساب مع تأثير النبض */}
      <Link 
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 text-white rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:bg-green-600 transition-all duration-300 hover:scale-110 active:scale-90 border border-white/20"
      >
        {/* تأثير النبض الخارجي */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
        
        <MessageCircle size={28} className="md:w-8 md:h-8" />
        
        {/* نص يظهر عند التحويم في الكمبيوتر */}
        <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          تحدث معنا واتساب
        </span>
      </Link>

    </div>
  );
}