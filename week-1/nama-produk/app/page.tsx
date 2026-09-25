"use client";

import React, { useState } from "react";

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: number;
  tag?: string;
  image: string;
}

// --- Sample Product Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones Pro",
    category: "Elektronik",
    price: 899000,
    originalPrice: 1299000,
    rating: 4.9,
    soldCount: 420,
    tag: "Terlaris",
    image: "🎧",
  },
  {
    id: 2,
    name: "Smartwatch AMOLED Fitness & Heart Rate",
    category: "Elektronik",
    price: 649000,
    originalPrice: 850000,
    rating: 4.8,
    soldCount: 310,
    tag: "Diskon 24%",
    image: "⌚",
  },
  {
    id: 3,
    name: "Tas Ransel Anti Air Urban Minimalist",
    category: "Fashion",
    price: 289000,
    originalPrice: 389000,
    rating: 4.7,
    soldCount: 540,
    tag: "Populer",
    image: "🎒",
  },
  {
    id: 4,
    name: "Tumbler Stainless Steel Panas & Dingin 750ml",
    category: "Lifestyle",
    price: 145000,
    originalPrice: 199000,
    rating: 4.9,
    soldCount: 890,
    tag: "Eco Friendly",
    image: "🍶",
  },
  {
    id: 5,
    name: "Kacamata Polarized UV400 Matte Black",
    category: "Aksesoris",
    price: 175000,
    originalPrice: 250000,
    rating: 4.6,
    soldCount: 215,
    tag: "Trend",
    image: "🕶️",
  },
  {
    id: 6,
    name: "Mechanical Keyboard RGB Tenkeyless Brown Switch",
    category: "Elektronik",
    price: 549000,
    originalPrice: 720000,
    rating: 4.9,
    soldCount: 680,
    tag: "Hot Sale",
    image: "⌨️",
  },
];

const CATEGORIES = ["Semua", "Elektronik", "Fashion", "Lifestyle", "Aksesoris"];

// --- Helper for Currency Formatting ---
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

