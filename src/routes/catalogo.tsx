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
      { name: "description", content: "Catálogo completo de vestidos e conjuntos femininos no atacado, R$25 a peça, mínimo 12." },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(productsQuery),
      context.queryClient.ensureQueryData(settingsQuery),
    ]),
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Não encontrado</div>,
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
    <div className="bg-gradient-to-b from-rose-baby/30 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="chip">💕 Catálogo</div>
        <h1 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
          Todas as <span className="text-primary">peças</span>
        </h1>

        {/* Aviso do mínimo */}
        <div
          className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 ${
            left === 0
              ? "bg-success text-white"
              : "bg-foreground text-white"
          }`}
        >
          <div className="font-semibold">
            {left === 0
              ? `🎉 Pedido mínimo completo! Você já pode enviar (${totalQty} peças).`
              : totalQty === 0
                ? `Pedido mínimo: ${settings.min_pieces} peças. Comece a escolher!`
                : `Faltam ${left} peças para fechar seu atacado (${totalQty}/${settings.min_pieces}).`}
          </div>
          {totalQty > 0 && (
            <Link
              to="/carrinho"
              className="rounded-full bg-white px-5 py-2 font-bold text-foreground"
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
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === f.id
                  ? "bg-primary text-white shadow-glow"
                  : "bg-white text-foreground/70 hover:bg-secondary"
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
          <div className="mt-12 text-center text-muted-foreground">
            Nenhuma peça nessa categoria por enquanto.
          </div>
        )}
      </div>
    </div>
  );
}
