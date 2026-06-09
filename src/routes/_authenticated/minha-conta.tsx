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
    <div className="bg-gradient-to-b from-rose-baby/30 to-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="chip">Minha conta</div>
            <h1 className="mt-3 font-display text-4xl font-extrabold">
              Olá, <span className="text-primary">{ctx.user.email}</span>
            </h1>
          </div>
          <div className="flex gap-2">
            {ctx.isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-bold text-white"
              >
                <Settings className="h-4 w-4" /> Painel Admin
              </Link>
            )}
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 font-bold"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>

        <h2 className="mt-10 font-display text-2xl font-bold">Meus pedidos</h2>
        {orders.length === 0 ? (
          <div className="card-pink mt-4 p-8 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 text-muted-foreground">
              Você ainda não tem pedidos. Bora começar?
            </p>
            <Link to="/catalogo" className="btn-hero btn-hero-hover mt-5 inline-flex">
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="card-pink flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("pt-BR")}
                  </div>
                  <div className="font-bold">
                    {o.total_qty} peças · R$ {Number(o.total).toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Entrega: {o.delivery_method}
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <a
          href="https://wa.me/558594374066"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
