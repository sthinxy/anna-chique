import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/queries";
import { useCart, cartTotals } from "@/lib/store";
import { buildWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import {
  Minus,
  Plus,
  Trash2,
  MessageCircle,
  PartyPopper,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho · Anna Chique" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background p-8 text-foreground transition-colors dark:bg-[#070306] dark:text-white">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background p-8 text-foreground transition-colors dark:bg-[#070306] dark:text-white">
      Não encontrado
    </div>
  ),
  component: CartPage,
});

function CartPage() {
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [delivery, setDelivery] = useState("transportadora");
  const [sending, setSending] = useState(false);

  const t = cartTotals(items, Number(settings.shipping_fee), delivery);
  const missing = Math.max(0, settings.min_pieces - t.totalQty);
  const completed = t.totalQty >= settings.min_pieces;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-baby/30 to-white text-foreground transition-colors dark:from-[#170812] dark:via-[#12070d] dark:to-[#070306] dark:text-white">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8">
          <ShoppingBag className="mx-auto h-16 w-16 text-primary" />

          <h1 className="mt-4 font-display text-3xl font-extrabold text-foreground transition-colors dark:text-white">
            Seu carrinho está vazio
          </h1>

          <p className="mt-2 text-muted-foreground transition-colors dark:text-white/65">
            Volte ao catálogo e escolha suas peças.
          </p>

          <Link to="/catalogo" className="btn-hero btn-hero-hover mt-6 inline-flex">
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  const submit = async () => {
    if (!name || !phone || !city) {
      toast.error("Preencha nome, telefone e cidade.");
      return;
    }

    if (!completed) {
      toast.error(`Faltam ${missing} peças para o mínimo de ${settings.min_pieces}.`);
      return;
    }

    setSending(true);

    try {
      const { data: u } = await supabase.auth.getUser();

      const { data: order } = await supabase
        .from("orders")
        .insert({
          user_id: u.user?.id ?? null,
          customer_name: name,
          customer_phone: phone,
          customer_city: city,
          delivery_method: delivery,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            qty: i.qty,
            price: i.price,
          })),
          total_qty: t.totalQty,
          items_total: t.itemsTotal,
          shipping_fee: t.shippingFee,
          total: t.total,
          status: "separando",
          whatsapp_clicked: true,
        })
        .select()
        .maybeSingle();

      await supabase.from("cart_events").insert({
        session_id: order?.id ?? crypto.randomUUID(),
        user_id: u.user?.id ?? null,
        event_type: "whatsapp_clicked",
        payload: { qty: t.totalQty, total: t.total },
      });

      const msg = buildWhatsAppMessage({
        name,
        phone,
        city,
        delivery,
        items,
        itemsTotal: t.itemsTotal,
        shippingFee: t.shippingFee,
        total: t.total,
        totalQty: t.totalQty,
      });

      window.open(whatsappLink(settings.whatsapp, msg), "_blank");
      clear();
      toast.success("Pedido enviado para o WhatsApp! 💖");
    } catch (e) {
      toast.error("Não consegui registrar, mas vou abrir o WhatsApp mesmo assim.");

      const msg = buildWhatsAppMessage({
        name,
        phone,
        city,
        delivery,
        items,
        itemsTotal: t.itemsTotal,
        shippingFee: t.shippingFee,
        total: t.total,
        totalQty: t.totalQty,
      });

      window.open(whatsappLink(settings.whatsapp, msg), "_blank");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-baby/30 to-white text-foreground transition-colors dark:from-[#170812] dark:via-[#12070d] dark:to-[#070306] dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <h1 className="font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
          Seu <span className="text-primary">carrinho</span>
        </h1>

        <div
          className={`mt-5 rounded-3xl border p-5 font-semibold shadow-soft transition-colors ${
            completed
              ? "border-green-500/40 bg-success text-white"
              : "border-rose-baby/70 bg-white text-foreground dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white"
          }`}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <PartyPopper className="h-5 w-5" />
              Pedido mínimo completo! ({t.totalQty} peças)
            </div>
          ) : (
            <>Faltam {missing} peças para completar o mínimo de {settings.min_pieces}.</>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-3">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex gap-4 rounded-3xl border border-rose-baby/70 bg-white p-3 text-foreground shadow-card transition-colors dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white"
              >
                {i.image_url && (
                  <img
                    src={i.image_url}
                    alt={i.name}
                    className="h-24 w-20 rounded-xl object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="font-bold text-foreground transition-colors dark:text-white">
                    {i.name}
                  </div>

                  <div className="text-sm font-bold text-primary">
                    R$ {i.price.toFixed(2)}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground transition hover:bg-rose-baby dark:bg-[#2a101c] dark:text-white dark:hover:bg-pink-950"
                      aria-label="Menos"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <div className="w-10 text-center font-bold text-foreground transition-colors dark:text-white">
                      {i.qty}
                    </div>

                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white transition hover:opacity-90"
                      aria-label="Mais"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => remove(i.id)}
                      className="ml-auto grid h-9 w-9 place-items-center rounded-full text-red-500 transition hover:bg-red-500/10 dark:text-red-400"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-foreground transition-colors dark:text-white">
                  R$ {(i.qty * i.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-3xl border border-rose-baby/70 bg-white p-5 text-foreground shadow-card transition-colors dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white">
            <h3 className="font-display text-2xl font-bold text-foreground transition-colors dark:text-white">
              Finalizar
            </h3>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
                placeholder="WhatsApp com DDD"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
                placeholder="Cidade / Estado"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <select
                className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-sm text-foreground outline-none focus:border-primary dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              >
                <option value="transportadora">Transportadora (R$10)</option>
                <option value="excursao">Excursão (R$10)</option>
                <option value="correios">Correios (consultar)</option>
                <option value="retirada">Retirada / combinar</option>
              </select>
            </div>

            <div className="mt-5 space-y-1.5 border-t border-rose-baby/70 pt-4 text-sm text-foreground/75 transition-colors dark:border-pink-900/50 dark:text-white/80">
              <div className="flex justify-between">
                <span>Peças</span>
                <span>{t.totalQty}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {t.itemsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ {t.shippingFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-extrabold text-foreground transition-colors dark:text-white">
                <span>Total</span>
                <span className="text-primary">R$ {t.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={submit}
              disabled={sending}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-glow transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "oklch(0.65 0.15 145)" }}
            >
              <MessageCircle className="h-5 w-5" />
              {sending ? "Enviando..." : "Enviar pedido no WhatsApp"}
            </button>

            <Link
              to="/"
              className="mt-3 block text-center text-sm text-muted-foreground transition hover:text-primary dark:text-white/60"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}