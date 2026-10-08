import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'صور المعرض',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'القسم',
      type: 'string',
      options: { list: [
        { title: 'الشبوك والمزارع', value: 'shabouk' },
        { title: 'النخيل والحدائق', value: 'nakheel' },
        { title: 'الهناجر والمستودعات', value: 'hanajer' },
        { title: 'السواتر والمظلات', value: 'sawater' },
        { title: 'الحجر الطبيعي', value: 'hajar' },
        { title: 'أخرى', value: 'other' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'image', title: 'الصورة', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
  ],
})
