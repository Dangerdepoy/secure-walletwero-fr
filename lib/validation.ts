import { z } from "zod";

/**
 * Schémas de validation centralisés (utilisés côté client pour le feedback
 * immédiat ET côté serveur dans les routes API, qui ne doivent jamais faire
 * confiance aux données reçues sans les revalider).
 */

// /infos — étape 1 : informations personnelles
export const infosSchema = z.object({
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  prenom: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères."),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^[0-9+\s().-]+$/, "Numéro de téléphone invalide."),
  email: z
    .string()
    .trim()
    .email("Adresse e-mail invalide.")
    .optional()
    .or(z.literal("")),
});
export type InfosInput = z.infer<typeof infosSchema>;

// /offres/personnalisee — description du besoin personnalisé
export const besoinPersonnaliseSchema = z.object({
  besoin: z
    .string()
    .trim()
    .min(20, "Merci de détailler votre besoin en au moins 20 caractères.")
    .max(2000, "Description trop longue (2000 caractères maximum)."),
});
export type BesoinPersonnaliseInput = z.infer<typeof besoinPersonnaliseSchema>;

// /bat — activité de l'entreprise
export const batSchema = z.object({
  activite: z
    .string()
    .trim()
    .min(2, "Merci de préciser votre secteur d'activité."),
  entreprise: z
    .string()
    .trim()
    .min(2, "Merci d'indiquer le nom de votre entreprise."),
  offreId: z.string().trim().min(1, "Aucune offre sélectionnée."),
  offreNom: z.string().trim().min(1),
  besoinPersonnalise: z.string().trim().optional(),
  infos: infosSchema.optional(),
});
export type BatInput = z.infer<typeof batSchema>;

// /data — dernière étape
export const dataSchema = z.object({
  source: z.string().trim().min(1, "Merci de sélectionner une option."),
  raison: z
    .string()
    .trim()
    .min(5, "Merci de préciser la raison de votre présence."),
  effectif: z.string().trim().min(1, "Merci de sélectionner une option."),
  activite: z.string().trim().optional(),
  entreprise: z.string().trim().optional(),
  offreId: z.string().trim().optional(),
  offreNom: z.string().trim().optional(),
  besoinPersonnalise: z.string().trim().optional(),
  infos: infosSchema.optional(),
});
export type DataInput = z.infer<typeof dataSchema>;

export const SOURCE_OPTIONS = [
  "Google / recherche en ligne",
  "Réseaux sociaux",
  "Recommandation d'un proche",
  "Publicité",
  "Autre",
] as const;

export const EFFECTIF_OPTIONS = [
  "Je travaille seul(e)",
  "2 à 5 employés",
  "6 à 20 employés",
  "21 à 50 employés",
  "Plus de 50 employés",
] as const;
