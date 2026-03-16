-- =============================================
-- NEOFIDU - Table Newsletter Subscribers
-- Migration: 001_create_newsletter_subscribers.sql
-- Date: 15 mars 2026
-- =============================================

-- Créer la table newsletter_subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source VARCHAR(50) DEFAULT 'footer',
  ip_address VARCHAR(50),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  resubscribed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide par email
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Index pour filtrer par statut
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);

-- Index pour trier par date d'inscription
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_newsletter_updated_at ON newsletter_subscribers;
CREATE TRIGGER trigger_newsletter_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();

-- Politique RLS (Row Level Security) - optionnel mais recommandé
-- Activer RLS sur la table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion depuis l'API (service role)
CREATE POLICY "Allow service role full access" ON newsletter_subscribers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Commentaires sur les colonnes
COMMENT ON TABLE newsletter_subscribers IS 'Abonnés à la newsletter NeoFidu';
COMMENT ON COLUMN newsletter_subscribers.email IS 'Adresse email unique de l''abonné';
COMMENT ON COLUMN newsletter_subscribers.first_name IS 'Prénom de l''abonné (optionnel)';
COMMENT ON COLUMN newsletter_subscribers.status IS 'Statut: active, unsubscribed, bounced';
COMMENT ON COLUMN newsletter_subscribers.source IS 'Source d''inscription: footer, blog, popup';
COMMENT ON COLUMN newsletter_subscribers.ip_address IS 'Adresse IP lors de l''inscription';
