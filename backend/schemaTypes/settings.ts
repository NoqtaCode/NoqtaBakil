import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'اسم الموقع', type: 'string' }),
    defineField({ name: 'description', title: 'وصف الموقع', type: 'text' }),
    defineField({ name: 'heroTitle', title: 'عنوان الواجهة', type: 'string' }),
    defineField({ name: 'heroSubTitle', title: 'العنوان الفرعي', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'وصف الواجهة', type: 'text' }),
    defineField({ name: 'logo', title: 'الشعار', type: 'image' }),
    defineField({ name: 'heroImage', title: 'صورة الواجهة', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutImage', title: 'صورة من نحن', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaImage', title: 'صورة خلفية قسم لنبني معاً', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'whatsapp', title: 'رقم واتساب', type: 'string' }),
    defineField({ name: 'phone', title: 'رقم الهاتف', type: 'string' }),
    defineField({ name: 'email', title: 'البريد الإلكتروني', type: 'string' }),
    defineField({ name: 'address', title: 'العنوان', type: 'string' }),
    defineField({ name: 'facebook', title: 'رابط فيسبوك', type: 'url' }),
    defineField({ name: 'username', title: 'اسم دخول لوحة الإدارة', type: 'string' }),
    defineField({ name: 'password', title: 'كلمة مرور لوحة الإدارة', type: 'string' }),
  ],
})
