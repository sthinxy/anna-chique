import { createServerFn } from "@tanstack/react-start";

export const getPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
});

export const getPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Configurações da loja não encontradas.");
  return data;
});

export const getPublicReviews = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
});