# NeoFidu - Todos

## Codes de contrôle par canton - Mise à jour 26/02/2026

### ✅ Libellés dynamiques du code de contrôle

Le formulaire de demande fiscale adapte maintenant le libellé et l'aide du champ de code selon le canton sélectionné :

| Canton | Libellé du champ | Document de référence |
|--------|------------------|----------------------|
| Vaud (VD) | Code de contrôle | Formulaire de déclaration (A3), en haut à gauche |
| Neuchâtel (NE) | Code de contrôle | Courrier de déclaration (logiciel Clic & Tax) |
| Genève (GE) | Code déclaration | Courrier "Identifiants pour votre déclaration" |
| Fribourg (FR) | Code d'accès + Code de contrôle | Page de garde de la déclaration papier |
| Valais (VS) | Numéro de contrôle | Reçu avec le courrier fiscal de début d'année |
| Jura (JU) | Code de contrôle | Formulaire reçu pour JuraTax |

### Fichier modifié
- `src/components/TaxRequestForm.tsx` : Ajout du mapping `cantonCodeInfo` et mise à jour dynamique du champ

## Déploiement GitHub - 26/02/2026

### ✅ Code poussé sur GitHub

Le code complet du projet NeoFidu a été poussé sur GitHub :

- **Repository**: https://github.com/medericborgeaud-oss/neofidu
- **Branche**: main
- **Commit**: ff7c12f - "Complete NeoFidu project with all features"
- **Fichiers**: 147 fichiers (46,579 insertions)

#### Fonctionnalités incluses :
- Formulaire de déclaration fiscale multi-étapes
- Intégration paiement Stripe (TWINT, Visa, Mastercard)
- Backend Supabase pour la persistance des données
- Upload de documents Cloudinary
- Protection anti-spam (honeypot, rate limiting)
- Optimisation SEO (sitemap, meta tags, OpenGraph)
- Support multilingue (FR/EN)
- Design responsive avec Tailwind CSS
- Dashboard admin pour gestion des demandes
- Simulateurs fiscaux (3ème pilier, valeur locative)

---

## Conformité TWINT (Stripe) - Mise à jour 24/02/2026

### ✅ Éléments ajoutés pour l'approbation TWINT

1. **Politique de remboursement complète** (Section 6 des CGU)
   - Droit d'annulation : 14 jours si traitement non commencé
   - Remboursement intégral : conditions clairement définies
   - Remboursement partiel : au prorata du travail effectué
   - Non-remboursement : après livraison complète
   - Réclamations : sous 30 jours
   - Procédure de remboursement : étapes claires

2. **Délais de traitement garantis**
   - Basic : 10 jours ouvrables
   - Comfort : 7 jours ouvrables
   - Intégral : 5 jours ouvrables

3. **Moyens de paiement affichés**
   - TWINT, Visa, Mastercard dans le footer
   - Logos dans la section tarifs
   - Lien vers politique de remboursement dans les deux endroits

4. **Liens légaux dans le footer**
   - Mentions légales
   - CGU
   - Remboursements (nouveau lien direct)
   - Vie privée

### 📧 Actions à faire pour soumettre à Stripe

Répondez à l'email de Stripe avec les informations suivantes :

```
Bonjour,

Suite à votre demande, nous avons mis à jour notre site web pour répondre aux exigences TWINT :

1. POLITIQUE DE REMBOURSEMENT
   URL : https://neofidu.ch/conditions-generales#remboursements
   - Droit d'annulation de 14 jours
   - Procédure de remboursement détaillée
   - Conditions clairement définies

2. DÉLAIS DE LIVRAISON
   URL : https://neofidu.ch/conditions-generales#services
   - Délais garantis par forfait (5-10 jours ouvrables)

3. MOYENS DE PAIEMENT
   - Logos TWINT, Visa, Mastercard visibles en bas de page
   - Mentions dans la section tarifs

4. PAGES LÉGALES
   - Mentions légales : https://neofidu.ch/mentions-legales
   - Conditions générales : https://neofidu.ch/conditions-generales
   - Politique de confidentialité : https://neofidu.ch/politique-confidentialite

Merci de réexaminer notre demande.

Cordialement,
Médéric Borgeaud
NeoFidu
```

### 🔗 URLs importantes

- GitHub : https://github.com/medericborgeaud-oss/neofidu
- Site live : https://neofidu.ch
- CGU (remboursements) : https://neofidu.ch/conditions-generales#remboursements
- Mentions légales : https://neofidu.ch/mentions-legales
- Politique de confidentialité : https://neofidu.ch/politique-confidentialite
