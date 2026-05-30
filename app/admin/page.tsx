"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Denuncia = {
  id: string;
  protocolo?: string;
  tipo: string;
  mensagem: string;
  status: string;
  created_at?: string;
};

export default function AdminPage() {

  const router = useRouter();

  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {

    try {

      setLoading(true);

      const res = await fetch("/api/denuncias/list");

      const data = await res.json();

      console.log("DENUNCIAS API:", data);

      if (!res.ok) {
        throw new Error(
          data.error || "Erro ao carregar denúncias"
        );
      }

      setDenuncias(data);

    } catch (err) {

      console.error(
        "Erro ao carregar denúncias:",
        err
      );

      setDenuncias([]);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    carregar();
  }, []);

  // 🔒 LOGOUT AUTOMÁTICO POR INATIVIDADE
  useEffect(() => {

    let timeout: NodeJS.Timeout;

    function resetTimer() {

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        alert(
          "Sessão encerrada por inatividade."
        );

        router.push("/");

      }, 90000); // 90 segundos

    }

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {

      clearTimeout(timeout);

      window.removeEventListener(
        "mousemove",
        resetTimer
      );

      window.removeEventListener(
        "keydown",
        resetTimer
      );

      window.removeEventListener(
        "click",
        resetTimer
      );

      window.removeEventListener(
        "scroll",
        resetTimer
      );

    };

  }, [router]);

  async function atualizarStatus(
    id: string,
    status: string
  ) {

    try {

      await fetch("/api/denuncias/status", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          id,
          status,
        }),

      });

      carregar();

    } catch (err) {

      console.error(
        "Erro ao atualizar status:",
        err
      );

    }

  }

  function exportarPDF() {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Relatório NR-1 - Denúncias",
      14,
      20
    );

    autoTable(doc, {

      startY: 30,

      head: [[
        "Protocolo",
        "Tipo",
        "Status",
        "Mensagem"
      ]],

      body: denuncias.map((d) => [
        d.protocolo || "-",
        d.tipo,
        d.status,
        d.mensagem,
      ]),

    });

    doc.save("relatorio-nr1.pdf");

  }

  function sairAdmin() {

    router.push("/");

  }

  const total = denuncias.length;

  const abertas = denuncias.filter(
    (d) => d.status === "aberto"
  ).length;

  const emAnalise = denuncias.filter(
    (d) => d.status === "em análise"
  ).length;

  const resolvidas = denuncias.filter(
    (d) => d.status === "resolvido"
  ).length;

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-green-700">
          Painel NR-1 - Denúncias
        </h1>

        <button
          onClick={exportarPDF}
          className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
        >
          Exportar PDF
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-sm text-gray-500">
            Total
          </p>

          <h2 className="text-3xl font-bold text-green-700">
            {total}
          </h2>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-sm text-gray-500">
            Abertas
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            {abertas}
          </h2>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-sm text-gray-500">
            Em análise
          </p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {emAnalise}
          </h2>

        </div>

        <div className="bg-white p-4 rounded-2xl shadow">

          <p className="text-sm text-gray-500">
            Resolvidas
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {resolvidas}
          </h2>

        </div>

      </div>

      {loading && (

        <p className="text-gray-500">
          Carregando denúncias...
        </p>

      )}

      {!loading && denuncias.length === 0 && (

        <p className="text-gray-500">
          Nenhuma denúncia encontrada.
        </p>

      )}

      <div className="space-y-4">

        {denuncias.map((item) => (

          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow"
          >

            <p>
              <b>Protocolo:</b>{" "}
              {item.protocolo || "-"}
            </p>

            <p>
              <b>Tipo:</b>{" "}
              {item.tipo}
            </p>

            <p>
              <b>Mensagem:</b>{" "}
              {item.mensagem}
            </p>

            <p>
              <b>Status:</b>{" "}

              <span className="font-semibold text-blue-600">
                {item.status}
              </span>

            </p>

            <div className="mt-3 flex gap-2">

              <button
                onClick={() =>
                  atualizarStatus(
                    item.id,
                    "em análise"
                  )
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Em análise
              </button>

              <button
                onClick={() =>
                  atualizarStatus(
                    item.id,
                    "resolvido"
                  )
                }
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Resolvido
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* 🔙 BOTÕES FINAIS */}

      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

        <button
          onClick={() => router.push("/")}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Voltar
        </button>

        <button
          onClick={sairAdmin}
          className="bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 transition"
        >
          Sair do Admin
        </button>

      </div>

    </main>

  );

}
