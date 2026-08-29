WIFI CONNECT — UI/UX DESIGN SYSTEM & INTERFACE DIRECTION

OBJECTIF

Concevoir l’interface de WiFi Connect comme un SaaS moderne, premium, minimaliste et extrêmement cohérent.

L’interface doit s’inspirer des principes de conception que l’on retrouve dans les produits modernes comme Vercel, Cloudflare, Linear, Stripe, GitHub et Raycast, sans copier leur identité visuelle.

L’objectif est de créer une identité propre à WiFi Connect avec :

* une hiérarchie visuelle extrêmement claire
* une interface minimaliste
* beaucoup d’espace respirable
* une grille rigoureuse
* une navigation intuitive
* des composants cohérents
* des interactions rapides
* des animations discrètes
* une excellente lisibilité des données
* une sensation de produit SaaS mature et professionnel

⸻

1. PHILOSOPHIE GÉNÉRALE

Appliquer la règle :

Less visual noise, more hierarchy.

Ne jamais ajouter un élément simplement parce qu’il est possible de l’ajouter.

Chaque élément de l’interface doit avoir une fonction claire.

Privilégier :

* simplicité
* hiérarchie
* contraste
* alignement
* espace
* cohérence
* rapidité de compréhension

Éviter :

* gradients excessifs
* ombres lourdes
* cartes trop décorées
* couleurs multiples inutiles
* bordures épaisses
* icônes surdimensionnées
* animations excessives
* informations affichées simultanément sans nécessité

⸻

2. APP SHELL

Toutes les pages authentifiées doivent utiliser une structure commune :

┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar                                             │
│         ├────────────────────────────────────────────────────┤
│         │                                                    │
│         │ Main Content                                       │
│         │                                                    │
│         │                                                    │
│         │                                                    │
└─────────┴────────────────────────────────────────────────────┘

La structure doit rester cohérente sur toutes les pages.

Ne jamais créer une nouvelle structure de navigation différente pour une page individuelle.

⸻

3. SIDEBAR

Créer une sidebar moderne, compacte et facilement identifiable.

Structure recommandée :

WIFI CONNECT
OVERVIEW
  Dashboard
NETWORK
  Routers
  Access Points
  Connections
SALES
  Tickets
  Packages
  Transactions
MANAGEMENT
  Users
  Operators
SYSTEM
  Settings
  Logs

Les catégories doivent être visuellement discrètes.

Les éléments de navigation doivent comporter :

* icône
* label
* état actif
* état hover
* état disabled si nécessaire

L’élément actif doit être immédiatement identifiable sans devenir visuellement agressif.

Prévoir :

* sidebar desktop
* sidebar collapsée
* navigation mobile avec drawer
* comportement responsive

⸻

4. TOPBAR

La topbar doit rester très épurée.

Elle peut contenir :

À gauche :

* breadcrumb
* titre contextuel si nécessaire

À droite :

* recherche
* aide
* notifications
* statut système
* profil utilisateur

Éviter de surcharger la topbar.

⸻

5. GRID SYSTEM

Utiliser une grille cohérente sur l’ensemble du produit.

Privilégier une logique de grille 12 colonnes pour les grandes interfaces.

Les éléments doivent toujours respecter :

* mêmes marges
* mêmes espacements
* mêmes alignements
* mêmes largeurs de contenu
* mêmes règles responsive

Les cartes, tableaux, graphiques et sections doivent être alignés sur une même grille invisible.

Aucun élément ne doit sembler placé arbitrairement.

⸻

6. SPACING SYSTEM

Créer un système d’espacement cohérent.

Utiliser une échelle basée sur des multiples réguliers, par exemple :

4px
8px
12px
16px
24px
32px
40px
48px
64px

Ne pas inventer des espacements différents pour chaque composant.

Les espacements doivent être prévisibles et réutilisables.

⸻

7. TYPOGRAPHY

Utiliser une police moderne et très lisible.

Police principale recommandée :

Inter

Alternative possible :

Geist

Pour les données techniques :

JetBrains Mono

Utiliser JetBrains Mono uniquement pour :

* adresses IP
* MAC addresses
* codes tickets
* identifiants
* clés
* logs
* informations réseau
* données techniques

Hiérarchie :

H1        32–40px / 700
H2        24–30px / 600–700
H3        18–22px / 600
Body      14–16px / 400
Small     12–13px / 400–500
Label     13–14px / 500–600
Button    13–14px / 500–600
KPI       28–36px / 600–700

La hiérarchie doit principalement venir de :

* taille
* poids
* contraste
* espacement

Ne pas multiplier les polices.