export default function ShopHomepage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setNotification(`Berhasil menambahkan "${productName}" ke keranjang!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl transition-all duration-300 animate-bounce">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-indigo-100 text-xs py-2 px-4 border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Buka Setiap Hari
            </span>
            <span>📍 Store Offline: Grand City Mall Lt. 2, Jakarta</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden sm:inline">Hubungi Layanan Cepat:</span>
            <a
              href="tel:+6281234567890"
              className="font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              📞 0812-3456-7890
            </a>
            <span className="hidden md:inline">|</span>
            <a
              href="mailto:cs@tokokita.co.id"
              className="hover:text-white transition-colors hidden md:inline"
            >
              ✉️ cs@tokokita.co.id
            </a>
          </div>
        </div>
      </header>

      {/* 2. MAIN NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-indigo-200">
                🛍️
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-indigo-950 block leading-tight">
                  Toko<span className="text-indigo-600">Kita</span>.id
                </span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block">
                  Official Store & Lifestyle
                </span>
              </div>
            </div>

            {/* Search Input (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari produk impianmu (misal: Tas, Smartwatch, Tumbler)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100/90 text-sm text-slate-800 placeholder-slate-400 rounded-full pl-11 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <span className="absolute left-4 top-3 text-slate-400">🔍</span>
              </div>
            </div>

            {/* Desktop Navigation Links & Action */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a href="#katalog" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Katalog Produk
              </a>
              <a href="#promo" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Promo Spesial Ahayy
              </a>
              <a href="#lokasi-kontak" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Kontak & Alamat
              </a>

              {/* Cart Button */}
              <button
                className="relative flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-full font-semibold transition-colors"
                aria-label="Keranjang Belanja"
              >
                <span>🛒</span>
                <span>Keranjang</span>
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setCartCount((prev) => prev + 1)}
                className="relative p-2 text-indigo-700 bg-indigo-50 rounded-lg"
              >
                🛒
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search & Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 text-sm rounded-lg pl-9 pr-3 py-2 border border-slate-200"
                />
                <span className="absolute left-3 top-2 text-slate-400">🔍</span>
              </div>
              <div className="flex flex-col gap-2 pt-2 text-sm font-medium">
                <a
                  href="#katalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700"
                >
                  Katalog Produk
                </a>
                <a
                  href="#promo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700"
                >
                  Promo Spesial
                </a>
                <a
                  href="#lokasi-kontak"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700"
                >
                  Detail Kontak & Toko
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 3. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-800 text-white py-16 lg:py-24">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/20">
                <span className="text-amber-300">✨ NEW ARRIVALS 2026</span>
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <span>Diskon Up To 45%</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Penuhi Kebutuhan Harian & Lifestyle Berkualitas.
              </h1>

              <p className="text-indigo-100 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Toko resmi terpercaya dengan koleksi gawai, perlengkapan esensial, dan aksesoris modern. Nikmati jaminan 100% orisinal dengan layanan pengiriman kilat.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#katalog"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-7 py-3.5 rounded-full shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Jelajahi Produk
                </a>
                <a
                  href="#lokasi-kontak"
                  className="bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-full backdrop-blur-sm border border-white/30 transition-all"
                >
                  📍 Lihat Lokasi Toko
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-indigo-500/40 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚚</span>
                  <div>
                    <p className="text-xs font-bold leading-none">Bebas Ongkir</p>
                    <p className="text-[11px] text-indigo-200">Min. Rp 100k</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <p className="text-xs font-bold leading-none">100% Original</p>
                    <p className="text-[11px] text-indigo-200">Garansi Resmi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-xs font-bold leading-none">Fast Response</p>
                    <p className="text-[11px] text-indigo-200">CS 08:00 - 21:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-200">
                    Flash Sale Hari Ini
                  </span>
                </div>

                <div className="text-center py-6">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-indigo-500/40 to-white/20 rounded-2xl flex items-center justify-center text-6xl shadow-inner mb-4 animate-pulse">
                    🎧
                  </div>
                  <span className="inline-block bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                    Diskon Terbesar 30%
                  </span>
                  <h3 className="text-xl font-bold">Wireless Headphones Pro Max</h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="text-2xl font-black text-amber-300">
                      Rp 899.000
                    </span>
                    <span className="text-sm line-through text-indigo-200">
                      Rp 1.299.000
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart("Wireless Headphones Pro Max")}
                  className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <span>Beli Sekarang</span>
                  <span>⚡</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATALOG & CATEGORIES */}
      <section id="katalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest block mb-1">
              Pilihan Terbaik
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Katalog Produk Unggulan
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Menampilkan barang berkualitas dengan rating terbaik dari pelanggan
            </p>
          </div>

          {/* Filter Categories Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <span className="text-4xl">🔎</span>
            <h3 className="text-lg font-bold text-slate-800 mt-2">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Coba gunakan kata kunci pencarian yang lain atau pilih kategori Semua.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Product Thumbnail / Display */}
                <div className="relative h-48 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center text-7xl select-none group-hover:scale-105 transition-transform duration-300">
                  <span>{product.image}</span>
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-xs bg-white/80 backdrop-blur-xs border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                    ⭐ {product.rating}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-base line-clamp-2 mt-1 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-lg font-extrabold text-slate-900">
                          {formatRupiah(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-slate-400 line-through">
                            {formatRupiah(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Terjual {product.soldCount}+
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-medium text-xs py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
                    >
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. STORE DETAILS & CONTACT SECTION (ADDRESS, PHONE, HOURS, ETC) */}
      <section
        id="lokasi-kontak"
        className="bg-white border-t border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest block mb-1">
              Informasi Toko Resmi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kunjungi Toko Kami atau Hubungi Sekarang
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Kami siap melayani kebutuhan Anda secara offline maupun online dengan fasilitas lengkap dan staf ramah.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1: Alamat */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-4">
                📍
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Alamat Toko
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Grand City Mall, Lantai 2 Unit 24B, Jl. Boulevard Raya No. 45, Jakarta Selatan 12340, Indonesia
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                Buka di Google Maps →
              </a>
            </div>

            {/* Card 2: Kontak Telepon & WhatsApp */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-4">
                📞
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Nomor Telepon
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-1">
                Layanan Customer Service:
              </p>
              <p className="text-sm font-bold text-slate-900 mb-1">
                (021) 555-0199
              </p>
              <p className="text-xs text-emerald-600 font-semibold mb-4">
                WhatsApp: +62 812-3456-7890
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20TokoKita,%20saya%20ingin%20bertanya%20produk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                Chat WhatsApp Sekarang →
              </a>
            </div>

            {/* Card 3: Email & Media Sosial */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-4">
                ✉️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Email & Dukungan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                Pertanyaan kerjasama bisnis atau keluhan pemesanan:
              </p>
              <a
                href="mailto:support@tokokita.co.id"
                className="text-xs font-bold text-slate-800 hover:text-indigo-600 block mb-1"
              >
                support@tokokita.co.id
              </a>
              <a
                href="mailto:sales@tokokita.co.id"
                className="text-xs font-bold text-slate-800 hover:text-indigo-600 block mb-4"
              >
                sales@tokokita.co.id
              </a>
              <span className="text-[11px] text-slate-500 block">
                Balasan maksimal 1x24 jam kerja
              </span>
            </div>

            {/* Card 4: Jam Operasional */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4">
                ⏰
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Jam Operasional
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Senin - Jumat:</span>
                  <span className="font-bold text-slate-800">09:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu:</span>
                  <span className="font-bold text-slate-800">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu / Libur:</span>
                  <span className="font-bold text-slate-800">10:00 - 20:00</span>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                🟢 Store Sedang Buka
              </span>
            </div>
          </div>

          {/* Additional Store Facilities & FAQ Banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-3">
                <span className="bg-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Fasilitas Toko Offline
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Ingin Coba Produk Langsung Sebelum Membeli?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                  Store kami menyediakan <strong>Experience Zone</strong> lengkap dengan tester, area parkir luas, pembayaran non-tunai (QRIS/Debit/Credit), serta konsultasi gratis bersama tim spesialis kami.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-200">
                  <span>✔️ Parkir Luas & Gratis 1 Jam</span>
                  <span>✔️ Pembayaran QRIS & Cicilan 0%</span>
                  <span>✔️ Free Unboxing & Setup</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://wa.me/6281234567890"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-center text-sm transition-all shadow"
                >
                  💬 Hubungi Admin WhatsApp
                </a>
                <a
                  href="tel:+6281234567890"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl text-center text-sm border border-white/20 transition-all"
                >
                  📞 Telepon Toko Sekarang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER / VOUCHER BAR */}
      <section id="promo" className="bg-amber-400 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-950 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">
              Dapatkan Voucher Potongan Rp 50.000! 🎁
            </h3>
            <p className="text-sm font-medium text-slate-800 mt-1">
              Daftarkan email Anda untuk menerima promo flash sale & penawaran eksklusif setiap pekan.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Masukkan alamat email Anda"
              className="px-4 py-2.5 rounded-xl text-sm bg-white text-slate-800 border-none outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-72"
            />
            <button
              onClick={() => alert("Terima kasih! Voucher telah dikirimkan ke email Anda.")}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap transition-colors"
            >
              Klaim
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span>🛍️</span>
              <span>TokoKita.id</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Platform belanja perlengkapan modern, gadget, dan lifestyle terpercaya di Indonesia dengan jaminan kepuasan 100%.
            </p>
            <p className="text-slate-400">
              Hak Cipta © {new Date().getFullYear()} TokoKita Indonesia.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Layanan Toko</h4>
            <ul className="space-y-2">
              <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Lengkap</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Cara Pemesanan</a></li>
              <li><a href="#lokasi-kontak" className="hover:text-white transition-colors">Garansi & Pengembalian</a></li>
              <li><a href="#lokasi-kontak" className="hover:text-white transition-colors">Cek Status Pengiriman</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Detail Kontak</h4>
            <ul className="space-y-2">
              <li>📍 Grand City Mall Lt. 2, Jakarta Selatan</li>
              <li>📞 Telepon: (021) 555-0199</li>
              <li>📱 WhatsApp: +62 812-3456-7890</li>
              <li>✉️ Email: support@tokokita.co.id</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Metode Pembayaran</h4>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300 font-medium">
              <span className="bg-slate-800 px-2.5 py-1 rounded">BCA</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded">Mandiri</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded">BRI</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded">QRIS</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded">GoPay</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded">OVO</span>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Transaksi aman dilindungi enkripsi SSL 256-bit.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 text-center text-slate-500 text-[11px]">
          Dibuat dengan ❤️ oleh Frontend Developer untuk Praktikum Pengembangan Web.
        </div>
      </footer>
    </div>
  );
}
