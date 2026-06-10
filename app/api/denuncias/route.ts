import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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
    requests.set(ip, {
      count: 1,
      start: now,
    });

    return false;
  }

  userData.count++;

  if (userData.count > maxRequests) {
    return true;
  }

  requests.set(ip, userData);

  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { mensagem, tipo } = body;

    const ip = "web";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Muitas solicitações. Tente novamente em breve.",
        },
        { status: 429 }
      );
    }

    if (!mensagem?.trim() || !tipo?.trim()) {
      return NextResponse.json(
        {
          error: "Campos obrigatórios faltando",
        },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (resend) {
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
    }

    return NextResponse.json({
      message: "Denúncia enviada com sucesso",
      protocolo,
      data,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Erro interno no servidor",
      },
      { status: 500 }
    );
  }
}