⸻

8. COLOR SYSTEM

La majorité de l’interface doit rester neutre.

Répartition visuelle approximative :

80–90% → couleurs neutres
5–10%  → couleur principale WiFi Connect
1–5%   → couleurs fonctionnelles

Prévoir des tokens pour :

* background
* surface
* elevated surface
* border
* primary text
* secondary text
* muted text
* primary
* success
* warning
* error
* info

La couleur principale doit servir principalement à :

* actions principales
* éléments actifs
* informations importantes
* liens
* indicateurs sélectionnés

Ne pas colorer inutilement toutes les cartes.

⸻

9. CARDS

Les cartes doivent être simples et légères.

Privilégier :

* background clair
* bordure fine
* radius modéré
* ombre très légère ou inexistante
* padding cohérent

Une carte doit communiquer son information rapidement.

Exemple :

Revenue
12 450 FCFA
+12.4%
Compared with last month

Ne pas transformer chaque information en énorme bloc graphique.

⸻

10. KPI / STATISTICS

Les statistiques importantes doivent être immédiatement compréhensibles.

Chaque KPI peut contenir :

Label
Valeur principale
Variation
Contexte

Exemple :

Active Routers
24
+3 this month

Utiliser la couleur uniquement lorsqu’elle apporte une information.

⸻

11. TABLES

Les tableaux doivent privilégier la lisibilité.

Structure :

┌──────────────────────────────────────────────────────────┐
│ Search     Filter                  Export    + Create     │
├──────────────────────────────────────────────────────────┤
│ Router │ Status │ Clients │ Traffic │ Last seen │ Action │
├──────────────────────────────────────────────────────────┤
│ RB01   │ ● Online │ 42    │ 2.4 GB  │ 2 min ago │ •••   │
│ RB02   │ ● Online │ 31    │ 1.8 GB  │ 5 min ago │ •••   │
└──────────────────────────────────────────────────────────┘

Prévoir :

* recherche
* filtres
* tri
* pagination
* sélection multiple
* actions contextuelles
* état loading
* état empty
* état error

⸻

12. STATUS SYSTEM

WiFi Connect étant une plateforme réseau, les statuts doivent être particulièrement clairs.

Créer un système cohérent :

● Online
○ Offline
◌ Connecting
⚠ Warning
× Error

Utiliser également :

* badge
* texte
* icône

Ne jamais dépendre uniquement de la couleur pour communiquer un état.

⸻

13. BUTTON SYSTEM

Limiter le nombre de variantes.

Primary

Action principale.

Secondary

Action secondaire.

Ghost

Action légère.

Destructive

Action dangereuse.

Chaque bouton doit avoir :

Default
Hover
Active
Focus
Disabled
Loading

Éviter plusieurs boutons Primary concurrents dans la même zone.

⸻

14. FORMS

Les formulaires doivent être simples et extrêmement lisibles.

Chaque champ doit avoir :

* label
* input
* placeholder si nécessaire
* description si nécessaire
* état focus
* état error
* état disabled

Les erreurs doivent être affichées directement au niveau du champ.

Éviter les messages d’erreur génériques uniquement affichés en haut de page.

⸻

15. MODALS & DRAWERS

Utiliser les modals uniquement lorsqu’une action nécessite de rester dans le contexte actuel.

Pour des informations plus complexes, privilégier les drawers ou pages dédiées.

Les modals doivent :

* apparaître rapidement
* avoir une hiérarchie claire
* contenir une action principale
* permettre une fermeture évidente
* gérer correctement le clavier et le focus

⸻

16. SEARCH

Prévoir une recherche globale moderne.

Elle doit permettre de retrouver rapidement :

* routeurs
* utilisateurs
* tickets
* transactions
* packages
* paramètres

Prévoir éventuellement un raccourci clavier :

⌘ K

ou

Ctrl K

Créer une expérience de type command palette lorsque cela apporte réellement de la valeur.

⸻

17. EMPTY STATES

Ne jamais laisser une page vide sans explication.

Exemple :

No routers yet
Connect your first MikroTik router
to start managing your network.
[ + Add router ]

L’empty state doit expliquer :

1. ce qui manque
2. pourquoi
3. quelle action effectuer

⸻

18. LOADING STATES

Éviter les écrans blancs pendant les chargements.

Utiliser :

* skeleton loaders
* loading indicators
* placeholders

Les skeletons doivent respecter la structure réelle du contenu.

⸻

19. FEEDBACK & NOTIFICATIONS

Créer un système de feedback cohérent :

* success toast
* error toast
* warning
* info
* confirmation

Exemple :

