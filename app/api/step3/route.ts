import { NextResponse } from "next/server";
import { dataSchema } from "@/lib/validation";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

/**
 * Étape 3 (page /data) : dernière étape du parcours avant /verif.
 * Récapitule l'ensemble des informations collectées depuis /infos et les
 * transmet à l'équipe. Il n'existe pas encore de base de données ni de
 * tableau de bord d'administration dans ce projet : la transmission passe
 * donc, comme pour les étapes précédentes, par Telegram. Si un vrai espace
 * d'administration est mis en place plus tard, c'est ici qu'il faudra
 * brancher l'écriture en base en plus (ou à la place) de l'envoi Telegram.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const result = dataSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Données invalides.", issues: result.error.issues },
      { status: 400 }
    );
  }

  const {
    source,
    raison,
    effectif,
    activite,
    entreprise,
    offreId,
    offreNom,
    besoinPersonnalise,
    infos,
  } = result.data;

  try {
    await sendTelegramMessage("Nouveau visiteur — Étape 4/4 (récapitulatif complet)", [
      { label: "Nom complet", value: infos ? `${infos.prenom} ${infos.nom}` : "" },
      { label: "Téléphone", value: infos?.telephone ?? "" },
      { label: "E-mail", value: infos?.email ?? "" },
      { label: "Offre choisie", value: offreNom ?? "" },
      {
        label: "Besoin personnalisé",
        value: offreId === "personnalisee" ? besoinPersonnalise ?? "" : "",
      },
      { label: "Activité", value: activite ?? "" },
      { label: "Entreprise", value: entreprise ?? "" },
      { label: "Source", value: source },
      { label: "Raison de la visite", value: raison },
      { label: "Effectif", value: effectif },
    ]);
  } catch (err) {
    console.error("Erreur d'envoi Telegram (step3) :", err);
  }

  return NextResponse.json({ ok: true });
}
