import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'آراء العملاء',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', title: 'اسم العميل', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'feedback', title: 'الرأي', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'isActive', title: 'إظهار في الموقع', type: 'boolean', initialValue: true }),
  ],
})
