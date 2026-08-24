import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="bp-corners max-w-md p-8 text-center">
          <p className="label-mono text-xs text-amber">Erreur 404</p>
          <h1 className="font-display mt-4 text-2xl font-bold text-paper">
            Cette page n&apos;existe pas
          </h1>
          <p className="mt-3 text-sm text-paper/60">
            Le lien suivi ne correspond à aucune page connue. Reprenez le
            parcours depuis l&apos;accueil.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-sm bg-amber px-5 py-2.5 font-display text-sm font-bold text-ink transition hover:bg-amber-dim"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
