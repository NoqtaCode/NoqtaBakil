import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans" dir="rtl">
      {/* القائمة الجانبية */}
      <Sidebar />

      {/* المحتوى الرئيسي */}
      {/* التغيير هنا: mr-0 في الجوال، و md:mr-64 في الكمبيوتر */}
      <main className="transition-all duration-300 mr-0 md:mr-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}