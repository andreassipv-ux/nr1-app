export default function Home() {

  return (

    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">

      {/* LOGO */}

      <img
        src="/logo.png"
        alt="Logo NR-1"
        className="w-32 h-32 object-contain mb-4"
      />

      {/* TÍTULO */}

      <h1 className="text-4xl font-bold text-green-700">
        NR-1 Aplicabilidade
      </h1>

      {/* RESPONSÁVEL */}

      <p className="mt-2 text-lg font-semibold text-gray-700">
        Eng. Pedro Andreassi
      </p>

      <p className="text-gray-500">
        SST • Segurança e Prevenção
      </p>

      {/* DESCRIÇÃO */}

      <p className="mt-6 text-gray-700 max-w-xl">
        Proteção Integral ao Trabalhador • Saúde • Segurança • Prevenção
      </p>

      {/* BOTÕES */}

      <div className="mt-10 flex flex-col gap-4 w-full max-w-sm">

        {/* QR CODE */}

        <a
          href="/qr-reader"
          className="block bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition font-semibold"
        >
          Ler QR Code de Campanha
        </a>

        {/* CAMPANHAS */}

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
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Compartilhar
        </a>

        {/* DENÚNCIA */}

        <a
          href="/denuncias"
          className="block bg-green-800 text-white font-bold p-3 rounded-xl hover:bg-green-700 transition"
        >
          Denúncia Anônima
        </a>

        {/* NEWSLETTER */}

        <a
          href="/newsletter"
          className="block bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          Newsletter / Contato
        </a>

        {/* SOBRE */}

        <a
          href="/sobre"
          className="block bg-gray-700 text-white p-3 rounded-xl hover:bg-gray-800 transition font-semibold"
        >
          Sobre App
        </a>

      </div>

      {/* RODAPÉ */}

      <footer className="mt-10 text-xs text-gray-500 text-center">

        <p>
          Versão 1.0 • Maio/2026
        </p>

        <p className="mt-1">
          Desenvolvido por Eng. Pedro Andreassi
        </p>

      </footer>

    </main>

  );

}