import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LogOut, Settings, ShoppingBag, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/minha-conta")({
  head: () => ({ meta: [{ title: "Minha conta · Anna Chique" }] }),
  component: Account,
});

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_qty: number;
  total: number;
  delivery_method: string;
};

function Account() {
  const ctx = Route.useRouteContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    supabase
      .from("orders")
      .select("id,created_at,status,total_qty,total,delivery_method")
      .eq("user_id", ctx.user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data ?? []) as Order[]));
  }, [ctx.user.id]);

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Até logo! 💕");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-baby/30 via-white to-white text-foreground transition-colors dark:from-[#070306] dark:via-[#090306] dark:to-[#070306] dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="rounded-[2rem] border border-rose-baby/70 bg-white/80 p-5 shadow-card backdrop-blur transition-colors dark:border-pink-700/30 dark:bg-[#12070d]/80 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-baby/70 bg-white px-4 py-2 text-sm font-bold text-foreground shadow-soft transition-colors dark:border-pink-700/40 dark:bg-[#070306] dark:text-white">
                Minha conta
              </div>

              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground transition-colors dark:text-white md:text-5xl">
                Olá,{" "}
                <span className="block max-w-full break-words text-primary md:inline">
                  {ctx.user.email}
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {ctx.isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-glow transition hover:scale-105 hover:opacity-90"
                >
                  <Settings className="h-4 w-4" /> Painel Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-rose-baby/70 bg-white px-5 py-3 font-bold text-foreground shadow-soft transition hover:border-primary hover:text-primary dark:border-pink-700/40 dark:bg-[#2a101c] dark:text-white dark:hover:border-primary dark:hover:text-pink-300"
              >
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </div>
          </div>

          <h2 className="mt-10 font-display text-3xl font-bold text-foreground transition-colors dark:text-white">
            Meus pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-rose-baby/70 bg-white p-8 text-center text-foreground shadow-card transition-colors dark:border-pink-700/40 dark:bg-[#070306] dark:text-white">
              <ShoppingBag className="mx-auto h-12 w-12 text-primary" />

              <p className="mt-4 text-muted-foreground transition-colors dark:text-white/70">
                Você ainda não tem pedidos. Bora começar?
              </p>

              <Link
                to="/catalogo"
                className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-8 font-bold text-white shadow-glow transition hover:scale-105"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-rose-baby/70 bg-white p-4 text-foreground shadow-card transition-colors dark:border-pink-700/40 dark:bg-[#070306] dark:text-white"
                >
                  <div>
                    <div className="text-xs text-muted-foreground transition-colors dark:text-white/55">
                      {new Date(o.created_at).toLocaleString("pt-BR")}
                    </div>

                    <div className="font-bold text-foreground transition-colors dark:text-white">
                      {o.total_qty} peças · R$ {Number(o.total).toFixed(2)}
                    </div>

                    <div className="text-xs text-muted-foreground transition-colors dark:text-white/55">
                      Entrega: {o.delivery_method}
                    </div>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary dark:bg-primary/20 dark:text-pink-300">
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <a
            href="https://wa.me/558594374066"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 font-bold text-white shadow-soft transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}