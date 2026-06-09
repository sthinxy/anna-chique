import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Plus, Save, Trash2, Upload, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin · Anna Chique" }] }),
  beforeLoad: ({ context }) => {
    if (!context.isAdmin) throw redirect({ to: "/minha-conta" });
  },
  component: Admin,
});

type TabId = "dashboard" | "products" | "orders" | "reviews" | "settings";

const cardClass =
  "rounded-3xl border border-rose-baby/70 bg-white text-foreground shadow-card transition-colors dark:border-pink-700/40 dark:bg-[#070306] dark:text-white";

const inputClass =
  "rounded-xl border border-rose-baby/70 bg-white p-2.5 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45";

function Admin() {
  const [tab, setTab] = useState<TabId>("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-baby/30 via-white to-white text-foreground transition-colors dark:from-[#070306] dark:via-[#090306] dark:to-[#070306] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="rounded-[2rem] border border-rose-baby/70 bg-white/80 p-5 shadow-card backdrop-blur transition-colors dark:border-pink-700/30 dark:bg-[#12070d]/80 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-baby/70 bg-white px-4 py-2 text-sm font-bold text-foreground shadow-soft transition-colors dark:border-pink-700/40 dark:bg-[#070306] dark:text-white">
            Painel
          </div>

          <h1 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white">
            Anna Chique <span className="text-primary">Admin</span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { id: "dashboard", l: "Dashboard" },
              { id: "products", l: "Produtos" },
              { id: "orders", l: "Pedidos" },
              { id: "reviews", l: "Avaliações" },
              { id: "settings", l: "Configurações" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as TabId)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  tab === t.id
                    ? "bg-primary text-white shadow-glow"
                    : "border border-rose-baby/70 bg-white text-foreground hover:border-primary hover:text-primary dark:border-pink-700/40 dark:bg-[#2a101c] dark:text-white dark:hover:border-primary dark:hover:text-pink-300"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "dashboard" && <Dashboard />}
            {tab === "products" && <ProductsAdmin />}
            {tab === "orders" && <OrdersAdmin />}
            {tab === "reviews" && <ReviewsAdmin />}
            {tab === "settings" && <SettingsAdmin />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    abandoned: 0,
  });

  useEffect(() => {
    (async () => {
      const [p, o, c, a] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("cart_events")
          .select("id", { count: "exact", head: true })
          .eq("event_type", "add_to_cart"),
      ]);

      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        customers: c.count ?? 0,
        abandoned: a.count ?? 0,
      });
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[
        { l: "Produtos ativos", v: stats.products },
        { l: "Pedidos", v: stats.orders },
        { l: "Clientes", v: stats.customers },
        { l: "Eventos carrinho", v: stats.abandoned },
      ].map((s) => (
        <div key={s.l} className={`${cardClass} p-5`}>
          <div className="text-sm text-muted-foreground transition-colors dark:text-white/65">
            {s.l}
          </div>
          <div className="mt-1 font-display text-4xl font-extrabold text-primary">
            {s.v}
          </div>
        </div>
      ))}
    </div>
  );
}

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  fabric: string | null;
  colors: string[];
  price: number;
  image_url: string | null;
  is_hit: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_active: boolean;
  sort_order: number;
};

