// import 'server-only';

// // Hapus atau komentari baris ini:
// // import 'server-only';

// import { SuratKematianItem, DeathReport } from '@/types';
// import { RT_RW_OFFICERS, mockReports } from './mockData';

// export const daftarSurat: SuratKematianItem[] = [
//   // ...
//   {
//     noRegis: 'SRK-20261016-A1B2',
//     namaAlmarhum: 'H. Achmad Soeprapto, M.Eng',
//     nikAlmarhum: '3273011405550009',
//     jenisKelamin: 'Laki-laki',
//     tanggalWafat: '2026-10-15',
//     waktuWafat: '07:45 WIB',
//     tempatWafat: 'RSUD Al-Ihsan Bandung',
//     penyebabWafat: 'Penyakit Degeneratif & Usia Lanjut',
//     alamatDuka: 'Jl. Merdeka No. 42',
//     rt: '03',
//     rw: '05',
//     kelurahan: 'Kelurahan Merdeka',
//     kecamatan: 'Kecamatan Sumur Bandung',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Rian Pratama',
//     hubunganPelapor: 'Anak Kandung',
//     statusVerifikasi: 'CERTIFICATE_ISSUED',
//     hashSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Agus Hendrawan, S.E.',
//       jabatan: 'Ketua RT 03 / RW 05 Merdeka',
//       publicKey: 'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
//       signatureHex: '3045022100e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a0102206b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f607182',
//       waktuTtd: '2026-10-16 10:15:22 WIB',
//       status: 'TERVERIFIKASI',
//     },
//     penerbitanDukcapil: {
//       nomorAkta: '3273-KM-2026-0891',
//       namaPejabat: 'H. Dedi Hermawan, M.Si',
//       nipPejabat: '19740512 199903 1 002',
//       tanggalTerbit: '2026-10-16 10:30:00 WIB',
//       urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0891',
//     },
//   },
//   {
//     noRegis: 'SRK-20261015-0891',
//     namaAlmarhum: 'Bambang Soedjarwo',
//     nikAlmarhum: '3273010504500002',
//     jenisKelamin: 'Laki-laki',
//     tanggalWafat: '2026-10-14',
//     waktuWafat: '21:30 WIB',
//     tempatWafat: 'RSUD Al-Ihsan Bandung',
//     penyebabWafat: 'Penyakit Jantung Kronis (Sakit Alamiah)',
//     alamatDuka: 'Jl. Merdeka No. 42',
//     rt: '03',
//     rw: '05',
//     kelurahan: 'Kelurahan Merdeka',
//     kecamatan: 'Kecamatan Sumur Bandung',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Maya Indah Sari',
//     hubunganPelapor: 'Istri',
//     statusVerifikasi: 'CERTIFICATE_ISSUED',
//     hashSHA256: '9c5a1bf249826a8d7e0129bcfe841280a498dcfa3847291048bce9204821a7df',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Ir. Bambang Priyono',
//       jabatan: 'Ketua RT 04 / RW 07 Melati',
//       publicKey: 'ed25519:1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
//       signatureHex: '3045022100e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a0102209f8e7d6c5b4a3928170e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
//       waktuTtd: '2026-10-15 10:15:22 WIB',
//       status: 'TERVERIFIKASI',
//     },
//     penerbitanDukcapil: {
//       nomorAkta: '3273-KM-2026-0891',
//       namaPejabat: 'H. Dedi Hermawan, M.Si',
//       nipPejabat: '19740512 199903 1 002',
//       tanggalTerbit: '2026-10-15 10:30:00 WIB',
//       urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0891',
//     },
//   },
//   {
//     noRegis: 'SRK-20261014-F4G7',
//     namaAlmarhum: 'Hj. Siti Rahmawati, S.Pd',
//     nikAlmarhum: '3273014408620001',
//     jenisKelamin: 'Perempuan',
//     tanggalWafat: '2026-10-13',
//     waktuWafat: '14:20 WIB',
//     tempatWafat: 'Rumah Tinggal',
//     penyebabWafat: 'Sakit Menahun & Komplikasi Diabetik',
//     alamatDuka: 'Jl. Sukamaju No. 12',
//     rt: '01',
//     rw: '02',
//     kelurahan: 'Kelurahan Sukamaju',
//     kecamatan: 'Kecamatan Cibeunying Kidul',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Doni Raharja',
//     hubunganPelapor: 'Suami',
//     statusVerifikasi: 'ED25519_SIGNED',
//     hashSHA256: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Drs. H. Mulyadi',
//       jabatan: 'Ketua RW 02 Sukamaju',
//       publicKey: 'ed25519:7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
//       signatureHex: '3045022100d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
//       waktuTtd: '2026-10-14 09:15:00 WIB',
//       status: 'TERVERIFIKASI',
//     },
//   },
//   {
//     noRegis: 'SRK-20261012-K9L0',
//     namaAlmarhum: 'Raden Mas Soewondo',
//     nikAlmarhum: '3273011902450007',
//     jenisKelamin: 'Laki-laki',
//     tanggalWafat: '2026-10-11',
//     waktuWafat: '08:30 WIB',
//     tempatWafat: 'RS Hasan Sadikin (RSHS)',
//     penyebabWafat: 'Komplikasi Penyakit Dalam & Usia Lanjut',
//     alamatDuka: 'Jl. Merdeka No. 104',
//     rt: '03',
//     rw: '05',
//     kelurahan: 'Kelurahan Merdeka',
//     kecamatan: 'Kecamatan Sumur Bandung',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Rian Pratama',
//     hubunganPelapor: 'Anak Kandung',
//     statusVerifikasi: 'CERTIFICATE_ISSUED',
//     hashSHA256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Agus Hendrawan, S.E.',
//       jabatan: 'Ketua RT 03 / RW 05 Merdeka',
//       publicKey: 'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
//       signatureHex: '3045022100a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
//       waktuTtd: '2026-10-12 11:00:00 WIB',
//       status: 'TERVERIFIKASI',
//     },
//     penerbitanDukcapil: {
//       nomorAkta: '3273-KM-2026-0742',
//       namaPejabat: 'H. Dedi Hermawan, M.Si',
//       nipPejabat: '19740512 199903 1 002',
//       tanggalTerbit: '2026-10-12 14:00:00 WIB',
//       urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0742',
//     },
//   },
//   {
//     noRegis: 'SRK-20261010-C3D4',
//     namaAlmarhum: 'Dra. Hj. Nurhayati Kusuma',
//     nikAlmarhum: '3273016512520005',
//     jenisKelamin: 'Perempuan',
//     tanggalWafat: '2026-10-09',
//     waktuWafat: '19:10 WIB',
//     tempatWafat: 'RS Santo Borromeus',
//     penyebabWafat: 'Gagal Nafas Akut',
//     alamatDuka: 'Jl. Ir. H. Juanda No. 88',
//     rt: '04',
//     rw: '07',
//     kelurahan: 'Kelurahan Melati',
//     kecamatan: 'Kecamatan Coblong',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Farhan Kusuma',
//     hubunganPelapor: 'Anak',
//     statusVerifikasi: 'CERTIFICATE_ISSUED',
//     hashSHA256: '4a9b8c7d6e5f0123456789abcdef0123456789abcdef0123456789abcdef0123',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Ir. Bambang Priyono',
//       jabatan: 'Ketua RT 04 Melati',
//       publicKey: 'ed25519:1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
//       signatureHex: '3045022100f1e2d3c4b5a697887766554433221100ffeeddccbbaa99887766554433221100',
//       waktuTtd: '2026-10-10 09:00:00 WIB',
//       status: 'TERVERIFIKASI',
//     },
//     penerbitanDukcapil: {
//       nomorAkta: '3273-KM-2026-0611',
//       namaPejabat: 'H. Dedi Hermawan, M.Si',
//       nipPejabat: '19740512 199903 1 002',
//       tanggalTerbit: '2026-10-10 11:30:00 WIB',
//       urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0611',
//     },
//   },
//   {
//     noRegis: 'SRK-20261008-E5F6',
//     namaAlmarhum: 'Ir. H. Gunawan Wibisono',
//     nikAlmarhum: '3273010101480003',
//     jenisKelamin: 'Laki-laki',
//     tanggalWafat: '2026-10-07',
//     waktuWafat: '05:30 WIB',
//     tempatWafat: 'Rumah Tinggal',
//     penyebabWafat: 'Sakit Alamiah & Lanjut Usia',
//     alamatDuka: 'Jl. Merdeka No. 15',
//     rt: '02',
//     rw: '03',
//     kelurahan: 'Kelurahan Merdeka',
//     kecamatan: 'Kecamatan Sumur Bandung',
//     kota: 'Kota Bandung',
//     namaPelapor: 'Anisa Wibisono',
//     hubunganPelapor: 'Anak',
//     statusVerifikasi: 'CERTIFICATE_ISSUED',
//     hashSHA256: '1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
//     tandaTanganEd25519: {
//       namaPenandatangan: 'Suryanto Wibowo',
//       jabatan: 'Ketua RT 02 / RW 03 Merdeka',
//       publicKey: 'ed25519:9f8e7d6c5b4a3928170e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
//       signatureHex: '30450221008f7e6d5c4b3a291807f6e5d4c3b2a1008f7e6d5c4b3a291807f6e5d4c3b2a100',
//       waktuTtd: '2026-10-08 08:30:00 WIB',
//       status: 'TERVERIFIKASI',
//     },
//     penerbitanDukcapil: {
//       nomorAkta: '3273-KM-2026-0504',
//       namaPejabat: 'H. Dedi Hermawan, M.Si',
//       nipPejabat: '19740512 199903 1 002',
//       tanggalTerbit: '2026-10-08 10:00:00 WIB',
//       urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0504',
//     },
//   },
// ];

