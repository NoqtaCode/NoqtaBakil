'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/auth";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await login(formData);

    if (res?.success) {
      router.push("/admin/dashboard");
    } else {
      setError("❌ بيانات الدخول غير صحيحة");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4" dir="rtl">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-sm border border-white/10">
        
        <div className="text-center mb-8">
           <h1 className="text-3xl font-black text-slate-800 mb-2">لوحة التحكم</h1>
           <p className="text-slate-400 text-sm font-medium">مرحباً بك، سجل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-2xl text-center border border-red-100 animate-shake">
              {error}
            </div>
          )}
          
          {/* خانة اسم المستخدم */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-widest">اسم المستخدم</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
              placeholder="أدخل اسم المستخدم"
            />
          </div>

          {/* خانة كلمة المرور */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-widest">كلمة المرور</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-white text-lg transition-all shadow-xl shadow-blue-900/20 mt-4 ${
              loading 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 active:scale-95'
            }`}
          >
            {loading ? "جاري التحقق..." : "دخول للنظام 🔐"}
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">الموقع مطور بواسطة NoqtaCode</p>
        </div>
      </div>
    </div>
  );
}