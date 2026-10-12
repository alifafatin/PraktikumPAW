import React from "react";

export const metadata = {
  title: "Hubungi Kami | Nama Produk",
  description: "Halaman kontak untuk menghubungi tim kami.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
          Hubungi Kami
        </h1>
        <p className="text-muted-foreground text-lg">
          Ada pertanyaan atau saran? Kirimkan pesan Anda kepada kami melalui formulir di bawah ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Informasi Kontak Ringkas */}
        <div className="md:col-span-1 space-y-6 bg-secondary/30 p-6 rounded-xl border border-border">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Alamat</h3>
            <p className="text-sm text-muted-foreground">
              Jl. Prof. DR. Soepomo No. 84, Tebet, Jakarta Selatan, DKI Jakarta 12870
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">
              info@namaproduk.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Telepon</h3>
            <p className="text-sm text-muted-foreground">
              +62 21 1234 5678
            </p>
          </div>
        </div>

        {/* Formulir Kontak */}
        <div className="md:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm">
          <form className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-foreground mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="pesan" className="block text-sm font-medium text-foreground mb-1">
                Pesan / Pertanyaan
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                required
                placeholder="Tuliskan pesan Anda di sini..."
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}