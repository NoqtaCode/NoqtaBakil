import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import { safeFetch } from "../lib/sanity";
import "./globals.css";

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await safeFetch<{ siteName?: string; logoUrl?: string; description?: string }>(
    `*[_type == "settings"][0]{siteName, "logoUrl": logo.asset->url, description}`,
    {},
  );
  const siteName = settings?.siteName || "مؤسسة للمقاولات العامة";
  const logoUrl = settings?.logoUrl || "/logo.png";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abusaleh-ksa.com";
  const description = settings?.description || "مؤسسة رائدة في تنفيذ وتوريد الشبوك الزراعية والأمنية، تنسيق حدائق وزراعة النخيل، بناء الهناجر والمستودعات، تركيب السواتر والمظلات، وأعمال الحجر الطبيعي بالمملكة العربية السعودية.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} | مقاول شبوك، نخيل، هناجر، سواتر ومظلات، وحجر طبيعي`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      // الشبوك والتسوير
      "مقاول شبوك", "تركيب شبوك", "شبوك مزارع", "شبوك أمنية", "تسوير مزارع", "تسوير أراضي", "شبوك مجلفنة", "سياج أمني", "مقاول شبوك الرياض", "شبوك شايكة", "شبوك خيول",
      // النخيل والحدائق
      "توريد نخيل", "زراعة نخيل", "نخيل واشنطونيا", "تنسيق حدائق", "تنسيق مزارع", "نخيل عربي", "نخيل سكري", "نخيل خلاص", "صيانة نخيل",
      // الهناجر والمستودعات
      "بناء هناجر", "مقاول هناجر", "تركيب مستودعات", "هناجر حديد", "هناجر ومستودعات الرياض", "مستودعات تجارية", "تصميم هناجر", "شينكو",
      // السواتر والمظلات
      "سواتر ومظلات", "تركيب سواتر", "مظلات سيارات", "سواتر حديد", "سواتر قماش", "مظلات حدائق", "برجولات حدائق", "سواتر ليزر",
      // الحجر الطبيعي والواجهات
      "حجر طبيعي", "واجهات حجر", "حجر الرياض", "تركيب حجر طبيعي", "واجهات حجر طبيعي", "حجر مقدسي", "ديكورات حجرية",
      // عام واستعلام
      "مؤسسة مقاولات عامة", "مقاول عام", "مقاولات السعودية", "مقاول معتمد", "أسعار الشبوك", "أسعار الهناجر"
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: siteUrl,
      title: `${siteName} | مقاول شبوك، نخيل، هناجر، سواتر ومظلات`,
      description,
      siteName,
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 800,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | مقاولات عامة وشبوك`,
      description,
      images: [logoUrl],
    },
    icons: {
      icon: logoUrl,
      apple: logoUrl,
      shortcut: logoUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: [
        "zLl11yYHn6oidzISCmvInIRxI6_Mphp2KS5yghRZS9Y",
        "B_oeOP25qHS9h3edl53ZgazK5sDXyAH9qnEZMKPBmG0",
      ],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await safeFetch<{ siteName?: string; logoUrl?: string; phone?: string; address?: string }>(
    `*[_type == "settings"][0]{siteName, "logoUrl": logo.asset->url, phone, address}`,
    {},
  );
  const siteName = settings?.siteName || "مؤسسة للمقاولات العامة";
  const logoUrl = settings?.logoUrl || "/logo.png";
  const phone = settings?.phone || "+966537302795";
  const address = settings?.address || "المملكة العربية السعودية";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shabouk-pro.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": siteName,
    "image": logoUrl,
    "url": siteUrl,
    "telephone": phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressCountry": "SA",
      "addressLocality": "Saudi Arabia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "priceRange": "$$",
    "areaServed": [
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "City", "name": "Riyadh" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات المقاولات العامة",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "توريد وتركيب الشبوك الزراعية والأمنية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "زراعة وتوريد النخيل وتنسيق الحدائق" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "إنشاء وبناء الهناجر والمستودعات" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تركيب المظلات والسواتر" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "توريد وتركيب الحجر الطبيعي والواجهات" } }
      ]
    }
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
