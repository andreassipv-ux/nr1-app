import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NR-1 System",
  description: "Sistema NR-1 - Gestão e Controle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-100 text-gray-900">

        <div className="flex min-h-screen">

          {/* SIDEBAR - SOMENTE DESKTOP */}
          <aside className="hidden md:flex w-64 bg-gray-900 text-white p-6 flex-col gap-4">
            <h1 className="text-xl font-bold">NR-1 System</h1>

            <nav className="mt-6 flex flex-col gap-3 text-sm">
              <Link href="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>

              <Link href="/admin" className="hover:text-blue-400">
                Admin
              </Link>

              <Link href="/denuncias" className="hover:text-blue-400">
                Denúncias
              </Link>

              <Link href="/protocolo" className="hover:text-blue-400">
                Protocolo
              </Link>

              <Link href="/campanhas" className="hover:text-blue-400">
                Campanhas
              </Link>

              <Link href="/qr-reader" className="hover:text-blue-400">
                QR Reader
              </Link>

              <Link href="/newsletter" className="hover:text-blue-400">
                Newsletter
              </Link>

              <Link href="/sobre" className="hover:text-blue-400">
                Sobre
              </Link>
            </nav>
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}
