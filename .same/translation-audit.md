# État des lieux - Traductions anglaises NeoFidu

**Date:** 10 mars 2026

## Résumé

| Catégorie | Total | Traduit | Non traduit |
|-----------|-------|---------|-------------|
| Pages principales | 30 | 5 | 25 |
| Composants | 15 | 15 | 0 |

---

## ✅ Pages TRADUITES en anglais

### Pages avec support multilingue complet

| Page | Fichier | Notes |
|------|---------|-------|
| Accueil | `src/app/page.tsx` | Via composants traduits (Hero, Services, etc.) |
| Suivi de demande | `src/app/suivi/page.tsx` | ✅ Traduction complète |
| FAQ | `src/app/faq/page.tsx` | ✅ Traduction complète |
| Formulaire demande | `src/app/demande/page.tsx` | Via composants traduits |
| Prolongation | `src/app/demande/prolongation/page.tsx` | ✅ Traduction partielle |

### Composants traduits (utilisés sur plusieurs pages)

| Composant | Fichier |
|-----------|---------|
| Header | `src/components/Header.tsx` |
| Footer | `src/components/Footer.tsx` |
| Hero | `src/components/Hero.tsx` |
| Services | `src/components/Services.tsx` |
| Pricing | `src/components/Pricing.tsx` |
| About | `src/components/About.tsx` |
| Contact | `src/components/Contact.tsx` |
| Testimonials | `src/components/Testimonials.tsx` |
| TaxRequestForm | `src/components/TaxRequestForm.tsx` |
| AccountingRequestForm | `src/components/AccountingRequestForm.tsx` |
| PropertyRequestForm | `src/components/PropertyRequestForm.tsx` |
| SwissMapBanner | `src/components/SwissMapBanner.tsx` |
| Simulators | `src/components/Simulators.tsx` |
| Cantons | `src/components/Cantons.tsx` |
| SecurityBadge | `src/components/SecurityBadge.tsx` |

---

## ❌ Pages NON TRADUITES (français uniquement)

### Pages légales (priorité haute pour conformité)

| Page | Fichier | Complexité |
|------|---------|------------|
| Mentions légales | `src/app/mentions-legales/page.tsx` | Moyenne |
| Politique de confidentialité | `src/app/politique-confidentialite/page.tsx` | Haute |
| Conditions générales | `src/app/conditions-generales/page.tsx` | Haute |

### Blog (priorité moyenne - contenu SEO)

| Page | Fichier | Complexité |
|------|---------|------------|
| Liste des articles | `src/app/blog/page.tsx` | Faible |
| Article dynamique | `src/app/blog/[slug]/page.tsx` | Haute (15+ articles) |

### Pages Cantons (priorité moyenne - SEO local)

| Page | Fichier | Complexité |
|------|---------|------------|
| Index cantons | `src/app/cantons/page.tsx` | Faible |
| Canton Vaud | `src/app/cantons/vaud/page.tsx` | Moyenne |
| Canton Genève | `src/app/cantons/geneve/page.tsx` | Moyenne |
| Canton Valais | `src/app/cantons/valais/page.tsx` | Moyenne |
| Canton Fribourg | `src/app/cantons/fribourg/page.tsx` | Moyenne |
| Canton Neuchâtel | `src/app/cantons/neuchatel/page.tsx` | Moyenne |
| Canton Jura | `src/app/cantons/jura/page.tsx` | Moyenne |

### Simulateurs (priorité haute - outils populaires)

| Page | Fichier | Complexité |
|------|---------|------------|
| Index simulateurs | `src/app/simulateur/page.tsx` | Faible |
| Simulateur impôts | `src/app/simulateur/impots/page.tsx` | Haute |
| Carte interactive | `src/app/simulateur/carte-impots/page.tsx` | Haute |
| Simulateur 3ème pilier | `src/app/simulateur/3eme-pilier/page.tsx` | Moyenne |
| Valeur locative | `src/app/simulateur/valeur-locative/page.tsx` | Moyenne |
| Gain immobilier | `src/app/simulateur/gain-immobilier/page.tsx` | Moyenne |

### Guides et autres pages

| Page | Fichier | Complexité |
|------|---------|------------|
| Guide déductions fiscales | `src/app/guide/deductions-fiscales/page.tsx` | Haute |
| Suisses de l'étranger | `src/app/suisses-etranger/page.tsx` | Moyenne |
| Confirmation paiement | `src/app/demande/confirmation/page.tsx` | Faible |

### Pages admin/internes (priorité basse)

| Page | Fichier | Notes |
|------|---------|-------|
| Admin dashboard | `src/app/admin/page.tsx` | Usage interne uniquement |
| Admin duplicates | `src/app/admin/duplicates/page.tsx` | Usage interne uniquement |
| Auth | `src/app/auth/page.tsx` | Usage interne uniquement |
| Banners | `src/app/banners/page.tsx` | Outils marketing |
| Banner Chatimont | `src/app/banners/chatimont/page.tsx` | Outils marketing |

---

## Recommandations par ordre de priorité

### 🔴 Priorité 1 - Critique (conformité légale)
1. **Politique de confidentialité** - Obligatoire pour utilisateurs anglophones
2. **Conditions générales** - Obligatoire pour utilisateurs anglophones
3. **Mentions légales** - Important pour la transparence

### 🟠 Priorité 2 - Haute (fonctionnalités principales)
4. **Simulateur d'impôts** - Outil très utilisé
5. **Carte interactive des impôts** - Outil populaire
6. **Page confirmation** - Parcours utilisateur complet
7. **Suisses de l'étranger** - Cible internationale

### 🟡 Priorité 3 - Moyenne (SEO et contenu)
8. **Guide déductions fiscales** - Contenu éducatif
9. **Pages cantons** (6 pages) - SEO local
10. **Simulateurs restants** (3 pages) - Outils complémentaires

### 🟢 Priorité 4 - Basse
11. **Blog** - Contenu en français ciblant marché suisse romand
12. **Pages admin** - Usage interne uniquement

---

## Estimation temps de travail

| Priorité | Pages | Temps estimé |
|----------|-------|--------------|
| Priorité 1 | 3 pages | ~4-6 heures |
| Priorité 2 | 4 pages | ~6-8 heures |
| Priorité 3 | 10 pages | ~8-12 heures |
| Priorité 4 | 8 pages | ~6-8 heures |
| **Total** | **25 pages** | **~24-34 heures** |
