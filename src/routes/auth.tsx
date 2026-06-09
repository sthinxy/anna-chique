import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Entrar · Anna Chique" }] }),
  component: AuthPage,
});

// Special admin alias: "AC ADMIN" / "AC ADMIN"
const ADMIN_EMAIL = "admin@annachique.com";

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/minha-conta" });
    });
  }, [navigate]);

 const mapIdentifier = (id: string) => {
  const v = id.trim();

  if (
    v.toUpperCase() === "ADMIN" ||
    v.toUpperCase() === "ANNA" ||
    v.toUpperCase() === "DONAA"
  ) {
    return ADMIN_EMAIL;
  }

  return v;
};

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = mapIdentifier(identifier);

    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, phone },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;
        toast.success("Cadastro feito! Já pode acessar sua conta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast.success("Bem-vinda de volta! 💖");
      }

      navigate({ to: "/minha-conta" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-rose-baby/30 to-white transition-colors dark:from-[#170812] dark:via-[#12070d] dark:to-[#070306]">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20">
        <div className="hidden flex-col justify-center md:flex">
          <div className="max-w-md rounded-3xl border border-rose-baby/40 bg-white/60 p-8 shadow-soft backdrop-blur transition-colors dark:border-pink-900/40 dark:bg-[#1b0b13]/55">
            <h1 className="font-display text-5xl font-extrabold text-foreground transition-colors dark:text-white">
              Sua <span className="text-primary">conta</span>
            </h1>

            <p className="mt-4 text-foreground/75 transition-colors dark:text-white/75">
              Acompanhe seus pedidos, salve seus favoritos e finalize mais rápido.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors dark:text-white/65">
              <ShieldCheck className="h-5 w-5 text-success" />
              Seus dados ficam seguros com a gente.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-rose-baby/70 bg-white p-6 shadow-card transition-colors dark:border-pink-900/50 dark:bg-[#12070d] md:p-8">
          <div className="flex rounded-full bg-secondary p-1 transition-colors dark:bg-[#2a101c]">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                type="button"
                className={`flex-1 rounded-full py-2.5 text-sm font-bold transition ${
                  tab === t
                    ? "bg-primary text-white shadow"
                    : "text-foreground/65 hover:text-primary dark:text-white/65 dark:hover:text-pink-300"
                }`}
              >
                {t === "login" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {tab === "signup" && (
              <>
                <input
                  required
                  className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  required
                  className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
                  placeholder="WhatsApp com DDD"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <input
              required
              className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
              placeholder="E-mail"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <input
              required
              type="password"
              minLength={6}
              className="w-full rounded-xl border border-rose-baby/70 bg-white p-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full rounded-full bg-primary py-3.5 font-bold text-white shadow-glow transition hover:opacity-90 disabled:opacity-60 dark:bg-pink-600 dark:hover:bg-pink-500"
            >
              {loading ? "Aguarde..." : tab === "login" ? "Entrar" : "Criar minha conta"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground transition-colors dark:text-white/55">
            Crie sua conta para acompanhar pedidos e finalizar suas compras com mais facilidade.
          </p>
        </div>
      </div>
    </div>
  );
}