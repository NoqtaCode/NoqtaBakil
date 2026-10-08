import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'الخدمات',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'اسم الخدمة', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'الوصف', type: 'text', rows: 4 }),
    defineField({ name: 'icon', title: 'الصورة أو الأيقونة', type: 'image', options: { hotspot: true } }),
  ],
})
