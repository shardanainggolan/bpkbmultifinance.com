export const SITE_URL = "https://bpkbmultifinance.id";
export const SITE_NAME = "BPKB Multi Finance - Agen Resmi Adira Finance";
export const WA_NUMBER = "6285122682981";

export const WA_MESSAGE_DEFAULT = "Halo saya ingin mengajukan gadai BPKB";

export function getWaLink(message?: string): string {
  const msg = encodeURIComponent(message ?? WA_MESSAGE_DEFAULT);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export function getWaLinkBranch(_branchName: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_DEFAULT)}`;
}

export const API_BASE_URL = "https://backend.adiracabang.id";
export const API_IMAGE_BASE = "https://backend.adiracabang.id/uploads";

export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/#produk" },
  { label: "Syarat", href: "/#syarat" },
  { label: "Simulasi", href: "/#simulasi" },
  { label: "FAQ", href: "/#faq" },
  { label: "Cabang", href: "/cabang" },
  { label: "Hubungi Kami", href: `https://wa.me/${WA_NUMBER}`, external: true },
];

export const KEUNGGULAN = [
  {
    icon: "Zap",
    title: "Proses Cepat 1-2 Hari",
    desc: "Dari pengajuan dokumen hingga dana cair ke rekening Anda hanya dalam 1-2 hari kerja.",
  },
  {
    icon: "TrendingDown",
    title: "Bunga Kompetitif",
    desc: "Nikmati suku bunga mulai dari 0,8% per bulan, jauh lebih rendah dibanding pinjaman konvensional.",
  },
  {
    icon: "Calendar",
    title: "Tenor Fleksibel",
    desc: "Pilih tenor cicilan sesuai kemampuan Anda, mulai dari 6 bulan hingga 48 bulan.",
  },
  {
    icon: "Shield",
    title: "BPKB Aman & Terjamin",
    desc: "BPKB Anda tersimpan aman di Adira Finance, perusahaan pembiayaan terpercaya diawasi OJK.",
  },
  {
    icon: "Car",
    title: "Kendaraan Tetap Digunakan",
    desc: "Kendaraan Anda tidak perlu dititipkan. Tetap gunakan sehari-hari seperti biasa.",
  },
  {
    icon: "Wallet",
    title: "Pencairan Langsung",
    desc: "Dana pinjaman langsung ditransfer ke rekening pribadi Anda tanpa potongan biaya tersembunyi.",
  },
];

export const PRODUK = [
  {
    type: "mobil" as const,
    title: "Gadai BPKB Mobil",
    subtitle: "Kredit Multiguna Jaminan BPKB Mobil",
    icon: "Car",
    highlight: "Hingga Rp 400 Juta",
    features: [
      { label: "Plafon Pinjaman", value: "Rp 5 juta – Rp 400 juta" },
      { label: "Tenor", value: "12 – 48 bulan" },
      { label: "Usia Kendaraan", value: "Maksimal 15 tahun" },
      { label: "Proses", value: "1-2 hari kerja" },
      { label: "Pencairan", value: "Transfer ke rekening" },
    ],
    desc: "Pinjaman dana tunai dengan jaminan BPKB mobil untuk berbagai kebutuhan: modal usaha, renovasi rumah, biaya pendidikan, atau kebutuhan mendesak lainnya.",
  },
  {
    type: "motor" as const,
    title: "Gadai BPKB Motor",
    subtitle: "Kredit Multiguna Jaminan BPKB Motor",
    icon: "Bike",
    highlight: "Hingga Rp 50 Juta",
    features: [
      { label: "Plafon Pinjaman", value: "Rp 2 juta – Rp 50 juta" },
      { label: "Tenor", value: "6 – 36 bulan" },
      { label: "Usia Kendaraan", value: "Maksimal 10 tahun" },
      { label: "Proses", value: "1-2 hari kerja" },
      { label: "Pencairan", value: "Transfer ke rekening" },
    ],
    desc: "Solusi pinjaman cepat dengan jaminan BPKB motor. Tidak perlu agunan lain, cukup BPKB motor Anda dan dana bisa segera cair.",
  },
];

export const SYARAT_PEMOHON = [
  "WNI berusia 21 – 55 tahun",
  "Memiliki penghasilan tetap atau usaha yang berjalan",
  "Kendaraan atas nama sendiri, pasangan, atau orang tua",
  "BPKB asli (bukan duplikat atau salinan)",
  "Kendaraan tidak dalam status kredit aktif",
  "Domisili sesuai KTP atau dapat diverifikasi",
];

export const DOKUMEN_MOBIL = [
  "KTP pemohon (dan KTP pasangan jika sudah menikah)",
  "Kartu Keluarga (KK)",
  "BPKB asli kendaraan",
  "STNK yang masih berlaku",
  "Slip gaji 3 bulan terakhir / Surat Keterangan Usaha",
  "Rekening koran 3 bulan terakhir (opsional)",
  "NPWP (untuk pinjaman di atas Rp 50 juta)",
];

export const DOKUMEN_MOTOR = [
  "KTP pemohon (dan KTP pasangan jika sudah menikah)",
  "Kartu Keluarga (KK)",
  "BPKB asli kendaraan",
  "STNK yang masih berlaku",
  "Slip gaji / Surat Keterangan Usaha",
];

