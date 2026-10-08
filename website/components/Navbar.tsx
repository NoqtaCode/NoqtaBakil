'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MessageCircle, Layers, Trees, Factory, Tent, Diamond } from "lucide-react";

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

  const siteName = settings?.siteName || "مقاولات متكاملة";
  const waNumber = settings?.whatsapp || "966500000000";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectSubLinks = [
    { name: 'أعمال الشبوك', href: '/#shabouk', icon: <Layers size={18} /> },
    { name: 'تنسيق النخيل', href: '/#nakheel', icon: <Trees size={18} /> },
    { name: 'الهناجر والمستودعات', href: '/#hanajer', icon: <Factory size={18} /> },
    { name: 'سواتر ومظلات', href: '/#sawater', icon: <Tent size={18} /> },
    { name: 'حجر طبيعي', href: '/#hajar', icon: <Diamond size={18} /> },
  ];

  return (
    <>
      {/* Floating Pill Container */}
      <div className="fixed top-0 w-full z-[100] flex justify-center pt-4 lg:pt-6 px-4 pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-4 lg:px-8 py-3 lg:py-3 rounded-full ${
          scrolled 
            ? 'w-full lg:max-w-5xl bg-white/90 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-white/50' 
            : 'w-full lg:max-w-7xl bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl'
        }`}>
          
          {/* Logo (Right) */}
          <Link href="/#home" className="flex items-center gap-2 lg:gap-3 group">
            <div className={`relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full p-1 shadow-md transition-transform duration-500 group-hover:scale-105`}>
              <Image src={settings?.logoUrl || "/icon.png"} alt="Logo" fill className="object-contain p-1" priority />
            </div>
            <div className="flex flex-col text-right">
              <span className={`text-base lg:text-xl font-black leading-none transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                {siteName}
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
            <Link href="/#home" className={`hover:-translate-y-1 transition-all ${scrolled ? 'text-slate-700 hover:text-amber-500' : 'text-white/90 hover:text-amber-400'}`}>الرئيسية</Link>
            <Link href="/about" className={`hover:-translate-y-1 transition-all ${scrolled ? 'text-slate-700 hover:text-amber-500' : 'text-white/90 hover:text-amber-400'}`}>من نحن</Link>
            
            <div className="relative group cursor-pointer" onMouseEnter={() => setIsProjectsOpen(true)} onMouseLeave={() => setIsProjectsOpen(false)}>
              <div className={`flex items-center gap-1 hover:-translate-y-1 transition-all py-2 ${scrolled ? 'text-slate-700 hover:text-amber-500' : 'text-white/90 hover:text-amber-400'}`}>
                أعمالنا <ChevronDown size={14} className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`absolute top-full right-1/2 translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50 p-3 transform transition-all duration-400 origin-top ${isProjectsOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-4'}`}>
                {projectSubLinks.map((sub) => (
                  <Link key={sub.name} href={sub.href} className="flex items-center gap-3 p-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all group/item">
                    <div className="bg-slate-100 text-slate-500 p-2 rounded-xl group-hover/item:bg-amber-100 group-hover/item:text-amber-600 transition-all">{sub.icon}</div>
                    <span className="text-sm font-bold">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/services" className={`hover:-translate-y-1 transition-all ${scrolled ? 'text-slate-700 hover:text-amber-500' : 'text-white/90 hover:text-amber-400'}`}>الخدمات</Link>
          </div>

          {/* Action / Mobile Toggle (Left) */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 text-sm shadow-md hover:-translate-y-1 ${
              scrolled ? 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900' : 'bg-amber-500 text-black hover:bg-white'
            }`}>
              اطلب تسعيرة
            </Link>
            
            <button onClick={() => setIsOpen(true)} className={`lg:hidden p-2.5 rounded-full transition-transform active:scale-90 ${scrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'}`}>
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[200] transition-opacity duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-slate-900 text-white z-[210] shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} dir="rtl">
        <div className="p-6 flex justify-between items-center border-b border-white/10">
           <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-full p-1"><Image src={settings?.logoUrl || "/icon.png"} alt="Logo" fill className="object-contain p-1" /></div>
              <span className="font-black text-lg">{siteName}</span>
           </div>
           <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-amber-500 hover:text-black transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link href="/#home" onClick={() => setIsOpen(false)} className="block p-4 font-black text-lg text-white hover:bg-white/10 rounded-2xl transition-all">الرئيسية</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block p-4 font-black text-lg text-white hover:bg-white/10 rounded-2xl transition-all">من نحن</Link>
          
          <div className="py-2 bg-white/5 rounded-3xl border border-white/10">
            <button onClick={() => setIsProjectsOpen(!isProjectsOpen)} className="flex items-center justify-between w-full p-4 font-black text-lg text-amber-400">
              <span>أعمالنا</span>
              <ChevronDown size={20} className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isProjectsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-2 space-y-1">
                {projectSubLinks.map((sub) => (
                  <Link key={sub.name} href={sub.href} onClick={() => {setIsOpen(false); setIsProjectsOpen(false);}} className="flex items-center gap-3 p-3 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <div className="bg-white/10 p-2 rounded-lg text-amber-400">{sub.icon}</div>
                    <span>{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/services" onClick={() => setIsOpen(false)} className="block p-4 font-black text-lg text-white hover:bg-white/10 rounded-2xl transition-all">الخدمات</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="block p-4 font-black text-lg text-white hover:bg-white/10 rounded-2xl transition-all">المعرض الشامل</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block p-4 font-black text-lg text-white hover:bg-white/10 rounded-2xl transition-all">تواصل معنا</Link>
        </div>

        <div className="p-6 border-t border-white/10">
           <Link href={`https://wa.me/${waNumber}`} target="_blank" className="flex items-center justify-center gap-3 bg-amber-500 text-black py-4 rounded-full font-black text-lg active:scale-95 transition-all">
              <span>محادثة واتساب</span><MessageCircle size={22} />
           </Link>
        </div>
      </div>
    </>
  );
}
