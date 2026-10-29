import { z } from 'zod';

export const deathReportFormSchema = z
  .object({
    reporterName: z.string().trim().min(1, 'Nama lengkap pelapor wajib diisi.'),
    deceasedName: z
      .string()
      .trim()
      .min(1, 'Nama lengkap almarhum/almarhumah wajib diisi.'),
    deceasedNik: z
      .string()
      .trim()
      .min(1, 'NIK almarhum wajib diisi.')
      .refine(
        (value) => value.length === 0 || /^\d{16}$/.test(value),
        'NIK almarhum harus tepat 16 digit angka sesuai KTP.'
      ),
    reporterNik: z.string().trim().refine(
      (value) => value.length === 0 || /^\d{16}$/.test(value),
      'NIK pelapor harus tepat 16 digit angka.'
    ),
    dateOfDeath: z.string().min(1, 'Tanggal kematian wajib dipilih.'),
    causeOfDeath: z.string().trim().min(1, 'Penyebab kematian wajib diisi.'),
    address: z.string().trim().min(1, 'Alamat duka wajib diisi.'),
    consent: z
      .boolean()
      .refine(
        (value) => value,
        'Anda wajib menyetujui deklarasi persetujuan pemrosesan data kependudukan (UU PDP No. 27/2022) sebelum mengirimkan laporan.'
      ),
    reporterContact: z.string().trim().min(1, 'Kontak notifikasi wajib diisi.'),
    authMethod: z.enum(['email', 'whatsapp']),
  })
  .superRefine((data, context) => {
    if (!data.reporterContact) return;

    if (
      data.authMethod === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.reporterContact)
    ) {
      context.addIssue({
        code: 'custom',
        path: ['reporterContact'],
        message: 'Masukkan alamat email yang valid.',
      });
    }

    if (data.authMethod === 'whatsapp') {
      const phoneDigits = data.reporterContact.replace(/\D/g, '');
      if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        context.addIssue({
          code: 'custom',
          path: ['reporterContact'],
          message: 'Nomor WhatsApp harus terdiri dari 8–15 digit.',
        });
      }
    }
  });