✓ Router connected successfully

Les notifications doivent être courtes et compréhensibles.

⸻

20. PROGRESSIVE DISCLOSURE

Ne pas afficher toutes les données techniques immédiatement.

Afficher d’abord l’information essentielle.

Exemple :

MikroTik RB01
● Online
42 clients
2.4 GB traffic
[ View details ]

Puis afficher dans la page détaillée :

CPU
Memory
Uptime
Clients
Traffic
Interfaces
Tickets
Logs
Configuration

Cette règle est particulièrement importante pour éviter de rendre WiFi Connect trop complexe.

⸻

21. ICONOGRAPHIE

Utiliser une seule famille d’icônes cohérente.

Privilégier des icônes :

* simples
* outline
* lisibles
* de taille homogène

Ne pas mélanger plusieurs styles d’icônes.

Les icônes doivent accompagner le contenu, pas le remplacer systématiquement.

⸻

22. BORDER RADIUS

Utiliser un système limité de radius.

Par exemple :

Small   → 6px
Medium  → 8px
Large   → 12px
XL      → 16px

Ne pas utiliser des radius différents arbitrairement.

⸻

23. SHADOWS

Les ombres doivent être extrêmement discrètes.

Priorité :

border
↓
subtle elevation
↓
shadow

Ne pas donner à chaque élément une grosse ombre.

L’interface doit rester plate, propre et moderne.

⸻

24. MOTION DESIGN

Les animations doivent être rapides et fonctionnelles.

Utiliser principalement :

* fade
* slide
* scale léger
* transitions de couleur
* transitions de position

Durées recommandées :

100–150ms → micro interactions
150–250ms → menus / dropdowns
200–300ms → modals / drawers

Éviter les animations longues.

L’animation doit donner une sensation de rapidité, jamais ralentir l’utilisateur.

⸻

25. RESPONSIVE DESIGN

L’interface doit être pensée Desktop → Tablet → Mobile.

Sur mobile :

* sidebar devient drawer
* topbar simplifiée
* tables deviennent scrollables ou cartes
* grilles deviennent verticales
* actions importantes restent accessibles
* boutons suffisamment grands pour le tactile

Ne pas simplement réduire la version desktop.

La version mobile doit avoir sa propre logique UX.

⸻

26. ACCESSIBILITY

Respecter les bonnes pratiques d’accessibilité :

* contraste suffisant
* navigation clavier
* focus visible
* labels accessibles
* zones tactiles suffisantes
* ne jamais utiliser uniquement la couleur pour communiquer une information
* états d’erreur compréhensibles

⸻

27. DASHBOARD WIFI CONNECT

Le dashboard doit immédiatement répondre à :

Comment va mon infrastructure ?

Combien de routeurs sont actifs ?

Combien de clients sont connectés ?

Combien de tickets ont été vendus ?

Quel est le chiffre d’affaires ?

Y a-t-il un problème actuellement ?

Structure recommandée :

Dashboard
Good afternoon, [Name]
Here's what's happening with your network.
[ + Add router ]
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Routers    │ │ Clients    │ │ Tickets    │ │ Revenue    │
│ 24         │ │ 438        │ │ 1,284      │ │ 845,000    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
┌────────────────────────────────────┐
│ Network activity                   │
│                                    │
│              Graph                 │
│                                    │
└────────────────────────────────────┘
┌───────────────────────┐ ┌───────────────────────┐
│ Router status         │ │ Recent activity       │
│                       │ │                       │
│ ● RB01 Online         │ │ Ticket sold           │
│ ● RB02 Online         │ │ Router connected      │
│ ○ RB03 Offline        │ │ Payment received      │
└───────────────────────┘ └───────────────────────┘

Cette structure doit rester adaptable selon les fonctionnalités réellement disponibles.

⸻

28. DESIGN TOKENS

Centraliser les décisions visuelles dans des variables/tokens.

Créer des tokens pour :

--background
--surface
--surface-muted
--border
--text
--text-secondary
--text-muted
--primary
--success
--warning
--error
--radius-sm
--radius-md
--radius-lg
--space-1
--space-2
--space-3
--space-4
--space-6
--space-8
--font-sans
--font-mono

Ne pas disperser les valeurs visuelles directement dans les composants lorsque cela peut être évité.

⸻

29. COHÉRENCE GLOBALE

Avant de créer un nouveau composant, vérifier si un composant existant peut être réutilisé.

Ne pas créer :

ButtonA
ButtonB
ButtonC
ButtonD

si une seule architecture de Button avec variantes suffit.

Même principe pour :

