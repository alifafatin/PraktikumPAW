import {
  SuratKematianItem,
  DeathReport,
  RTRWOfficer,
  CertificateStatus,
  OfficerSession,
  AuditLogEntry,
  UserSession,
  WargaSession,
} from '@/types';

// ==========================================
// 1. DATA MOCK SURAT KEMATIAN
// ==========================================
export const daftarSurat: SuratKematianItem[] = [
  {
    noRegis: 'SRK-20261016-A1B2',
    namaAlmarhum: 'H. Achmad Soeprapto, M.Eng',
    nikAlmarhum: '3273011405550009',
    jenisKelamin: 'Laki-laki',
    tanggalWafat: '2026-10-15',
    waktuWafat: '07:45 WIB',
    tempatWafat: 'RSUD Al-Ihsan Bandung',
    penyebabWafat: 'Penyakit Degeneratif & Usia Lanjut',
    alamatDuka: 'Jl. Merdeka No. 42',
    rt: '03',
    rw: '05',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    kota: 'Kota Bandung',
    namaPelapor: 'Rian Pratama',
    hubunganPelapor: 'Anak Kandung',
    statusVerifikasi: 'CERTIFICATE_ISSUED',
    hashSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    tandaTanganEd25519: {
      namaPenandatangan: 'Agus Hendrawan, S.E.',
      jabatan: 'Ketua RT 03 / RW 05 Merdeka',
      publicKey: 'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
      signatureHex:
        '3045022100e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a0102206b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f607182',
      waktuTtd: '2026-10-16 10:15:22 WIB',
      status: 'TERVERIFIKASI',
    },
    penerbitanDukcapil: {
      nomorAkta: '3273-KM-2026-0891',
      namaPejabat: 'H. Dedi Hermawan, M.Si',
      nipPejabat: '19740512 199903 1 002',
      tanggalTerbit: '2026-10-16 10:30:00 WIB',
      urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0891',
    },
  },
  {
    noRegis: 'SRK-20261015-0891',
    namaAlmarhum: 'Bambang Soedjarwo',
    nikAlmarhum: '3273010504500002',
    jenisKelamin: 'Laki-laki',
    tanggalWafat: '2026-10-14',
    waktuWafat: '21:30 WIB',
    tempatWafat: 'RSUD Al-Ihsan Bandung',
    penyebabWafat: 'Penyakit Jantung Kronis (Sakit Alamiah)',
    alamatDuka: 'Jl. Merdeka No. 42',
    rt: '03',
    rw: '05',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    kota: 'Kota Bandung',
    namaPelapor: 'Maya Indah Sari',
    hubunganPelapor: 'Istri',
    statusVerifikasi: 'CERTIFICATE_ISSUED',
    hashSHA256: '9c5a1bf249826a8d7e0129bcfe841280a498dcfa3847291048bce9204821a7df',
    tandaTanganEd25519: {
      namaPenandatangan: 'Ir. Bambang Priyono',
      jabatan: 'Ketua RT 04 / RW 07 Melati',
      publicKey: 'ed25519:1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
      signatureHex:
        '3045022100e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a0102209f8e7d6c5b4a3928170e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
      waktuTtd: '2026-10-15 10:15:22 WIB',
      status: 'TERVERIFIKASI',
    },
    penerbitanDukcapil: {
      nomorAkta: '3273-KM-2026-0891',
      namaPejabat: 'H. Dedi Hermawan, M.Si',
      nipPejabat: '19740512 199903 1 002',
      tanggalTerbit: '2026-10-15 10:30:00 WIB',
      urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0891',
    },
  },
  {
    noRegis: 'SRK-20261014-F4G7',
    namaAlmarhum: 'Hj. Siti Rahmawati, S.Pd',
    nikAlmarhum: '3273014408620001',
    jenisKelamin: 'Perempuan',
    tanggalWafat: '2026-10-13',
    waktuWafat: '14:20 WIB',
    tempatWafat: 'Rumah Tinggal',
    penyebabWafat: 'Sakit Menahun & Komplikasi Diabetik',
    alamatDuka: 'Jl. Sukamaju No. 12',
    rt: '01',
    rw: '02',
    kelurahan: 'Kelurahan Sukamaju',
    kecamatan: 'Kecamatan Cibeunying Kidul',
    kota: 'Kota Bandung',
    namaPelapor: 'Doni Raharja',
    hubunganPelapor: 'Suami',
    statusVerifikasi: 'ED25519_SIGNED',
    hashSHA256: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    tandaTanganEd25519: {
      namaPenandatangan: 'Drs. H. Mulyadi',
      jabatan: 'Ketua RW 02 Sukamaju',
      publicKey: 'ed25519:7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      signatureHex:
        '3045022100d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
      waktuTtd: '2026-10-14 09:15:00 WIB',
      status: 'TERVERIFIKASI',
    },
  },
  {
    noRegis: 'SRK-20261012-K9L0',
    namaAlmarhum: 'Raden Mas Soewondo',
    nikAlmarhum: '3273011902450007',
    jenisKelamin: 'Laki-laki',
    tanggalWafat: '2026-10-11',
    waktuWafat: '08:30 WIB',
    tempatWafat: 'RS Hasan Sadikin (RSHS)',
    penyebabWafat: 'Komplikasi Penyakit Dalam & Usia Lanjut',
    alamatDuka: 'Jl. Merdeka No. 104',
    rt: '03',
    rw: '05',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    kota: 'Kota Bandung',
    namaPelapor: 'Rian Pratama',
    hubunganPelapor: 'Anak Kandung',
    statusVerifikasi: 'CERTIFICATE_ISSUED',
    hashSHA256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    tandaTanganEd25519: {
      namaPenandatangan: 'Agus Hendrawan, S.E.',
      jabatan: 'Ketua RT 03 / RW 05 Merdeka',
      publicKey: 'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
      signatureHex:
        '3045022100a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
      waktuTtd: '2026-10-12 11:00:00 WIB',
      status: 'TERVERIFIKASI',
    },
    penerbitanDukcapil: {
      nomorAkta: '3273-KM-2026-0742',
      namaPejabat: 'H. Dedi Hermawan, M.Si',
      nipPejabat: '19740512 199903 1 002',
      tanggalTerbit: '2026-10-12 14:00:00 WIB',
      urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0742',
    },
  },
  {
    noRegis: 'SRK-20261010-C3D4',
    namaAlmarhum: 'Dra. Hj. Nurhayati Kusuma',
    nikAlmarhum: '3273016512520005',
    jenisKelamin: 'Perempuan',
    tanggalWafat: '2026-10-09',
    waktuWafat: '19:10 WIB',
    tempatWafat: 'RS Santo Borromeus',
    penyebabWafat: 'Gagal Nafas Akut',
    alamatDuka: 'Jl. Ir. H. Juanda No. 88',
    rt: '04',
    rw: '07',
    kelurahan: 'Kelurahan Melati',
    kecamatan: 'Kecamatan Coblong',
    kota: 'Kota Bandung',
    namaPelapor: 'Farhan Kusuma',
    hubunganPelapor: 'Anak',
    statusVerifikasi: 'CERTIFICATE_ISSUED',
    hashSHA256: '4a9b8c7d6e5f0123456789abcdef0123456789abcdef0123456789abcdef0123',
    tandaTanganEd25519: {
      namaPenandatangan: 'Ir. Bambang Priyono',
      jabatan: 'Ketua RT 04 Melati',
      publicKey: 'ed25519:1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
      signatureHex:
        '3045022100f1e2d3c4b5a697887766554433221100ffeeddccbbaa99887766554433221100',
      waktuTtd: '2026-10-10 09:00:00 WIB',
      status: 'TERVERIFIKASI',
    },
    penerbitanDukcapil: {
      nomorAkta: '3273-KM-2026-0611',
      namaPejabat: 'H. Dedi Hermawan, M.Si',
      nipPejabat: '19740512 199903 1 002',
      tanggalTerbit: '2026-10-10 11:30:00 WIB',
      urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0611',
    },
  },
  {
    noRegis: 'SRK-20261008-E5F6',
    namaAlmarhum: 'Ir. H. Gunawan Wibisono',
    nikAlmarhum: '3273010101480003',
    jenisKelamin: 'Laki-laki',
    tanggalWafat: '2026-10-07',
    waktuWafat: '05:30 WIB',
    tempatWafat: 'Rumah Tinggal',
    penyebabWafat: 'Sakit Alamiah & Lanjut Usia',
    alamatDuka: 'Jl. Merdeka No. 15',
    rt: '02',
    rw: '03',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    kota: 'Kota Bandung',
    namaPelapor: 'Anisa Wibisono',
    hubunganPelapor: 'Anak',
    statusVerifikasi: 'CERTIFICATE_ISSUED',
    hashSHA256: '1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
    tandaTanganEd25519: {
      namaPenandatangan: 'Suryanto Wibowo',
      jabatan: 'Ketua RT 02 / RW 03 Merdeka',
      publicKey: 'ed25519:9f8e7d6c5b4a3928170e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
      signatureHex:
        '30450221008f7e6d5c4b3a291807f6e5d4c3b2a1008f7e6d5c4b3a291807f6e5d4c3b2a100',
      waktuTtd: '2026-10-08 08:30:00 WIB',
      status: 'TERVERIFIKASI',
    },
    penerbitanDukcapil: {
      nomorAkta: '3273-KM-2026-0504',
      namaPejabat: 'H. Dedi Hermawan, M.Si',
      nipPejabat: '19740512 199903 1 002',
      tanggalTerbit: '2026-10-08 10:00:00 WIB',
      urlValidasiQR: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0504',
    },
  },
];

