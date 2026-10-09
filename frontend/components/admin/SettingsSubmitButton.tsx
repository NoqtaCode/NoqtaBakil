'use client';

// ============================================================
// Settings Submit Button
// Round pill style for settings form
// ============================================================

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

export default function SettingsSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full md:w-auto px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
        pending ? "bg-slate-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>جاري الحفظ...</span>
        </>
      ) : (
        <>
          <Save size={20} />
          <span>حفظ التغييرات</span>
        </>
      )}
    </button>
  );
}
