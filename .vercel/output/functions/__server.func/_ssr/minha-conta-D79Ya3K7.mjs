import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-qKlyq4tu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route$2 } from "./router-CKO43llX.mjs";
import "../_libs/seroval.mjs";
import { p as Settings, L as LogOut, c as ShoppingBag, e as MessageCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "./server-CWsG1l_s.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client.server-D5ro3rAQ.mjs";
function Account() {
  const ctx = Route$2.useRouteContext();
  const navigate = useNavigate();
  const [orders, setOrders] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("orders").select("id,created_at,status,total_qty,total,delivery_method").eq("user_id", ctx.user.id).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setOrders(data ?? []));
  }, [ctx.user.id]);
  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Até logo! 💕");
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-b from-rose-baby/30 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-10 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chip", children: "Minha conta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-4xl font-extrabold", children: [
          "Olá, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: ctx.user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        ctx.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-bold text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
          " Painel Admin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Sair"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-10 font-display text-2xl font-bold", children: "Meus pedidos" }),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink mt-4 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mx-auto h-10 w-10 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Você ainda não tem pedidos. Bora começar?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalogo", className: "btn-hero btn-hero-hover mt-5 inline-flex", children: "Ver catálogo" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink flex flex-wrap items-center justify-between gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("pt-BR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
          o.total_qty,
          " peças · R$ ",
          Number(o.total).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Entrega: ",
          o.delivery_method
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary", children: o.status })
    ] }, o.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/558594374066", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-success px-5 py-3 font-bold text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Falar no WhatsApp"
    ] })
  ] }) });
}
export {
  Account as component
};
