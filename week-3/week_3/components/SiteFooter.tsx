'use client'; // <-- Tambahkan ini di baris pertama

interface SiteFooterProps {
  namaProduk: string;
}

export default function SiteFooter({ namaProduk }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t bg-background py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} {namaProduk}. All rights reserved.</p>
      </div>
    </footer>
  );
}