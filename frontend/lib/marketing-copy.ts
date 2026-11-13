/** Keep public-facing copy clear of the word the site owner asked us to remove. */
export function cleanMarketingText(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/عن\s+المؤسس[هة]/g, "من نحن")
    .replace(/المؤسس[هة]\s+للمقاولات\s+العامة/g, "خدمات المقاولات العامة")
    .replace(/مؤسس[هة]\s+للمقاولات\s+العامة/g, "مقاولات عامة")
    .replace(/مؤسس[هة]\s+مقاولات\s+سعودية/g, "خدمات مقاولات سعودية")
    .replace(/مؤسس[هة]\s+تسوير/g, "خدمات التسوير")
    .replace(/مؤسس[هة]\s+رائدة\s+في/g, "نقدم خدمات رائدة في")
    .replace(/المؤسس[هة]/g, "خدمات المقاولات")
    .replace(/مؤسس[هة]/g, "خدمات المقاولات");
}