// ==========================================
// 2. DATA PEJABAT RT/RW
// ==========================================
export const RT_RW_OFFICERS: RTRWOfficer[] = [
  {
    rt: '03',
    rw: '05',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    city: 'Kota Bandung',
    officerName: 'Agus Hendrawan, S.E. (Ketua RT 03)',
    officerPhone: '+62 812-3456-7890',
    officerEmail: 'rt03.rw05.merdeka@bandung.go.id',
    publicKeyEd25519:
      'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
  },
  {
    rt: '01',
    rw: '02',
    kelurahan: 'Kelurahan Sukamaju',
    kecamatan: 'Kecamatan Cibeunying Kidul',
    city: 'Kota Bandung',
    officerName: 'Drs. H. Mulyadi (Ketua RW 02)',
    officerPhone: '+62 813-9876-5432',
    officerEmail: 'rw02.sukamaju@bandung.go.id',
    publicKeyEd25519:
      'ed25519:7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
  },
  {
    rt: '04',
    rw: '07',
    kelurahan: 'Kelurahan Melati',
    kecamatan: 'Kecamatan Coblong',
    city: 'Kota Bandung',
    officerName: 'Ir. Bambang Priyono (Ketua RT 04)',
    officerPhone: '+62 857-1122-3344',
    officerEmail: 'rt04.rw07.melati@bandung.go.id',
    publicKeyEd25519:
      'ed25519:1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
  },
  {
    rt: '02',
    rw: '03',
    kelurahan: 'Kelurahan Merdeka',
    kecamatan: 'Kecamatan Sumur Bandung',
    city: 'Kota Bandung',
    officerName: 'Suryanto Wibowo (Ketua RT 02)',
    officerPhone: '+62 821-4455-6677',
    officerEmail: 'rt02.rw03.merdeka@bandung.go.id',
    publicKeyEd25519:
      'ed25519:9f8e7d6c5b4a3928170e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
  },
];

