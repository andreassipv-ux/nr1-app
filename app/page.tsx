import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      
      <Image
        src="/logo.png"
        alt="Logo NR-1 Aplicabilidade"
        width={140}
        height={140}
        priority
        className="mb-6"
      />

      <h1 className="text-3xl font-bold text-green-700">
        NR-1 Aplicabilidade
      </h1>

      <p className="mt-4 text-gray-700 max-w-xl">
        Proteção Integral ao Trabalhador • Saúde • Segurança • Prevenção
      </p>

      <div className="mt-10 flex flex-col gap-4 w-full max-w-sm">

        {/* VER CAMPANHAS */}
        <a
          href="/campanhas"
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Ver Campanhas
        </a>

        {/* COMPARTILHAR */}
        <a
          href="https://wa.me/?text=Confira%20o%20Sistema%20NR-1"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Compartilhar
        </a>

        {/* DENÚNCIA ANÔNIMA */}
        <a
          href="/denuncias"
          className="block bg-green-800 text-white font-bold p-3 rounded-xl hover:bg-green-700 transition"
        >
          Denúncia Anônima
        </a>

        {/* NEWSLETTER / CONTATO */}
        <a
          href="/newsletter"
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Newsletter / Contato
        </a>

        {/* SOBRE APP */}
        <a
          href="/sobre"
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Sobre App
        </a>

      </div>

      <footer className="mt-10 text-xs text-gray-500 text-center">
        <p>Versão 1.0 • Maio/2026</p>
        <p className="mt-1">
          Eng. Pedro Andreassi • SST • Segurança e Prevenção
        </p>
      </footer>

    </main>
  );
}
