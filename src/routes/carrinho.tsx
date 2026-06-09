import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/queries";
import { useCart, cartTotals } from "@/lib/store";
import { buildWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import { Minus, Plus, Trash2, MessageCircle, PartyPopper, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho · Anna Chique" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Não encontrado</div>,
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
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8">
        <ShoppingBag className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 font-display text-3xl font-extrabold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Volte ao catálogo e escolha suas peças.</p>
        <Link to="/catalogo" className="btn-hero btn-hero-hover mt-6 inline-flex">
          Ver catálogo
        </Link>
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
          items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
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
        name, phone, city, delivery, items,
        itemsTotal: t.itemsTotal, shippingFee: t.shippingFee, total: t.total, totalQty: t.totalQty,
      });
      window.open(whatsappLink(settings.whatsapp, msg), "_blank");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-rose-baby/30 to-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <h1 className="font-display text-4xl font-extrabold md:text-5xl">
          Seu <span className="text-primary">carrinho</span>
        </h1>

        <div
          className={`mt-4 rounded-2xl p-4 font-semibold ${
            completed ? "bg-success text-white" : "bg-foreground text-white"
          }`}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <PartyPopper className="h-5 w-5" /> Pedido mínimo completo! ({t.totalQty} peças)
            </div>
          ) : (
            <>Faltam {missing} peças para completar o mínimo de {settings.min_pieces}.</>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="card-pink flex gap-4 p-3">
                {i.image_url && (
                  <img src={i.image_url} alt={i.name} className="h-24 w-20 rounded-xl object-cover" />
                )}
                <div className="flex-1">
                  <div className="font-bold">{i.name}</div>
                  <div className="text-sm text-primary font-bold">R$ {i.price.toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-secondary"
                      aria-label="Menos"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="w-10 text-center font-bold">{i.qty}</div>
                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white"
                      aria-label="Mais"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(i.id)}
                      className="ml-auto grid h-9 w-9 place-items-center rounded-full text-destructive hover:bg-destructive/10"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold">
                  R$ {(i.qty * i.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="card-pink h-fit p-5">
            <h3 className="font-display text-2xl font-bold">Finalizar</h3>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none"
                placeholder="WhatsApp com DDD"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none"
                placeholder="Cidade / Estado"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <select
                className="w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
              >
                <option value="transportadora">Transportadora (R$10)</option>
                <option value="excursao">Excursão (R$10)</option>
                <option value="correios">Correios (consultar)</option>
                <option value="retirada">Retirada / combinar</option>
              </select>
            </div>

            <div className="mt-5 space-y-1.5 border-t pt-4 text-sm">
              <div className="flex justify-between"><span>Peças</span><span>{t.totalQty}</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span>R$ {t.itemsTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Frete</span><span>R$ {t.shippingFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-extrabold pt-2"><span>Total</span><span className="text-primary">R$ {t.total.toFixed(2)}</span></div>
            </div>

            <button
              onClick={submit}
              disabled={sending}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-glow disabled:opacity-60"
              style={{ background: "oklch(0.65 0.15 145)" }}
            >
              <MessageCircle className="h-5 w-5" />
              {sending ? "Enviando..." : "Enviar pedido no WhatsApp"}
            </button>

            <Link to="/" className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary">
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
