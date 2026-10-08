import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
});

export const metadata = {
  title: {
    default: 'مؤسسة مقاولات متكاملة | شبوك، نخيل، هناجر، سواتر ومظلات، وحجر طبيعي',
    template: '%s | مقاولات فاخرة'
  },
  description: 'مؤسسة رائدة في تنفيذ وتوريد الشبوك الزراعية والأمنية، تنسيق حدائق وزراعة النخيل، بناء الهناجر والمستودعات، تركيب السواتر والمظلات، وأعمال الحجر الطبيعي.',
  keywords: [
    "مقاول شبوك", "تركيب سياجات أمنية", "توريد نخيل", 
    "هناجر ومستودعات", "سواتر ومظلات", "حجر طبيعي", "واجهات حجر", 
    "مقاولات عامة", "شبوك مزارع", "تنسيق حدائق"
  ],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
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