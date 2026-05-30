"use client";

import { useState } from "react";

export default function NewsletterPage() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault();

    try {

      setEnviando(true);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          whatsapp,
        }),
      });

      if (response.ok) {

        alert("Cadastro enviado com sucesso!");

        setNome("");
        setEmail("");
        setWhatsapp("");

      } else {

        alert("Erro ao enviar cadastro.");

      }

    } catch (error) {

      alert("Erro ao enviar cadastro.");

    } finally {

      setEnviando(false);

    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-6">

      <h1 className="text-3xl font-bold text-green-700 text-center">
        Newsletter / Contato
      </h1>

      <p className="mt-4 text-gray-600 text-center max-w-md">
        Receba campanhas, orientações preventivas e conteúdos de Saúde e Segurança do Trabalho.
      </p>

      <form
        onSubmit={enviarFormulario}
        className="mt-10 w-full max-w-md bg-gray-100 p-6 rounded-2xl shadow space-y-4"
      >

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nome
          </label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            E-mail
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            WhatsApp
          </label>

          <input
            type="text"
            value={whatsapp}
            onChange={(e) => {

              let valor = e.target.value;

              valor = valor.replace(/\D/g, "");

              valor = valor.slice(0, 11);

              valor = valor.replace(
                /^(\d{2})(\d{5})(\d{0,4})$/,
                "($1) $2-$3"
              );

              setWhatsapp(valor);

            }}
            placeholder="(11) 99999-9999"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition font-semibold disabled:opacity-50"
        >
          {enviando ? "Enviando..." : "Enviar Cadastro"}
        </button>

      </form>

      <div className="mt-8 flex gap-4">

        <a
          href="/"
          className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Voltar
        </a>

        <a
          href="https://wa.me/5514981313360"
          target="_blank"
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition font-semibold"
        >
          Falar no WhatsApp
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