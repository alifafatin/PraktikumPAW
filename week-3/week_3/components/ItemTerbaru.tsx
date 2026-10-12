"use client";

import { useEffect, useState } from "react";
import type { Item } from "@/lib/tipe";

type Status = "memuat" | "berhasil" | "gagal";

export default function ItemTerbaru() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>("memuat");

  useEffect(() => {
    let dibatalkan = false;

    async function muat() {
      try {
        const res = await fetch("/data/item.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Item[] = await res.json();

        if (!dibatalkan) {
          setItems(data.slice(0, 3)); // Ambil 3 item terbaru
          setStatus("berhasil");
        }
      } catch {
        if (!dibatalkan) setStatus("gagal");
      }
    }

    muat();

    return () => {
      dibatalkan = true;
    };
  }, []);

  if (status === "memuat") {
    return <p className="text-zinc-500 py-4">Memuat data...</p>;
  }

  if (status === "gagal") {
    return (
      <p role="alert" className="text-red-500 py-4">
        Data gagal dimuat. Muat ulang halaman.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 capitalize">
                {item.kategori}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                  item.tersedia
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                }`}
              >
                {item.tersedia ? "Tersedia" : "Tidak Tersedia"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {item.judul}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {item.deskripsi}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}