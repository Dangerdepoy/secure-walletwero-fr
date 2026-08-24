/**
 * Pied de page commun. Contenu volontairement minimal (pas de fausses
 * mentions légales / SIREN / etc. inventées) : à compléter avec les vraies
 * informations administratives de l'entreprise avant mise en production.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-ink-line/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} WEROECOLE. Tous droits réservés.</p>
        <p className="label-mono text-xs">Abidjan · Côte d&apos;Ivoire</p>
      </div>
    </footer>
  );
}
