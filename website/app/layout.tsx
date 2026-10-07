import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
});

// website/app/layout.tsx

export const metadata = {
  // 1. العنوان الذي يظهر في جوجل (يجب أن يحتوي على أهم الخدمات والمدينة)
  title: {
    default: ' مقاول شبوك وسياجات أمنية |  ونخيل وحجر طبيعي',
    template: '%s |  مقاول شبوك'
  },
  
  // 2. وصف الموقع (يظهر تحت الرابط في نتائج البحث - حافظ على 150 حرف تقريباً)
  description: 'أفضل مقاول تركيب شبوك زراعية وأمنية بالرياض متخصصون في توريد وزراعة النخيل العربي والواشنطني، وتصميم واجهات الحجر الطبيعي بأعلى جودة ودقة.',
  
  // 3. الكلمات المفتاحية (تساعد جوجل في تصنيف موقعك)
  keywords: [
    "مقاول شبوك", "تركيب سياجات أمنية", "توريد نخيل", 
    "زراعة نخيل الرياض", "حجر طبيعي", "واجهات حجر", 
    "مقاولات عامة", "شبوك مزارع", "تنسيق حدائق"
  ],

  // 4. إعدادات لضمان ظهور الشعار الصغير (Favicon) بشكل صحيح
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },

  // 5. إعدادات تواصل البحث (اختياري ولكن احترافي)
  authors: [{ name: 'NoqtaCode' }],
  verification: {
    google: '6EhabcQVryWyjaXyaDvaPTwVTK2EMgaShgd4Y5hvg6E',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28Q9MNRNKJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-28Q9MNRNKJ');
          `}
        </Script>
      </body>
    </html>
  );
}