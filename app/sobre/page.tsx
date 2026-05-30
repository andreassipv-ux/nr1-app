import Image from "next/image";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-6 text-center">
      
      <Image
        src="/logo.png"
        alt="Logo NR-1 Aplicabilidade"
        width={140}
        height={140}
        priority
        className="mb-6"
      />

      <h1 className="text-3xl font-bold text-green-700">
        Sobre o App
      </h1>

      <div className="mt-8 max-w-xl bg-gray-100 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-green-700">
          NR-1 Aplicabilidade
        </h2>

        <p className="mt-4 text-gray-700">
          Sistema desenvolvido para apoio às campanhas de Saúde,
          Segurança e Prevenção do Trabalhador.
        </p>

        <p className="mt-4 text-gray-600">
          Versão 1.0 • Maio/2026
        </p>

        <p className="mt-2 text-gray-600">
          Trabalho Acadêmico UNISAGRADO - Bauru/SP
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <a
            href="/login"
            className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition"
          >
            Acesso Área Admin
          </a>

          <a
            href="/"
            className="bg-gray-700 text-white p-3 rounded-xl hover:bg-gray-800 transition"
          >
            Voltar
          </a>
        </div>
      </div>

      <footer className="mt-10 text-xs text-gray-500 text-center">
        <p>
          Eng. Pedro Andreassi
        </p>

        <p className="mt-1">
          SST • Segurança e Prevenção
        </p>

        <div className="mt-6">
          <p className="font-semibold">
            Equipe:
          </p>

          <p className="mt-2">
            Erick Bryan Rodrigues Fagundes
          </p>

          <p>
            João Lucas Emygdio da Cruz
          </p>

          <p>
            Marcos Felipe Gonzaga de Oliveira
          </p>

          <p>
            Maria Eduarda de Lima
          </p>
        </div>
      </footer>
    </main>
  );
}