* Cards
* Inputs
* Tables
* Badges
* Dropdowns
* Modals
* Toasts
* Navigation
* Tabs

Créer un véritable système de composants réutilisables.

⸻

30. RÈGLE DE QUALITÉ VISUELLE

À chaque nouvelle page, vérifier :

Alignment

Tout est-il correctement aligné ?

Hierarchy

Est-il immédiatement évident de savoir quoi regarder ?

Spacing

L’interface respire-t-elle ?

Consistency

Les composants suivent-ils les mêmes règles ?

Contrast

Les informations importantes ressortent-elles ?

Simplicity

Peut-on supprimer quelque chose sans perdre d’information ?

Interaction

Chaque action possède-t-elle un feedback ?

Responsive

La page fonctionne-t-elle correctement sur mobile ?

⸻

31. RÈGLE FINALE

Ne jamais concevoir les pages individuellement comme des designs isolés.

WiFi Connect doit être perçu comme un seul produit cohérent.

Chaque nouvelle fonctionnalité doit automatiquement utiliser :

* le même système de navigation
* la même typographie
* les mêmes espacements
* la même grille
* les mêmes couleurs
* les mêmes boutons
* les mêmes cartes
* les mêmes états
* les mêmes animations
* les mêmes règles responsive

Le résultat recherché est une interface qui paraît :

simple au premier regard,

puissante lorsqu’on l’utilise,

cohérente lorsqu’on explore plusieurs pages,

et professionnelle à chaque interaction.

Ne pas chercher à rendre l’interface spectaculaire.

Chercher à la rendre évidente.
32. PIXEL-PERFECT — FINITION, POLISH & DÉSIRABILITÉ

WiFi Connect ne doit pas simplement être fonctionnel ou “joli”.

L’interface doit donner l’impression qu’elle a été longuement travaillée, ajustée et polie dans les moindres détails.

Le résultat final doit transmettre cette sensation :

Tout est à sa place. Rien n’est de trop. Rien ne semble inachevé.

L’utilisateur doit pouvoir regarder une page et ressentir immédiatement une impression de :

* qualité
* précision
* équilibre
* élégance
* simplicité
* maîtrise
* modernité
* désirabilité

L’interface doit être visuellement addictive dans le bon sens : les éléments doivent donner naturellement envie d’explorer, de cliquer, d’ouvrir et d’interagir.

⸻

32.1 — CHAQUE PIXEL DOIT AVOIR UNE RAISON

Ne jamais placer un élément uniquement pour remplir un espace.

Chaque élément doit être positionné en fonction :

* des autres éléments
* de la grille
* de la hiérarchie
* du rythme visuel
* de la lisibilité
* de l’importance de l’information

Les alignements doivent être extrêmement précis.

Les marges doivent sembler naturelles.

Les espacements doivent créer un rythme visuel régulier.

⸻

32.2 — PERFECTION VISUELLE

Avant de considérer une page comme terminée, vérifier :

* alignement horizontal
* alignement vertical
* espacements
* proportions
* taille des composants
* hauteur des boutons
* hauteur des inputs
* largeur des cartes
* position des icônes
* position des labels
* contraste
* densité d’information
* cohérence des bordures
* cohérence des radius
* cohérence des ombres
* hiérarchie typographique

Aucun composant ne doit donner l’impression d’avoir été ajouté après coup.

⸻

32.3 — VISUAL RHYTHM

Créer un rythme visuel constant.

L’utilisateur doit naturellement comprendre :

Titre
↓
Contexte
↓
Action
↓
Information principale
↓
Information secondaire

Les sections doivent avoir suffisamment d’espace pour respirer.

Ne jamais créer une interface où tout est collé.

Mais ne pas non plus créer des espaces artificiellement gigantesques.

Chercher l’équilibre parfait entre densité et respiration.

⸻

32.4 — VISUAL HIERARCHY

Chaque écran doit avoir un point focal.

L’utilisateur doit savoir en moins d’une seconde :

1. Où suis-je ?
2. Que puis-je faire ?
3. Quelle information est importante ?
4. Quelle est l’action principale ?

Utiliser :

* taille
* poids
* contraste
* position
* espace
* couleur

pour créer cette hiérarchie.

Ne pas utiliser simplement des couleurs vives pour attirer l’attention.

⸻

32.5 — BEAUTÉ PAR LA SIMPLICITÉ

La sophistication doit venir de la précision et non de la décoration.

Éviter :

* effets inutiles
* gradients partout
* grosses ombres
* bordures épaisses
* animations spectaculaires
* couleurs multiples
* éléments décoratifs sans fonction

Privilégier :

