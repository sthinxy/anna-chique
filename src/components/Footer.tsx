import { Instagram, MessageCircle, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-gradient-to-b from-rose-baby/40 to-white transition-colors dark:border-pink-900/30 dark:from-[#1b0b13] dark:to-[#0d0509] dark:text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://ohvynherkuwovccnpoeh.supabase.co/storage/v1/object/public/product-images/logo.png"
              alt="Anna Chique"
              className="h-14 w-14 rounded-full shadow-soft"
            />

            <div>
              <div className="font-display text-xl font-extrabold text-foreground transition-colors dark:text-white">
                Anna <span className="text-primary">Chique</span>
              </div>

              <div className="text-xs text-muted-foreground transition-colors dark:text-pink-200/70">
                Moda Feminina · Atacado
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-xs text-sm text-muted-foreground transition-colors dark:text-white/70">
            Fabricamos vestidos e conjuntos para revendedoras de todo o Brasil há mais de 20 anos.
          </p>
        </div>

        <div>
          <h4 className="text-base font-bold text-foreground transition-colors dark:text-white">
            Atendimento
          </h4>

          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300"
                href="https://wa.me/558594374066"
              >
                <MessageCircle className="h-4 w-4" />
                <span suppressHydrationWarning>+55 85 9437-4066</span>
              </a>
            </li>

            <li>
              <a
                className="flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300"
                href="mailto:annachiqueloja@gmail.com"
              >
                <Mail className="h-4 w-4" />
                <span suppressHydrationWarning>annachiqueloja@gmail.com</span>
              </a>
            </li>

            <li>
              <a
                className="flex items-center gap-2 text-foreground/80 transition hover:text-primary dark:text-white/75 dark:hover:text-pink-300"
                href="https://www.instagram.com/annachique_/"
              >
                <Instagram className="h-4 w-4" />
                <span suppressHydrationWarning>@annachique_</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base font-bold text-foreground transition-colors dark:text-white">
            Endereço
          </h4>

          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground transition-colors dark:text-white/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Rua José Avelino,
              <br />
              Fortaleza - CE
              <br />
              Feira José Avelino
            </span>
          </p>
        </div>

        <div>
          <h4 className="text-base font-bold text-foreground transition-colors dark:text-white">
            A loja
          </h4>

          <ul className="mt-3 space-y-2 text-sm text-foreground/80 transition-colors dark:text-white/75">
            <li>R$ 25 por peça</li>
            <li>Pedido mínimo: 12 peças</li>
            <li>Envio para todo o Brasil</li>
            <li>Pagamento por Pix</li>
          </ul>
        </div>
      </div>

      <div
        className="border-t py-4 text-center text-xs text-muted-foreground transition-colors dark:border-pink-900/30 dark:text-white/50"
        suppressHydrationWarning
      >
        © {new Date().getFullYear()} Anna Chique · Todos os direitos reservados
      </div>
    </footer>
  );
}