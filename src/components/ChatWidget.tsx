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
    try {
      const r = await fetch("/api/public/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await r.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        "Desculpa, amiga, tive um probleminha agora. Chama no WhatsApp +55 85 9437-4066 que a gente te atende rapidinho!";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Não consegui responder agora. Me chama no WhatsApp +55 85 9437-4066 que te ajudo na hora! 💕",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
        <div className="animate-pop fixed bottom-24 right-3 z-50 flex h-[min(75dvh,560px)] w-[min(95vw,380px)] flex-col overflow-hidden rounded-3xl border bg-white shadow-glow">
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-rose-deep px-4 py-3 text-white">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-lg font-bold">
              A
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">Assistente Anna</div>
              <div className="text-xs opacity-90">Online · te respondo rapidinho</div>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-secondary/30 p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white text-foreground shadow-soft"
                  }`}
                >
                  {m.content}
                  {m.role === "assistant" && (
                    <button
                      onClick={() => speak(m.content)}
                      className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
                    >
                      <Volume2 className="h-3 w-3" /> ouvir
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-3 py-2 text-sm shadow-soft">
                  digitando...
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border bg-white px-3 py-1 text-xs font-semibold hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
              <a
                href="https://wa.me/558594374066"
                className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-white hover:opacity-90"
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
            className="flex items-center gap-2 border-t bg-white p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua dúvida..."
              className="flex-1 rounded-full border bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-soft hover:opacity-90"
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
