import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

type RequestBody = {
  mensagem?: string;
  tipo?: string;
};

// 🔐 RATE LIMIT
const requests = new Map<string, { count: number; start: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  const windowTime = 60 * 1000;
  const maxRequests = 3;

  const userData = requests.get(ip) || {
    count: 0,
    start: now,
  };

  if (now - userData.start > windowTime) {
    requests.set(ip, { count: 1, start: now });
    return false;
  }

  userData.count++;

  if (userData.count > maxRequests) {
    return true;
  }

  requests.set(ip, userData);

  return false;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({
        error: "Muitas solicitações. Tente novamente em breve.",
      });
    }

    const { mensagem, tipo } = req.body as RequestBody;

    if (!mensagem?.trim() || !tipo?.trim()) {
      return res.status(400).json({
        error: "Campos obrigatórios faltando",
      });
    }

    const protocolo = `NR1-${new Date().getFullYear()}-${Date.now()}`;

    const { data, error } = await supabase
      .from("denuncias")
      .insert([
        {
          mensagem: mensagem.trim(),
          tipo: tipo.trim(),
          status: "aberto",
          protocolo,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    await resend.emails.send({
      from: "NR-1 Sistema <onboarding@resend.dev>",
      to: "andreassipv@gmail.com",
      subject: `Nova denúncia NR-1 - ${protocolo}`,
      html: `
        <h2>Nova denúncia NR-1</h2>
        <p><b>Protocolo:</b> ${protocolo}</p>
        <p><b>Tipo:</b> ${tipo}</p>
        <p><b>Mensagem:</b></p>
        <div style="padding:12px;background:#f4f4f4;border-radius:8px;">
          ${mensagem}
        </div>
      `,
    });

    return res.status(200).json({
      message: "Denúncia enviada com sucesso",
      protocolo,
      data,
    });
  } catch (err: unknown) {
    console.error(err);

    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}