import { supabase } from "../supabaseClient";

export async function atualizarStatus(
  id: string,
  status: string
) {

  const { error } = await supabase
    .from("denuncias")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw error;
  }

}