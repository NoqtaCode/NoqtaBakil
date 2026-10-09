'use client';

// ============================================================
// Save Submit Button (Projects & Testimonials forms)
// Supports preparing state for image pre-processing
// ============================================================

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

interface SaveSubmitButtonProps {
  preparing?: boolean;
  label?: string;
}

export default function SaveSubmitButton({ preparing = false, label = "حفظ المشروع ونشره" }: SaveSubmitButtonProps) {
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
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
