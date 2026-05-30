import Link from "next/link";

export default function CampanhasPage() {
  const campanhas = [
    {
      nome: "Apresentação Curta",
      arquivo: "/pdfs/campanha-01.pdf",
    },
    {
      nome: "Apresentação Completa",
      arquivo: "/pdfs/campanha-02.pdf",
    },
    {
      nome: "Trabalho Acadêmico",
      arquivo: "/pdfs/campanha-03.pdf",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Campanhas NR-1
      </h1>

      <div className="space-y-4">
        {campanhas.map((campanha, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {campanha.nome}
              </h2>
            </div>

            <div className="flex gap-2">
              <a
                href={campanha.arquivo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
              >
                Abrir PDF
              </a>

              <a
                href={campanha.arquivo}
                download
                className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Baixar
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <a
          href="https://wa.me/?text=Confira%20o%20Sistema%20NR-1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition font-semibold"
        >
          Compartilhar
        </a>

        <Link
          href="/"
          className="bg-gray-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-gray-700 transition font-semibold"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}
