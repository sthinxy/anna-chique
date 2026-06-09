import { useState } from "react";
import { MessageCircle, X, Send, Volume2 } from "lucide-react";
import { useA11y } from "@/lib/store";

const QUICK = [
  "Como comprar?",
  "Qual o preço?",
  "Qual o mínimo?",
  "Como escolher cor?",
  "Como funciona entrega?",
  "Como pagar?",
];

type Msg = { role: "user" | "assistant"; content: string };

function getRandomReply(replies: string[]) {
  return replies[Math.floor(Math.random() * replies.length)];
}

function getAutoReply(text: string) {
  const q = text.toLowerCase();

  // PREÇO
  if (
    q.includes("preço") ||
    q.includes("preco") ||
    q.includes("valor") ||
    q.includes("quanto") ||
    q.includes("custa") ||
    q.includes("r$")
  ) {
    return getRandomReply([
      "Cada peça custa R$25 no atacado 💕 Trabalhamos com vestidos e conjuntos femininos para revenda.",
      "O valor é R$25 por peça, amiga 💖 O pedido é no atacado, a partir de 12 peças.",
      "As peças saem por R$25 cada no atacado 💕 Você pode escolher pelo catálogo e finalizar no WhatsApp.",
    ]);
  }

  // PEDIDO MÍNIMO
  if (
    q.includes("mínimo") ||
    q.includes("minimo") ||
    q.includes("pedido mínimo") ||
    q.includes("pedido minimo") ||
    q.includes("quantas peças") ||
    q.includes("quantas pecas") ||
    q.includes("mínimo de peças") ||
    q.includes("minimo de pecas")
  ) {
    return getRandomReply([
      "O pedido mínimo é de 12 peças, amiga 💖 Cada peça sai por R$25. Você pode montar seu pedido pelo catálogo e enviar no WhatsApp.",
      "Pra comprar no atacado, o mínimo é 12 peças 💕 A partir disso você já consegue montar seu pedido.",
      "O mínimo para fechar pedido é 12 peças, amiga 💖 O próprio carrinho te mostra quantas faltam.",
    ]);
  }

  // COMO COMPRAR
  if (
    q.includes("comprar") ||
    q.includes("como faço") ||
    q.includes("como faco") ||
    q.includes("como pedir") ||
    q.includes("fazer pedido") ||
    q.includes("montar pedido") ||
    q.includes("finalizar")
  ) {
    return getRandomReply([
      "Pra comprar é simples, amiga 💖 Escolha as peças no catálogo, adicione no carrinho e finalize pelo WhatsApp. O pedido mínimo é de 12 peças.",
      "Você escolhe as peças no catálogo, coloca no carrinho e envia o pedido pelo WhatsApp 💕 A equipe confirma tudo com você.",
      "É só montar seu pedido pelo catálogo e clicar para enviar no WhatsApp. O mínimo é 12 peças e cada uma sai por R$25 💖",
    ]);
  }

  // CORES
  if (
    q.includes("cor") ||
    q.includes("cores") ||
    q.includes("escolher") ||
    q.includes("estampa") ||
    q.includes("estampas") ||
    q.includes("sortida") ||
    q.includes("sortidas")
  ) {
    return getRandomReply([
      "Acima de 20 peças você pode escolher as cores. Abaixo disso, podem ir cores e estampas sortidas, amiga 💖",
      "Sobre cores: acima de 20 peças dá pra escolher. Abaixo disso, o envio pode ser sortido 💕",
      "As cores podem ser escolhidas em pedidos acima de 20 peças. Para pedidos menores, podem ir cores e estampas variadas 💖",
    ]);
  }

  // ENTREGA / FRETE
  if (
    q.includes("entrega") ||
    q.includes("frete") ||
    q.includes("envio") ||
    q.includes("enviar") ||
    q.includes("correios") ||
    q.includes("transportadora") ||
    q.includes("excursão") ||
    q.includes("excursao") ||
    q.includes("retirada")
  ) {
    return getRandomReply([
      "Enviamos para todo o Brasil 💖 Pode ser por excursão, transportadora, Correios ou retirada/combinar. Transportadora e excursão têm taxa fixa de R$10. Correios é consultado pelo WhatsApp.",
      "A entrega pode ser por transportadora, excursão, Correios ou retirada combinada 💕 Transportadora e excursão ficam R$10; Correios precisa consultar.",
      "Enviamos para todo o Brasil, amiga 💖 O frete por transportadora ou excursão é R$10. Correios é melhor confirmar no WhatsApp.",
    ]);
  }

  // PAGAMENTO
  if (
    q.includes("pagar") ||
    q.includes("pagamento") ||
    q.includes("pix") ||
    q.includes("comprovante") ||
    q.includes("cartão") ||
    q.includes("cartao")
  ) {
    return getRandomReply([
      "O pagamento é por Pix. Depois de montar o pedido, envie o comprovante pelo WhatsApp para confirmarmos tudo 💖",
      "Trabalhamos com pagamento por Pix, amiga 💕 Depois é só mandar o comprovante no WhatsApp.",
      "Você paga por Pix e envia o comprovante pra nossa equipe confirmar seu pedido 💖",
    ]);
  }

  // TAMANHO
  if (
    q.includes("tamanho") ||
    q.includes("medida") ||
    q.includes("medidas") ||
    q.includes("veste") ||
    q.includes("serve") ||
    q.includes("plus size") ||
    q.includes("pp") ||
    q.includes("gg")
  ) {
    return getRandomReply([
      "As peças são tamanho único, amiga 💖 Para mais detalhes de caimento e medidas, chama a gente no WhatsApp.",
      "Trabalhamos com tamanho único 💕 Se quiser saber melhor sobre caimento, nossa equipe te orienta pelo WhatsApp.",
      "O tamanho é único, amiga. Pra confirmar se veste do jeito que você precisa, chama uma atendente no WhatsApp 💖",
    ]);
  }

  // TECIDO
  if (
    q.includes("tecido") ||
    q.includes("material") ||
    q.includes("suplex") ||
    q.includes("veludo") ||
    q.includes("beach gloss") ||
    q.includes("malha")
  ) {
    return getRandomReply([
      "Trabalhamos com tecidos como Beach Gloss, Veludo, Suplex e outros. No WhatsApp a gente consegue te orientar melhor sobre cada peça 💖",
      "Temos peças em tecidos como Suplex, Veludo, Beach Gloss e outros 💕 Para saber o tecido exato de uma peça, chama no WhatsApp.",
      "Os tecidos variam entre modelos, amiga 💖 Temos Suplex, Veludo, Beach Gloss e outros. A equipe confirma certinho pelo WhatsApp.",
    ]);
  }

  // VAREJO
  if (
    q.includes("varejo") ||
    q.includes("uma peça") ||
    q.includes("1 peça") ||
    q.includes("uma peca") ||
    q.includes("só uma") ||
    q.includes("so uma")
  ) {
    return getRandomReply([
      "No momento vendemos apenas no atacado, amiga 💖 O pedido mínimo é de 12 peças.",
      "A Anna Chique trabalha com atacado 💕 O mínimo para fechar pedido é 12 peças.",
      "Vendemos apenas no atacado, amiga. O pedido começa a partir de 12 peças 💖",
    ]);
  }

  // WHATSAPP / ATENDENTE
  if (
    q.includes("whatsapp") ||
    q.includes("atendente") ||
    q.includes("humano") ||
    q.includes("falar com") ||
    q.includes("telefone") ||
    q.includes("contato")
  ) {
    return getRandomReply([
      "Claro, amiga 💖 Você pode chamar direto no WhatsApp: +55 85 9437-4066.",
      "Pra falar com uma atendente, chama no WhatsApp +55 85 9437-4066 💕",
      "Nosso atendimento é pelo WhatsApp: +55 85 9437-4066. A equipe te responde rapidinho 💖",
    ]);
  }

  // INSTAGRAM
  if (q.includes("instagram") || q.includes("insta")) {
    return getRandomReply([
      "Nosso Instagram é @annachique_ 💖 Lá você também pode acompanhar novidades da loja.",
      "Você encontra a Anna Chique no Instagram: @annachique_ 💕",
      "Segue a gente no Instagram @annachique_ pra ver novidades e modelos 💖",
    ]);
  }

  // SAUDAÇÃO
  if (
    q.includes("oi") ||
    q.includes("olá") ||
    q.includes("ola") ||
    q.includes("bom dia") ||
    q.includes("boa tarde") ||
    q.includes("boa noite")
  ) {
    return getRandomReply([
      "Oi, amiga 💖 Seja bem-vinda à Anna Chique! Posso te ajudar com preço, mínimo, entrega, cores ou pagamento.",
      "Olá, amiga 💕 Eu sou a Assistente Anna. Quer saber sobre preço, pedido mínimo ou como comprar?",
      "Oi, linda 💖 Me fala sua dúvida: preço, mínimo, entrega, cores ou pagamento?",
    ]);
  }

  // FALLBACK ALEATÓRIO
  const fallbackReplies = [
    "Amiga, não tenho certeza sobre essa dúvida 💖 Pra te passar a informação certinha, chama uma atendente no WhatsApp: +55 85 9437-4066.",
    "Essa dúvida é melhor confirmar direto com a equipe, tá? 💕 Me chama no WhatsApp +55 85 9437-4066 que a gente te responde rapidinho.",
    "Não consegui entender direitinho, amiga 💖 Posso te ajudar com preço, mínimo, entrega, cores ou pagamento. Se for algo específico, chama no WhatsApp +55 85 9437-4066.",
    "Pra essa informação, é melhor falar com uma atendente da Anna Chique 💕 Chama no WhatsApp: +55 85 9437-4066.",
    "Amiga, pra não te passar nada errado, me chama no WhatsApp +55 85 9437-4066 que a equipe confirma tudo certinho pra você 💖",
  ];

  return getRandomReply(fallbackReplies);
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Oi, amiga! 💖 Eu sou a Assistente Anna. Eu te ajudo a comprar. Você quer saber preço, mínimo, entrega, cores ou como mandar o pedido?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { speak } = useA11y();

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = getAutoReply(text);
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="animate-pulse-pink fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full text-white shadow-glow"
        style={{ background: "var(--gradient-rose)" }}
        aria-label="Abrir assistente"
      >
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>

      {open && (
        <div className="animate-pop fixed bottom-24 right-3 z-50 flex h-[min(75dvh,560px)] w-[min(95vw,380px)] flex-col overflow-hidden rounded-3xl border border-rose-baby/70 bg-white shadow-glow transition-colors dark:border-pink-900/50 dark:bg-[#12070d]">
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-rose-deep px-4 py-3 text-white">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg font-bold">
              A
            </div>

            <div>
              <div className="font-display text-lg font-bold leading-none">
                Assistente Anna
              </div>
              <div className="text-xs text-white/90">
                Online · te respondo rapidinho
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-rose-baby/25 p-3 transition-colors dark:bg-[#1a0711]">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-foreground dark:bg-[#2a101c] dark:text-white"
                  }`}
                >
                  {m.content}

                  {m.role === "assistant" && (
                    <button
                      onClick={() => speak(m.content)}
                      className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline dark:text-pink-300"
                    >
                      <Volume2 className="h-3 w-3" /> ouvir
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm text-foreground shadow-soft dark:bg-[#2a101c] dark:text-white">
                  digitando...
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-rose-baby/70 bg-white px-3 py-1 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white/80 dark:hover:border-pink-400 dark:hover:text-pink-300"
                >
                  {q}
                </button>
              ))}

              <a
                href="https://wa.me/558594374066"
                className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
              >
                Falar com atendente
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-rose-baby/70 bg-white p-2 transition-colors dark:border-pink-900/50 dark:bg-[#12070d]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua dúvida..."
              className="flex-1 rounded-full border border-rose-baby/70 bg-secondary/40 px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary dark:border-pink-900/50 dark:bg-[#2a101c] dark:text-white dark:placeholder:text-white/45"
            />

            <button
              type="submit"
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-soft transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}