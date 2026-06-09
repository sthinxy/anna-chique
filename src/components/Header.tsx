import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, User, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/#como-comprar", label: "Como comprar" },
  { to: "/#pix", label: "Pagamento" },
  { to: "/#faq", label: "Dúvidas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<{ email?: string | null } | null>(null);

  const items = useCart((s) => s.items);
  const qty = items.reduce((s, i) => s + i.qty, 0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setUser(sess?.user ?? null),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 glass border-b border-transparent transition-colors dark:border-pink-900/30 dark:bg-[#12070d]/90 dark:text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://ohvynherkuwovccnpoeh.supabase.co/storage/v1/object/public/product-images/logo.png"
            alt="Anna Chique"
            className="h-12 w-12 rounded-full shadow-md"
          />

          <span className="font-display text-xl font-extrabold tracking-tight text-foreground transition-colors dark:text-white md:text-2xl">
            Anna <span className="text-primary">Chique</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary hover:text-primary dark:text-white/80 dark:hover:bg-pink-950/60 dark:hover:text-pink-300"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="hidden h-11 w-11 items-center justify-center rounded-full border bg-white text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 dark:hover:border-pink-400 md:flex"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo noturno"}
            title={darkMode ? "Modo claro" : "Modo noturno"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link
            to={user ? "/minha-conta" : "/auth"}
            className="hidden h-11 w-11 items-center justify-center rounded-full border bg-white text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 dark:hover:border-pink-400 md:flex"
            aria-label="Minha conta"
          >
            <User className="h-5 w-5" />
          </Link>

          <Link
            to="/carrinho"
            className="relative flex h-11 items-center gap-2 rounded-full bg-foreground px-4 text-white shadow-soft transition hover:bg-primary dark:bg-pink-700 dark:hover:bg-pink-500"
            aria-label="Carrinho"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden text-sm font-semibold sm:inline">Carrinho</span>

            {qty > 0 && (
              <span className="animate-pop absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-white ring-2 ring-white dark:ring-[#12070d]">
                {qty}
              </span>
            )}
          </Link>

          <button
            className="grid h-11 w-11 place-items-center rounded-full border bg-white text-foreground transition dark:border-pink-900/40 dark:bg-[#1b0b13] dark:text-pink-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-white/95 backdrop-blur transition-colors dark:border-pink-900/30 dark:bg-[#12070d]/95 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60"
              >
                {n.label}
              </a>
            ))}

            <Link
              to={user ? "/minha-conta" : "/auth"}
              className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60"
            >
              {user ? "Minha conta" : "Entrar / Cadastrar"}
            </Link>

            <button
              onClick={toggleDarkMode}
              className="mt-2 flex items-center gap-2 rounded-xl px-4 py-3 text-left text-base font-semibold text-foreground transition hover:bg-secondary dark:text-white dark:hover:bg-pink-950/60"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {darkMode ? "Modo claro" : "Modo noturno"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}