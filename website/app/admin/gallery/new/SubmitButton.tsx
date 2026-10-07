'use client';
import { useFormStatus } from "react-dom";
import { Loader2, UploadCloud } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition shadow-lg ${
        pending ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={22} />
          <span>جاري رفع الصور... الرجاء الانتظار</span>
        </>
      ) : (
        <>
          <UploadCloud size={22} />
          <span>بدء الرفع الآن</span>
        </>
      )}
    </button>
  );
}