import ItemTerbaru from "@/components/ItemTerbaru";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black py-12 px-6">
      <main className="w-full max-w-5xl flex flex-col items-center gap-8">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Katalog Produk & Inovasi Kampus
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Temukan berbagai solusi energi, lingkungan, dan fasilitas kampus ramah lingkungan.
          </p>
        </div>

        {/* Item Terbaru yang dimuat via Fetch API */}
        <div className="w-full mt-6">
          <ItemTerbaru />
        </div>
      </main>
    </div>
  );
}