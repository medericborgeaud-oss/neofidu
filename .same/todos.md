# NeoFidu - Liste des tâches

## Complété ✅
- [x] Configuration Google Analytics (G-JN5C3WSSLK)
- [x] Renommer les fichiers Cloudinary avec le format: numéro_de_dossier_date_nom_prénom_fichier
- [x] Pousser le code sur GitHub (https://github.com/medericborgeaud-oss/neofidu)
- [x] Déclencher le déploiement Vercel (auto-deploy via GitHub push)
- [x] Corriger l'upload des documents comptabilité (fichiers maintenant uploadés vers Cloudinary)
- [x] Corriger la sauvegarde des demandes comptabilité en base de données
- [x] Corriger la sauvegarde des demandes immobilières en base de données

## URLs
- **GitHub** : https://github.com/medericborgeaud-oss/neofidu
- **Vercel Dashboard** : https://vercel.com/mederic-borgeauds-projects/neofidu
- **Production** : https://neofidu.vercel.app

## Notes techniques
- Les demandes comptabilité et immobilières sont maintenant sauvegardées dans Supabase (si configuré)
- Les fichiers uploadés dans le formulaire comptabilité sont envoyés vers Cloudinary
- Format de nommage Cloudinary: référence_date_nom_prénom_fichier

## À faire
- [ ] Configurer le domaine neofidu.ch sur Vercel
