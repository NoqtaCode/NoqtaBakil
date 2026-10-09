'use client';

// ============================================================
// Unified Delete Button for Admin Panel
// Usage: pass confirmMessage prop for custom confirmation text
// ============================================================

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  confirmMessage?: string;
  className?: string;
}

export default function DeleteButton({
  confirmMessage = 'هل أنت متأكد من الحذف نهائياً؟',
  className = "p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      title="حذف"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={20} />
    </button>
  );
}
