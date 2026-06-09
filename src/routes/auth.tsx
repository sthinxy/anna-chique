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
const ADMIN_EMAIL = "acadmin@annachique.com";

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
    if (v.toUpperCase() === "AC ADMIN") return ADMIN_EMAIL;
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
        const { error } = await supabase.auth.signInWithPassword({ email, password });
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
    <div className="bg-gradient-to-b from-rose-baby/30 to-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8">
        <div className="hidden md:flex flex-col justify-center">
          <h1 className="font-display text-5xl font-extrabold">
            Sua <span className="text-primary">conta</span>
          </h1>
          <p className="mt-4 text-foreground/70">
            Acompanhe seus pedidos, salve seus favoritos e finalize mais rápido.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-success" />
            Seus dados ficam seguros com a gente.
          </div>
        </div>

        <div className="card-pink p-6 md:p-8">
          <div className="flex rounded-full bg-secondary p-1">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-full py-2.5 text-sm font-bold transition ${
                  tab === t ? "bg-primary text-white shadow" : "text-foreground/60"
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
                  className="w-full rounded-xl border bg-white p-3 outline-none focus:border-primary"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  required
                  className="w-full rounded-xl border bg-white p-3 outline-none focus:border-primary"
                  placeholder="WhatsApp com DDD"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}
            <input
              required
              className="w-full rounded-xl border bg-white p-3 outline-none focus:border-primary"
              placeholder="E-mail"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              required
              type="password"
              minLength={6}
              className="w-full rounded-xl border bg-white p-3 outline-none focus:border-primary"
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loading}
              className="w-full rounded-full bg-primary py-3.5 font-bold text-white shadow-glow disabled:opacity-60"
            >
              {loading ? "Aguarde..." : tab === "login" ? "Entrar" : "Criar minha conta"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            (apenas no primeiro acesso é preciso criar a conta).
          </p>
        </div>
      </div>
    </div>
  );
}
