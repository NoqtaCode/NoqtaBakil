import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // نجعلها false لنرى التحديثات فوراً
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // هذا ما يسمح بالرفع
});