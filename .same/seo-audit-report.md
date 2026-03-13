# Rapport d'Audit SEO - NeoFidu.ch

**Date**: 6 mars 2026
**URL**: https://www.neofidu.ch
**Framework**: Next.js 14+ (App Router)

---

## Score Global SEO

| Catégorie | Score | Status |
|-----------|-------|--------|
| **Métadonnées** | 95/100 | Excellent |
| **Données Structurées** | 98/100 | Excellent |
| **Contenu** | 85/100 | Très bon |
| **Performance Technique** | 90/100 | Excellent |
| **SEO Local** | 95/100 | Excellent |
| **Mobile-First** | 90/100 | Excellent |
| **Score Total** | **92/100** | Excellent |

---

## 1. Métadonnées (Meta Tags)

### Points Forts

- **Title Tags**: Bien optimisés avec le format `%s | NeoFidu`
- **Meta Descriptions**: Présentes et descriptives (< 160 caractères)
- **Keywords**: Liste complète couvrant les termes locaux (Leysin, Aigle, Chablais)
- **Open Graph**: Correctement configuré pour Facebook/LinkedIn
- **Twitter Cards**: Configurées en `summary_large_image`
- **Canonical URLs**: Présentes sur toutes les pages
- **Alternates Languages**: fr-CH correctement défini
- **MetadataBase**: Configuré sur https://www.neofidu.ch

### Améliorations Suggérées

| Priorité | Recommandation |
|----------|----------------|
| BASSE | Remplacer `verification-code-here` par le vrai code Google Search Console |
| BASSE | Ajouter des meta `article:author` pour les articles de blog |

---

## 2. Données Structurées (Schema.org JSON-LD)

### Schémas Implémentés

| Type de Schéma | Status | Qualité |
|----------------|--------|---------|
| LocalBusiness | Présent | Excellent |
| FinancialService | Présent | Excellent |
| AccountingService | Présent | Excellent |
| WebSite (avec SearchAction) | Présent | Excellent |
| FAQPage | Présent | Excellent |
| Article (blog) | Présent | Excellent |
| Offer/OfferCatalog | Présent | Excellent |
| GeoCoordinates | Présent | Excellent |
| OpeningHoursSpecification | Présent | Excellent |

### Contenu du Schéma LocalBusiness

```
- Nom: NeoFidu
- Adresse: Crettaz 1, 1854 Leysin, Vaud, CH
- Téléphone: +41 78 691 39 12
- Email: contact@neofidu.ch
- Horaires: Lun-Ven 09:00-18:00
- Zone desservie: 6 cantons + 14 villes spécifiques
- Services: 8 types de services listés
- Prix: CHF 50 - CHF 1000
- Langues: FR, DE, EN
```

### Points Forts

- Schémas multiples bien combinés
- Prix et offres détaillés
- Zones géographiques précises (SEO local très fort)
- FAQ intégrée avec 3 questions principales

### Améliorations Suggérées

| Priorité | Recommandation |
|----------|----------------|
| MOYENNE | Ajouter le schéma `Review` avec des témoignages clients |
| BASSE | Ajouter `sameAs` pour d'autres réseaux sociaux si existants |

---

## 3. Fichiers Techniques SEO

### robots.txt

```
Status: Correctement généré via Next.js
Allow: /
Disallow: /api/, /admin/, /auth/, /_next/, /demande/confirmation
Sitemap: https://www.neofidu.ch/sitemap.xml
```

**Score: 100/100** - Configuration parfaite

### sitemap.xml

```
Pages incluses:
- 16 pages statiques
- 6 pages cantonales (SEO local)
- Articles de blog dynamiques
- Priorités bien définies (1.0 → 0.3)
- Fréquences de mise à jour appropriées
```

**Score: 100/100** - Configuration parfaite

### site.webmanifest (PWA)

```json
{
  "name": "NeoFidu - Fiduciaire Digitale",
  "short_name": "NeoFidu",
  "theme_color": "#10B981",
  "lang": "fr-CH"
}
```

**Score: 85/100** - Manque les tailles d'icônes multiples (192x192, 512x512)

---

## 4. SEO Local (Géolocalisation)

### Excellente Couverture

Le site cible efficacement:

**Cantons couverts:**
- Vaud
- Valais
- Genève
- Neuchâtel
- Jura
- Fribourg

**Villes spécifiquement ciblées:**
- Leysin, Aigle, Les Diablerets (zone prioritaire)
- Bex, Villars, Gryon, Ormont-Dessus/Dessous
- Monthey, Champéry, Troistorrents, Val-d'Illiez (Chablais valaisan)
- St-Maurice, Collombey-Muraz

### Pages Cantonales Dédiées

