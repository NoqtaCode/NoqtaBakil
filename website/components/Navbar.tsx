'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";

interface NavbarProps {
  settings?: {
    siteName?: string;
    whatsapp?: string;
    logoUrl?: string;
  }
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const siteName = settings?.siteName || "مقاول شبوك";
  const waNumber = settings?.whatsapp || "966500000000";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  // روابط أقسام الأعمال المنسدلة (توجه للقسم المخصص في الصفحة الرئيسية)
  const projectSubLinks = [
    { name: 'أعمال الشبوك ', href: '/#shabouk', icon: '' },
    { name: 'اعمال النخيل', href: '/#nakheel', icon: '' },
    { name: 'أعمال الحجر ', href: '/#hajar', icon: '' },
  ];

  return (
    <>
      {/* الهيدر الرئيسي */}
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2 md:py-3' : 'bg-transparent py-5 md:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-center">
            
            {/* [يسار] زر تواصل سريع (كمبيوتر) */}
            <div className="hidden md:flex order-1">
               <Link href={`https://wa.me/${waNumber}`} target="_blank" className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-lg text-sm">
                  <MessageCircle size={18} />
                  <span>تواصل سريع</span>
               </Link>
            </div>

            {/* [يسار] زر القائمة للجوال */}
            <button onClick={() => setIsOpen(true)} className="md:hidden p-2 order-1 transition-transform active:scale-90">
               <Menu size={32} className={scrolled ? 'text-slate-800' : 'text-white'} />
            </button>

            {/* [وسط] الروابط الرئيسية المحدثة كصفحات مستقلة */}
            <div className="hidden md:flex items-center gap-8 order-2 font-bold text-sm lg:text-base">
              <Link href="/#home" className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>الرئيسية</Link>
              
              <Link href="/about" className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>من نحن</Link>
              
              <div className="relative group cursor-pointer" onMouseEnter={() => setIsProjectsOpen(true)} onMouseLeave={() => setIsProjectsOpen(false)}>
                <div className={`flex items-center gap-1 transition-colors ${scrolled ? 'text-slate-600 group-hover:text-blue-900' : 'text-white/90 group-hover:text-white'}`}>
                  أعمالنا <ChevronDown size={16} />
                </div>
                <div className={`absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 transform transition-all duration-300 ${isProjectsOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
                  {projectSubLinks.map((sub) => (
                    <Link key={sub.name} href={sub.href} className="flex items-center gap-3 p-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-blue-900 transition-all">
                      <span className="text-xl">{sub.icon}</span>
                      <span className="text-sm font-bold">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/services" className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>الخدمات</Link>
              <Link href="/gallery" className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>المعرض</Link>
              <Link href="/contact" className={`transition-colors ${scrolled ? 'text-slate-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>تواصل معنا</Link>
            </div>

            {/* [يمين] الشعار الكامل */}
            <div className="flex-shrink-0 order-3">
              <Link href="/#home" className="flex items-center gap-3 group">
                <div className="flex flex-col text-right">
                  <span className={`text-[16px] md:text-2xl font-black leading-tight transition-colors duration-300 ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                    {siteName.split(" ")[0]} <span className="text-yellow-500">{siteName.split(" ").slice(1).join(" ")}</span>
                  </span>
                  <span className={`text-[12px] md:text-[15px] font-bold tracking-tighter transition-colors duration-300 ${scrolled ? 'text-slate-500' : 'text-white/90'}`}>
                    وسياجات أمنية
                  </span>
                </div>
                <div className="relative w-10 h-10 md:w-14 md:h-14 transition-transform group-hover:scale-110">
                  <Image src="/icon.png" alt="Logo" fill className="object-contain" priority />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* --- القائمة الجانبية (Mobile Sidebar) المحدثة بالروابط الجديدة --- */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[120] shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} dir="rtl">
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-between items-center border-b border-slate-50">
             <div className="flex items-center gap-3">
                <div className="relative w-10 h-10"><Image src="/icon.png" alt="Logo" fill className="object-contain" /></div>
                <div className="flex flex-col">
                   <span className="font-black text-blue-900 text-lg leading-tight">{siteName}</span>
                   <span className="text-[13px] text-slate-500 font-bold">وسياجات أمنية</span>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <Link href="/#home" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all">الرئيسية</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all">من نحن</Link>
            
            <div className="py-2">
              <button onClick={() => setIsProjectsOpen(!isProjectsOpen)} className="flex items-center justify-between w-full p-4 font-bold text-blue-900 bg-slate-50/50 rounded-xl">
                <span>أعمالنا</span>
                <ChevronDown size={20} className={`transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProjectsOpen && (
                <div className="bg-slate-50 rounded-2xl mx-2 mt-2 space-y-1 p-2 border border-slate-100">
                  {projectSubLinks.map((sub) => (
                    <Link key={sub.name} href={sub.href} onClick={() => {setIsOpen(false); setIsProjectsOpen(false);}} className="flex items-center gap-3 p-3 text-sm font-bold text-slate-600 hover:text-blue-900 transition-all">
                      <span>{sub.icon}</span><span>{sub.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/services" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all">الخدمات</Link>
            <Link href="/gallery" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all">المعرض</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block p-4 font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all">تواصل معنا</Link>
          </div>

          <div className="p-6 border-t">
             <Link href={`https://wa.me/${waNumber}`} target="_blank" className="flex items-center justify-center gap-3 bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all">
                <span>تواصل معنا واتساب</span><MessageCircle size={22} />
             </Link>
          </div>
        </div>
      </div>
    </>
  );
}