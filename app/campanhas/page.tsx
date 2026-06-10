import Link from "next/link";

export default function CampanhasPage() {
  const campanhas = [
    {
      nome: "Vídeo da Campanha NR-1",
      tipo: "video",
      arquivo: "https://youtu.be/D9v9m7RxGCE",
    },
    {
      nome: "Apresentação Completa",
      tipo: "pdf",
      arquivo: "/pdfs/campanha-02.pdf",
    },
    {
      nome: "Trabalho Acadêmico",
      tipo: "pdf",
      arquivo: "/pdfs/campanha-03.pdf",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-green-700 md:text-3xl">
        Campanhas NR-1
      </h1>

      <div className="space-y-4">
        {campanhas.map((campanha, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-4 shadow"
          >
            <h2 className="mb-4 text-lg font-semibold">
              {campanha.nome}
            </h2>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={campanha.arquivo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-700 px-4 py-2 text-center text-white transition hover:bg-green-800"
              >
                {campanha.tipo === "video"
                  ? "Assistir Vídeo"
                  : "Abrir PDF"}
              </a>

              {campanha.tipo === "pdf" && (
                <a
                  href={campanha.arquivo}
                  download
                  className="rounded-xl bg-gray-700 px-4 py-2 text-center text-white transition hover:bg-gray-800"
                >
                  Baixar
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="https://wa.me/?text=Confira%20o%20Sistema%20NR-1"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Compartilhar
        </a>

        <Link
          href="/"
          className="rounded-2xl bg-gray-600 px-6 py-3 text-center font-semibold text-white shadow transition hover:bg-gray-700"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}