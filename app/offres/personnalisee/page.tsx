"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { besoinPersonnaliseSchema } from "@/lib/validation";
import { funnelStorage } from "@/lib/storage";

const MIN_LENGTH = 20;

export default function OffrePersonnaliseePage() {
  const router = useRouter();
  const [besoin, setBesoin] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = besoinPersonnaliseSchema.safeParse({ besoin });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Description invalide.");
      return;
    }
    setError(null);

    funnelStorage.setOffre({
      offreId: "personnalisee",
      offreNom: "Besoin personnalisé",
      besoinPersonnalise: result.data.besoin,
    });
    router.push("/bat");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="label-mono text-xs text-teal">Étape 2 / 4</p>
          <p className="label-mono mt-2 text-xs text-amber/70">Plan 12/12</p>

          <div className="mt-6 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-amber" aria-hidden="true" />
            <h1 className="font-display text-3xl font-bold text-paper">
              Besoin personnalisé
            </h1>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/70">
            Aucune de nos 11 offres ne correspond exactement à votre projet ?
            Décrivez-nous ce dont vous avez besoin : nous reviendrons vers
            vous avec une proposition adaptée.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-10">
            <label className="block">
              <span className="label-mono text-xs text-paper/50">
                Décrivez votre besoin ou votre projet
              </span>
              <textarea
                value={besoin}
                onChange={(e) => setBesoin(e.target.value)}
                rows={7}
                minLength={MIN_LENGTH}
                aria-invalid={!!error}
                placeholder="Exemple : je gère une clinique vétérinaire et j'aimerais un site avec prise de rendez-vous en ligne et un espace pour publier des conseils aux propriétaires d'animaux…"
                className="mt-2 w-full resize-y rounded-sm border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-paper/30"
              />
              <div className="mt-1 flex items-center justify-between">
                {error ? (
                  <span className="text-xs text-red-400">{error}</span>
                ) : (
                  <span className="text-xs text-paper/30">
                    {besoin.length}/{MIN_LENGTH} caractères minimum
                  </span>
                )}
              </div>
            </label>

            <button
              type="submit"
              className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-amber px-6 py-3 font-display text-sm font-bold text-ink transition hover:bg-amber-dim"
            >
              Continuer
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
