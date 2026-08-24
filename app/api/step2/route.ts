import { NextResponse } from "next/server";
import { batSchema } from "@/lib/validation";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

/**
 * Étape 2 : réception de l'offre choisie (ou du besoin personnalisé) ainsi
 * que de l'activité et du nom de l'entreprise, saisis sur /bat.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const result = batSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Données invalides.", issues: result.error.issues },
      { status: 400 }
    );
  }

  const { activite, entreprise, offreId, offreNom, besoinPersonnalise, infos } =
    result.data;

  try {
    await sendTelegramMessage("Nouveau visiteur — Étape 2/4 (offre & entreprise)", [
      { label: "Nom complet", value: infos ? `${infos.prenom} ${infos.nom}` : "" },
      { label: "Téléphone", value: infos?.telephone ?? "" },
      { label: "Offre choisie", value: offreNom },
      {
        label: "Besoin personnalisé",
        value:
          offreId === "personnalisee" ? besoinPersonnalise ?? "" : "",
      },
      { label: "Activité", value: activite },
      { label: "Entreprise", value: entreprise },
    ]);
  } catch (err) {
    console.error("Erreur d'envoi Telegram (step2) :", err);
  }

  return NextResponse.json({ ok: true });
}
