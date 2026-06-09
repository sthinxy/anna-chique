import { Link } from "@tanstack/react-router";
import { Flame, Sparkles, Plus } from "lucide-react";
import type { Product } from "@/lib/queries";
import { useCart } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ p }: { p: Product }) {
  const add = useCart((s) => s.add);
  return (
    <div className="group card-pink overflow-hidden transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-[3/4] overflow-hidden bg-rose-baby/30">
        {p.image_url && (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.is_hit && (
            <span className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-xs font-bold text-white">
              <Flame className="h-3 w-3" /> Hit
            </span>
          )}
          {p.is_new && (
            <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
              <Sparkles className="h-3 w-3" /> Novidade
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-extrabold text-primary shadow-soft">
          R$ {Number(p.price).toFixed(0)}
        </div>
      </div>
      <div className="p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
          {p.category}
        </div>
        <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold">{p.name}</h3>
        <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {p.fabric ? `${p.fabric} · ` : ""}
          {p.colors?.length ? `${p.colors.length} cor${p.colors.length > 1 ? "es" : ""}` : "Tamanho único"}
        </div>
        <button
          onClick={() => {
            add({ id: p.id, name: p.name, price: Number(p.price), image_url: p.image_url });
            toast.success("Adicionada ao carrinho ✨", {
              description: `${p.name} — R$ ${Number(p.price).toFixed(2)}`,
            });
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-white shadow-soft transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  );
}
