import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useCart } from "./router-CKO43llX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as Flame, S as Sparkles, P as Plus } from "../_libs/lucide-react.mjs";
function ProductCard({ p }) {
  const add = useCart((s) => s.add);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group card-pink overflow-hidden transition hover:-translate-y-1 hover:shadow-glow dark:bg-[#1b0b13] dark:text-white dark:hover:shadow-[0_20px_60px_-20px_rgba(255,46,147,0.55)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-rose-baby/30 transition-colors dark:bg-pink-950/30", children: [
      p.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: p.image_url,
          alt: p.name,
          loading: "lazy",
          className: "h-full w-full object-cover transition duration-500 group-hover:scale-105"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-3 top-3 flex flex-col gap-1.5", children: [
        p.is_hit && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-xs font-bold text-white shadow-soft dark:bg-pink-950 dark:text-pink-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
          " Hit"
        ] }),
        p.is_new && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
          " Novidade"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-primary shadow-soft transition-colors dark:bg-[#12070d]/95 dark:text-pink-300", children: [
        "R$ ",
        Number(p.price).toFixed(0)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider text-primary dark:text-pink-300", children: p.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 line-clamp-1 font-display text-lg font-bold text-foreground transition-colors dark:text-white", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 line-clamp-1 text-xs text-muted-foreground transition-colors dark:text-white/60", children: [
        p.fabric ? `${p.fabric} · ` : "",
        p.colors?.length ? `${p.colors.length} cor${p.colors.length > 1 ? "es" : ""}` : "Tamanho único"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            add({
              id: p.id,
              name: p.name,
              price: Number(p.price),
              image_url: p.image_url
            });
            toast.success("Adicionada ao carrinho ✨", {
              description: `${p.name} — R$ ${Number(p.price).toFixed(2)}`
            });
          },
          className: "mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-white shadow-soft transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Adicionar"
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductCard as P
};
