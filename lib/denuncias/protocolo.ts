import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { codigo } = req.query;

  if (!codigo) {
    return res.status(400).json({ error: "Protocolo obrigatório" });
  }

  const { data, error } = await supabase
    .from("denuncias")
    .select("*")
    .eq("protocolo", codigo)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Protocolo não encontrado" });
  }

  return res.status(200).json(data);
}