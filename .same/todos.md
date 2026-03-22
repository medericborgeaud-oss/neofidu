# NeoFidu - Tâches et avancement

## ✅ Tâches terminées

### SEO & Technique
- [x] Sitemap.xml créé et mis à jour avec les vraies pages
- [x] Robots.txt amélioré avec règles disallow
- [x] Meta tags (title, description, OpenGraph) sur toutes les pages
- [x] Suppression des blocs `twitter:` de tous les layouts/pages du site (23 fichiers)
- [x] Ajout og:image sur /simulateur (layout.tsx)
- [x] Dates des articles de blog mises à jour pour 2026
- [x] Protection anti-spam sur tous les formulaires (honeypot + rate limiting)
- [x] Headers de sécurité (HSTS, X-Frame-Options, etc.)
- [x] Redirection www vers non-www
- [x] **Lien quasi-résident/impôt à la source ajouté sur la page d'accueil**
- [x] **Correction formulaire: canton et résidence à l'étranger mutuellement exclusifs**
- [x] **Fix liens /simulateur-retraite dans Header.tsx et simulateur/page.tsx**

### Formulaire fiscal
- [x] Formulaire multi-étapes complet
- [x] Upload de documents vers Cloudinary
- [x] Calcul de prix dynamique
- [x] Sauvegarde locale (localStorage)
- [x] **Canton caché si "résidence à l'étranger" sélectionné**
- [x] **Canton demandé dans la section Suisse de l'étranger avec explication**

### Blog & Images
- [x] Toutes les images du blog affichées correctement (prop `unoptimized`)
- [x] Recadrage des photos des cartes blog (object-[center_20%])
- [x] Recadrage de la photo hero d'article (object-[center_30%])
- [x] Images manquantes ajoutées aux articles 23 et 24

### Correction d'encodage
- [x] Accents corrigés sur /demande (22 séquences)
- [x] Accents corrigés sur /simulateur/carte-impots (15 séquences)
- [x] Accents corrigés sur /simulateur/impots/TaxSimulatorPageClient (2 séquences)

## 🔄 En cours

(Aucune tâche en cours)

## 📋 Tâches à faire

### Priorité haute
- [ ] Configurer le domaine neofidu.ch sur Vercel
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Tester la protection anti-spam avec des soumissions réelles

### Fonctionnalités
- [ ] Ajouter upload de documents au formulaire gérance immobilière
- [ ] Ajouter filtre par type de demande dans le tableau de bord admin

### Améliorations futures
- [ ] Intégration reCAPTCHA v3 (optionnel)
- [ ] Notifications push pour les nouvelles demandes
- [ ] Export des demandes en CSV/Excel

---
*Dernière mise à jour: 22 mars 2026*