* surfaces propres
* bordures subtiles
* typographie impeccable
* espaces parfaitement maîtrisés
* icônes cohérentes
* micro-interactions
* détails raffinés

La simplicité doit sembler difficile à reproduire.

⸻

32.6 — INTERACTION DESIGN

Chaque élément interactif doit donner envie d’être utilisé.

Les boutons doivent avoir une réponse visuelle immédiate :

Default
   ↓
Hover
   ↓
Pressed
   ↓
Loading
   ↓
Success

Les transitions doivent être suffisamment subtiles pour être presque imperceptibles, mais suffisamment présentes pour donner une sensation de qualité.

Exemple :

Hover button
→ légère variation de surface
→ transition 150ms
Open dropdown
→ fade + slight scale
→ 150–200ms
Open modal
→ background fade
→ modal slight scale
→ 200–250ms

⸻

32.7 — MICRO-INTERACTIONS

Ajouter des micro-interactions là où elles améliorent réellement l’expérience.

Exemples WiFi Connect :

Connexion d’un routeur

Connecting...
     ↓
● Connected

avec une transition élégante.

Génération d’un ticket

Generate ticket
     ↓
Generating...
     ↓
✓ Ticket created

Copie d’un code

Copy
 ↓
✓ Copied

Activation d’un service

OFF
 ↓
ON

Les interactions doivent donner une impression de réactivité et de finition.

⸻

32.8 — BEAUTIFUL EMPTY STATES

Même les états vides doivent être travaillés.

Ne jamais afficher simplement :

No data

Créer un état vide élégant et utile :

No routers connected
Connect your first router
to start managing your network.
[ + Add router ]

L’état vide doit rester minimaliste, mais visuellement soigné.

⸻

32.9 — BEAUTIFUL LOADING STATES

Les chargements doivent conserver la structure de la page.

Utiliser des skeletons élégants et cohérents avec le design.

Éviter les écrans blancs ou les loaders génériques lorsque cela peut être évité.

Le chargement doit donner l’impression que l’interface est déjà présente et qu’elle se remplit progressivement.

⸻

32.10 — MICRO-ALIGNMENTS

Accorder une attention particulière aux détails qui semblent insignifiants mais qui changent fortement la perception de qualité :

* icône parfaitement centrée dans un bouton
* texte verticalement centré
* badge correctement aligné avec le texte
* hauteur identique des boutons
* padding identique entre composants
* alignement des chiffres
* alignement des colonnes
* espacement entre icône et label
* position exacte des menus
* distance entre titre et description

Ces détails doivent être traités comme des éléments de design importants.

⸻

32.11 — NO RANDOM UI

Ne jamais produire une interface qui ressemble à :

“Une collection de composants UI posés les uns à côté des autres.”

Les composants doivent former une composition visuelle cohérente.

Chaque page doit avoir :

* une composition
* un rythme
* une hiérarchie
* un point focal
* une logique visuelle

⸻

32.12 — PREMIUM WITHOUT OVERDESIGN

WiFi Connect doit donner une impression de produit premium sans tomber dans le “design flashy”.

Le premium doit venir de :

précision + espace + typographie + cohérence + interactions + détails.

Pas de :

gradients + glow + énormes animations + couleurs partout.

⸻

32.13 — FINAL POLISH PASS

Avant de considérer une fonctionnalité terminée, effectuer obligatoirement un UI Polish Pass.

Vérifier visuellement :

□ Alignements
□ Espacements
□ Typographie
□ Contrastes
□ Icônes
□ Radius
□ Borders
□ Shadows
□ Hover states
□ Active states
□ Focus states
□ Loading states
□ Empty states
□ Error states
□ Success states
□ Responsive
□ Mobile
□ Animations
□ Micro-interactions
□ Cohérence avec les autres pages

Si un élément semble :

* trop grand
* trop petit
* trop coloré
* trop proche
* trop éloigné
* trop lourd
* trop vide
* mal aligné
* visuellement inutile

→ le corriger.

⸻

PRINCIPLE FINAL

La qualité de WiFi Connect ne doit pas seulement se mesurer au nombre de fonctionnalités.

Elle doit également se ressentir dans chaque interaction.

L’objectif est que l’utilisateur puisse parcourir l’application et penser :

“C’est simple.”

Puis après quelques secondes :

“Mais en fait, tout est extrêmement bien pensé.”

Et finalement :

“Tout est exactement là où ça doit être.”

Do not stop at functional.
Do not stop at clean.
Do not stop at beautiful.

Make it feel finished.

Make it feel intentional.

Make it feel effortless.

Make every interaction satisfying.