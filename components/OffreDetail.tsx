"use client";

import { useRouter } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getOffreById } from "@/lib/offres";
import { funnelStorage } from "@/lib/storage";

/**
 * Gabarit partagé par les 11 pages /offres/offre-N. Chaque page (Server
 * Component, pour pouvoir exporter `metadata`) ne transmet que l'identifiant
 * de son offre : l'objet complet contient un composant icône (une fonction),
 * qui ne peut pas être sérialisé d'un Server Component vers un Client
 * Component. La résolution des données se fait donc ici, côté client.
 *
 * Note : aucune image n'était présente dans /public/eb/ au moment de la
 * création de ces pages. L'accent visuel utilise donc une icône + un bloc
 * "plan" généré en CSS. Pour remplacer par une vraie photo, ajouter le
 * fichier dans /public/eb/ puis un <Image src="/eb/....jpg" ... /> ici.
 */
export default function OffreDetail({ offreId }: { offreId: string }) {
  const router = useRouter();
  const offre = getOffreById(offreId);

  if (!offre) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-6">
          <p className="text-sm text-paper/60">Offre introuvable.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const Icon = offre.icon;
  const accentText = offre.accent === "amber" ? "text-amber" : "text-teal";
  const accentBorder =
    offre.accent === "amber" ? "border-amber/40" : "border-teal/40";

  const resolvedId = offre.id;
  const resolvedNom = offre.nom;
  function handleContinuer() {
    funnelStorage.setOffre({ offreId: resolvedId, offreNom: resolvedNom });
    router.push("/bat");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="label-mono text-xs text-teal">Étape 2 / 4</p>
          <p className="label-mono mt-2 text-xs text-paper/40">
            Plan {String(offre.numero).padStart(2, "0")}/11
          </p>

          <div className="mt-6 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <h1 className="font-display text-3xl font-bold text-paper sm:text-4xl">
                {offre.nom}
              </h1>
              <p className={`mt-2 text-base ${accentText}`}>{offre.tagline}</p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/70">
                {offre.description}
              </p>
            </div>

            <div
              className={`bp-corners bp-grid flex h-32 w-32 shrink-0 items-center justify-center border ${accentBorder}`}
              aria-hidden="true"
            >
              <Icon className={`h-12 w-12 ${accentText}`} />
            </div>
          </div>

          <div className="mt-10 border-t border-ink-line/60 pt-8">
            <h2 className="label-mono text-xs text-paper/50">
              Ce qui est inclus
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {offre.avantages.map((avantage) => (
                <li key={avantage} className="flex items-start gap-2.5 text-sm text-paper/80">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`}
                    aria-hidden="true"
                  />
                  {avantage}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleContinuer}
              className="group inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3 font-display text-sm font-bold text-ink transition hover:bg-amber-dim"
            >
              Continuer
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => router.push("/portail")}
              className="font-display text-sm text-paper/50 underline-offset-4 hover:text-paper/80 hover:underline"
            >
              Choisir une autre offre
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
