'use client';

// ============================================================
// Admin Sidebar – moved from app/admin/Sidebar.tsx
// ============================================================

import { logout } from "../../lib/auth";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const menuItems = [
  { name: "الرئيسية", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "المشاريع", icon: FolderKanban, href: "/admin/projects" },
  // { name: "المعرض", icon: ImageIcon, href: "/admin/gallery" },
  { name: "الخدمات", icon: Briefcase, href: "/admin/services" },
  { name: "آراء العملاء", icon: Users, href: "/admin/testimonials" },
  { name: "الإعدادات", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* زر القائمة للجوال */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* خلفية شفافة عند فتح القائمة في الجوال */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* القائمة الجانبية */}
      <aside className={`
        fixed top-0 right-0 h-full w-64 bg-slate-900 text-white z-40 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:translate-x-0
      `}>
        {/* الشعار */}
        <div className="h-20 flex items-center justify-center border-b border-slate-800">
          <h2 className="text-2xl font-black text-white">
            لوحة <span className="text-yellow-500">التحكم</span>
          </h2>
        </div>

        {/* الروابط */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* تسجيل الخروج */}
        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
            >
              <LogOut size={20} className="group-hover:translate-x-[-3px] transition-transform" />
              <span className="font-bold">تسجيل الخروج</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
