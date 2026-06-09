import type { CartItem } from "./store";

export type CheckoutData = {
  name: string;
  phone: string;
  city: string;
  delivery: string;
  items: CartItem[];
  itemsTotal: number;
  shippingFee: number;
  total: number;
  totalQty: number;
};

const labelDelivery = (d: string) =>
  ({
    transportadora: "Transportadora",
    excursao: "Excursão",
    correios: "Correios (consultar valor)",
    retirada: "Retirada / combinar",
  })[d] ?? d;

export function buildWhatsAppMessage(d: CheckoutData) {
  const lines = [
    "Olá, quero fechar meu pedido no atacado da *Anna Chique*. 💖",
    "",
    `*Nome:* ${d.name}`,
    `*Telefone:* ${d.phone}`,
    `*Cidade/Estado:* ${d.city}`,
    `*Forma de entrega:* ${labelDelivery(d.delivery)}`,
    "",
    "*Produtos:*",
    ...d.items.map(
      (i) =>
        `• ${i.qty}x ${i.name}${i.color ? ` (${i.color})` : ""} — R$ ${(i.qty * i.price).toFixed(2)}`,
    ),
    "",
    `*Quantidade total:* ${d.totalQty} peças`,
    `*Valor das peças:* R$ ${d.itemsTotal.toFixed(2)}`,
    `*Taxa/frete estimado:* R$ ${d.shippingFee.toFixed(2)}`,
    `*Total estimado:* R$ ${d.total.toFixed(2)}`,
    "",
    "*Forma de pagamento:* Pix",
    "Vou enviar o comprovante por aqui. Obrigada! 🌸",
  ];
  return lines.join("\n");
}

export function whatsappLink(phone: string, message: string) {
  const num = phone.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