// ==========================================
// 3. DATA MOCK REPORTS (LAPORAN)
// ==========================================
export const mockReports: DeathReport[] = [
  {
    id: 'SRK-20261016-A1B2',
    reporter: {
      name: 'Rian Pratama',
      nik: '3273012508920003',
      email: 'rian.pratama@gmail.com',
      phone: '081223344556',
      relation: 'Anak Kandung',
      authMethod: 'whatsapp',
      isVerified: true,
      verifiedAt: '2026-10-16 09:15 WIB',
    },
    deceased: {
      fullName: 'H. Achmad Soeprapto, M.Eng',
      nik: '3273011405550009',
      gender: 'Laki-laki',
      dateOfBirth: '1955-05-14',
      dateOfDeath: '2026-10-15',
      timeOfDeath: '07:45',
      causeOfDeath: 'Penyakit Degeneratif & Komplikasi Usia Lanjut',
      placeOfDeath: 'RSUD Al-Ihsan Bandung',
      address: 'Jl. Merdeka No. 42, RT 03 / RW 05',
      rt: '03',
      rw: '05',
      kelurahan: 'Kelurahan Merdeka',
      kecamatan: 'Kecamatan Sumur Bandung',
      city: 'Kota Bandung',
    },
    status: 'CERTIFICATE_ISSUED',
    assignedRTRW: RT_RW_OFFICERS[0],
    submittedAt: '2026-10-16 08:30 WIB',
    documents: {
      ktpDeceasedName: 'ktp_achmad_soeprapto.pdf',
      kkDeceasedName: 'kk_327301_soeprapto.pdf',
      hospitalLetterName: 'surat_rsud_alihsan_0891.pdf',
      ktpReporterName: 'ktp_rian_pratama.pdf',
      encryptionAlgorithm: 'AES-256-GCM',
      payloadHashAes256Gcm: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      ivHex: '4a9b8c7d6e5f0123456789ab',
      encryptionTimestamp: '2026-10-16T08:28:44Z',
      aiVerification: {
        overallConfidence: 98.9,
        nikMatch: true,
        ocrConfidence: 99.4,
        faceClarity: 98.2,
        signatureDetected: true,
        status: 'VERIFIED',
        notes: 'Pencocokan NIK KTP dan KK cocok 100%. Cap basah rumah sakit terverifikasi sah.',
      },
    },
    rtRwSignature: {
      algorithm: 'Ed25519',
      signerName: 'Agus Hendrawan, S.E. (Ketua RT 03)',
      signerRole: 'Ketua RT',
      signatureHex:
        '3045022100e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a0102206b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f607182',
      publicKey: 'ed25519:e4d9c79f83a216e90145bc88ef01d84f90ab3e2154d89fa3bce4918e98341a01',
      timestamp: '2026-10-16 10:15:22 WIB',
      verified: true,
    },
    dukcapilIssuance: {
      issuedAt: '2026-10-16 10:30:00 WIB',
      officerName: 'H. Dedi Hermawan, M.Si',
      officerNip: '19740512 199903 1 002',
      certificateNumber: '3273-KM-2026-0891',
      qrValidationUrl: 'https://dukcapil.bandung.go.id/validasi/surkem/3273-KM-2026-0891',
      pbkdf2Salt: '7f9a8b1c2d3e4f5a6b7c8d9e',
      pbkdf2Iterations: 100000,
    },
    notes:
      'Kutipan Akta Kematian resmi diterbitkan secara sah oleh Dinas Dukcapil dengan segel kriptografi Ed25519 & BSrE.',
  },
  {
    id: 'SK-2026-00129',
    reporter: {
      name: 'Rian Pratama',
      nik: '3273012508920003',
      email: 'rian.pratama@gmail.com',
      phone: '081223344556',
      relation: 'Anak Kandung',
      authMethod: 'whatsapp',
      isVerified: true,
      verifiedAt: '2026-10-10 09:15 WIB',
    },
    deceased: {
      fullName: 'Bambang Soedjarwo',
      nik: '3273010504500002',
      gender: 'Laki-laki',
      dateOfBirth: '1950-04-05',
      dateOfDeath: '2026-10-09',
      timeOfDeath: '21:30',
      causeOfDeath: 'Penyakit Jantung Kronis (Sakit Alamiah)',
      placeOfDeath: 'RSUD Al-Ihsan Bandung',
      address: 'Jl. Merdeka No. 42, RT 03 / RW 05',
      rt: '03',
      rw: '05',
      kelurahan: 'Kelurahan Merdeka',
      kecamatan: 'Kecamatan Sumur Bandung',
      city: 'Kota Bandung',
    },
    status: 'AWAITING_RTRW_APPROVAL',
    assignedRTRW: RT_RW_OFFICERS[0],
    submittedAt: '2026-10-10 09:30 WIB',
    documents: {
      ktpDeceasedName: 'ktp_bambang_soedjarwo.pdf',
      kkDeceasedName: 'kartu_keluarga_327301.pdf',
      hospitalLetterName: 'surat_kematian_rsud_alihsan_0891.pdf',
      ktpReporterName: 'ktp_rian_pratama.pdf',
      encryptionAlgorithm: 'AES-256-GCM',
      payloadHashAes256Gcm: '9c5a1bf249826a8d7e0129bcfe841280a498dcfa3847291048bce9204821a7df',
      ivHex: '4a9b8c7d6e5f0123456789ab',
      encryptionTimestamp: '2026-10-10T09:28:44Z',
      aiVerification: {
        overallConfidence: 98.4,
        nikMatch: true,
        ocrConfidence: 99.1,
        faceClarity: 97.5,
        signatureDetected: true,
        status: 'VERIFIED',
        notes: 'NIK KTP dan KK cocok 100%. Cap basah rumah sakit terdeteksi dengan kejelasan 98.4%.',
      },
    },
    notes: 'Menunggu peninjauan fisik dan verifikasi berkas oleh Ketua RT 03.',
  },
  {
    id: 'SK-2026-00630',
    reporter: {
      name: 'Anisa Wibisono',
      nik: '3273014502900004',
      email: 'anisa.wibisono@gmail.com',
      phone: '081245678901',
      relation: 'Anak Kandung',
      authMethod: 'whatsapp',
      isVerified: true,
      verifiedAt: '2026-10-14 08:30 WIB',
    },
    deceased: {
      fullName: 'Ir. H. Gunawan Wibisono',
      nik: '3273010101480003',
      gender: 'Laki-laki',
      dateOfBirth: '1948-01-01',
      dateOfDeath: '2026-10-13',
      timeOfDeath: '05:30',
      causeOfDeath: 'Sakit Alamiah & Lanjut Usia',
      placeOfDeath: 'Rumah Tinggal',
      address: 'Jl. Merdeka No. 15, RT 02 / RW 03',
      rt: '02',
      rw: '03',
      kelurahan: 'Kelurahan Merdeka',
      kecamatan: 'Kecamatan Sumur Bandung',
      city: 'Kota Bandung',
    },
    status: 'AWAITING_RTRW_APPROVAL',
    assignedRTRW: RT_RW_OFFICERS[3],
    submittedAt: '2026-10-14 09:00 WIB',
    documents: {
      ktpDeceasedName: 'ktp_gunawan_wibisono.pdf',
      kkDeceasedName: 'kk_gunawan_wibisono.pdf',
      hospitalLetterName: 'surat_keterangan_puskesmas_merdeka.pdf',
      ktpReporterName: 'ktp_anisa_wibisono.pdf',
      encryptionAlgorithm: 'AES-256-GCM',
      payloadHashAes256Gcm: '1029384756afbecd0192837465fabedc9081726354abcedf1234567890abcdef',
      ivHex: '9f8e7d6c5b4a3928170e1f2a',
      encryptionTimestamp: '2026-10-14T08:58:12Z',
      aiVerification: {
        overallConfidence: 99.1,
        nikMatch: true,
        ocrConfidence: 99.5,
        faceClarity: 98.7,
        signatureDetected: true,
        status: 'VERIFIED',
        notes: 'Pencocokan NIK dan dokumen sah sesuai basis data SIAK.',
      },
    },
    notes: 'Menunggu pemeriksaan fisik dan tanda tangan digital Ed25519 Ketua RT.',
  },
];

