import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("NOVO CADASTRO NEWSLETTER:");
    console.log(body);

    // FUTURAMENTE:
    // enviar e-mail real
    // salvar no Supabase
    // integrar SMTP

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }
}