function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");

    setItems((data ?? []) as Product[]);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing?.name) return toast.error("Nome obrigatório");

    const payload = {
      name: editing.name,
      description: editing.description ?? null,
      category: editing.category ?? "vestido",
      fabric: editing.fabric ?? null,
      colors: editing.colors ?? [],
      price: editing.price ?? 25,
      image_url: editing.image_url ?? null,
      is_hit: !!editing.is_hit,
      is_bestseller: !!editing.is_bestseller,
      is_new: !!editing.is_new,
      is_active: editing.is_active ?? true,
      sort_order: editing.sort_order ?? 999,
    };

    const { error } = editing.id
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);

    if (error) return toast.error(error.message);

    toast.success("Salvo!");
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Excluir essa peça?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);

    load();
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            setEditing({
              name: "",
              category: "vestido",
              price: 25,
              colors: [],
              is_active: true,
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Novo produto
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className={`${cardClass} flex gap-3 p-3`}>
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                className="h-24 w-20 rounded-lg object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="break-words font-bold">{p.name}</div>

                {!p.is_active && (
                  <span className="text-xs text-muted-foreground dark:text-white/60">
                    (inativo)
                  </span>
                )}
              </div>

              <div className="text-xs text-muted-foreground transition-colors dark:text-white/60">
                {p.category} · R$ {Number(p.price).toFixed(2)}
              </div>

              <div className="mt-1 flex flex-wrap gap-1">
                {p.is_hit && (
                  <span className="rounded bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-[#070306]">
                    HIT
                  </span>
                )}

                {p.is_new && (
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                    NOVO
                  </span>
                )}

                {p.is_bestseller && (
                  <span className="rounded bg-success px-1.5 py-0.5 text-[10px] font-bold text-white">
                    +VENDIDO
                  </span>
                )}
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => setEditing(p)}
                  className="text-xs font-bold text-primary"
                >
                  <Pencil className="inline h-3.5 w-3.5" /> Editar
                </button>

                <button
                  onClick={() => del(p.id)}
                  className="text-xs font-bold text-destructive"
                >
                  <Trash2 className="inline h-3.5 w-3.5" /> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div
            className={`${cardClass} max-h-[90dvh] w-full max-w-lg overflow-y-auto p-6`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold">
                {editing.id ? "Editar" : "Novo"} produto
              </h3>

              <button
                onClick={() => setEditing(null)}
                className="rounded-full p-2 hover:bg-secondary dark:hover:bg-[#2a101c]"
              >
                <X />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <input
                className={inputClass}
                placeholder="Nome"
                value={editing.name ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />

              <textarea
                className={inputClass}
                placeholder="Descrição"
                value={editing.description ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  className={inputClass}
                  value={editing.category ?? "vestido"}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  <option value="vestido">Vestido</option>
                  <option value="conjunto">Conjunto</option>
                </select>

                <input
                  className={inputClass}
                  placeholder="Tecido"
                  value={editing.fabric ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, fabric: e.target.value })
                  }
                />
              </div>

              <input
                className={inputClass}
                placeholder="Cores (separe por vírgula)"
                value={(editing.colors ?? []).join(", ")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    colors: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  value={editing.price ?? 25}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      price: parseFloat(e.target.value),
                    })
                  }
                />

                <input
                  className={inputClass}
                  type="number"
                  placeholder="Ordem"
                  value={editing.sort_order ?? 999}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      sort_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                {editing.image_url && (
                  <img
                    src={editing.image_url}
                    alt=""
                    className="h-32 w-24 rounded-lg border border-rose-baby/70 object-cover dark:border-pink-800/50"
                  />
                )}

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-rose-baby/10 p-3 text-sm font-bold text-primary transition hover:bg-rose-baby/20 dark:bg-[#2a101c] dark:hover:bg-pink-950">
                  <Upload className="h-4 w-4" />
                  {editing.image_url
                    ? "Trocar imagem"
                    : "Enviar imagem do dispositivo"}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const ext = file.name.split(".").pop() || "jpg";
                      const path = `${Date.now()}-${Math.random()
                        .toString(36)
                        .slice(2, 8)}.${ext}`;

                      const { error: upErr } = await supabase.storage
                        .from("product-images")
                        .upload(path, file, {
                          upsert: false,
                          contentType: file.type,
                        });

                      if (upErr) return toast.error(upErr.message);

                      const { data: signed, error: sErr } =
                        await supabase.storage
                          .from("product-images")
                          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);

                      if (sErr || !signed) {
                        return toast.error(
                          sErr?.message || "Erro ao gerar link",
                        );
                      }

                      setEditing((cur) => ({
                        ...(cur ?? {}),
                        image_url: signed.signedUrl,
                      }));

                      toast.success("Imagem enviada!");
                    }}
                  />
                </label>

                <input
                  className={`w-full text-xs ${inputClass}`}
                  placeholder="ou cole uma URL de imagem"
                  value={editing.image_url ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, image_url: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!editing.is_active}
                    onChange={(e) =>
                      setEditing({ ...editing, is_active: e.target.checked })
                    }
                  />{" "}
                  Ativo
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!editing.is_hit}
                    onChange={(e) =>
                      setEditing({ ...editing, is_hit: e.target.checked })
                    }
                  />{" "}
                  Hit 🔥
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!editing.is_new}
                    onChange={(e) =>
                      setEditing({ ...editing, is_new: e.target.checked })
                    }
                  />{" "}
                  Novidade
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!editing.is_bestseller}
                    onChange={(e) =>
                      setEditing({ ...editing, is_bestseller: e.target.checked })
                    }
                  />{" "}
                  Mais vendido
                </label>
              </div>

              <button
                onClick={save}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-white shadow-glow transition hover:scale-105"
              >
                <Save className="h-4 w-4" /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type AdminOrder = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string | null;
  total_qty: number;
  total: number;
  status: string;
  delivery_method: string;
};

