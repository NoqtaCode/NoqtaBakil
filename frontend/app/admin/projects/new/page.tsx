import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectUploadForm from "../../../../components/admin/ProjectUploadForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto px-2 pb-20">
      
      <div className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/admin/projects" className="bg-white p-3 rounded-xl border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50">
          <ArrowRight size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">إضافة مشروع / صور جديدة</h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-6 md:p-10">
        <ProjectUploadForm />
      </div>
    </div>
  );
}