export const PROSES_STEPS = [
  {
    step: 1,
    icon: "MessageCircle",
    title: "Hubungi Kami",
    desc: "Konsultasi gratis via WhatsApp atau telepon. Ceritakan kebutuhan dana dan data kendaraan Anda.",
  },
  {
    step: 2,
    icon: "FileText",
    title: "Kirim Dokumen",
    desc: "Kirim foto/scan dokumen persyaratan via WhatsApp. Tim kami akan melakukan pengecekan awal.",
  },
  {
    step: 3,
    icon: "Search",
    title: "Survei & Verifikasi",
    desc: "Tim Adira Finance melakukan survei kondisi kendaraan di lokasi Anda. Proses cepat 1 hari.",
  },
  {
    step: 4,
    icon: "CheckCircle",
    title: "Approval & Pencairan",
    desc: "Pengajuan disetujui, akad kredit ditandatangani, dan dana langsung cair ke rekening Anda.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Apa itu pinjaman dana gadai BPKB Adira Finance?",
    a: "Pinjaman dana gadai BPKB Adira Finance adalah fasilitas kredit multiguna yang menggunakan BPKB (Bukti Pemilikan Kendaraan Bermotor) mobil atau motor sebagai jaminan. Anda tetap dapat menggunakan kendaraan seperti biasa, sementara dana pinjaman langsung cair ke rekening Anda.",
  },
  {
    q: "Apakah kendaraan saya masih bisa digunakan setelah BPKB digadaikan?",
    a: "Ya, kendaraan Anda tetap bisa digunakan sehari-hari. Yang dijadikan jaminan hanyalah dokumen BPKB, bukan kendaraannya. Kendaraan tidak perlu dititipkan ke Adira Finance selama masa pinjaman berlangsung.",
  },
  {
    q: "Berapa lama proses pencairan pinjaman gadai BPKB?",
    a: "Proses pencairan berlangsung 1-2 hari kerja sejak dokumen lengkap diterima dan survei kendaraan selesai dilakukan. Ini menjadikan gadai BPKB Adira Finance sebagai solusi tercepat untuk kebutuhan dana mendesak.",
  },
  {
    q: "Berapa plafon pinjaman maksimal yang bisa saya dapatkan?",
    a: "Plafon pinjaman ditentukan berdasarkan nilai appraisal kendaraan Anda. Untuk BPKB mobil, plafon bisa mencapai Rp 400 juta. Untuk BPKB motor, hingga Rp 50 juta. Umumnya plafon diberikan sekitar 70-80% dari nilai kendaraan.",
  },
  {
    q: "Apakah BPKB saya aman selama digadaikan di Adira Finance?",
    a: "Ya, BPKB Anda tersimpan dengan sangat aman. Adira Finance (PT Adira Dinamika Multi Finance Tbk) adalah perusahaan pembiayaan resmi yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK), sehingga keamanan dokumen Anda terjamin.",
  },
  {
    q: "Apakah bisa melunasi pinjaman lebih awal dari tenor yang disepakati?",
    a: "Ya, Anda dapat melunasi pinjaman lebih awal (pelunasan dipercepat). Syarat dan ketentuan pelunasan dipercepat mengikuti kebijakan Adira Finance yang berlaku. Hubungi kami untuk informasi lebih lanjut mengenai perhitungan sisa kewajiban.",
  },
  {
    q: "Apakah bisa mengajukan jika STNK kendaraan sudah mati?",
    a: "Pada umumnya STNK harus masih berlaku sebagai salah satu syarat pengajuan. Namun beberapa kondisi dapat didiskusikan. Silakan hubungi kami untuk konsultasi sesuai kondisi kendaraan Anda.",
  },
  {
    q: "Apakah bisa mengajukan jika kendaraan masih kredit atau BPKB belum jadi?",
    a: "Untuk pengajuan gadai BPKB, kendaraan harus sudah dalam kondisi lunas dan BPKB asli sudah di tangan Anda. Kendaraan yang masih dalam masa kredit aktif belum bisa dijadikan jaminan.",
  },
];

export const TESTIMONI = [
  {
    name: "Budi Santoso",
    kota: "Jakarta Selatan",
    rating: 5,
    text: "Prosesnya sangat cepat dan mudah! Dalam 2 hari kerja dana sudah cair ke rekening saya. Tim agen sangat membantu menjelaskan semua persyaratan. Recommended banget!",
    pinjaman: "BPKB Mobil",
  },
  {
    name: "Sri Wahyuni",
    kota: "Bekasi",
    rating: 5,
    text: "Saya butuh dana cepat untuk modal usaha. Alhamdulillah dengan gadai BPKB motor di Adira Finance prosesnya sangat lancar. Tidak ribet dan tidak perlu titip kendaraan.",
    pinjaman: "BPKB Motor",
  },
  {
    name: "Ahmad Fauzi",
    kota: "Tangerang",
    rating: 5,
    text: "Awalnya saya ragu-ragu, tapi setelah konsultasi via WhatsApp semua jelas. Dokumen saya lengkap dan dalam hitungan hari pinjaman langsung approved. Terima kasih!",
    pinjaman: "BPKB Mobil",
  },
  {
    name: "Dewi Rahayu",
    kota: "Depok",
    rating: 4,
    text: "Pelayanan ramah dan profesional. Bunga kompetitif dibanding tempat lain. Proses survei juga cepat, tim Adira Finance langsung datang ke rumah saya.",
    pinjaman: "BPKB Motor",
  },
];
