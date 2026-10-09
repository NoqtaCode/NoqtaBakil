# 🏗️ NoqtaCodee Monorepo

هذا المستودع يحتوي على مشروع الموقع الإلكتروني (Frontend) بالإضافة إلى لوحة التحكم الخاصة به (CMS).

## 📂 الهيكل العام للمشروع

المشروع مقسم إلى مجلدين رئيسيين لسهولة الإدارة:

1. **`frontend/`** (تطبيق الويب)
   - مبرمج باستخدام **Next.js 16 (App Router)** و **React 19**
   - يستخدم **Tailwind CSS v4** للتصميم
   - تم ترتيب الملفات بشكل احترافي كالتالي:
     - `app/`: يحتوي فقط على صفحات الموقع (`page.tsx`) وتوجيهاتها
     - `components/`: تم تصنيف المكونات إلى (`layout`, `ui`, `sections`, `admin`)
     - `actions/`: يحتوي على جميع دوال `Server Actions` مجمعة
     - `lib/`: ملفات التهيئة (مثل `sanity.ts` و `auth.ts`)
     - `types/`: يحتوي على واجهات (Interfaces/Types) مثل `SiteSettings`

2. **`studio/`** (لوحة التحكم)
   - مبنية باستخدام **Sanity v5 (Headless CMS)**
   - يدير قاعدة بيانات الموقع والمحتوى والصور
   - المخططات (Schemas) موجودة في مجلد `schemas/`

## 🚀 كيفية التشغيل

### تشغيل الموقع (Frontend)
```bash
cd frontend
npm install
npm run dev
```

### تشغيل لوحة التحكم (Sanity Studio)
```bash
cd studio
npm install
npm run dev
```

## 🔒 ملاحظات أمنية
- نظام المصادقة لصفحة `/admin` يعتمد على الـ Cookies وملف `middleware.ts`.
- يتم التحقق من بيانات الدخول عن طريق الإعدادات في قاعدة بيانات Sanity أولاً، ثم العودة للمتغيرات البيئية كخيار احتياطي.