const STATUSES = [
  "separando",
  "aguardando_comprovante",
  "em_atendimento",
  "finalizado",
  "cancelado",
];

function OrdersAdmin() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders((data ?? []) as AdminOrder[]);
  };

  useEffect(() => {
    load();
  }, []);

  const updStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    load();
  };

  return (
    <div className="space-y-3">
      {orders.length === 0 && (
        <div className="text-muted-foreground dark:text-white/60">
          Nenhum pedido ainda.
        </div>
      )}

      {orders.map((o) => (
        <div
          key={o.id}
          className={`${cardClass} flex flex-wrap items-center justify-between gap-3 p-4`}
        >
          <div className="min-w-0">
            <div className="break-words font-bold">
              {o.customer_name}{" "}
              <span className="font-normal text-muted-foreground dark:text-white/55">
                · {o.customer_phone}
              </span>
            </div>

            <div className="text-xs text-muted-foreground dark:text-white/55">
              {o.customer_city} · {o.delivery_method} ·{" "}
              {new Date(o.created_at).toLocaleString("pt-BR")}
            </div>

            <div className="mt-1 text-sm font-bold">
              {o.total_qty} peças · R$ {Number(o.total).toFixed(2)}
            </div>
          </div>

          <select
            value={o.status}
            onChange={(e) => updStatus(o.id, e.target.value)}
            className="rounded-full border border-rose-baby/70 bg-white px-3 py-1.5 text-sm font-bold text-foreground outline-none dark:border-pink-800/50 dark:bg-[#2a101c] dark:text-white"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

type Review = {
  id: string;
  name: string;
  city: string | null;
  stars: number;
  comment: string;
  is_active: boolean;
};

function ReviewsAdmin() {
  const [items, setItems] = useState<Review[]>([]);
  const [editing, setEditing] = useState<Partial<Review> | null>(null);

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").order("sort_order");
    setItems((data ?? []) as Review[]);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing?.name || !editing.comment) {
      return toast.error("Nome e comentário obrigatórios");
    }

    const payload = {
      name: editing.name,
      city: editing.city ?? null,
      stars: editing.stars ?? 5,
      comment: editing.comment,
      is_active: editing.is_active ?? true,
    };

    const { error } = editing.id
      ? await supabase.from("reviews").update(payload).eq("id", editing.id)
      : await supabase.from("reviews").insert(payload);

    if (error) return toast.error(error.message);

    toast.success("Salvo!");
    setEditing(null);
    load();
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() =>
            setEditing({
              name: "",
              comment: "",
              stars: 5,
              is_active: true,
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white shadow-glow transition hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Nova avaliação
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((r) => (
          <div key={r.id} className={`${cardClass} p-4`}>
            <div className="flex items-center justify-between gap-3">
              <div className="break-words font-bold">
                {r.name}{" "}
                <span className="font-normal text-muted-foreground dark:text-white/55">
                  · {r.city}
                </span>
              </div>

              <div className="text-warning">{"★".repeat(r.stars)}</div>
            </div>

            <p className="mt-1 text-sm">"{r.comment}"</p>

            <div className="mt-2 flex gap-3 text-xs font-bold">
              <button onClick={() => setEditing(r)} className="text-primary">
                Editar
              </button>

              <button
                onClick={async () => {
                  await supabase.from("reviews").delete().eq("id", r.id);
                  load();
                }}
                className="text-destructive"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className={`${cardClass} w-full max-w-md p-6`}>
            <div className="flex justify-between">
              <h3 className="font-display text-xl font-bold">Avaliação</h3>

              <button
                onClick={() => setEditing(null)}
                className="rounded-full p-2 hover:bg-secondary dark:hover:bg-[#2a101c]"
              >
                <X />
              </button>
            </div>

            <div className="mt-3 grid gap-3">
              <input
                className={inputClass}
                placeholder="Nome"
                value={editing.name ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />

              <input
                className={inputClass}
                placeholder="Cidade"
                value={editing.city ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, city: e.target.value })
                }
              />

              <input
                className={inputClass}
                type="number"
                min={1}
                max={5}
                value={editing.stars ?? 5}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    stars: parseInt(e.target.value),
                  })
                }
              />

              <textarea
                className={inputClass}
                placeholder="Comentário"
                value={editing.comment ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, comment: e.target.value })
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.is_active}
                  onChange={(e) =>
                    setEditing({ ...editing, is_active: e.target.checked })
                  }
                />{" "}
                Ativa
              </label>

              <button
                onClick={save}
                className="rounded-full bg-primary py-3 font-bold text-white shadow-glow transition hover:scale-105"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsAdmin() {
  const [s, setS] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setS(data as Record<string, unknown>));
  }, []);

  if (!s) {
    return (
      <div className="text-muted-foreground dark:text-white/60">
        Carregando...
      </div>
    );
  }

  const set = (k: string, v: unknown) => setS({ ...s, [k]: v });

  const save = async () => {
    const { id: _id, updated_at: _u, ...rest } = s;
    void _id;
    void _u;

    const { error } = await supabase
      .from("settings")
      .update(rest as never)
      .eq("id", 1);

    if (error) return toast.error(error.message);

    toast.success("Configurações salvas!");
  };

  const field = (
    k: string,
    label: string,
    type: "text" | "number" | "textarea" = "text",
  ) => (
    <div>
      <label className="text-sm font-bold">{label}</label>

      {type === "textarea" ? (
        <textarea
          className={`mt-1 w-full ${inputClass}`}
          value={String(s[k] ?? "")}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          className={`mt-1 w-full ${inputClass}`}
          type={type}
          value={String(s[k] ?? "")}
          onChange={(e) =>
            set(
              k,
              type === "number" ? parseFloat(e.target.value) : e.target.value,
            )
          }
        />
      )}
    </div>
  );

  return (
    <div className={`${cardClass} space-y-4 p-6`}>
      <div className="grid gap-4 md:grid-cols-2">
        {field("store_name", "Nome da loja")}
        {field("whatsapp", "WhatsApp (com DDI, só números)")}
        {field("instagram", "Instagram URL")}
        {field("email", "E-mail")}
        {field("location", "Endereço")}
        {field("unit_price", "Preço único", "number")}
        {field("min_pieces", "Mínimo de peças", "number")}
        {field("color_choice_min", "Mínimo p/ escolher cor", "number")}
        {field("shipping_fee", "Frete fixo (R$)", "number")}
        {field("pix_key", "Chave Pix")}
        {field("nubank_link", "Link Nubank")}
        {field("hero_title", "Título principal")}
        {field("hero_subtitle", "Subtítulo")}
      </div>

      {field("pix_code", "Código Pix copia e cola", "textarea")}

      <button
        onClick={save}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-glow transition hover:scale-105"
      >
        <Save className="h-4 w-4" /> Salvar tudo
      </button>
    </div>
  );
}