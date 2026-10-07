'use client'; // 👈 هذه الكلمة هي الحل، تخبر Next.js أن هذا الملف يعمل في المتصفح

import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shadow-lg bg-white/90 backdrop-blur-sm"
      onClick={(e) => {
        // الآن confirm ستعمل بدون مشاكل لأننا في Client Component
        if(!confirm('هل أنت متأكد من الحذف نهائياً؟')) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={20} />
    </button>
  );
}