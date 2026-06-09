import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  qty: number;
  color?: string;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "ac-cart-v1" },
  ),
);

export const cartTotals = (
  items: CartItem[],
  shippingFee: number,
  method: string,
) => {
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const itemsTotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const fee = method === "correios" ? 0 : method === "retirada" ? 0 : shippingFee;
  return { totalQty, itemsTotal, shippingFee: fee, total: itemsTotal + fee };
};

type A11yState = {
  textSize: "md" | "lg" | "xl";
  easyMode: boolean;
  setText: (s: A11yState["textSize"]) => void;
  toggleEasy: () => void;
  speak: (text: string) => void;
};

export const useA11y = create<A11yState>()(
  persist(
    (set, get) => ({
      textSize: "md",
      easyMode: false,
      setText: (s) => {
        set({ textSize: s });
        if (typeof document !== "undefined")
          document.documentElement.dataset.text = s;
      },
      toggleEasy: () => {
        const next = !get().easyMode;
        set({ easyMode: next });
        if (typeof document !== "undefined")
          document.documentElement.dataset.easy = String(next);
      },
      speak: (text) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "pt-BR";
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      },
    }),
    { name: "ac-a11y-v1" },
  ),
);
