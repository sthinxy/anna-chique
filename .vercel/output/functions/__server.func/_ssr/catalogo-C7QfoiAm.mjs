import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useCart, p as productsQuery, s as settingsQuery } from "./router-CKO43llX.mjs";
import { P as ProductCard } from "./ProductCard-Cgv_fUAf.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/zustand.mjs";
import "./client-qKlyq4tu.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-CWsG1l_s.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "./client.server-D5ro3rAQ.mjs";
import "../_libs/lucide-react.mjs";
const FILTERS = [{
  id: "all",
  label: "Todos"
}, {
  id: "vestido",
  label: "Vestidos"
}, {
  id: "conjunto",
  label: "Conjuntos"
}, {
  id: "hit",
  label: "Hit 🔥"
}, {
  id: "new",
  label: "Novidades"
}, {
  id: "bestseller",
  label: "Mais vendidos"
}];
function Catalog() {
  const {
    data: products
  } = useSuspenseQuery(productsQuery);
  const {
    data: settings
  } = useSuspenseQuery(settingsQuery);
  const [filter, setFilter] = reactExports.useState("all");
  const cart = useCart((s) => s.items);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const left = Math.max(0, settings.min_pieces - totalQty);
  const filtered = reactExports.useMemo(() => {
    return products.filter((p) => {
      if (filter === "all") return true;
      if (filter === "hit") return p.is_hit;
      if (filter === "new") return p.is_new;
      if (filter === "bestseller") return p.is_bestseller;
      return p.category === filter;
    });
  }, [products, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-b from-rose-baby/30 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chip", children: "💕 Catálogo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-4xl font-extrabold md:text-5xl", children: [
      "Todas as ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "peças" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 ${left === 0 ? "bg-success text-white" : "bg-foreground text-white"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: left === 0 ? `🎉 Pedido mínimo completo! Você já pode enviar (${totalQty} peças).` : totalQty === 0 ? `Pedido mínimo: ${settings.min_pieces} peças. Comece a escolher!` : `Faltam ${left} peças para fechar seu atacado (${totalQty}/${settings.min_pieces}).` }),
      totalQty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/carrinho", className: "rounded-full bg-white px-5 py-2 font-bold text-foreground", children: "Ver carrinho →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f.id), className: `rounded-full px-4 py-2 text-sm font-bold transition ${filter === f.id ? "bg-primary text-white shadow-glow" : "bg-white text-foreground/70 hover:bg-secondary"}`, children: f.label }, f.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p }, p.id)) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center text-muted-foreground", children: "Nenhuma peça nessa categoria por enquanto." })
  ] }) });
}
export {
  Catalog as component
};
