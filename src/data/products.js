export const ACCENT = '#B7F23A';

export const CATEGORIES = ['All', 'Ebooks', 'Birthday', 'Aqiqah', 'Wedding', 'Other'];
export const PLACEHOLDER_CATEGORIES = ['Wedding', 'Other'];

export const FALLBACK_REVIEWS = [
  {
    name: 'Hanis Z.',
    initials: 'HZ',
    when: '1 week ago',
    text: 'Buku ni bukak mata aku betul-betul. Selama ni aku fikir RM10K tu jauh sangat, tapi lepas baca baru faham kenapa ia penting sangat sebagai titik mula.',
  },
  {
    name: 'Ridhwan A.',
    initials: 'RA',
    when: '2 weeks ago',
    text: "Simple, straight to the point, and no fluff. Irfan tulis macam cakap dengan kita terus. Dah recommend kat semua kawan-kawan.",
  },
];

export const PRODUCTS = [
  {
    id: 'solo-founder',
    title: 'Kenapa RM10K Pertama Anda Penting?',
    cat: 'Ebooks',
    price: 19,
    originalPrice: 29,
    cover: 'EBOOK · PDF',
    coverShort: 'PDF',
    coverImg: '/uploads/ebook-cover.png',
    rating: '4.7',
    reviews: 2,
    sales: '5',
    gallery: [
      '/uploads/ebook-cover.png',
      '/uploads/ebook-gallery-1.png',
      '/uploads/ebook-gallery-2.png',
      '/uploads/ebook-gallery-3.png',
      '/uploads/ebook-gallery-4.png',
      '/uploads/ebook-gallery-5.png',
      '/uploads/ebook-gallery-6.png',
      '/uploads/ebook-gallery-7.png',
      '/uploads/ebook-gallery-8.png',
    ],
    desc: 'Bukan tentang jadi kaya. Tapi tentang berhenti hidup cukup-cukup makan. Ubah cara anda urus duit, ubah hidup anda.',
    bullets: ['Simpan, labur & bina aset', 'Disiplin kewangan harian', 'Jalan menuju kebebasan kewangan', 'Lifetime updates'],
    badges: ['PDF', 'Lifetime updates'],
    pay: 'https://toyyibpay.com/RM10K-pertama-anda',
  },
  {
    id: 'birthday-bella',
    title: 'Interactive Birthday Card - 001',
    cat: 'Birthday',
    price: 29,
    originalPrice: 39,
    cover: 'WEB CARD',
    coverShort: 'WEB',
    coverImg: '/uploads/birthday-gallery-1.png',
    rating: '5.0',
    reviews: 2,
    sales: '10',
    gallery: [
      '/uploads/birthday-gallery-1.png',
      '/uploads/birthday-gallery-2.png',
      '/uploads/birthday-gallery-3.png',
      '/uploads/birthday-gallery-4.png',
    ],
    desc: 'A cute animated birthday card with a secret password, love letter reveal, and music. Send the link — they tap through the surprise themselves.',
    bullets: ['Password-protected surprise', 'Animated character & music', 'Personalised love letter', 'Instant link delivery'],
    badges: ['Web link', 'Personalised', 'Music'],
    pay: 'https://toyyibpay.com/Birthday-Wish-by-Arterlier-001',
    productReviews: [
      { name: 'Anis S.', initials: 'AS', when: '3 days ago', text: 'Dia nangis tau! Betul-betul terharu. Password dia letak birthday dia sendiri, comel gila cara dia reveal. Memang berbaloi beli.' },
      { name: 'Hafiz M.', initials: 'HM', when: '1 week ago', text: "Sent this to my girlfriend and she loved every single part — the cat, the music, the letter. She said it's the sweetest thing I've ever done 😭" },
    ],
  },
  {
    id: 'aqiqah-floral-001',
    title: 'Jemputan Majlis Aqiqah — Floral Pink',
    cat: 'Aqiqah',
    price: 15,
    cover: 'DIGITAL INVITE',
    coverShort: 'INVITE',
    coverImg: '/uploads/aqiqah-cover.png',
    rating: '5.0',
    reviews: 1,
    sales: '1',
    desc: 'Kad jemputan digital untuk Majlis Aqiqah & Doa Selamat. Reka bentuk floral yang elegan, mudah dikongsi melalui WhatsApp atau media sosial.',
    bullets: [
      'Reka bentuk floral eksklusif',
      'Format mobile-friendly',
      'Mudah kongsi via WhatsApp',
      'Nama & tarikh boleh ditukar',
      'QR Code lokasi majlis — tetamu scan terus ke Google Maps',
    ],
    gallery: [
      '/uploads/aqiqah-cover.png',
      { type: 'video', src: '/uploads/aqiqah-demo.mp4', poster: '/uploads/aqiqah-cover.png' },
    ],
    badges: ['Digital', 'Personalised'],
    pay: 'https://toyyibpay.com/Jemputan-Majlis-Aqiqah-Flora',
    productReviews: [
      { name: 'Ummi Syifaa', initials: 'US', when: '1 week ago', text: 'Cantik sangat design dia! Semua tetamu puji kad jemputan ni. Mudah kongsi, cepat siap. Terima kasih Artelier Irfan!' },
    ],
  },
];

// Popular Now / Featured carousel order: birthday card first, then ebook.
export const FEATURED_IDS = ['birthday-bella', 'solo-founder'];
