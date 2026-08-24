"use client";

/**
 * Le parcours /infos → /portail → /offres/* → /bat → /data traverse
 * plusieurs pages : on fait circuler les données saisies via sessionStorage
 * (propre à l'onglet, effacé à la fermeture). Rien de sensible n'y transite
 * (pas de mot de passe, pas de moyen de paiement) : uniquement les
 * informations que l'utilisateur a lui-même saisies dans les formulaires,
 * pour éviter de les lui redemander à chaque étape.
 */

const PREFIX = "weroecole:";

export type InfosPersonnelles = {
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
};

export type OffreChoisie = {
  offreId: string; // "offre-1" … "offre-11" ou "personnalisee"
  offreNom: string;
  besoinPersonnalise?: string;
};

export type ActiviteEntreprise = {
  activite: string;
  entreprise: string;
};

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export const funnelStorage = {
  getInfos: () => readJSON<InfosPersonnelles>("infos"),
  setInfos: (v: InfosPersonnelles) => writeJSON("infos", v),

  getOffre: () => readJSON<OffreChoisie>("offre"),
  setOffre: (v: OffreChoisie) => writeJSON("offre", v),

  getActivite: () => readJSON<ActiviteEntreprise>("activite"),
  setActivite: (v: ActiviteEntreprise) => writeJSON("activite", v),

  clearAll: () => {
    if (typeof window === "undefined") return;
    ["infos", "offre", "activite"].forEach((k) =>
      window.sessionStorage.removeItem(PREFIX + k)
    );
  },
};
