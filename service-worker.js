// Nama cache
const CACHE_NAME = 'toko-whatsapp-cache-v1';

// Daftar file yang akan di-cache
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
  // Tambahkan path ke gambar produk utama Anda di sini jika ingin di-cache
  // contoh: '/images/produk/kemeja.jpg'
];

// Event: Install
// Saat service worker diinstall, buka cache dan tambahkan file-file di atas
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: Fetch
// Saat ada permintaan (request) dari halaman, cek apakah ada di cache.
// Jika ada, ambil dari cache. Jika tidak, ambil dari jaringan (network).
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika response ditemukan di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, fetch dari network
        return fetch(event.request);
      })
  );
});

// Event: Activate
// Hapus cache lama jika ada versi cache baru
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
