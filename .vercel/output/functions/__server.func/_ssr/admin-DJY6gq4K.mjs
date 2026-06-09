import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-qKlyq4tu.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, q as Pencil, T as Trash2, X, r as Upload, s as Save } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/react-dom.mjs";
function Admin() {
  const [tab, setTab] = reactExports.useState("dashboard");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-b from-rose-baby/20 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chip", children: "Painel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-4xl font-extrabold", children: [
      "Anna Chique ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: [{
      id: "dashboard",
      l: "Dashboard"
    }, {
      id: "products",
      l: "Produtos"
    }, {
      id: "orders",
      l: "Pedidos"
    }, {
      id: "reviews",
      l: "Avaliações"
    }, {
      id: "settings",
      l: "Configurações"
    }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t.id), className: `rounded-full px-5 py-2 text-sm font-bold ${tab === t.id ? "bg-primary text-white shadow-glow" : "bg-white border"}`, children: t.l }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      tab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}),
      tab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsAdmin, {}),
      tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersAdmin, {}),
      tab === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsAdmin, {}),
      tab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsAdmin, {})
    ] })
  ] }) });
}
function Dashboard() {
  const [stats, setStats] = reactExports.useState({
    products: 0,
    orders: 0,
    customers: 0,
    abandoned: 0
  });
  reactExports.useEffect(() => {
    (async () => {
      const [p, o, c, a] = await Promise.all([supabase.from("products").select("id", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("id", {
        count: "exact",
        head: true
      }), supabase.from("profiles").select("id", {
        count: "exact",
        head: true
      }), supabase.from("cart_events").select("id", {
        count: "exact",
        head: true
      }).eq("event_type", "add_to_cart")]);
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        customers: c.count ?? 0,
        abandoned: a.count ?? 0
      });
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4", children: [{
    l: "Produtos ativos",
    v: stats.products
  }, {
    l: "Pedidos",
    v: stats.orders
  }, {
    l: "Clientes",
    v: stats.customers
  }, {
    l: "Eventos carrinho",
    v: stats.abandoned
  }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: s.l }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-4xl font-extrabold text-primary", children: s.v })
  ] }, s.l)) });
}
function ProductsAdmin() {
  const [items, setItems] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const load = async () => {
    const {
      data
    } = await supabase.from("products").select("*").order("sort_order");
    setItems(data ?? []);
  };
  reactExports.useEffect(() => {
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
      sort_order: editing.sort_order ?? 999
    };
    const {
      error
    } = editing.id ? await supabase.from("products").update(payload).eq("id", editing.id) : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Salvo!");
    setEditing(null);
    load();
  };
  const del = async (id) => {
    if (!confirm("Excluir essa peça?")) return;
    const {
      error
    } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
      name: "",
      category: "vestido",
      price: 25,
      colors: [],
      is_active: true
    }), className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Novo produto"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink flex gap-3 p-3", children: [
      p.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, className: "h-24 w-20 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: p.name }),
          !p.is_active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(inativo)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          p.category,
          " · R$ ",
          Number(p.price).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap gap-1", children: [
          p.is_hit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-white", children: "HIT" }),
          p.is_new && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white", children: "NOVO" }),
          p.is_bestseller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-success px-1.5 py-0.5 text-[10px] font-bold text-white", children: "+VENDIDO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(p), className: "text-xs font-bold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "inline h-3.5 w-3.5" }),
            " Editar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => del(p.id), className: "text-xs font-bold text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "inline h-3.5 w-3.5" }),
            " Excluir"
          ] })
        ] })
      ] })
    ] }, p.id)) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-black/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink w-full max-w-lg p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-bold", children: [
          editing.id ? "Editar" : "Novo",
          " produto"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", placeholder: "Nome", value: editing.name ?? "", onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "rounded-xl border p-2.5", placeholder: "Descrição", value: editing.description ?? "", onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-xl border p-2.5", value: editing.category ?? "vestido", onChange: (e) => setEditing({
            ...editing,
            category: e.target.value
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vestido", children: "Vestido" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "conjunto", children: "Conjunto" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", placeholder: "Tecido", value: editing.fabric ?? "", onChange: (e) => setEditing({
            ...editing,
            fabric: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", placeholder: "Cores (separe por vírgula)", value: (editing.colors ?? []).join(", "), onChange: (e) => setEditing({
          ...editing,
          colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", type: "number", step: "0.01", placeholder: "Preço", value: editing.price ?? 25, onChange: (e) => setEditing({
            ...editing,
            price: parseFloat(e.target.value)
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", type: "number", placeholder: "Ordem", value: editing.sort_order ?? 999, onChange: (e) => setEditing({
            ...editing,
            sort_order: parseInt(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          editing.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editing.image_url, alt: "", className: "h-32 w-24 rounded-lg object-cover border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/40 bg-rose-baby/10 p-3 text-sm font-bold text-primary hover:bg-rose-baby/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
            editing.image_url ? "Trocar imagem" : "Enviar imagem do dispositivo",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const ext = file.name.split(".").pop() || "jpg";
              const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
              const {
                error: upErr
              } = await supabase.storage.from("product-images").upload(path, file, {
                upsert: false,
                contentType: file.type
              });
              if (upErr) return toast.error(upErr.message);
              const {
                data: signed,
                error: sErr
              } = await supabase.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
              if (sErr || !signed) return toast.error(sErr?.message || "Erro ao gerar link");
              setEditing((cur) => ({
                ...cur ?? {},
                image_url: signed.signedUrl
              }));
              toast.success("Imagem enviada!");
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-xl border p-2.5 text-xs", placeholder: "ou cole uma URL de imagem", value: editing.image_url ?? "", onChange: (e) => setEditing({
            ...editing,
            image_url: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.is_active, onChange: (e) => setEditing({
              ...editing,
              is_active: e.target.checked
            }) }),
            " Ativo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.is_hit, onChange: (e) => setEditing({
              ...editing,
              is_hit: e.target.checked
            }) }),
            " Hit 🔥"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.is_new, onChange: (e) => setEditing({
              ...editing,
              is_new: e.target.checked
            }) }),
            " Novidade"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.is_bestseller, onChange: (e) => setEditing({
              ...editing,
              is_bestseller: e.target.checked
            }) }),
            " Mais vendido"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Salvar"
        ] })
      ] })
    ] }) })
  ] });
}
const STATUSES = ["separando", "aguardando_comprovante", "em_atendimento", "finalizado", "cancelado"];
function OrdersAdmin() {
  const [orders, setOrders] = reactExports.useState([]);
  const load = async () => {
    const {
      data
    } = await supabase.from("orders").select("*").order("created_at", {
      ascending: false
    });
    setOrders(data ?? []);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const updStatus = async (id, status) => {
    await supabase.from("orders").update({
      status
    }).eq("id", id);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Nenhum pedido ainda." }),
    orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink flex flex-wrap items-center justify-between gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
          o.customer_name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
            "· ",
            o.customer_phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          o.customer_city,
          " · ",
          o.delivery_method,
          " · ",
          new Date(o.created_at).toLocaleString("pt-BR")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold mt-1", children: [
          o.total_qty,
          " peças · R$ ",
          Number(o.total).toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => updStatus(o.id, e.target.value), className: "rounded-full border bg-white px-3 py-1.5 text-sm font-bold", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s.replace(/_/g, " ") }, s)) })
    ] }, o.id))
  ] });
}
function ReviewsAdmin() {
  const [items, setItems] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const load = async () => {
    const {
      data
    } = await supabase.from("reviews").select("*").order("sort_order");
    setItems(data ?? []);
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!editing?.name || !editing.comment) return toast.error("Nome e comentário obrigatórios");
    const payload = {
      name: editing.name,
      city: editing.city ?? null,
      stars: editing.stars ?? 5,
      comment: editing.comment,
      is_active: editing.is_active ?? true
    };
    const {
      error
    } = editing.id ? await supabase.from("reviews").update(payload).eq("id", editing.id) : await supabase.from("reviews").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Salvo!");
    setEditing(null);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
      name: "",
      comment: "",
      stars: 5,
      is_active: true
    }), className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Nova avaliação"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: items.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
          r.name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-muted-foreground", children: [
            "· ",
            r.city
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-warning", children: "★".repeat(r.stars) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm", children: [
        '"',
        r.comment,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-3 text-xs font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(r), className: "text-primary", children: "Editar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          await supabase.from("reviews").delete().eq("id", r.id);
          load();
        }, className: "text-destructive", children: "Excluir" })
      ] })
    ] }, r.id)) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-black/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink w-full max-w-md p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: "Avaliação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", placeholder: "Nome", value: editing.name ?? "", onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", placeholder: "Cidade", value: editing.city ?? "", onChange: (e) => setEditing({
          ...editing,
          city: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "rounded-xl border p-2.5", type: "number", min: 1, max: 5, value: editing.stars ?? 5, onChange: (e) => setEditing({
          ...editing,
          stars: parseInt(e.target.value)
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "rounded-xl border p-2.5", placeholder: "Comentário", value: editing.comment ?? "", onChange: (e) => setEditing({
          ...editing,
          comment: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!editing.is_active, onChange: (e) => setEditing({
            ...editing,
            is_active: e.target.checked
          }) }),
          " Ativa"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "rounded-full bg-primary py-3 font-bold text-white", children: "Salvar" })
      ] })
    ] }) })
  ] });
}
function SettingsAdmin() {
  const [s, setS] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.from("settings").select("*").eq("id", 1).maybeSingle().then(({
      data
    }) => setS(data));
  }, []);
  if (!s) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." });
  const set = (k, v) => setS({
    ...s,
    [k]: v
  });
  const save = async () => {
    const {
      id: _id,
      updated_at: _u,
      ...rest
    } = s;
    const {
      error
    } = await supabase.from("settings").update(rest).eq("id", 1);
    if (error) return toast.error(error.message);
    toast.success("Configurações salvas!");
  };
  const field = (k, label, type = "text") => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-bold", children: label }),
    type === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "mt-1 w-full rounded-xl border p-2.5", value: String(s[k] ?? ""), onChange: (e) => set(k, e.target.value) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "mt-1 w-full rounded-xl border p-2.5", type, value: String(s[k] ?? ""), onChange: (e) => set(k, type === "number" ? parseFloat(e.target.value) : e.target.value) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-pink space-y-4 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      field("store_name", "Nome da loja"),
      field("whatsapp", "WhatsApp (com DDI, só números)"),
      field("instagram", "Instagram URL"),
      field("email", "E-mail"),
      field("location", "Endereço"),
      field("unit_price", "Preço único", "number"),
      field("min_pieces", "Mínimo de peças", "number"),
      field("color_choice_min", "Mínimo p/ escolher cor", "number"),
      field("shipping_fee", "Frete fixo (R$)", "number"),
      field("pix_key", "Chave Pix"),
      field("nubank_link", "Link Nubank"),
      field("hero_title", "Título principal"),
      field("hero_subtitle", "Subtítulo")
    ] }),
    field("pix_code", "Código Pix copia e cola", "textarea"),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      " Salvar tudo"
    ] })
  ] });
}
export {
  Admin as component
};
