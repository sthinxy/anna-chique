import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { I as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { s as supabase } from "./client-qKlyq4tu.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CWsG1l_s.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { V as Volume2, M as Minus, P as Plus, S as Sparkles, a as Sun, b as Moon, U as User, c as ShoppingBag, X, d as Menu, e as MessageCircle, f as Mail, I as Instagram, g as MapPin, h as Send } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-tvAYUSbd.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const useCart = create()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) => set((s) => {
        const existing = s.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: s.items.map(
              (i) => i.id === item.id ? { ...i, qty: i.qty + qty } : i
            )
          };
        }
        return { items: [...s.items, { ...item, qty }] };
      }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => i.id === id ? { ...i, qty } : i)
      })),
      clear: () => set({ items: [] })
    }),
    { name: "ac-cart-v1" }
  )
);
const cartTotals = (items, shippingFee, method) => {
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const itemsTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const fee = method === "correios" ? 0 : method === "retirada" ? 0 : shippingFee;
  return { totalQty, itemsTotal, shippingFee: fee, total: itemsTotal + fee };
};
const useA11y = create()(
  persist(
    (set, get) => ({
      textSize: "md",
      easyMode: false,
      setText: (s) => {
        set({ textSize: s });
        if (typeof document !== "undefined")
          document.documentElement.dataset.text = s;
      },
      toggleEasy: () => {
        const next = !get().easyMode;
        set({ easyMode: next });
        if (typeof document !== "undefined")
          document.documentElement.dataset.easy = String(next);
      },
      speak: (text) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "pt-BR";
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    }),
    { name: "ac-a11y-v1" }
  )
);
const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/#como-comprar", label: "Como comprar" },
  { to: "/#pix", label: "Pagamento" },
  { to: "/#faq", label: "Dúvidas" }
];
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const [darkMode, setDarkMode] = reactExports.useState(false);
  const [user, setUser] = reactExports.useState(null);
  const items = useCart((s) => s.items);
  const qty = items.reduce((s, i) => s + i.qty, 0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  const toggleDarkMode = () => {
    const willBeDark = !darkMode;
    setDarkMode(willBeDark);
    if (willBeDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_e, sess) => setUser(sess?.user ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);
  reactExports.useEffect(() => setOpen(false), [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 glass border-b border-transparent transition-colors dark:border-pink-900/30 dark:bg-[#12070d]/90 dark:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://ohvynherkuwovccnpoeh.supabase.co/storage/v1/object/public/product-images/logo.png",
            alt: "Anna Chique",
            className: "h-12 w-12 rounded-full shadow-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-extrabold tracking-tight text-foreground transition-colors dark:text-white md:text-2xl", children: [
          "Anna ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chique" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: n.to,
          className: "rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary hover:text-primary dark:text-white/80 dark:hover:bg-pink-950/60 dark:hover:text-pink-300",
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleDarkMode,
            className: "hidden h-11 w-11 items-center justify-center rounded-full border bg-white text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 dark:hover:border-pink-400 md:flex",
            "aria-label": darkMode ? "Ativar modo claro" : "Ativar modo noturno",
            title: darkMode ? "Modo claro" : "Modo noturno",
            children: darkMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: user ? "/minha-conta" : "/auth",
            className: "hidden h-11 w-11 items-center justify-center rounded-full border bg-white text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 dark:hover:border-pink-400 md:flex",
            "aria-label": "Minha conta",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/carrinho",
            className: "relative flex h-11 items-center gap-2 rounded-full bg-foreground px-4 text-white shadow-soft transition hover:bg-primary dark:bg-pink-700 dark:hover:bg-pink-500",
            "aria-label": "Carrinho",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-sm font-semibold sm:inline", children: "Carrinho" }),
              qty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pop absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-white ring-2 ring-white dark:ring-[#12070d]", children: qty })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "grid h-11 w-11 place-items-center rounded-full border bg-white text-foreground transition dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 md:hidden",
            onClick: () => setOpen((v) => !v),
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t bg-white/95 backdrop-blur transition-colors dark:border-pink-900/30 dark:bg-[#12070d]/95 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col px-4 py-3", children: [
      nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: n.to,
          className: "rounded-xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60",
          children: n.label
        },
        n.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: user ? "/minha-conta" : "/auth",
          className: "rounded-xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60",
          children: user ? "Minha conta" : "Entrar / Cadastrar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: toggleDarkMode,
          className: "mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-left text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60",
          children: [
            darkMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" }),
            darkMode ? "Modo claro" : "Modo noturno"
          ]
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-16 border-t bg-gradient-to-b from-rose-baby/40 to-white transition-colors dark:border-pink-900/30 dark:from-[#1b0b13] dark:to-[#0d0509] dark:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://ohvynherkuwovccnpoeh.supabase.co/storage/v1/object/public/product-images/logo.png",
              alt: "Anna Chique",
              className: "h-14 w-14 rounded-full shadow-soft"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl font-extrabold text-foreground transition-colors dark:text-white", children: [
              "Anna ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Chique" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground transition-colors dark:text-pink-200/70", children: "Moda Feminina · Atacado" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xs text-sm text-muted-foreground transition-colors dark:text-white/70", children: "Fabricamos vestidos e conjuntos para revendedoras de todo o Brasil há mais de 20 anos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-foreground transition-colors dark:text-white", children: "Atendimento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              className: "flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300",
              href: "https://wa.me/558594374066",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { suppressHydrationWarning: true, children: "+55 85 9437-4066" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              className: "flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300",
              href: "mailto:annachiqueloja@gmail.com",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { suppressHydrationWarning: true, children: "annachiqueloja@gmail.com" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              className: "flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300",
              href: "https://www.instagram.com/annachique_/",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { suppressHydrationWarning: true, children: "@annachique_" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-foreground transition-colors dark:text-white", children: "Endereço" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 flex items-start gap-2 text-sm text-muted-foreground transition-colors dark:text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Rua José Avelino,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Fortaleza - CE",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Feira José Avelino"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-foreground transition-colors dark:text-white", children: "A loja" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-foreground/80 transition-colors dark:text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "R$ 25 por peça" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pedido mínimo: 12 peças" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Envio para todo o Brasil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pagamento por Pix" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border-t py-4 text-center text-xs text-muted-foreground transition-colors dark:border-pink-900/30 dark:text-white/50",
        suppressHydrationWarning: true,
        children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Anna Chique · Todos os direitos reservados"
        ]
      }
    )
  ] });
}
const QUICK = [
  "Como comprar?",
  "Qual o preço?",
  "Qual o mínimo?",
  "Como escolher cor?",
  "Como funciona entrega?",
  "Como pagar?"
];
function ChatWidget() {
  const [open, setOpen] = reactExports.useState(false);
  const [msgs, setMsgs] = reactExports.useState([
    {
      role: "assistant",
      content: "Oi, amiga! 💖 Eu sou a Assistente Anna. Eu te ajudo a comprar. Você quer saber preço, mínimo, entrega, cores ou como mandar o pedido?"
    }
  ]);
  const [input, setInput] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const { speak } = useA11y();
  const send = async (text) => {
    if (!text.trim() || loading) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/public/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await r.json();
      const reply = data.reply ?? "Desculpa, amiga, tive um probleminha agora. Chama no WhatsApp +55 85 9437-4066 que a gente te atende rapidinho!";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: "Não consegui responder agora. Me chama no WhatsApp +55 85 9437-4066 que te ajudo na hora! 💕"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((v) => !v),
        className: "animate-pulse-pink fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full text-white shadow-glow",
        style: { background: "var(--gradient-rose)" },
        "aria-label": "Abrir assistente",
        children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-7 w-7" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-7 w-7" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pop fixed bottom-24 right-3 z-50 flex h-[min(75dvh,560px)] w-[min(95vw,380px)] flex-col overflow-hidden rounded-3xl border border-rose-baby/70 bg-white shadow-glow transition-colors dark:border-pink-900/50 dark:bg-[#12070d]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-gradient-to-r from-primary to-rose-deep px-4 py-3 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg font-bold", children: "A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-bold leading-none", children: "Assistente Anna" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/90", children: "Online · te respondo rapidinho" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 overflow-y-auto bg-rose-baby/25 p-3 transition-colors dark:bg-[#1a0711]", children: [
        msgs.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-soft ${m.role === "user" ? "bg-primary text-white" : "bg-white text-foreground dark:bg-[#2a101c] dark:text-white"}`,
                children: [
                  m.content,
                  m.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => speak(m.content),
                      className: "ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline dark:text-pink-300",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-3 w-3" }),
                        " ouvir"
                      ]
                    }
                  )
                ]
              }
            )
          },
          i
        )),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-white px-3 py-2 text-sm text-foreground shadow-soft dark:bg-[#2a101c] dark:text-white", children: "digitando..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pt-2", children: [
          QUICK.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => send(q),
              className: "rounded-full border border-rose-baby/70 bg-white px-3 py-1 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white/80 dark:hover:border-pink-400 dark:hover:text-pink-300",
              children: q
            },
            q
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://wa.me/558594374066",
              className: "rounded-full bg-success px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90",
              children: "Falar com atendente"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            send(input);
          },
          className: "flex items-center gap-2 border-t border-rose-baby/70 bg-white p-2 transition-colors dark:border-pink-900/50 dark:bg-[#12070d]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Escreva sua dúvida...",
                className: "flex-1 rounded-full border border-rose-baby/70 bg-secondary/40 px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-soft transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500",
                "aria-label": "Enviar",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function A11yBar() {
  const { textSize, setText, easyMode, toggleEasy, speak } = useA11y();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-rose-baby/50 bg-[#12070d] text-white transition-colors dark:border-pink-900/40 dark:bg-[#080306]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden font-medium text-white/85 sm:inline", children: "✨ Atacado feminino · R$25 a peça · Mínimo 12 peças · Envio para todo Brasil" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => speak(
            "Bem vinda à Anna Chique. Aqui você compra vestidos e conjuntos no atacado. O preço é vinte e cinco reais por peça, e o pedido mínimo é doze peças."
          ),
          className: "flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20 dark:bg-white/10 dark:hover:bg-pink-500/25",
          "aria-label": "Ouvir explicação",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-3.5 w-3.5" }),
            " Ouvir"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setText(textSize === "md" ? "lg" : textSize === "lg" ? "xl" : "md"),
          className: "flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20 dark:bg-white/10 dark:hover:bg-pink-500/25",
          "aria-label": "Aumentar texto",
          children: [
            textSize === "xl" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            "Texto"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: toggleEasy,
          className: `flex items-center gap-1 rounded-full px-3 py-1 font-semibold transition ${easyMode ? "bg-primary text-white shadow-soft" : "bg-white/10 text-white hover:bg-white/20 dark:hover:bg-pink-500/25"}`,
          "aria-pressed": easyMode,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Modo fácil"
          ]
        }
      )
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Página não encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "O link que você abriu não existe mais." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-hero btn-hero-hover mt-6", children: "Voltar para a loja" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Algo deu errado" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Tente novamente ou volte para a loja." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "btn-hero btn-hero-hover",
        children: "Tentar de novo"
      }
    ) })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#FF2E93" },
      { title: "Anna Chique | Roupas Femininas no Atacado" },
      {
        name: "description",
        content: "Vestidos e conjuntos femininos no atacado por R$25 a partir de 12 peças. Anna Chique envia para todo o Brasil e atende revendedoras pelo WhatsApp."
      },
      {
        name: "keywords",
        content: "Anna Chique, roupas femininas atacado, vestidos atacado, conjuntos atacado, moda feminina atacado, roupas para revenda, José Avelino Fortaleza"
      },
      { property: "og:title", content: "Anna Chique | Roupas Femininas no Atacado" },
      {
        property: "og:description",
        content: "R$25 a peça, mínimo 12. Envio para todo Brasil."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Anna Chique | Roupas Femininas no Atacado" },
      { name: "description", content: "Anna Chique Wholesale Hub is a wholesale clothing e-commerce platform for female resellers." },
      { property: "og:description", content: "Anna Chique Wholesale Hub is a wholesale clothing e-commerce platform for female resellers." },
      { name: "twitter:description", content: "Anna Chique Wholesale Hub is a wholesale clothing e-commerce platform for female resellers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0606a93b-d733-4c4f-91a9-ee72298e693d/id-preview-69ef04ee--77e6fc51-c4d4-45b6-9d84-e8773b402578.lovable.app-1780953115116.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0606a93b-d733-4c4f-91a9-ee72298e693d/id-preview-69ef04ee--77e6fc51-c4d4-45b6-9d84-e8773b402578.lovable.app-1780953115116.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Manrope:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        router2.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(A11yBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatWidget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getPublicProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9a6541631cbabffa401ef96c2dda0cd1d325a204b0a29f86a9be21d9a76d4887"));
const getPublicSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("17c8262e497437c3378d9208dce103ef6b21a61febdd07e7803cdbe64886443a"));
const getPublicReviews = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e749c72c7ebed0efeb0eb76434ba1a41103739076c003811248ff176710598bc"));
const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    return await getPublicProducts();
  }
});
const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: async () => {
    return await getPublicSettings();
  }
});
const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async () => {
    return await getPublicReviews();
  }
});
const $$splitComponentImporter$6 = () => import("./catalogo-C7QfoiAm.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./catalogo-Bjw4yM_E.mjs");
const $$splitErrorComponentImporter$2 = () => import("./catalogo-gw7CWNCf.mjs");
const Route$7 = createFileRoute("/catalogo")({
  head: () => ({
    meta: [{
      title: "Catálogo · Anna Chique Atacado"
    }, {
      name: "description",
      content: "Catálogo completo de vestidos e conjuntos femininos no atacado, R$25 a peça, mínimo 12."
    }]
  }),
  loader: ({
    context
  }) => Promise.all([context.queryClient.ensureQueryData(productsQuery), context.queryClient.ensureQueryData(settingsQuery)]),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./carrinho-DlmROic3.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./carrinho-Bjw4yM_E.mjs");
const $$splitErrorComponentImporter$1 = () => import("./carrinho-gw7CWNCf.mjs");
const Route$6 = createFileRoute("/carrinho")({
  head: () => ({
    meta: [{
      title: "Carrinho · Anna Chique"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(settingsQuery),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./auth-CDaDIjKj.mjs");
const Route$5 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Entrar · Anna Chique"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./route-BFsOu0JM.mjs");
const Route$4 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    const {
      data: roles
    } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    return {
      user: data.user,
      isAdmin: (roles ?? []).some((r) => r.role === "admin")
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-DQ80UvX9.mjs");
const $$splitNotFoundComponentImporter = () => import("./index-DDBcOALe.mjs");
const $$splitErrorComponentImporter = () => import("./index-BoIGxQiM.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Anna Chique | Vestidos e Conjuntos no Atacado · R$25"
    }, {
      name: "description",
      content: "Loja de fábrica em Fortaleza. Vestidos e conjuntos femininos por R$25 a peça, a partir de 12. Envio para todo Brasil. Atendimento pelo WhatsApp."
    }]
  }),
  loader: ({
    context
  }) => Promise.all([context.queryClient.ensureQueryData(productsQuery), context.queryClient.ensureQueryData(settingsQuery), context.queryClient.ensureQueryData(reviewsQuery)]),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./minha-conta-D79Ya3K7.mjs");
const Route$2 = createFileRoute("/_authenticated/minha-conta")({
  head: () => ({
    meta: [{
      title: "Minha conta · Anna Chique"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin-DJY6gq4K.mjs");
const Route$1 = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{
      title: "Admin · Anna Chique"
    }]
  }),
  beforeLoad: ({
    context
  }) => {
    if (!context.isAdmin) throw redirect({
      to: "/minha-conta"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SYSTEM = `Você é a "Assistente Anna", atendente virtual da loja Anna Chique (fabricante de roupas femininas no atacado em Fortaleza-CE).
Tom: simples, feminino, próximo, acolhedor, didático — como uma vendedora pelo WhatsApp. Use linguagem popular e respostas curtas (máx 4 linhas).
Público: revendedoras, muitas com pouca familiaridade com tecnologia.

Informações da loja:
- Vende apenas no ATACADO (não vende varejo).
- Todas as peças custam R$25 cada para revenda.
- Pedido mínimo: 12 peças.
- Fabricamos só vestidos e conjuntos femininos. Tamanho único.
- Tecidos: Beach Gloss, Veludo, Suplex e outros.
- Acima de 20 peças a cliente pode escolher as cores; abaixo disso vai sortido.
- Entrega por excursão ou transportadora: taxa fixa de R$10.
- Correios: valor consultado pelo WhatsApp.
- Pagamento por Pix manual; enviar comprovante pelo WhatsApp.
- WhatsApp: +55 85 9437-4066 (https://wa.me/558594374066).
- Instagram: @annachique_
- Endereço: Rua José Avelino, Fortaleza-CE (Feira José Avelino).
- Catálogo atualizado quase toda semana.

Sempre que a cliente quiser falar com humano, indique o WhatsApp +55 85 9437-4066. Nunca invente preços, prazos ou políticas. Use "amiga" com moderação.`;
const Route = createFileRoute("/api/public/ai-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const messages = (body.messages ?? []).slice(-20);
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "Missing key" }, { status: 500 });
          }
          const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM },
                ...messages.map((m) => ({ role: m.role, content: m.content }))
              ]
            })
          });
          if (!r.ok) {
            const txt = await r.text();
            console.error("AI error", r.status, txt);
            if (r.status === 429) {
              return Response.json({ reply: "Tô com muita gente falando comigo agora 😅 tenta de novo em 1 minuto, ou chama no WhatsApp: +55 85 9437-4066." });
            }
            if (r.status === 402) {
              return Response.json({ reply: "Ah, amiga, tô sem créditos pra responder. Me chama no WhatsApp +55 85 9437-4066 que te atendo agora!" });
            }
            return Response.json({ reply: "Não consegui responder agora. Me chama no WhatsApp +55 85 9437-4066." });
          }
          const data = await r.json();
          const reply = data.choices?.[0]?.message?.content ?? "Não entendi, amiga. Pode repetir?";
          try {
            const last = messages[messages.length - 1]?.content ?? "";
            const sid = crypto.randomUUID();
            await supabaseAdmin.from("chat_logs").insert([
              { session_id: sid, role: "user", content: last },
              { session_id: sid, role: "assistant", content: reply }
            ]);
          } catch {
          }
          return Response.json({ reply });
        } catch (e) {
          console.error(e);
          return Response.json({ reply: "Tive um probleminha. Tenta de novo ou me chama no WhatsApp +55 85 9437-4066." });
        }
      }
    }
  }
});
const CatalogoRoute = Route$7.update({
  id: "/catalogo",
  path: "/catalogo",
  getParentRoute: () => Route$8
});
const CarrinhoRoute = Route$6.update({
  id: "/carrinho",
  path: "/carrinho",
  getParentRoute: () => Route$8
});
const AuthRoute = Route$5.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$8
});
const AuthenticatedRouteRoute = Route$4.update({
  id: "/_authenticated",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AuthenticatedMinhaContaRoute = Route$2.update({
  id: "/minha-conta",
  path: "/minha-conta",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const ApiPublicAiChatRoute = Route.update({
  id: "/api/public/ai-chat",
  path: "/api/public/ai-chat",
  getParentRoute: () => Route$8
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedMinhaContaRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  CarrinhoRoute,
  CatalogoRoute,
  ApiPublicAiChatRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  useA11y as a,
  router as b,
  cartTotals as c,
  productsQuery as p,
  reviewsQuery as r,
  settingsQuery as s,
  useCart as u
};