// ==========================================
// 4. MOCK OFFICER SESSION & AUTH
// ==========================================
export const mockOfficerSession: OfficerSession = {
  name: 'Agus Hendrawan, S.E.',
  role: 'rtrw',
};

export const mockWargaSession: WargaSession = {
  isLoggedIn: true,
  role: 'warga',
  name: 'Warga Demo',
  phone: '081223344556',
};

const mockDukcapilSession: OfficerSession = {
  name: 'H. Dedi Hermawan, M.Si',
  role: 'dukcapil',
  nipOrNik: '19740512 199903 1 002',
  region: 'Kota Bandung',
};

const SESSION_STORAGE_KEY = 'websurkem_user_session';
const USER_SESSION_CHANGED_EVENT = 'websurkem_user_session_changed';
const OFFICER_SESSION_CHANGED_EVENT = 'websurkem_officer_session_changed';

let currentUserSession: UserSession | null = null;
let hasLoadedSession = false;

function isOfficerSession(session: unknown): session is OfficerSession {
  if (typeof session !== 'object' || session === null) return false;

  const candidate = session as Partial<OfficerSession>;
  return (
    (candidate.role === 'rtrw' || candidate.role === 'dukcapil') &&
    typeof candidate.name === 'string'
  );
}

function isWargaSession(session: unknown): session is WargaSession {
  if (typeof session !== 'object' || session === null) return false;

  const candidate = session as Partial<WargaSession>;
  return (
    candidate.role === 'warga' &&
    candidate.isLoggedIn === true &&
    typeof candidate.name === 'string' &&
    typeof candidate.phone === 'string'
  );
}

