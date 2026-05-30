"use client";

import { useState } from "react";

export default function ProtocoloPage() {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState("");

  async function consultar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResultado(null);
    setErro("");

    try {
      const res = await fetch(`/api/protocolo?codigo=${codigo}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Protocolo não encontrado");
      }

      setResultado(data);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">

        <h1 className="text-xl font-bold text-green-700 text-center">
          Consulta de Protocolo NR-1
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          Informe o número do protocolo recebido na denúncia
        </p>

        <form onSubmit={consultar} className="mt-6 flex flex-col gap-3">

          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ex: NR1-2026-123456789"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            disabled={loading}
            className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>

        </form>

        {erro && (
          <p className="mt-4 text-red-600 text-sm text-center">
            {erro}
          </p>
        )}

        {resultado && (
          <div className="mt-6 border rounded-lg p-4 text-sm space-y-2">

            <p><b>Protocolo:</b> {resultado.protocolo}</p>
            <p><b>Tipo:</b> {resultado.tipo}</p>
            <p><b>Status:</b> {resultado.status}</p>
            <p><b>Data:</b> {new Date(resultado.created_at).toLocaleString()}</p>

          </div>
        )}

      </div>

    </main>
  );
}