// // Helper functions requested by prompt
// export async function getDaftarSurat(): Promise<SuratKematianItem[]> {
//   return daftarSurat;
// }

// export async function findSuratByNoRegis(noRegis: string): Promise<SuratKematianItem | null> {
//   const norm = noRegis.trim().toUpperCase();
//   const found = daftarSurat.find((item) => item.noRegis.toUpperCase() === norm);
//   return found || null;
// }

// // Compatibility helper converting SuratKematianItem to DeathReport if needed
// export async function getReportByRegistrationId(noRegis: string): Promise<DeathReport | null> {
//   const surat = await findSuratByNoRegis(noRegis);
//   if (!surat) return null;

//   return {
//     id: surat.noRegis,
//     reporter: {
//       name: surat.namaPelapor,
//       nik: '3273010000000000',
//       email: `${surat.namaPelapor.toLowerCase().replace(/\s+/g, '.')}@email.com`,
//       phone: '081234567890',
//       relation: surat.hubunganPelapor,
//       authMethod: 'whatsapp',
//       isVerified: true,
//       verifiedAt: surat.tanggalWafat,
//     },
//     deceased: {
//       fullName: surat.namaAlmarhum,
//       nik: surat.nikAlmarhum,
//       gender: surat.jenisKelamin,
//       dateOfBirth: '1950-01-01',
//       dateOfDeath: surat.tanggalWafat,
//       timeOfDeath: surat.waktuWafat || '10:00 WIB',
//       causeOfDeath: surat.penyebabWafat,
//       placeOfDeath: surat.tempatWafat,
//       address: surat.alamatDuka,
//       rt: surat.rt,
//       rw: surat.rw,
//       kelurahan: surat.kelurahan,
//       kecamatan: surat.kecamatan,
//       city: surat.kota,
//     },
//     status: surat.statusVerifikasi,
//     assignedRTRW: RT_RW_OFFICERS[0],
//     submittedAt: `${surat.tanggalWafat} 08:00 WIB`,
//     documents: {
//       ktpDeceasedName: `ktp_${surat.namaAlmarhum.toLowerCase().replace(/\s+/g, '_')}.pdf`,
//       kkDeceasedName: `kk_${surat.nikAlmarhum.slice(0, 6)}.pdf`,
//       hospitalLetterName: `surat_medis_${surat.noRegis.toLowerCase()}.pdf`,
//       ktpReporterName: 'ktp_pelapor.pdf',
//       encryptionAlgorithm: 'AES-256-GCM',
//       payloadHashAes256Gcm: surat.hashSHA256,
//       ivHex: '4a9b8c7d6e5f0123456789ab',
//       encryptionTimestamp: `${surat.tanggalWafat}T08:00:00Z`,
//       aiVerification: {
//         overallConfidence: 98.8,
//         nikMatch: true,
//         ocrConfidence: 99.2,
//         faceClarity: 98.0,
//         signatureDetected: true,
//         status: 'VERIFIED',
//         notes: 'Pencocokan NIK dan integritas dokumen sah.',
//       },
//     },
//     rtRwSignature: {
//       algorithm: 'Ed25519',
//       signerName: surat.tandaTanganEd25519.namaPenandatangan,
//       signerRole: 'Ketua RT',
//       signatureHex: surat.tandaTanganEd25519.signatureHex,
//       publicKey: surat.tandaTanganEd25519.publicKey,
//       timestamp: surat.tandaTanganEd25519.waktuTtd,
//       verified: true,
//     },
//     dukcapilIssuance: surat.penerbitanDukcapil
//       ? {
//           issuedAt: surat.penerbitanDukcapil.tanggalTerbit,
//           officerName: surat.penerbitanDukcapil.namaPejabat,
//           officerNip: surat.penerbitanDukcapil.nipPejabat,
//           certificateNumber: surat.penerbitanDukcapil.nomorAkta,
//           qrValidationUrl: surat.penerbitanDukcapil.urlValidasiQR,
//           pbkdf2Salt: '7f9a8b1c2d3e4f5a6b7c8d9e',
//           pbkdf2Iterations: 100000,
//         }
//       : undefined,
//     notes: 'Kutipan Akta Kematian resmi terdaftar dalam basis data SPBE.',
//   };
// }

