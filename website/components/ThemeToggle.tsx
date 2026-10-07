'use client';

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // استخدام resolvedTheme لضمان الدقة
  const [mounted, setMounted] = useState(false);

  // لضمان أن الكود يعمل فقط في المتصفح بعد تحميل الصفحة (مهم جداً)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; // مساحة محجوزة لحين التحميل
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 transition-all duration-300 hover:scale-110 active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center"
      aria-label="تبديل الوضع"
    >
      {resolvedTheme === 'dark' ? (
        <Sun size={20} strokeWidth={2.5} />
      ) : (
        <Moon size={20} strokeWidth={2.5} />
      )}
    </button>
  );
}