function parseStoredSession(): UserSession | null {
  try {
    const storedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSession) return null;

    const parsed: unknown = JSON.parse(storedSession);
    if (isOfficerSession(parsed) || isWargaSession(parsed)) return parsed;

    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  } catch (error) {
    console.error('Unable to read the saved WebSurkem session.', error);
    return null;
  }
}

function loadSession(): void {
  if (typeof window === 'undefined' || hasLoadedSession) return;
  currentUserSession = parseStoredSession();
  hasLoadedSession = true;
}

export function getUserSession(): UserSession | null {
  loadSession();
  return currentUserSession;
}

export function getOfficerSession(): OfficerSession | null {
  const session = getUserSession();
  return session && isOfficerSession(session) ? session : null;
}

export function getWargaSession(): WargaSession | null {
  const session = getUserSession();
  return session && isWargaSession(session) ? session : null;
}

export function subscribeToUserSession(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== SESSION_STORAGE_KEY && event.key !== null) return;
    currentUserSession = parseStoredSession();
    hasLoadedSession = true;
    onChange();
  };

  window.addEventListener(USER_SESSION_CHANGED_EVENT, onChange);
  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener(USER_SESSION_CHANGED_EVENT, onChange);
    window.removeEventListener('storage', handleStorageChange);
  };
}

