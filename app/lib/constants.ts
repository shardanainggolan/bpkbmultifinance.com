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
  { label: "Agen AXI", href: "/agen-axi" },
  { label: "Hubungi Kami", href: `https://wa.me/${WA_NUMBER}`, external: true },
];

export const KEUNGGULAN = [
  {
    icon: "Zap",
    title: "Proses Cepat 1-3 Hari",
    desc: "Dari pengajuan dokumen hingga dana cair ke rekening Anda hanya dalam 1-3 hari kerja.",
  },
  {
    icon: "TrendingDown",
    title: "Bunga Tetap Kompetitif",
    desc: "Nikmati bunga tetap mulai dari 1,66% per bulan — transparan, tidak berubah selama tenor.",
  },
  {
    icon: "Calendar",
    title: "Tenor Fleksibel",
    desc: "Pilih tenor cicilan sesuai kemampuan Anda, mulai dari 12 bulan hingga 60 bulan.",
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
      { label: "Plafon Pinjaman", value: "Rp 20 juta – Rp 400 juta" },
      { label: "Tenor", value: "12 – 60 bulan" },
      { label: "Usia Kendaraan", value: "Maksimal 15 tahun" },
      { label: "Proses", value: "1-3 hari kerja" },
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
      { label: "Plafon Pinjaman", value: "Rp 3 juta – Rp 50 juta" },
      { label: "Tenor", value: "12 – 36 bulan" },
      { label: "Usia Kendaraan", value: "Maksimal 10 tahun" },
      { label: "Proses", value: "1-3 hari kerja" },
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
    a: "Proses pencairan berlangsung 1-3 hari kerja sejak dokumen lengkap diterima dan survei kendaraan selesai dilakukan. Ini menjadikan gadai BPKB Adira Finance sebagai solusi cepat untuk kebutuhan dana mendesak.",
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
  {
    q: "Apakah bpkbmultifinance.id adalah website resmi Adira Finance?",
    a: "bpkbmultifinance.id adalah platform milik Agen AXI (Adira Xtra Income) terdaftar — program keagenan resmi yang dikelola oleh PT Adira Dinamika Multi Finance Tbk. Agen yang mengelola website ini adalah Sharda dengan ID Agen AXI 012625001169. Semua pengajuan diproses melalui sistem resmi Adira Finance dan BPKB nasabah tersimpan langsung di kantor cabang Adira Finance. Untuk informasi resmi Adira Finance, kunjungi www.adira.co.id.",
  },
];

export const WA_MESSAGE_AXI =
  "Halo, saya tertarik bergabung jadi Agen AXI Adira Finance. Mohon info pendaftaran.";

export function getWaLinkAxi(): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_AXI)}`;
}

export const AXI_INCOME_TYPES = [
  { id: 1, name: "Insentif Pribadi", frequency: "Harian", source: "Setiap penjualan pribadi yang berhasil" },
  { id: 2, name: "Insentif Apresiasi", frequency: "Bulanan", source: "Bonus berdasarkan jumlah unit terjual" },
  { id: 3, name: "Break The Limit (BTL)", frequency: "Bulanan", source: "Bonus berdasarkan nilai amount penjualan" },
  { id: 4, name: "Insentif Mentor", frequency: "Bulanan", source: "Dari penjualan jaringan Rekan Bisnis 1–10" },
  { id: 5, name: "Insentif Group", frequency: "6 Bulanan", source: "5–15% dari insentif Rekan Bisnis 1" },
  { id: 6, name: "Bonus Tahunan", frequency: "Tahunan", source: "Rp 100rb–300rb/bulan per RB1 Excellent" },
  { id: 7, name: "Bonus Loyalti", frequency: "3 Tahunan", source: "Akumulasi penjualan 3 tahun" },
];

export const AXI_MATRIX_LEVELS = [
  { level: "Fair",      phRange: "> Rp 0 – Rp 50jt",    units: "< 8 unit",    multiplier: "1x",   highlight: false },
  { level: "Good",      phRange: "Rp 50 – Rp 200jt",    units: "8 – 9 unit",  multiplier: "1x",   highlight: false },
  { level: "Great",     phRange: "Rp 200 – Rp 350jt",   units: "10 – 14 unit",multiplier: "1x",   highlight: false },
  { level: "Fantastic", phRange: "Rp 350 – Rp 500jt",   units: "15 – 19 unit",multiplier: "1,5x", highlight: true  },
  { level: "Excellent", phRange: "> Rp 500jt",           units: "≥ 20 unit",   multiplier: "2x",   highlight: true  },
];

export const AXI_FAQ_ITEMS = [
  {
    q: "Apa itu Agen AXI Adira Finance?",
    a: "AXI (Adira Xtra Income) adalah program keagenan resmi PT Adira Dinamika Multi Finance Tbk untuk individu atau badan hukum yang ingin mendapatkan penghasilan tambahan dengan menjual produk pembiayaan Adira Finance kepada calon nasabah.",
  },
  {
    q: "Berapa biaya untuk menjadi Agen AXI?",
    a: "Pendaftaran GRATIS untuk tahun pertama. Mulai tahun kedua, ada Annual Fee sebesar Rp 120.000/tahun.",
  },
  {
    q: "Berapa lama proses pendaftaran Agen AXI?",
    a: "ID AXI dikirimkan paling lama 1×24 jam (hari kerja) setelah dokumen lengkap diterima dan diverifikasi.",
  },
  {
    q: "Apakah harus punya pengalaman berjualan?",
    a: "Tidak harus. Adira Finance menyediakan AXI Training setiap Selasa & Jumat pukul 15.00–17.00 WIB untuk semua agen baru. Anda juga akan mendapat Mentor AXI senior yang membimbing langsung.",
  },
  {
    q: "Kapan insentif dibayarkan?",
    a: "Insentif Pribadi dibayar harian. Insentif Apresiasi, BTL, dan Mentor dibayar bulanan. Insentif Group per 6 bulan. Bonus Tahunan per 12 bulan. Bonus Loyalti per 3 tahun.",
  },
  {
    q: "Bisakah AXI dilakukan sambil kerja atau sebagai side income?",
    a: "Bisa! Salah satu keunggulan utama AXI adalah fleksibilitas waktu. Anda mengatur sendiri jam kerja, bisa bekerja dari mana saja dan kapan saja, tanpa kewajiban jam kantor.",
  },
  {
    q: "Apakah AXI resmi dan aman?",
    a: "100% resmi. AXI adalah program PT Adira Dinamika Multi Finance Tbk (IDX: ADMF), perusahaan publik yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK), serta tergabung dalam MUFG Group.",
  },
  {
    q: "Apakah saya akan mendapat bimbingan setelah mendaftar?",
    a: "Ya. Setelah terdaftar sebagai AXI, Anda mendapat Mentor AXI senior yang membimbing langsung, akses ke AXI Training reguler setiap Selasa & Jumat, serta bergabung ke komunitas agen aktif.",
  },
];

export const AXI_HOW_IT_WORKS = [
  {
    step: 1,
    title: "Prospek Nasabah",
    desc: "Setelah mendapat ID AXI, langsung lakukan prospek terhadap calon nasabah yang membutuhkan pembiayaan kendaraan atau gadai BPKB.",
  },
  {
    step: 2,
    title: "Submit Pengajuan",
    desc: "Kirim Polling Order ke Adira via aplikasi Dicicilaja.com. Dibantu oleh tim senior jika butuh asistensi.",
  },
  {
    step: 3,
    title: "Survey & Verifikasi",
    desc: "Tim Surveyor Adira melakukan survey kendaraan & verifikasi data nasabah. Proses cepat 1–3 hari kerja.",
  },
  {
    step: 4,
    title: "Dana Cair + Insentif",
    desc: "Nasabah disetujui → Dana cair ke rekening nasabah → Insentif langsung masuk ke rekening AXI Anda.",
  },
];

export const AXI_REGISTRATION_STEPS = [
  {
    step: 1,
    title: "Hubungi Kami via WhatsApp",
    desc: "Klik tombol WhatsApp, konsultasi gratis dengan Agen AXI senior kami. Tidak ada paksaan, tidak ada biaya konsultasi.",
  },
  {
    step: 2,
    title: "Siapkan Dokumen",
    desc: "Foto KTP, catat nomor rekening bank aktif, siapkan email aktif. Cukup 5 menit dari HP Anda.",
  },
  {
    step: 3,
    title: "Submit Pendaftaran",
    desc: "Tim kami membantu Anda submit pendaftaran via aplikasi Dicicilaja.com. Mudah, cepat, terpandu.",
  },
  {
    step: 4,
    title: "Terima ID AXI",
    desc: "ID AXI dikirimkan ke email Anda dalam maksimal 1×24 jam hari kerja. Resmi terdaftar di sistem Adira Finance.",
  },
  {
    step: 5,
    title: "Mulai Earning!",
    desc: "Langsung prospek calon nasabah dan dapatkan insentif pertama Anda. Ikuti AXI Training untuk percepat pertumbuhan.",
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