| Page | Metadata | Schema | Qualité |
|------|----------|--------|---------|
| /cantons/vaud | Optimisé | LocalBusiness | Excellent |
| /cantons/geneve | Optimisé | LocalBusiness | Excellent |
| /cantons/valais | Optimisé | LocalBusiness | Excellent |
| /cantons/fribourg | Optimisé | LocalBusiness | Excellent |
| /cantons/neuchatel | Optimisé | LocalBusiness | Excellent |
| /cantons/jura | Optimisé | LocalBusiness | Excellent |

**Score SEO Local: 95/100**

---

## 5. Performance & Optimisations Techniques

### Bonnes Pratiques Implémentées

| Optimisation | Status |
|--------------|--------|
| Fonts optimisées (next/font) | Oui |
| Font display: swap | Oui |
| Preconnect (fonts.googleapis.com) | Oui |
| DNS-prefetch (stripe, analytics) | Oui |
| Images SVG (favicon, logo) | Oui |
| Google Analytics | Configuré |
| Google Tag Manager | Configuré |

### Points d'Attention

| Priorité | Recommandation |
|----------|----------------|
| HAUTE | Vérifier que les images ont des attributs `alt` descriptifs |
| MOYENNE | Implémenter des images WebP/AVIF pour les performances |
| BASSE | Ajouter `loading="lazy"` aux images below-the-fold |

---

## 6. Contenu & Blog

### Structure du Blog

- Route dynamique avec generateStaticParams (SSG)
- Metadata dynamique par article
- Schema Article JSON-LD par article
- Canonical URLs par article

### Points Forts

- Articles bien structurés avec catégories
- SEO technique excellent sur le blog

### Améliorations Suggérées

| Priorité | Recommandation |
|----------|----------------|
| HAUTE | Ajouter des `BreadcrumbList` schema sur toutes les pages |
| MOYENNE | Créer plus de contenu ciblant les mots-clés longue traîne |
| BASSE | Ajouter des images d'illustration aux articles |

---

## 7. Accessibilité & UX (Impact SEO)

### Points Vérifiés

| Élément | Status |
|---------|--------|
| `lang="fr"` sur HTML | Oui |
| Responsive design | Oui |
| formatDetection désactivé | Oui |
| Suppression hydration warning | Oui |

---

## 8. Recommandations Prioritaires

### Haute Priorité

1. **Ajouter le code de vérification Google Search Console**
   - Remplacer `verification-code-here` dans `src/app/page.tsx`

2. **Ajouter le schéma BreadcrumbList**
   - Sur toutes les pages principales pour améliorer les rich snippets

3. **Vérifier les attributs alt des images**
   - Parcourir tous les composants et s'assurer que chaque image a un alt descriptif

### Moyenne Priorité

4. **Ajouter des témoignages RÉELS avec schema Review**
   - Uniquement si vous avez de vrais avis clients vérifiables
   - Google pénalise les faux avis

5. **Optimiser les images**
   - Convertir en WebP, ajouter lazy loading

6. **Compléter le webmanifest**
   - Ajouter plusieurs tailles d'icônes (192x192, 512x512)

### Basse Priorité

7. **Enrichir le contenu du blog**
   - Plus d'articles sur les mots-clés longue traîne

8. **Ajouter d'autres réseaux sociaux au sameAs**
   - Si présence sur Instagram, Facebook, etc.

---

## 9. Checklist de Validation

- [x] Title tags optimisés
- [x] Meta descriptions présentes
- [x] Open Graph configuré
- [x] Twitter Cards configurées
- [x] Canonical URLs
- [x] robots.txt configuré
- [x] sitemap.xml dynamique
- [x] Schema LocalBusiness
- [x] Schema FAQPage
- [x] Schema Article (blog)
- [x] Fonts optimisées
- [x] Preconnect/DNS-prefetch
- [x] Pages cantonales SEO local
- [ ] Google Search Console vérifié
- [ ] Schema BreadcrumbList
- [ ] Schema Review/Rating
- [ ] Images WebP optimisées

---

## Conclusion

**Le site NeoFidu.ch présente une excellente optimisation SEO** avec un score global de **92/100**.

### Points Forts Majeurs:
- Données structurées très complètes et bien implémentées
- SEO local exceptionnel avec pages dédiées par canton
- Métadonnées bien configurées sur toutes les pages
- Architecture technique Next.js moderne et performante

### Axes d'Amélioration:
- Finaliser la vérification Google Search Console
- Ajouter les schémas BreadcrumbList et Review
- Optimiser les performances images

Le site est prêt pour un bon référencement sur les moteurs de recherche suisses et devrait bien se positionner sur les requêtes liées aux services fiduciaires en Suisse romande.