export function setUserSession(session: UserSession | null): void {
  currentUserSession = session;
  hasLoadedSession = true;

  if (typeof window === 'undefined') return;

  try {
    if (session) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Unable to save the WebSurkem session in this browser.', error);
  }

  window.dispatchEvent(new Event(USER_SESSION_CHANGED_EVENT));
  window.dispatchEvent(
    new CustomEvent(OFFICER_SESSION_CHANGED_EVENT, {
      detail: { session: isOfficerSession(session) ? session : null },
    })
  );
}

export function logoutOfficer(): void {
  setUserSession(null);
}

export function logoutUser(): void {
  setUserSession(null);
}

export function validateOfficerCredential(
  username: string,
  password: string
): OfficerSession | null {
  const normalizedUsername = username.trim().toLowerCase();
  if (!normalizedUsername || !password) return null;

  if (
    (normalizedUsername === 'rt03' ||
      normalizedUsername === 'rt03.rw05.merdeka@bandung.go.id') &&
    password === 'rt123'
  ) {
    return mockOfficerSession;
  }

  if (
    (normalizedUsername === 'admin' ||
      normalizedUsername === 'admin@dukcapil.go.id') &&
    password === 'admin123'
  ) {
    return mockDukcapilSession;
  }

  return null;
}

export function setOfficerSession(session: OfficerSession | null): void {
  setUserSession(session);
}

export function validateWargaLogin(name: string, phone: string): WargaSession | null {
  const normalizedName = name.trim();
  const normalizedPhone = phone.replace(/[^\d]/g, '');

  if (!normalizedName || normalizedPhone.length < 8 || normalizedPhone.length > 15) {
    return null;
  }

  return {
    ...mockWargaSession,
    name: normalizedName,
    phone: normalizedPhone,
  };
}

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================
export function getDaftarSurat(): SuratKematianItem[] {
  return daftarSurat;
}

export function findSuratByNoRegis(noRegis: string): SuratKematianItem | null {
  if (!noRegis) return null;
  const norm = noRegis.trim().toUpperCase();
  const found = daftarSurat.find((item) => item.noRegis.toUpperCase() === norm);
  return found || null;
}

