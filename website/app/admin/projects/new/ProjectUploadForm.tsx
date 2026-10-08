'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, Loader2, Save } from 'lucide-react';
import { createProjectBatch } from '../actions';

const MAX_BATCH_SIZE = 12 * 1024 * 1024;
const PREPARE_COUNT = 4;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function prepareImage(file: File): Promise<File> {
  if (file.size <= 2 * 1024 * 1024) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext('2d');
    if (!context) return file;

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
    if (!blob) return file;
    return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, { type: 'image/webp' });
  } catch {
    return file;
  }
}

export default function ProjectUploadForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [uploadedIndices, setUploadedIndices] = useState<number[]>([]);
  const [fileError, setFileError] = useState('');
  const [progress, setProgress] = useState('');

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    setFileError('');
    setUploadedIndices([]);
    setProgress('');
    if (selected.some((file) => !ALLOWED_TYPES.includes(file.type))) {
      event.currentTarget.value = '';
      setSelectedCount(0);
      setFileError('استخدم صور JPG أو PNG أو WebP فقط.');
      return;
    }
    setSelectedCount(selected.length);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    const form = event.currentTarget;
    const originals = Array.from(input?.files ?? []);
    if (!originals.length || processing) return;

    const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
    const uploaded = new Set(uploadedIndices);
    setProcessing(true);
    setFileError('');

    try {
      while (uploaded.size < originals.length) {
        const pendingIndices = originals.map((_, index) => index).filter((index) => !uploaded.has(index));
        const candidates = await Promise.all(pendingIndices.slice(0, PREPARE_COUNT).map(async (index) => ({
          index,
          file: await prepareImage(originals[index]),
        })));
        const batches: { index: number; file: File }[][] = [];
        let batch: { index: number; file: File }[] = [];
        let batchSize = 0;
        for (const candidate of candidates) {
          if (candidate.file.size > MAX_BATCH_SIZE) {
            throw new Error(`الصورة «${candidate.file.name}» أكبر من الحد المسموح بعد الضغط.`);
          }
          if (batch.length && batchSize + candidate.file.size > MAX_BATCH_SIZE) {
            batches.push(batch);
            batch = [];
            batchSize = 0;
          }
          batch.push(candidate);
          batchSize += candidate.file.size;
        }
        if (batch.length) batches.push(batch);

        for (const currentBatch of batches) {
          const batchData = new FormData();
          batchData.set('title', title);
          batchData.set('category', category);
          batchData.set('totalCount', String(originals.length));
          currentBatch.forEach(({ index, file }) => {
            batchData.append('image', file);
            batchData.append('imageIndex', String(index));
          });

          setProgress(`تم رفع ${uploaded.size} من ${originals.length} صورة...`);
          const result = await createProjectBatch(batchData);
          result.createdIndices.forEach((index) => uploaded.add(index));
          setUploadedIndices(Array.from(uploaded));
          if (result.error) throw new Error(result.error);
          if (result.createdIndices.length !== currentBatch.length) throw new Error('لم يكتمل رفع هذه الدفعة. اضغط متابعة لإكمال الباقي.');
        }
      }

      setProgress(`اكتمل رفع ${uploaded.size} صورة.`);
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setFileError(message.includes('Unexpected end of form')
        ? 'انقطع اتصال الرفع قبل اكتمال الدفعة. خفّضنا حجم الدفعات؛ اضغط متابعة لإعادة المحاولة.'
        : message || 'تعذر رفع الصور. حاول مرة أخرى.');
      setProgress(`تم رفع ${uploaded.size} من ${originals.length} صورة. اضغط متابعة لإكمال الباقي.`);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
      <div>
        <label className="block text-sm font-black text-slate-700 mb-3 pr-2">
          عنوان العمل (سيتم تطبيقه على كل الصور المرفوعة) *
        </label>
        <input name="title" required type="text" placeholder="مثال: توريد شبوك مزرعة" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none transition bg-gray-50/50 text-black" />
      </div>

      <div>
        <label className="block text-sm font-black text-slate-700 mb-3 pr-2">القسم *</label>
        <select name="category" required defaultValue="" className="w-full border-2 border-gray-100 rounded-2xl p-4 focus:border-blue-500 outline-none bg-gray-50/50 text-black">
          <option value="" disabled>-- اختر القسم --</option>
          <option value="shabouk">أعمال الشبوك والمزارع</option>
          <option value="nakheel">تنسيق النخيل والحدائق</option>
          <option value="hanajer">الهناجر والمستودعات</option>
          <option value="sawater">سواتر ومظلات</option>
          <option value="hajar">أعمال الحجر الطبيعي</option>
          <option value="other">أخرى</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-black text-slate-700 mb-3 pr-2">صور المشروع (اختر كل الصور مرة واحدة) *</label>
        <div className="relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/30 hover:bg-gray-50 transition">
          <input
            ref={inputRef}
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            multiple
            required
            disabled={processing}
            onChange={handleFiles}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-gray-400 pointer-events-none">
            <ImagePlus className="mx-auto mb-3 text-blue-500" size={36} />
            <p className="font-bold text-blue-600 text-lg">{processing ? 'جار رفع الصور...' : 'اضغط لاختيار جميع صور المشروع'}</p>
            <p className="text-sm mt-2">
              {selectedCount ? `تم تحديد ${selectedCount} صورة${uploadedIndices.length ? `، رُفع منها ${uploadedIndices.length}` : ''}` : 'يمكنك تحديد الصور كلها معًا؛ سيتم ضغطها ورفعها على دفعات تلقائيًا'}
            </p>
          </div>
        </div>
        {progress && <p aria-live="polite" className="mt-3 text-sm font-bold text-blue-700">{progress}</p>}
        {fileError && <p role="alert" className="mt-3 text-sm font-bold text-red-600">{fileError}</p>}
      </div>

      <button
        type="submit"
        disabled={processing || selectedCount === 0}
        className={`w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition shadow-lg ${processing || selectedCount === 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
      >
        {processing ? <><Loader2 className="animate-spin" size={22} /><span>جاري الرفع {uploadedIndices.length}/{selectedCount}...</span></> : <><Save size={22} /><span>{uploadedIndices.length ? 'متابعة رفع الصور المتبقية' : 'حفظ المشروع ونشره'}</span></>}
      </button>
    </form>
  );
}
