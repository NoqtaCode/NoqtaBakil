import { createClient } from "next-sanity";

export type SiteSettings = {
  siteName?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  facebook?: string;
  description?: string;
  heroTitle?: string;
  heroSubTitle?: string;
  heroDescription?: string;
  logoUrl?: string;
  heroUrl?: string;
  aboutUrl?: string;
  aboutImageUrl?: string;
  logoImageUrl?: string;
  heroImageUrl?: string;
};

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ndsqtj7c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // نجعلها false لنرى التحديثات فوراً
  token: process.env.SANITY_API_TOKEN,
  timeout: 4000,
  maxRetries: 0,
});

export async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return (await client.fetch(query, params)) as T;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return fallback;
  }
}
