import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useCart, c as cartTotals, s as settingsQuery } from "./router-CKO43llX.mjs";
import { s as supabase } from "./client-qKlyq4tu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { c as ShoppingBag, i as PartyPopper, M as Minus, P as Plus, T as Trash2, e as MessageCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
import "./server-CWsG1l_s.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const labelDelivery = (d) => ({
  transportadora: "Transportadora",
  excursao: "Excursão",
  correios: "Correios (consultar valor)",
  retirada: "Retirada / combinar"
})[d] ?? d;
function buildWhatsAppMessage(d) {
  const lines = [
    "Olá, quero fechar meu pedido no atacado da *Anna Chique*. 💖",
    "",
    `*Nome:* ${d.name}`,
    `*Telefone:* ${d.phone}`,
    `*Cidade/Estado:* ${d.city}`,
    `*Forma de entrega:* ${labelDelivery(d.delivery)}`,
    "",
    "*Produtos:*",
    ...d.items.map(
      (i) => `• ${i.qty}x ${i.name}${i.color ? ` (${i.color})` : ""} — R$ ${(i.qty * i.price).toFixed(2)}`
    ),
    "",
    `*Quantidade total:* ${d.totalQty} peças`,
    `*Valor das peças:* R$ ${d.itemsTotal.toFixed(2)}`,
    `*Taxa/frete estimado:* R$ ${d.shippingFee.toFixed(2)}`,
    `*Total estimado:* R$ ${d.total.toFixed(2)}`,
    "",
    "*Forma de pagamento:* Pix",
    "Vou enviar o comprovante por aqui. Obrigada! 🌸"
  ];
  return lines.join("\n");
}
function whatsappLink(phone, message) {
  const num = phone.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
function CartPage() {
  const {
    data: settings
  } = useSuspenseQuery(settingsQuery);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [delivery, setDelivery] = reactExports.useState("transportadora");
  const [sending, setSending] = reactExports.useState(false);
  const t = cartTotals(items, Number(settings.shipping_fee), delivery);
  const missing = Math.max(0, settings.min_pieces - t.totalQty);
  const completed = t.totalQty >= settings.min_pieces;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-20 text-center md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mx-auto h-16 w-16 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-3xl font-extrabold", children: "Seu carrinho está vazio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Volte ao catálogo e escolha suas peças." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalogo", className: "btn-hero btn-hero-hover mt-6 inline-flex", children: "Ver catálogo" })
    ] });
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
      const {
        data: u
      } = await supabase.auth.getUser();
      const {
        data: order
      } = await supabase.from("orders").insert({
        user_id: u.user?.id ?? null,
        customer_name: name,
        customer_phone: phone,
        customer_city: city,
        delivery_method: delivery,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          qty: i.qty,
          price: i.price
        })),
        total_qty: t.totalQty,
        items_total: t.itemsTotal,
        shipping_fee: t.shippingFee,
        total: t.total,
        status: "separando",
        whatsapp_clicked: true
      }).select().maybeSingle();
      await supabase.from("cart_events").insert({
        session_id: order?.id ?? crypto.randomUUID(),
        user_id: u.user?.id ?? null,
        event_type: "whatsapp_clicked",
        payload: {
          qty: t.totalQty,
          total: t.total
        }
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
        totalQty: t.totalQty
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
        totalQty: t.totalQty
      });
      window.open(whatsappLink(settings.whatsapp, msg), "_blank");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-b from-rose-baby/30 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-10 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-extrabold md:text-5xl", children: [
      "Seu ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "carrinho" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 rounded-2xl p-4 font-semibold ${completed ? "bg-success text-white" : "bg-foreground text-white"}`, children: completed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "h-5 w-5" }),
      " Pedido mínimo completo! (",
      t.totalQty,
      " peças)"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Faltam ",
      missing,
      " peças para completar o mínimo de ",
      settings.min_pieces,
      "."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink flex gap-4 p-3", children: [
        i.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image_url, alt: i.name, className: "h-24 w-20 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: i.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-primary font-bold", children: [
            "R$ ",
            i.price.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.id, i.qty - 1), className: "grid h-9 w-9 place-items-center rounded-full bg-secondary", "aria-label": "Menos", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 text-center font-bold", children: i.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.id, i.qty + 1), className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-white", "aria-label": "Mais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(i.id), className: "ml-auto grid h-9 w-9 place-items-center rounded-full text-destructive hover:bg-destructive/10", "aria-label": "Remover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right font-bold", children: [
          "R$ ",
          (i.qty * i.price).toFixed(2)
        ] })
      ] }, i.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink h-fit p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold", children: "Finalizar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none", placeholder: "Seu nome", value: name, onChange: (e) => setName(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none", placeholder: "WhatsApp com DDD", value: phone, onChange: (e) => setPhone(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none", placeholder: "Cidade / Estado", value: city, onChange: (e) => setCity(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full rounded-xl border bg-white p-3 text-sm focus:border-primary outline-none", value: delivery, onChange: (e) => setDelivery(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "transportadora", children: "Transportadora (R$10)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "excursao", children: "Excursão (R$10)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "correios", children: "Correios (consultar)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "retirada", children: "Retirada / combinar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-1.5 border-t pt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Peças" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.totalQty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "R$ ",
              t.itemsTotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Frete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "R$ ",
              t.shippingFee.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-extrabold pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
              "R$ ",
              t.total.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: submit, disabled: sending, className: "mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-bold text-white shadow-glow disabled:opacity-60", style: {
          background: "oklch(0.65 0.15 145)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
          sending ? "Enviando..." : "Enviar pedido no WhatsApp"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-3 block text-center text-sm text-muted-foreground hover:text-primary", children: "Continuar comprando" })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as component
};
