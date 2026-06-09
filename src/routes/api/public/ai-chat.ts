import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SYSTEM = `Você é a "Assistente Anna", atendente virtual da loja Anna Chique (fabricante de roupas femininas no atacado em Fortaleza-CE).
Tom: simples, feminino, próximo, acolhedor, didático — como uma vendedora pelo WhatsApp. Use linguagem popular e respostas curtas (máx 4 linhas).
Público: revendedoras, muitas com pouca familiaridade com tecnologia.

Informações da loja:
- Vende apenas no ATACADO (não vende varejo).
- Todas as peças custam R$25 cada para revenda.
- Pedido mínimo: 12 peças.
- Fabricamos só vestidos e conjuntos femininos. Tamanho único.
- Tecidos: Beach Gloss, Veludo, Suplex e outros.
- Acima de 20 peças a cliente pode escolher as cores; abaixo disso vai sortido.
- Entrega por excursão ou transportadora: taxa fixa de R$10.
- Correios: valor consultado pelo WhatsApp.
- Pagamento por Pix manual; enviar comprovante pelo WhatsApp.
- WhatsApp: +55 85 9437-4066 (https://wa.me/558594374066).
- Instagram: @annachique_
- Endereço: Rua José Avelino, Fortaleza-CE (Feira José Avelino).
- Catálogo atualizado quase toda semana.

Sempre que a cliente quiser falar com humano, indique o WhatsApp +55 85 9437-4066. Nunca invente preços, prazos ou políticas. Use "amiga" com moderação.`;

export const Route = createFileRoute("/api/public/ai-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            messages?: { role: "user" | "assistant"; content: string }[];
          };
          const messages = (body.messages ?? []).slice(-20);

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "Missing key" }, { status: 500 });
          }

          const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
              ],
            }),
          });

          if (!r.ok) {
            const txt = await r.text();
            console.error("AI error", r.status, txt);
            if (r.status === 429) {
              return Response.json({ reply: "Tô com muita gente falando comigo agora 😅 tenta de novo em 1 minuto, ou chama no WhatsApp: +55 85 9437-4066." });
            }
            if (r.status === 402) {
              return Response.json({ reply: "Ah, amiga, tô sem créditos pra responder. Me chama no WhatsApp +55 85 9437-4066 que te atendo agora!" });
            }
            return Response.json({ reply: "Não consegui responder agora. Me chama no WhatsApp +55 85 9437-4066." });
          }

          const data = (await r.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const reply = data.choices?.[0]?.message?.content ?? "Não entendi, amiga. Pode repetir?";

          // Log (best-effort, ignore errors)
          try {
            const last = messages[messages.length - 1]?.content ?? "";
            const sid = crypto.randomUUID();
            await supabaseAdmin.from("chat_logs").insert([
              { session_id: sid, role: "user", content: last },
              { session_id: sid, role: "assistant", content: reply },
            ]);
          } catch {}

          return Response.json({ reply });
        } catch (e) {
          console.error(e);
          return Response.json({ reply: "Tive um probleminha. Tenta de novo ou me chama no WhatsApp +55 85 9437-4066." });
        }
      },
    },
  },
});
