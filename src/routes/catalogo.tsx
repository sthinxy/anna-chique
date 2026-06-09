import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery, settingsQuery } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { useState, useMemo } from "react";
import { useCart } from "@/lib/store";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo · Anna Chique Atacado" },
      {
        name: "description",
        content:
          "Catálogo completo de vestidos e conjuntos femininos no atacado, R$25 a peça, mínimo 12.",
      },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(productsQuery),
      context.queryClient.ensureQueryData(settingsQuery),
    ]),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#070306] p-8 text-white">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#070306] p-8 text-white">
      Não encontrado
    </div>
  ),
  component: Catalog,
});

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "vestido", label: "Vestidos" },
  { id: "conjunto", label: "Conjuntos" },
  { id: "hit", label: "Hit 🔥" },
  { id: "new", label: "Novidades" },
  { id: "bestseller", label: "Mais vendidos" },
];

function Catalog() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const [filter, setFilter] = useState("all");

  const cart = useCart((s) => s.items);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const left = Math.max(0, settings.min_pieces - totalQty);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter === "all") return true;
      if (filter === "hit") return p.is_hit;
      if (filter === "new") return p.is_new;
      if (filter === "bestseller") return p.is_bestseller;
      return p.category === filter;
    });
  }, [products, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-baby/30 to-white text-foreground transition-colors dark:from-[#170812] dark:via-[#12070d] dark:to-[#070306] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-baby/70 bg-white px-4 py-2 text-sm font-bold text-foreground shadow-soft transition-colors dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white">
  💕 Catálogo
</div>

        <h1 className="mt-4 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
          Todas as <span className="text-primary">peças</span>
        </h1>

        {/* Aviso do mínimo */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border p-5 shadow-soft ${
            left === 0
              ? "border-green-500/40 bg-green-600 text-white"
              : "border-rose-baby/70 bg-white text-foreground dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white"
          }`}
        >
          <div className="font-semibold text-white">
            {left === 0
              ? `🎉 Pedido mínimo completo! Você já pode enviar (${totalQty} peças).`
              : totalQty === 0
                ? `Pedido mínimo: ${settings.min_pieces} peças. Comece a escolher!`
                : `Faltam ${left} peças para fechar seu atacado (${totalQty}/${settings.min_pieces}).`}
          </div>

          {totalQty > 0 && (
            <Link
              to="/carrinho"
              className="rounded-full bg-primary px-5 py-2 font-bold text-white transition hover:opacity-90"
            >
              Ver carrinho →
            </Link>
          )}
        </div>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                filter === f.id
                  ? "border-primary bg-primary text-white shadow-glow"
                  : "border-rose-baby/70 bg-white text-foreground hover:border-primary hover:bg-secondary hover:text-primary dark:border-pink-700/40 dark:bg-[#12070d] dark:text-white dark:hover:border-primary dark:hover:bg-[#2a101c] dark:hover:text-pink-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-pink-700/40 bg-[#12070d] p-8 text-center text-white/70">
            Nenhuma peça nessa categoria por enquanto.
          </div>
        )}
      </div>
    </div>
  );
}