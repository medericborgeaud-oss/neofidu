# Configuration Supabase pour NeoFidu

Ce guide explique comment configurer Supabase pour le stockage persistant des demandes.

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com) et créez un compte
2. Créez un nouveau projet
3. Attendez que le projet soit initialisé

## 2. Créer la table

Dans le **SQL Editor** de Supabase, exécutez ce script :

```sql
-- Table des demandes fiscales
CREATE TABLE IF NOT EXISTS tax_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  payment JSONB NOT NULL,
  customer JSONB NOT NULL,
  fiscal JSONB NOT NULL,
  situation JSONB,
  financial JSONB,
  property JSONB,
  workplaces JSONB,
  options JSONB,
  documents JSONB
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_tax_requests_reference ON tax_requests(reference);
CREATE INDEX IF NOT EXISTS idx_tax_requests_status ON tax_requests(status);
CREATE INDEX IF NOT EXISTS idx_tax_requests_created_at ON tax_requests(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE tax_requests ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre toutes les opérations avec la service role key
CREATE POLICY "Service role can do everything" ON tax_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## 3. Récupérer les clés

Dans les **Settings > API** de votre projet Supabase :

- **Project URL** : Copiez l'URL du projet
- **service_role key** : Copiez la clé `service_role` (pas la clé `anon` !)

## 4. Configurer les variables d'environnement

### En local (fichier `.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Sur Netlify

1. Allez dans **Site configuration > Environment variables**
2. Ajoutez les variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 5. Tester

1. Redémarrez le serveur de développement
2. Accédez au dashboard admin `/admin`
3. Le badge "Mode Démo" devrait disparaître si Supabase est correctement configuré

## Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé de service (avec accès admin) |
| `ADMIN_PASSWORD` | Mot de passe admin (optionnel, défaut: neofidu-admin-2024) |
| `RESEND_API_KEY` | Clé API Resend pour les emails de notification |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe pour les paiements |

## Sécurité

- **Ne jamais exposer** la `service_role` key côté client
- Utilisez toujours HTTPS en production
- Changez le mot de passe admin par défaut
