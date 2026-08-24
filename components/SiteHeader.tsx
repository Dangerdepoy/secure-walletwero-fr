import Link from "next/link";

/**
 * En-tête commun à toutes les pages du parcours.
 * Volontairement sans navigation à choix multiples : le parcours est
 * linéaire (accueil → infos → portail → offre → bat → data → vérif → confirm),
 * on évite donc de proposer des sorties qui casseraient ce tunnel.
 */
export default function SiteHeader() {
  return (
    <header className="border-b border-ink-line/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="label-mono text-xs text-amber"
            aria-hidden="true"
          >
            ◇
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-paper">
            WEROECOLE
          </span>
        </Link>
        <span className="label-mono hidden text-xs text-paper/50 sm:block">
          Présence digitale sur mesure
        </span>
      </div>
    </header>
  );
}
