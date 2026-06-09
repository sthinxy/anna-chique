import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery, settingsQuery, reviewsQuery } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import {
  ShoppingBag,
  MessageCircle,
  Sparkles,
  Truck,
  ShieldCheck,
  Star,
  Copy,
  Check,
  Volume2,
  Headphones,
  Instagram,
  PackageCheck,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useA11y } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anna Chique | Vestidos e Conjuntos no Atacado · R$25" },
      {
        name: "description",
        content:
          "Loja de fábrica em Fortaleza. Vestidos e conjuntos femininos por R$25 a peça, a partir de 12. Envio para todo Brasil. Atendimento pelo WhatsApp.",
      },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(productsQuery),
      context.queryClient.ensureQueryData(settingsQuery),
      context.queryClient.ensureQueryData(reviewsQuery),
    ]),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background p-8 text-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background p-8 text-foreground">
      Não encontrado
    </div>
  ),
  component: Home,
});

function Home() {
  const { data: products } = useSuspenseQuery(productsQuery);
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const { data: reviews } = useSuspenseQuery(reviewsQuery);
  const { speak } = useA11y();

  const featured = products.slice(0, 6);

  return (
    <div className="bg-background text-foreground transition-colors">
      {/* HERO */}
      <section
        className="relative overflow-hidden transition-colors"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="animate-pop">
            <div className="chip">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Coleção atualizada toda semana
            </div>

            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.95] text-foreground transition-colors dark:text-white md:text-7xl">
              {settings.hero_title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-primary">
                {settings.hero_title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="mt-5 max-w-md text-lg text-foreground/80 transition-colors dark:text-white/75">
              {settings.hero_subtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/catalogo" className="btn-hero btn-hero-hover">
                <ShoppingBag className="h-5 w-5" /> Ver peças
              </Link>

<a
  href="#como-comprar"
  className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#12070d] px-8 py-4 text-[1.05rem] font-bold text-white shadow-glow transition hover:scale-105 hover:bg-primary dark:bg-white dark:text-[#12070d] dark:hover:bg-pink-200"
>
  <Heart className="h-5 w-5" /> Como comprar
</a>

              <a
                href={`https://wa.me/${settings.whatsapp}`}
                className="btn-hero btn-hero-hover"
                style={{ background: "oklch(0.65 0.15 145)" }}
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="chip">💖 Preço único R$25</span>
              <span className="chip">📦 Mínimo 12 peças</span>
              <span className="chip">🚚 Todo o Brasil</span>
              <span className="chip">⭐ +30 mil seguidoras</span>
            </div>
          </div>

          {/* Floating product montage */}
          <div className="relative grid grid-cols-2 gap-3">
            {featured.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`card-pink animate-float overflow-hidden ${
                  i % 2 === 0 ? "translate-y-4" : ""
                }`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div className="relative aspect-[3/4] bg-rose-baby/30 transition-colors dark:bg-pink-950/30">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  )}

                  <div className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-primary shadow transition-colors dark:bg-[#12070d]/95 dark:text-pink-300">
                    R$25
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-6 -z-10 h-40 w-40 rounded-full bg-rose-baby blur-3xl dark:bg-pink-800/40" />
          </div>
        </div>
      </section>

      {/* COMO COMPRAR */}
      <section
        id="como-comprar"
        className="section-pad bg-white transition-colors dark:bg-[#0d0509]"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="chip">
                <Headphones className="h-3.5 w-3.5" /> Passo a passo
              </div>

              <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
                Comprar é <span className="text-primary">fácil</span>
              </h2>
            </div>

            <button
              onClick={() =>
                speak(
                  "Para comprar, escolha as peças no catálogo, complete no mínimo doze unidades e clique no botão do WhatsApp. Nossa equipe vai confirmar seu pedido.",
                )
              }
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/70 dark:bg-pink-950/60 dark:text-pink-100 dark:hover:bg-pink-900/70"
            >
              <Volume2 className="h-4 w-4 text-primary" /> Ouvir explicação
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: 1,
                t: "Escolha suas peças",
                d: "Veja vestidos e conjuntos no catálogo e adicione no carrinho.",
              },
              {
                n: 2,
                t: "Complete 12 peças",
                d: "O atacado começa a partir de 12 unidades — o sistema te avisa.",
              },
              {
                n: 3,
                t: "Envie no WhatsApp",
                d: "Seu pedido vai prontinho para a nossa equipe te atender.",
              },
            ].map((s) => (
              <div key={s.n} className="card-pink p-7">
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl text-3xl font-extrabold text-white shadow-glow"
                  style={{ background: "var(--gradient-rose)" }}
                >
                  {s.n}
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-foreground transition-colors dark:text-white">
                  {s.t}
                </h3>

                <p className="mt-2 text-foreground/70 transition-colors dark:text-white/70">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO DESTAQUE */}
      <section
        id="catalogo"
        className="section-pad bg-gradient-to-b from-rose-baby/20 to-white transition-colors dark:from-[#170812] dark:to-[#0d0509]"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="chip">💕 Destaques</div>

              <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
                Peças mais <span className="text-primary">amadas</span>
              </h2>
            </div>

            <Link
              to="/catalogo"
              className="font-semibold text-primary hover:underline dark:text-pink-300"
            >
              Ver tudo →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGA */}
      <section
        id="entrega"
        className="section-pad bg-white transition-colors dark:bg-[#0d0509]"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="chip">
            <Truck className="h-3.5 w-3.5 text-primary" /> Frete e entrega
          </div>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
            Sua compra chega <span className="text-primary">em qualquer canto</span>
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              {
                t: "Excursão",
                d: "Taxa fixa R$10. Confirmamos a rota no WhatsApp.",
              },
              {
                t: "Transportadora",
                d: "Taxa fixa R$10. Conferência no atendimento.",
              },
              {
                t: "Correios",
                d: "Consulte o valor pelo WhatsApp (cada cidade tem um valor).",
              },
              {
                t: "Retirada",
                d: "Combine com a gente pelo WhatsApp.",
              },
            ].map((o) => (
              <div key={o.t} className="card-pink p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-rose-baby transition-colors dark:bg-pink-950/70">
                  <Truck className="h-6 w-6 text-rose-deep dark:text-pink-300" />
                </div>

                <div className="mt-3 font-display text-xl font-bold text-foreground transition-colors dark:text-white">
                  {o.t}
                </div>

                <div className="mt-1 text-sm text-foreground/70 transition-colors dark:text-white/70">
                  {o.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIX */}
      <PixSection settings={settings} />

      {/* SEGURANÇA */}
      <section
        id="seguranca"
        className="section-pad bg-white transition-colors dark:bg-[#0d0509]"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="chip">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Segurança
          </div>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
            Pode comprar com <span className="text-primary">segurança</span>
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-foreground/70 transition-colors dark:text-white/70">
            A Anna Chique fabrica roupas há mais de 20 anos, tem Instagram ativo com mais de 30 mil seguidoras e atende revendedoras de todo o Brasil pelo WhatsApp.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { i: "20+", t: "Anos fabricando" },
              { i: "30k", t: "Seguidoras Insta" },
              { i: "BR", t: "Envio todo país" },
              { i: "Pix", t: "Pagamento seguro" },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl bg-rose-baby/40 p-5 text-center transition-colors dark:bg-pink-950/40 dark:text-white"
              >
                <div className="font-display text-3xl font-extrabold text-primary dark:text-pink-300">
                  {s.i}
                </div>
                <div className="text-sm font-semibold">{s.t}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reviews.slice(0, 4).map((r) => (
              <div key={r.id} className="card-pink p-5">
                <div className="flex text-warning">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-foreground/80 transition-colors dark:text-white/75">
                  "{r.comment}"
                </p>

                <div className="mt-3 text-xs font-bold text-foreground transition-colors dark:text-white">
                  {r.name}
                  {r.city && (
                    <span className="text-muted-foreground dark:text-white/50">
                      {" "}
                      · {r.city}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

       {/* CTA FINAL */}
      <section className="section-pad relative overflow-hidden bg-rose-baby/25 text-foreground transition-colors dark:bg-[#070306] dark:text-white">
        <div
          className="absolute inset-0 -z-10 opacity-80 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(255, 46, 147, 0.10) 0%, transparent 45%)",
          }}
        />

        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <Sparkles className="mx-auto h-10 w-10 text-primary dark:text-white" />

          <h2 className="mt-4 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-6xl">
            Bora começar a revender?
          </h2>

          <p className="mt-4 text-lg text-foreground/75 transition-colors dark:text-white/85">
            Manda oi no WhatsApp ou já monta seu pedido no catálogo.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 font-bold text-primary shadow-soft transition hover:scale-105 dark:bg-white dark:text-primary"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>

            <Link
              to="/catalogo"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-foreground px-7 font-bold text-white transition hover:scale-105 dark:bg-[#12070d] dark:text-white"
            >
              <ShoppingBag className="h-5 w-5" /> Ver catálogo
            </Link>

            <a
              href="https://www.instagram.com/annachique_/"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-primary px-7 font-bold text-primary transition hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary"
            >
              <Instagram className="h-5 w-5" /> Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function PixSection({
  settings,
}: {
  settings: { pix_key: string; pix_code: string; nubank_link: string };
}) {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);

  const copy = async (text: string, set: (b: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    set(true);
    toast.success("Copiado!");
    setTimeout(() => set(false), 2000);
  };

  return (
    <section
      id="pix"
      className="section-pad bg-gradient-to-b from-white to-rose-baby/40 transition-colors dark:from-[#0d0509] dark:to-[#1b0b13]"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="chip">
          <PackageCheck className="h-3.5 w-3.5 text-primary" /> Pagamento
        </div>

        <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
          Pagamento por <span className="text-primary">Pix</span>
        </h2>

        <p className="mt-3 max-w-xl text-foreground/70 transition-colors dark:text-white/70">
          Depois de pagar, envie o comprovante junto com o pedido no WhatsApp.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card-pink p-6">
            <div className="text-sm font-bold uppercase tracking-wider text-primary dark:text-pink-300">
              Chave Pix (e-mail)
            </div>

            <div className="mt-2 break-all rounded-2xl bg-secondary p-4 font-mono text-sm text-secondary-foreground transition-colors dark:bg-pink-950/50 dark:text-white/80">
              {settings.pix_key}
            </div>

            <button
              onClick={() => copy(settings.pix_key, setC1)}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500"
            >
              {c1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {c1 ? "Chave copiada" : "Copiar chave"}
            </button>
          </div>

          <div className="card-pink p-6">
            <div className="text-sm font-bold uppercase tracking-wider text-primary dark:text-pink-300">
              Pix copia e cola
            </div>

            <div className="mt-2 max-h-32 overflow-auto rounded-2xl bg-secondary p-4 font-mono text-xs break-all text-secondary-foreground transition-colors dark:bg-pink-950/50 dark:text-white/80">
              {settings.pix_code}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => copy(settings.pix_code, setC2)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-white transition hover:opacity-90 dark:bg-pink-600 dark:hover:bg-pink-500"
              >
                {c2 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {c2 ? "Código copiado" : "Copiar código Pix"}
              </button>

              <a
                href={settings.nubank_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 font-bold text-primary transition hover:bg-primary hover:text-white dark:border-pink-400 dark:text-pink-300 dark:hover:bg-pink-500 dark:hover:text-white"
              >
                Link Nubank
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "Qual o valor das peças?", a: "Todas as peças custam R$25 para revenda." },
  { q: "Qual o pedido mínimo?", a: "O pedido mínimo é 12 peças." },
  { q: "Vende no varejo?", a: "Não. Vendemos apenas no atacado." },
  {
    q: "Posso escolher as cores?",
    a: "Acima de 20 peças você pode escolher as cores. Abaixo disso, enviamos cores e estampas sortidas.",
  },
  { q: "Qual o tamanho?", a: "As peças são tamanho único." },
  { q: "Quais peças vocês fabricam?", a: "Fabricamos vestidos e conjuntos femininos." },
  { q: "Quais tecidos vocês trabalham?", a: "Beach Gloss, Veludo, Suplex e outros." },
  { q: "Envia para todo o Brasil?", a: "Sim. Enviamos por excursão, transportadora e Correios." },
  { q: "Como vejo o valor do Correios?", a: "Você consulta pelo WhatsApp." },
  { q: "Como pago?", a: "Você paga por Pix e envia o comprovante no WhatsApp." },
];

function FAQ() {
  const { speak } = useA11y();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-pad bg-white transition-colors dark:bg-[#0d0509]"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="chip">❓ Dúvidas frequentes</div>

        <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground transition-colors dark:text-white md:text-5xl">
          Tudo que você precisa saber
        </h2>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((it, i) => (
            <div key={i} className="card-pink overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <span className="font-display text-lg font-bold text-foreground transition-colors dark:text-white">
                  {it.q}
                </span>

                <span className="text-2xl text-primary dark:text-pink-300">
                  {open === i ? "–" : "+"}
                </span>
              </button>

              {open === i && (
                <div className="border-t p-5 pt-4 transition-colors dark:border-pink-900/30">
                  <p className="text-foreground/80 transition-colors dark:text-white/70">
                    {it.a}
                  </p>

                  <button
                    onClick={() => speak(it.a)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:underline dark:text-pink-300"
                  >
                    <Volume2 className="h-4 w-4" /> Ouvir resposta
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}