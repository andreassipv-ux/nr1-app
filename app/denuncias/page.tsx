"use client";

import { useState } from "react";

export default function DenunciaPage() {

  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState("Segurança");
  const [loading, setLoading] = useState(false);

  const [sucesso, setSucesso] = useState(false);
  const [protocolo, setProtocolo] = useState("");

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch("/api/denuncias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagem,
          tipo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar denúncia");
      }

      setSucesso(true);
      setProtocolo(data.protocolo);

      setMensagem("");
      setTipo("Segurança");

    } catch (err: any) {

      alert(err.message);

    } finally {

      setLoading(false);

    }
  }

  // ✅ TELA DE SUCESSO
  if (sucesso) {

    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">

          <h1 className="text-2xl font-bold text-green-700">
            Denúncia enviada com sucesso!
          </h1>

          <p className="mt-4 text-gray-600">
            Protocolo gerado:
          </p>

          <p className="mt-2 text-lg font-bold text-black break-all">
            {protocolo}
          </p>

          <a
            href="/"
            className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
          >
            Voltar ao início
          </a>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold text-green-700 text-center">
          Portal Oficial de Denúncia NR-1
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-4"
        >

          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Descreva a situação..."
            className="border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option>Segurança</option>
            <option>Assédio</option>
            <option>Risco operacional</option>
            <option>Outro</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Denúncia"}
          </button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Sistema confidencial • NR-1 Aplicabilidade
        </p>

      </div>

    </main>
  );
}