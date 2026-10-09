import { createClient } from "next-sanity";

// Re-export from the central types file for backward compatibility
export type { SiteSettings } from "../types";

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
