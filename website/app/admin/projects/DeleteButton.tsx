'use client';

import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" 
      title="حذف" 
      onClick={(e) => { 
        if(!confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={18} />
    </button>
  );
}