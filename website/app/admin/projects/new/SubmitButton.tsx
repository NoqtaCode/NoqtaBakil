'use client';

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

export default function SubmitButton({ preparing = false }: { preparing?: boolean }) {
  const { pending } = useFormStatus();
  const disabled = pending || preparing;

  return (
    <button 
      type="submit" 
      disabled={disabled}
      className={`w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition shadow-lg ${
        disabled ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
      }`}
    >
      {preparing ? (
        <>
          <Loader2 className="animate-spin" size={22} />
          <span>جار تجهيز الصور...</span>
        </>
      ) : pending ? (
        <>
          <Loader2 className="animate-spin" size={22} />
          <span>جاري الحفظ والرفع...</span>
        </>
      ) : (
        <>
          <Save size={22} />
          <span>حفظ المشروع ونشره</span>
        </>
      )}
    </button>
  );
}