export function getReportByRegistrationId(noRegis: string): DeathReport | null {
  const surat = findSuratByNoRegis(noRegis);
  if (!surat) return null;

  const matchedOfficer =
    RT_RW_OFFICERS.find(
      (o) => o.rt === surat.rt && o.rw === surat.rw && o.kelurahan === surat.kelurahan
    ) || RT_RW_OFFICERS[0];

  return {
    id: surat.noRegis,
    reporter: {
      name: surat.namaPelapor,
      nik: '3273010000000000',
      email: `${surat.namaPelapor.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: '081234567890',
      relation: surat.hubunganPelapor,
      authMethod: 'whatsapp',
      isVerified: true,
      verifiedAt: surat.tanggalWafat,
    },
    deceased: {
      fullName: surat.namaAlmarhum,
      nik: surat.nikAlmarhum,
      gender: surat.jenisKelamin,
      dateOfBirth: '1950-01-01',
      dateOfDeath: surat.tanggalWafat,
      timeOfDeath: surat.waktuWafat || '10:00 WIB',
      causeOfDeath: surat.penyebabWafat,
      placeOfDeath: surat.tempatWafat,
      address: surat.alamatDuka,
      rt: surat.rt,
      rw: surat.rw,
      kelurahan: surat.kelurahan,
      kecamatan: surat.kecamatan,
      city: surat.kota,
    },
    status: surat.statusVerifikasi,
    assignedRTRW: matchedOfficer,
    submittedAt: `${surat.tanggalWafat} 08:00 WIB`,
    documents: {
      ktpDeceasedName: `ktp_${surat.namaAlmarhum.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      kkDeceasedName: `kk_${surat.nikAlmarhum.slice(0, 6)}.pdf`,
      hospitalLetterName: `surat_medis_${surat.noRegis.toLowerCase()}.pdf`,
      ktpReporterName: 'ktp_pelapor.pdf',
      encryptionAlgorithm: 'AES-256-GCM',
      payloadHashAes256Gcm: surat.hashSHA256,
      ivHex: '4a9b8c7d6e5f0123456789ab',
      encryptionTimestamp: `${surat.tanggalWafat}T08:00:00Z`,
      aiVerification: {
        overallConfidence: 98.8,
        nikMatch: true,
        ocrConfidence: 99.2,
        faceClarity: 98.0,
        signatureDetected: true,
        status: 'VERIFIED',
        notes: 'Pencocokan NIK dan integritas dokumen sah.',
      },
    },
    rtRwSignature: surat.tandaTanganEd25519
      ? {
          algorithm: 'Ed25519',
          signerName: surat.tandaTanganEd25519.namaPenandatangan,
          signerRole: 'Ketua RT',
          signatureHex: surat.tandaTanganEd25519.signatureHex,
          publicKey: surat.tandaTanganEd25519.publicKey,
          timestamp: surat.tandaTanganEd25519.waktuTtd,
          verified: true,
        }
      : undefined,
    dukcapilIssuance: surat.penerbitanDukcapil
      ? {
          issuedAt: surat.penerbitanDukcapil.tanggalTerbit,
          officerName: surat.penerbitanDukcapil.namaPejabat,
          officerNip: surat.penerbitanDukcapil.nipPejabat,
          certificateNumber: surat.penerbitanDukcapil.nomorAkta,
          qrValidationUrl: surat.penerbitanDukcapil.urlValidasiQR,
          pbkdf2Salt: '7f9a8b1c2d3e4f5a6b7c8d9e',
          pbkdf2Iterations: 100000,
        }
      : undefined,
    notes: 'Kutipan Akta Kematian resmi terdaftar dalam basis data SPBE.',
  };
}

export function getAllReports(): DeathReport[] {
  const items = getDaftarSurat();
  const reports = items.map((i) => getReportByRegistrationId(i.noRegis));
  return reports.filter((r): r is DeathReport => r !== null);
}

export function getReportById(id: string): DeathReport | null {
  if (!id) return null;
  const norm = id.trim().toUpperCase();

  const foundInMock = getAllDashboardReports().find(
    (item) =>
      item.id.toUpperCase() === norm ||
      item.id.toUpperCase().replace(/-/g, '') === norm.replace(/-/g, '')
  );
  if (foundInMock) return foundInMock;

  return getReportByRegistrationId(norm);
}

export function getAllDashboardReports(): DeathReport[] {
  const reportsFromSurat = getAllReports();
  const map = new Map<string, DeathReport>();
  mockReports.forEach((r) => map.set(r.id.toUpperCase(), r));
  reportsFromSurat.forEach((r) => {
    if (!map.has(r.id.toUpperCase())) {
      map.set(r.id.toUpperCase(), r);
    }
  });
  return Array.from(map.values());
}

// Tambahkan di bagian bawah lib/mockData.ts

export function findRTRWOfficer(
  rt: string,
  rw: string,
  kelurahan: string
): RTRWOfficer {
  const found = RT_RW_OFFICERS.find(
    (o) => o.rt === rt && o.rw === rw && o.kelurahan === kelurahan
  );
  return found || RT_RW_OFFICERS[0];
}

export function addReport(newReportData: Partial<DeathReport>): DeathReport {
  const newReport: DeathReport = {
    id: `SK-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    submittedAt: new Date().toLocaleString('id-ID'),
    status: 'AWAITING_RTRW_APPROVAL',
    reporter: newReportData.reporter || {
      name: 'Pelapor',
      nik: '3273010000000000',
      email: 'pelapor@email.com',
      phone: '081234567890',
      relation: 'Keluarga',
      authMethod: 'whatsapp',
      isVerified: true,
      verifiedAt: new Date().toISOString(),
    },
    deceased: newReportData.deceased || {
      fullName: 'Almarhum',
      nik: '3273010000000000',
      gender: 'Laki-laki',
      dateOfBirth: '1970-01-01',
      dateOfDeath: new Date().toISOString().split('T')[0],
      timeOfDeath: '10:00 WIB',
      causeOfDeath: 'Sakit Alamiah',
      placeOfDeath: 'Rumah Tinggal',
      address: 'Jl. Merdeka',
      rt: '03',
      rw: '05',
      kelurahan: 'Kelurahan Merdeka',
      kecamatan: 'Kecamatan Sumur Bandung',
      city: 'Kota Bandung',
    },
    documents: newReportData.documents || {
      ktpDeceasedName: 'ktp.pdf',
      kkDeceasedName: 'kk.pdf',
      hospitalLetterName: 'surat_rs.pdf',
      ktpReporterName: 'ktp_pelapor.pdf',
      encryptionAlgorithm: 'AES-256-GCM',
      payloadHashAes256Gcm: 'mockhash123',
      ivHex: '4a9b8c7d6e5f0123456789ab',
      encryptionTimestamp: new Date().toISOString(),
      aiVerification: {
        overallConfidence: 99.0,
        nikMatch: true,
        ocrConfidence: 99.0,
        faceClarity: 98.0,
        signatureDetected: true,
        status: 'VERIFIED',
        notes: 'Dokumen lengkap dan valid.',
      },
    },
    assignedRTRW: newReportData.assignedRTRW || RT_RW_OFFICERS[0],
    notes: 'Pengajuan baru berhasil disimpan ke sistem.',
    ...newReportData,
  };

  mockReports.unshift(newReport);
  return newReport;
}

// Tambahkan di bagian bawah lib/mockData.ts

// Mock data untuk Audit Log
export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-10-16 10:15:22 WIB',
    action: 'VERIFY_REPORT',
    actorName: 'Agus Hendrawan, S.E.',
    actorRole: 'Ketua RT/RW',
    targetReportId: 'SRK-20261016-A1B2',
    cryptoHash: 'ed25519:3045022100e4d9c79f83a216e90145bc88ef01d84f',
    details: 'Menyetujui permohonan surat kematian SRK-20261016-A1B2',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-10-16 10:30:00 WIB',
    action: 'ISSUE_CERTIFICATE',
    actorName: 'H. Dedi Hermawan, M.Si',
    actorRole: 'Petugas Dukcapil',
    targetReportId: 'SRK-20261016-A1B2',
    cryptoHash: 'bsre:3273-KM-2026-0891:pbkdf2_100k',
    details: 'Menerbitkan Akta Kematian Nomor 3273-KM-2026-0891',
  },
];

// Helper Function: Ambil semua laporan terdaftar
export function getStoredReports(): DeathReport[] {
  return getAllDashboardReports();
}

// Helper Function: Update status laporan
export function updateReportStatus(
  reportId: string,
  newStatus: CertificateStatus,
  updates: Partial<Pick<DeathReport, 'rtRwSignature' | 'dukcapilIssuance' | 'notes'>> = {}
): DeathReport[] {
  const normalizedId = reportId.trim().toUpperCase();
  const report = getAllDashboardReports().find(
    (item) => item.id.toUpperCase() === normalizedId
  );
  if (!report) return getAllDashboardReports();

  report.status = newStatus;
  Object.assign(report, updates);
  if (!mockReports.includes(report)) mockReports.unshift(report);

  return getAllDashboardReports();
}

// Helper Function: Ambil daftar audit log
export function getStoredAuditLogs(): AuditLogEntry[] {
  return mockAuditLogs;
}

// Helper Function: Tambah catatan audit log baru
export function addAuditLog(log: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
  const newLog: AuditLogEntry = {
    id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toLocaleString('id-ID'),
    ...log,
  };
  mockAuditLogs.unshift(newLog);
  return newLog;
}