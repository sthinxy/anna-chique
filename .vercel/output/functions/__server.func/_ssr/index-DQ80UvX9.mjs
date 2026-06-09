import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useA11y, p as productsQuery, s as settingsQuery, r as reviewsQuery } from "./router-CKO43llX.mjs";
import { P as ProductCard } from "./ProductCard-Cgv_fUAf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { S as Sparkles, c as ShoppingBag, H as Heart, e as MessageCircle, k as Headphones, V as Volume2, l as Truck, j as ShieldCheck, m as Star, I as Instagram, n as PackageCheck, C as Check, o as Copy } from "../_libs/lucide-react.mjs";
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
import "./client.server-D5ro3rAQ.mjs";
function Home() {
  const {
    data: products
  } = useSuspenseQuery(productsQuery);
  const {
    data: settings
  } = useSuspenseQuery(settingsQuery);
  const {
    data: reviews
  } = useSuspenseQuery(reviewsQuery);
  const {
    speak
  } = useA11y();
  const featured = products.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden transition-colors", style: {
      background: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          " Coleção atualizada toda semana"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-5xl font-extrabold leading-[0.95] text-foreground transition-colors dark:text-white md:text-7xl", children: [
          settings.hero_title.split(" ").slice(0, -2).join(" "),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: settings.hero_title.split(" ").slice(-2).join(" ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-lg text-foreground/80 transition-colors dark:text-white/75", children: settings.hero_subtitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalogo", className: "btn-hero btn-hero-hover", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
            " Ver peças"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#como-comprar", className: "btn-hero btn-hero-hover", style: {
            background: "var(--color-foreground)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }),
            " Como comprar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${settings.whatsapp}`, className: "btn-hero btn-hero-hover", style: {
            background: "oklch(0.65 0.15 145)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
            " WhatsApp"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "💖 Preço único R$25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "📦 Mínimo 12 peças" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "🚚 Todo o Brasil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", children: "⭐ +30 mil seguidoras" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-2 gap-3", children: [
        featured.slice(0, 4).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `card-pink animate-float overflow-hidden ${i % 2 === 0 ? "translate-y-4" : ""}`, style: {
          animationDelay: `${i * 0.4}s`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] bg-rose-baby/30 transition-colors dark:bg-pink-950/30", children: [
          p.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.name, className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-primary shadow transition-colors dark:bg-[#12070d]/95 dark:text-pink-300", children: "R$25" })
        ] }) }, p.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-rose-baby blur-3xl dark:bg-pink-800/40" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "como-comprar", className: "section-pad bg-white transition-colors dark:bg-[#0d0509]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chip", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "h-3.5 w-3.5" }),
            " Passo a passo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: [
            "Comprar é ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "fácil" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => speak("Para comprar, escolha as peças no catálogo, complete no mínimo doze unidades e clique no botão do WhatsApp. Nossa equipe vai confirmar seu pedido."), className: "inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/70 dark:bg-pink-950/60 dark:text-pink-100 dark:hover:bg-pink-900/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4 text-primary" }),
          " Ouvir explicação"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: [{
        n: 1,
        t: "Escolha suas peças",
        d: "Veja vestidos e conjuntos no catálogo e adicione no carrinho."
      }, {
        n: 2,
        t: "Complete 12 peças",
        d: "O atacado começa a partir de 12 unidades — o sistema te avisa."
      }, {
        n: 3,
        t: "Envie no WhatsApp",
        d: "Seu pedido vai prontinho para a nossa equipe te atender."
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl text-3xl font-extrabold text-white shadow-glow", style: {
          background: "var(--gradient-rose)"
        }, children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-2xl font-bold text-foreground transition-colors dark:text-white", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/70 transition-colors dark:text-white/70", children: s.d })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "catalogo", className: "section-pad bg-gradient-to-b from-rose-baby/20 to-white transition-colors dark:from-[#170812] dark:to-[#0d0509]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chip", children: "💕 Destaques" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: [
            "Peças mais ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "amadas" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalogo", className: "font-semibold text-primary hover:underline dark:text-pink-300", children: "Ver tudo →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: featured.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "entrega", className: "section-pad bg-white transition-colors dark:bg-[#0d0509]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chip", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-3.5 w-3.5 text-primary" }),
        " Frete e entrega"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: [
        "Sua compra chega ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "em qualquer canto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-4", children: [{
        t: "Excursão",
        d: "Taxa fixa R$10. Confirmamos a rota no WhatsApp."
      }, {
        t: "Transportadora",
        d: "Taxa fixa R$10. Conferência no atendimento."
      }, {
        t: "Correios",
        d: "Consulte o valor pelo WhatsApp (cada cidade tem um valor)."
      }, {
        t: "Retirada",
        d: "Combine com a gente pelo WhatsApp."
      }].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-rose-baby transition-colors dark:bg-pink-950/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-6 w-6 text-rose-deep dark:text-pink-300" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-xl font-bold text-foreground transition-colors dark:text-white", children: o.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-foreground/70 transition-colors dark:text-white/70", children: o.d })
      ] }, o.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PixSection, { settings }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "seguranca", className: "section-pad bg-white transition-colors dark:bg-[#0d0509]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chip", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
        " Segurança"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: [
        "Pode comprar com ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "segurança" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-lg text-foreground/70 transition-colors dark:text-white/70", children: "A Anna Chique fabrica roupas há mais de 20 anos, tem Instagram ativo com mais de 30 mil seguidoras e atende revendedoras de todo o Brasil pelo WhatsApp." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-4", children: [{
        i: "20+",
        t: "Anos fabricando"
      }, {
        i: "30k",
        t: "Seguidoras Insta"
      }, {
        i: "BR",
        t: "Envio todo país"
      }, {
        i: "Pix",
        t: "Pagamento seguro"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-rose-baby/40 p-5 text-center transition-colors dark:bg-pink-950/40 dark:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-extrabold text-primary dark:text-pink-300", children: s.i }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: s.t })
      ] }, s.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: reviews.slice(0, 4).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex text-warning", children: Array.from({
          length: r.stars
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm leading-relaxed text-foreground/80 transition-colors dark:text-white/75", children: [
          '"',
          r.comment,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs font-bold text-foreground transition-colors dark:text-white", children: [
          r.name,
          r.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground dark:text-white/50", children: [
            " ",
            "· ",
            r.city
          ] })
        ] })
      ] }, r.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "section-pad relative overflow-hidden text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
        background: "var(--gradient-rose)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 opacity-30", style: {
        background: "radial-gradient(circle at 30% 30%, white 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto h-10 w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl font-extrabold md:text-6xl", children: "Bora começar a revender?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg opacity-90", children: "Manda oi no WhatsApp ou já monta seu pedido no catálogo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${settings.whatsapp}`, className: "inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 font-bold text-primary shadow-glow transition hover:scale-105", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
            " Falar no WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalogo", className: "inline-flex min-h-[52px] items-center gap-2 rounded-full bg-foreground px-7 font-bold text-white transition hover:scale-105 dark:bg-[#12070d]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
            " Ver catálogo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.instagram.com/annachique_/", className: "inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-white px-7 font-bold text-white transition hover:bg-white hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-5 w-5" }),
            " Instagram"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function PixSection({
  settings
}) {
  const [c1, setC1] = reactExports.useState(false);
  const [c2, setC2] = reactExports.useState(false);
  const copy = async (text, set) => {
    await navigator.clipboard.writeText(text);
    set(true);
    toast.success("Copiado!");
    setTimeout(() => set(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "pix", className: "section-pad bg-gradient-to-b from-white to-rose-baby/40 transition-colors dark:from-[#0d0509] dark:to-[#1b0b13]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chip", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "h-3.5 w-3.5 text-primary" }),
      " Pagamento"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: [
      "Pagamento por ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Pix" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-foreground/70 transition-colors dark:text-white/70", children: "Depois de pagar, envie o comprovante junto com o pedido no WhatsApp." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold uppercase tracking-wider text-primary dark:text-pink-300", children: "Chave Pix (e-mail)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 break-all rounded-2xl bg-secondary p-4 font-mono text-sm text-secondary-foreground transition-colors dark:bg-pink-950/50 dark:text-white/80", children: settings.pix_key }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => copy(settings.pix_key, setC1), className: "mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500", children: [
          c1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
          c1 ? "Chave copiada" : "Copiar chave"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold uppercase tracking-wider text-primary dark:text-pink-300", children: "Pix copia e cola" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-h-32 overflow-auto rounded-2xl bg-secondary p-4 font-mono text-xs break-all text-secondary-foreground transition-colors dark:bg-pink-950/50 dark:text-white/80", children: settings.pix_code }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => copy(settings.pix_code, setC2), className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500", children: [
            c2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
            c2 ? "Código copiado" : "Copiar código Pix"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: settings.nubank_link, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 font-bold text-primary transition hover:bg-primary hover:text-white dark:border-pink-400 dark:text-pink-300 dark:hover:bg-pink-500 dark:hover:text-white", children: "Link Nubank" })
        ] })
      ] })
    ] })
  ] }) });
}
const FAQ_ITEMS = [{
  q: "Qual o valor das peças?",
  a: "Todas as peças custam R$25 para revenda."
}, {
  q: "Qual o pedido mínimo?",
  a: "O pedido mínimo é 12 peças."
}, {
  q: "Vende no varejo?",
  a: "Não. Vendemos apenas no atacado."
}, {
  q: "Posso escolher as cores?",
  a: "Acima de 20 peças você pode escolher as cores. Abaixo disso, enviamos cores e estampas sortidas."
}, {
  q: "Qual o tamanho?",
  a: "As peças são tamanho único."
}, {
  q: "Quais peças vocês fabricam?",
  a: "Fabricamos vestidos e conjuntos femininos."
}, {
  q: "Quais tecidos vocês trabalham?",
  a: "Beach Gloss, Veludo, Suplex e outros."
}, {
  q: "Envia para todo o Brasil?",
  a: "Sim. Enviamos por excursão, transportadora e Correios."
}, {
  q: "Como vejo o valor do Correios?",
  a: "Você consulta pelo WhatsApp."
}, {
  q: "Como pago?",
  a: "Você paga por Pix e envia o comprovante no WhatsApp."
}];
function FAQ() {
  const {
    speak
  } = useA11y();
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "section-pad bg-white transition-colors dark:bg-[#0d0509]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chip", children: "❓ Dúvidas frequentes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl", children: "Tudo que você precisa saber" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: FAQ_ITEMS.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(open === i ? null : i), className: "flex w-full items-center justify-between gap-3 p-5 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-foreground transition-colors dark:text-white", children: it.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-primary dark:text-pink-300", children: open === i ? "–" : "+" })
      ] }),
      open === i && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t p-5 pt-4 transition-colors dark:border-pink-900/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 transition-colors dark:text-white/70", children: it.a }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => speak(it.a), className: "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline dark:text-pink-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" }),
          " Ouvir resposta"
        ] })
      ] })
    ] }, i)) })
  ] }) });
}
export {
  Home as component
};
