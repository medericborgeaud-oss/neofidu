# Configuration Stripe + TWINT pour NeoFidu

## Prérequis

1. Un compte Stripe (https://dashboard.stripe.com)
2. TWINT activé sur votre compte Stripe (disponible pour les comptes suisses)

## Étapes de configuration

### 1. Obtenir vos clés API Stripe

1. Connectez-vous à votre [Dashboard Stripe](https://dashboard.stripe.com)
2. Allez dans **Developers** > **API keys**
3. Copiez votre **Publishable key** (commence par `pk_test_` ou `pk_live_`)
4. Copiez votre **Secret key** (commence par `sk_test_` ou `sk_live_`)

### 2. Activer TWINT

1. Dans le Dashboard Stripe, allez dans **Settings** > **Payment methods**
2. Trouvez **TWINT** dans la liste
3. Cliquez sur **Turn on** pour activer TWINT
4. TWINT est disponible uniquement pour les paiements en CHF

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Clé publique Stripe (visible côté client)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique

# Clé secrète Stripe (côté serveur uniquement)
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete

# (Optionnel) Secret pour les webhooks
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
```

### 4. Redémarrer le serveur

```bash
bun run dev
```

## Utilisation

### Composant de paiement

Le composant `StripePaymentForm` gère automatiquement :
- Les paiements par carte (Visa, Mastercard, etc.)
- Les paiements TWINT
- La gestion des erreurs
- Les redirections après paiement

```tsx
import { StripePaymentForm } from "@/components/StripePaymentForm";

<StripePaymentForm
  amount={150} // en CHF
  customerEmail="client@example.com"
  customerName="Jean Dupont"
  description="Déclaration d'impôt 2025"
  onSuccess={(paymentIntentId) => {
    console.log("Paiement réussi:", paymentIntentId);
  }}
  onError={(error) => {
    console.error("Erreur:", error);
  }}
/>
```

### Mode démonstration

Si les clés Stripe ne sont pas configurées, le composant `MockPaymentForm` est disponible pour les tests :

```tsx
import { MockPaymentForm } from "@/components/StripePaymentForm";

<MockPaymentForm
  amount={150}
  onSuccess={() => {
    console.log("Paiement simulé réussi");
  }}
/>
```

## API Endpoints

### POST /api/create-payment-intent

Crée un PaymentIntent Stripe.

**Body :**
```json
{
  "amount": 15000,           // en centimes (150 CHF)
  "currency": "chf",
  "paymentMethod": "card",   // ou "twint"
  "customerEmail": "email@example.com",
  "customerName": "Jean Dupont",
  "description": "Description du paiement",
  "metadata": {}             // données additionnelles
}
```

**Réponse :**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

## Webhooks (Optionnel)

Pour recevoir des notifications de paiement en temps réel :

1. Dans le Dashboard Stripe, allez dans **Developers** > **Webhooks**
2. Ajoutez un endpoint : `https://votre-domaine.ch/api/webhooks/stripe`
3. Sélectionnez les événements à écouter :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copiez le **Signing secret** dans `STRIPE_WEBHOOK_SECRET`

## Test

### Cartes de test

| Numéro | Description |
|--------|-------------|
| 4242 4242 4242 4242 | Paiement réussi |
| 4000 0000 0000 0002 | Carte refusée |
| 4000 0000 0000 3220 | Authentification 3D Secure |

### TWINT en mode test

En mode test, TWINT simule automatiquement un paiement réussi.

## Production

1. Remplacez les clés de test (`pk_test_`, `sk_test_`) par les clés de production (`pk_live_`, `sk_live_`)
2. Vérifiez que TWINT est activé en production
3. Configurez les webhooks de production
4. Testez avec de vraies transactions de petit montant

## Support

Pour toute question sur l'intégration Stripe :
- Documentation Stripe : https://stripe.com/docs
- Documentation TWINT sur Stripe : https://stripe.com/docs/payments/twint
