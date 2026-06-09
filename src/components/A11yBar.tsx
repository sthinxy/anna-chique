import { Volume2, Plus, Minus, Sparkles } from "lucide-react";
import { useA11y } from "@/lib/store";

export function A11yBar() {
  const { textSize, setText, easyMode, toggleEasy, speak } = useA11y();

  return (
    <div className="border-b border-rose-baby/50 bg-[#12070d] text-white transition-colors dark:border-pink-900/40 dark:bg-[#080306]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs md:px-8">
        <span className="hidden font-medium text-white/85 sm:inline">
          ✨ Atacado feminino · R$25 a peça · Mínimo 12 peças · Envio para todo Brasil
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              speak(
                "Bem vinda à Anna Chique. Aqui você compra vestidos e conjuntos no atacado. O preço é vinte e cinco reais por peça, e o pedido mínimo é doze peças.",
              )
            }
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20 dark:bg-white/10 dark:hover:bg-pink-500/25"
            aria-label="Ouvir explicação"
          >
            <Volume2 className="h-3.5 w-3.5" /> Ouvir
          </button>

          <button
            onClick={() =>
              setText(textSize === "md" ? "lg" : textSize === "lg" ? "xl" : "md")
            }
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20 dark:bg-white/10 dark:hover:bg-pink-500/25"
            aria-label="Aumentar texto"
          >
            {textSize === "xl" ? (
              <Minus className="h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            Texto
          </button>

          <button
            onClick={toggleEasy}
            className={`flex items-center gap-1 rounded-full px-3 py-1 font-semibold transition ${
              easyMode
                ? "bg-primary text-white shadow-soft"
                : "bg-white/10 text-white hover:bg-white/20 dark:hover:bg-pink-500/25"
            }`}
            aria-pressed={easyMode}
          >
            <Sparkles className="h-3.5 w-3.5" /> Modo fácil
          </button>
        </div>
      </div>
    </div>
  );
}