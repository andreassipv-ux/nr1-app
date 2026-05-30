"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        alert("Erro no login: " + error.message);
        return;
      }

      router.push("/admin");
    } catch (err) {
      alert("Erro interno no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-700 text-center">
            Login Administrativo NR-1
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Área restrita de gestão
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-xl p-3 w-full"
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border rounded-xl p-3 w-full"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}