// export async function getAllReports(): Promise<DeathReport[]> {
//   const items = await getDaftarSurat();
//   const reports = await Promise.all(items.map((i) => getReportByRegistrationId(i.noRegis)));
//   return reports.filter((r): r is DeathReport => r !== null);
// }

// // Lookup report by any dashboard or certificate ID (supporting SK-2026-..., SRK-..., etc.)
// export async function getReportById(id: string): Promise<DeathReport | null> {
//   if (!id) return null;
//   const norm = id.trim().toUpperCase();

//   // 1. Check in mockReports (SK-2026-00630, SK-2026-00129, etc.)
//   const foundInMock = mockReports.find(
//     (item) => item.id.toUpperCase() === norm || item.id.toUpperCase().replace(/-/g, '') === norm.replace(/-/g, '')
//   );
//   if (foundInMock) return foundInMock;

//   // 2. Check in daftarSurat via getReportByRegistrationId
//   const fromSurat = await getReportByRegistrationId(norm);
//   if (fromSurat) return fromSurat;

//   return null;
// }

// export async function getAllDashboardReports(): Promise<DeathReport[]> {
//   const reportsFromSurat = await getAllReports();
//   const map = new Map<string, DeathReport>();
//   mockReports.forEach((r) => map.set(r.id.toUpperCase(), r));
//   reportsFromSurat.forEach((r) => {
//     if (!map.has(r.id.toUpperCase())) {
//       map.set(r.id.toUpperCase(), r);
//     }
//   });
//   return Array.from(map.values());
// }
export * from './mockData';