'use client';
import { Trash2 } from "lucide-react";

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
      onClick={(e) => { if(!confirm('حذف هذه الخدمة؟')) e.preventDefault(); }}
    >
      <Trash2 size={20} />
    </button>
  );
}