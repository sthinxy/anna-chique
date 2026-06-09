import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-qKlyq4tu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
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
const ADMIN_EMAIL = "acadmin@annachique.com";
function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("login");
  const [identifier, setIdentifier] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data
    }) => {
      if (data.user) navigate({
        to: "/minha-conta"
      });
    });
  }, [navigate]);
  const mapIdentifier = (id) => {
    const v = id.trim();
    if (v.toUpperCase() === "AC ADMIN") return ADMIN_EMAIL;
    return v;
  };
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = mapIdentifier(identifier);
    try {
      if (tab === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone
            },
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;
        toast.success("Cadastro feito! Já pode acessar sua conta.");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Bem-vinda de volta! 💖");
      }
      navigate({
        to: "/minha-conta"
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-120px)] bg-gradient-to-b from-rose-baby/30 to-white transition-colors dark:from-[#170812] dark:via-[#12070d] dark:to-[#070306]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden flex-col justify-center md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md rounded-3xl border border-rose-baby/40 bg-white/60 p-8 shadow-soft backdrop-blur transition-colors dark:border-pink-900/40 dark:bg-[#1b0b13]/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl font-extrabold text-foreground transition-colors dark:text-white", children: [
        "Sua ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "conta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/75 transition-colors dark:text-white/75", children: "Acompanhe seus pedidos, salve seus favoritos e finalize mais rápido." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors dark:text-white/65", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-success" }),
        "Seus dados ficam seguros com a gente."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-rose-baby/70 bg-white p-6 shadow-card transition-colors dark:border-pink-900/50 dark:bg-[#12070d] md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-full bg-secondary p-1 transition-colors dark:bg-[#2a101c]", children: ["login", "signup"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), type: "button", className: `flex-1 rounded-full py-2.5 text-sm font-bold transition ${tab === t ? "bg-primary text-white shadow" : "text-foreground/65 hover:text-primary dark:text-white/65 dark:hover:text-pink-300"}`, children: t === "login" ? "Entrar" : "Criar conta" }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-3", children: [
        tab === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: "w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45", placeholder: "Nome completo", value: name, onChange: (e) => setName(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: "w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45", placeholder: "WhatsApp com DDD", value: phone, onChange: (e) => setPhone(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, className: "w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45", placeholder: "E-mail", value: identifier, onChange: (e) => setIdentifier(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", minLength: 6, className: "w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45", placeholder: "Senha (mínimo 6 caracteres)", value: password, onChange: (e) => setPassword(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "w-full rounded-full bg-primary py-3.5 font-bold text-white shadow-glow transition hover:opacity-90 disabled:opacity-60 dark:bg-pink-600 dark:hover:bg-pink-500", children: loading ? "Aguarde..." : tab === "login" ? "Entrar" : "Criar minha conta" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground transition-colors dark:text-white/55", children: "Crie sua conta para acompanhar pedidos e finalizar suas compras com mais facilidade." })
    ] })
  ] }) });
}
export {
  AuthPage as component
};
