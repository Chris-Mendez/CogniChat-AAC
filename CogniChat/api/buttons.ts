import { supabase } from "./supabaseClient";

export interface AACButton {
  button_id?: string;
  client_id?: string;
  image_id?: string;
  font_size?: number;
  vocalization_text: string;
  tab_name: string;
  parts_of_speech: string;
  is_deleted: boolean;
  position?: number;
}

export async function fetchButtons(): Promise<AACButton[]> {
  const { data, error } = await supabase.from("aac_buttons").select("*");
  if (error) throw error;
  return data || [];
}

export async function addButton(newButton: Partial<AACButton>) {
  const { data, error } = await supabase.from("aac_buttons").insert([newButton]).select();
  if (error) throw error;
  return data;
}

export async function deleteButton(button_id: string) {
    const { data, error } = await supabase.from("aac_buttons").update({ is_deleted: true }).eq("button_id", button_id).select();
    if (error) throw error;
    return data;
}

export async function restoreButton(button_id: string) {
    const { data, error } = await supabase.from("aac_buttons").update({ is_deleted: false }).eq("button_id", button_id).select();
    if (error) throw error;
    return data;
}