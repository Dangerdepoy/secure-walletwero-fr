import type { Metadata } from "next";
import OffreDetail from "@/components/OffreDetail";
import { getOffreById } from "@/lib/offres";

const OFFRE_ID = "offre-7";

export const metadata: Metadata = {
  title: `${getOffreById(OFFRE_ID)?.nom ?? "Offre"} — WEROECOLE`,
};

export default function Page() {
  return <OffreDetail offreId={OFFRE_ID} />;
}
