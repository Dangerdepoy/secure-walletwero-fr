import type { LucideIcon } from "lucide-react";
import {
  Store,
  ShoppingCart,
  UtensilsCrossed,
  CalendarCheck,
  GraduationCap,
  Boxes,
  RefreshCcw,
  Megaphone,
  Landmark,
  Building2,
  Rocket,
} from "lucide-react";

/**
 * =====================================================================
 * CONTENU TEMPORAIRE — à valider/remplacer avec le vrai contenu métier.
 * Aucune information tarifaire ou administrative réelle n'a été inventée
 * ici : le prix est volontairement laissé en "Sur devis". Cette table
 * centralise tout ce qui est propre à chaque offre pour que les 11 pages
 * partagent un seul gabarit d'affichage (voir components/OffreDetail.tsx)
 * tout en gardant un contenu et une identité distincts.
 * =====================================================================
 */

export type Offre = {
  id: string; // "offre-1" … "offre-11", utilisé comme identifiant technique
  numero: number;
  slug: string;
  nom: string;
  tagline: string;
  description: string;
  avantages: string[];
  icon: LucideIcon;
  accent: "amber" | "teal";
};

export const OFFRES: Offre[] = [
  {
    id: "offre-1",
    numero: 1,
    slug: "vitrine-essentielle",
    nom: "Vitrine Essentielle",
    tagline: "Votre activité, visible en ligne en quelques jours",
    description:
      "Un site vitrine sobre et professionnel pour présenter votre activité, vos services et vos coordonnées. Idéal pour les indépendants et petites structures qui veulent exister en ligne rapidement.",
    avantages: [
      "Design adapté à votre secteur d'activité",
      "Optimisé pour mobile et tablette",
      "Page contact avec accès direct WhatsApp",
      "Mise en ligne rapide",
    ],
    icon: Store,
    accent: "amber",
  },
  {
    id: "offre-2",
    numero: 2,
    slug: "boutique-en-ligne",
    nom: "Boutique en Ligne",
    tagline: "Vendez vos produits 24h/24, sans boutique physique",
    description:
      "Une boutique en ligne complète pour présenter votre catalogue, gérer vos stocks et recevoir des commandes directement depuis votre site.",
    avantages: [
      "Catalogue produits illimité",
      "Gestion des commandes simplifiée",
      "Paiement à la livraison ou en ligne",
      "Suivi des ventes",
    ],
    icon: ShoppingCart,
    accent: "teal",
  },
  {
    id: "offre-3",
    numero: 3,
    slug: "restaurant-menu-digital",
    nom: "Restaurant & Menu Digital",
    tagline: "Un menu en ligne qui donne envie de commander",
    description:
      "Une présence digitale pensée pour les restaurants, snacks et services de traiteur : menu en ligne, photos des plats et prise de commande simplifiée.",
    avantages: [
      "Menu digital mis à jour facilement",
      "Galerie photo de vos plats",
      "Commande ou réservation en ligne",
      "Localisation et horaires bien visibles",
    ],
    icon: UtensilsCrossed,
    accent: "amber",
  },
  {
    id: "offre-4",
    numero: 4,
    slug: "reservation-rendez-vous",
    nom: "Réservation & Rendez-vous",
    tagline: "Laissez vos clients réserver sans vous appeler",
    description:
      "Une plateforme de prise de rendez-vous en ligne pour les salons, cliniques, cabinets et prestataires de services qui gèrent un agenda.",
    avantages: [
      "Agenda en ligne synchronisé",
      "Rappels automatiques aux clients",
      "Gestion des disponibilités",
      "Réduction des rendez-vous manqués",
    ],
    icon: CalendarCheck,
    accent: "teal",
  },
  {
    id: "offre-5",
    numero: 5,
    slug: "etablissement-formation",
    nom: "Établissement & Formation",
    tagline: "Présentez vos programmes et facilitez les inscriptions",
    description:
      "Un site pensé pour les écoles, centres de formation et instituts : présentation des filières, du corps enseignant et des modalités d'inscription.",
    avantages: [
      "Présentation claire des filières et programmes",
      "Formulaire d'inscription ou de préinscription",
      "Espace actualités et événements",
      "Mise en avant des résultats et partenariats",
    ],
    icon: GraduationCap,
    accent: "amber",
  },
  {
    id: "offre-6",
    numero: 6,
    slug: "application-metier",
    nom: "Application Web Métier",
    tagline: "Un outil sur mesure pour vos process internes",
    description:
      "Une application web adaptée à la gestion interne de votre entreprise : suivi d'activité, tableaux de bord ou outils métier spécifiques.",
    avantages: [
      "Fonctionnalités adaptées à vos process",
      "Accès sécurisé par utilisateur",
      "Tableaux de bord de suivi",
      "Évolutif selon vos besoins",
    ],
    icon: Boxes,
    accent: "teal",
  },
  {
    id: "offre-7",
    numero: 7,
    slug: "refonte-modernisation",
    nom: "Refonte & Modernisation",
    tagline: "Votre site actuel mérite un coup de neuf",
    description:
      "La modernisation d'un site existant : nouveau design, meilleures performances, et mise aux standards actuels du web.",
    avantages: [
      "Audit du site actuel inclus",
      "Nouveau design cohérent avec votre image",
      "Amélioration de la vitesse de chargement",
      "Migration du contenu existant",
    ],
    icon: RefreshCcw,
    accent: "amber",
  },
  {
    id: "offre-8",
    numero: 8,
    slug: "visibilite-reseaux",
    nom: "Pack Visibilité",
    tagline: "Site web et présence sociale, coordonnés",
    description:
      "Un site web accompagné d'une mise en cohérence de vos réseaux sociaux pour une image de marque homogène sur tous vos canaux.",
    avantages: [
      "Site web professionnel",
      "Habillage cohérent des réseaux sociaux",
      "Conseils de publication de base",
      "Liens croisés site / réseaux",
    ],
    icon: Megaphone,
    accent: "teal",
  },
  {
    id: "offre-9",
    numero: 9,
    slug: "institution-ong",
    nom: "Institution & ONG",
    tagline: "Communiquez votre mission avec clarté",
    description:
      "Un site institutionnel adapté aux associations, ONG et organismes publics : présentation de la mission, des projets et des moyens de contact ou de don.",
    avantages: [
      "Présentation de la mission et des projets",
      "Espace actualités et rapports",
      "Formulaire de contact ou d'adhésion",
      "Mise en avant des partenaires",
    ],
    icon: Landmark,
    accent: "amber",
  },
  {
    id: "offre-10",
    numero: 10,
    slug: "immobilier-annonces",
    nom: "Immobilier & Annonces",
    tagline: "Un catalogue de biens facile à parcourir",
    description:
      "Une plateforme pour publier et gérer des annonces immobilières ou tout autre catalogue d'annonces avec recherche et filtres.",
    avantages: [
      "Publication d'annonces illimitée",
      "Filtres de recherche par critère",
      "Fiches détaillées avec galerie photo",
      "Contact direct depuis chaque annonce",
    ],
    icon: Building2,
    accent: "teal",
  },
  {
    id: "offre-11",
    numero: 11,
    slug: "pack-startup-mvp",
    nom: "Pack Startup / MVP",
    tagline: "Testez votre idée avec un premier produit digital",
    description:
      "Un accompagnement rapide pour transformer une idée de projet en premier produit web fonctionnel, pensé pour valider votre marché avant d'investir davantage.",
    avantages: [
      "Cadrage rapide du besoin",
      "Premier produit fonctionnel",
      "Priorisation des fonctionnalités essentielles",
      "Base technique évolutive",
    ],
    icon: Rocket,
    accent: "amber",
  },
];

export function getOffreById(id: string): Offre | undefined {
  return OFFRES.find((o) => o.id === id);
}
