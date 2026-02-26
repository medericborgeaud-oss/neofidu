"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Scale, AlertCircle, CreditCard, Lock, Mail, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    id: "objet",
    title: "1. Objet et champ d'application",
    icon: FileText,
    content: `
      <p>Les présentes Conditions Générales (ci-après "CG") régissent l'ensemble des relations contractuelles entre NeoFidu, entreprise individuelle exploitée par <strong>Médéric Borgeaud</strong>, inscrite au Canton de Vaud, et ses clients (ci-après "le Client").</p>
      <p>En utilisant les services de NeoFidu, le Client accepte sans réserve les présentes CG. NeoFidu se réserve le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site neofidu.ch.</p>
      <p>Les présentes CG s'appliquent à l'ensemble des prestations proposées par NeoFidu, notamment :</p>
      <ul>
        <li>L'établissement de déclarations d'impôt pour personnes physiques</li>
        <li>Les services de comptabilité pour indépendants et entreprises</li>
        <li>La gérance immobilière (cantons de Vaud et Valais)</li>
        <li>Le conseil fiscal et administratif</li>
      </ul>
    `,
  },
  {
    id: "services",
    title: "2. Description des services",
    icon: FileText,
    content: `
      <h4>2.1 Déclarations fiscales</h4>
      <p>NeoFidu établit les déclarations d'impôt sur la base des documents et informations fournis par le Client. Le service comprend la préparation du formulaire fiscal, l'optimisation des déductions légales et, sur demande, le contrôle de la décision de taxation.</p>

      <h4>2.2 Comptabilité</h4>
      <p>Les prestations comptables incluent la tenue des livres, l'établissement des bilans et comptes de résultat, et les déclarations TVA selon le forfait choisi par le Client.</p>

      <h4>2.3 Gérance immobilière</h4>
      <p>Ce service, disponible uniquement dans les cantons de Vaud et Valais, comprend la gestion locative complète : recherche de locataires, rédaction des baux, encaissement des loyers, suivi technique et comptabilité immobilière.</p>

      <h4>2.4 Délais de traitement garantis</h4>
      <p>Les délais de traitement sont les suivants :</p>
      <ul>
        <li><strong>Forfait Basic :</strong> 10 jours ouvrables maximum après réception de tous les documents</li>
        <li><strong>Forfait Comfort :</strong> 7 jours ouvrables maximum après réception de tous les documents</li>
        <li><strong>Forfait Intégral :</strong> 5 jours ouvrables maximum après réception de tous les documents</li>
      </ul>
      <p>Ces délais peuvent être prolongés en cas de dossier particulièrement complexe ou de documents manquants. Le Client sera informé de tout retard prévisible.</p>
    `,
  },
  {
    id: "obligations-client",
    title: "3. Obligations du Client",
    icon: AlertCircle,
    content: `
      <h4>3.1 Exactitude des informations</h4>
      <p>Le Client s'engage à fournir des informations exactes, complètes et véridiques. Il garantit l'authenticité de tous les documents transmis à NeoFidu.</p>

      <h4>3.2 Transmission des documents</h4>
      <p>Le Client est responsable de la transmission en temps utile de l'ensemble des pièces justificatives nécessaires à l'exécution des prestations. Tout retard dans la remise des documents peut entraîner un report des délais de traitement.</p>

      <h4>3.3 Vérification</h4>
      <p>Le Client s'engage à vérifier les documents établis par NeoFidu avant leur transmission aux autorités compétentes et à signaler toute erreur ou omission dans un délai de 5 jours ouvrables.</p>

      <h4>3.4 Confidentialité des accès</h4>
      <p>Le Client est responsable de la confidentialité de ses identifiants de connexion et s'engage à ne pas les communiquer à des tiers.</p>
    `,
  },
  {
    id: "responsabilite",
    title: "4. Limitation de responsabilité",
    icon: Shield,
    content: `
      <h4>4.1 Responsabilité de NeoFidu</h4>
      <p>NeoFidu s'engage à exécuter ses prestations avec diligence et professionnalisme, conformément aux règles de l'art et aux normes en vigueur dans la profession fiduciaire suisse.</p>

      <h4>4.2 Exclusion de responsabilité</h4>
      <p>NeoFidu décline toute responsabilité en cas de :</p>
      <ul>
        <li>Informations inexactes, incomplètes ou frauduleuses fournies par le Client</li>
        <li>Documents falsifiés ou non conformes à la réalité</li>
        <li>Retard dans la transmission des pièces justificatives par le Client</li>
        <li>Décisions des autorités fiscales ou judiciaires fondées sur des éléments dont NeoFidu n'avait pas connaissance</li>
        <li>Force majeure ou événements échappant au contrôle de NeoFidu</li>
      </ul>

      <h4>4.3 Plafond d'indemnisation</h4>
      <p>En tout état de cause, la responsabilité de NeoFidu est limitée au montant des honoraires effectivement perçus pour la prestation concernée, à l'exclusion de tout dommage indirect ou consécutif.</p>

      <h4>4.4 Assurance responsabilité civile</h4>
      <p>NeoFidu dispose d'une assurance responsabilité civile professionnelle couvrant les risques liés à son activité.</p>
    `,
  },
  {
    id: "tarifs",
    title: "5. Tarifs et paiement",
    icon: CreditCard,
    content: `
      <h4>5.1 Tarification</h4>
      <p>Les tarifs applicables sont ceux affichés sur le site neofidu.ch au moment de la commande. Les prix sont indiqués en francs suisses (CHF), TVA incluse le cas échéant.</p>

      <h4>5.2 Modalités de paiement</h4>
      <p>Le paiement s'effectue par carte bancaire (Visa, Mastercard) ou TWINT. Pour certaines prestations, un acompte peut être demandé avant le début des travaux.</p>

      <h4>5.3 Facturation</h4>
      <p>Les prestations récurrentes (comptabilité, gérance) font l'objet d'une facturation selon la fréquence choisie par le Client (mensuelle ou annuelle).</p>

      <h4>5.4 Retard de paiement</h4>
      <p>En cas de retard de paiement, des intérêts moratoires de 5% l'an seront appliqués de plein droit, sans mise en demeure préalable. NeoFidu se réserve le droit de suspendre ses prestations jusqu'au règlement intégral des sommes dues.</p>

      <h4>5.5 Frais supplémentaires</h4>
      <p>Toute prestation non prévue dans le forfait initial fera l'objet d'un devis complémentaire soumis à l'approbation du Client.</p>
    `,
  },
  {
    id: "remboursements",
    title: "6. Remboursements et annulations",
    icon: RefreshCcw,
    content: `
      <h4>6.1 Nature des prestations</h4>
      <p>Les services proposés par NeoFidu sont des <strong>prestations de services intellectuels personnalisées</strong>. Conformément à l'article 40c de la Loi fédérale contre la concurrence déloyale (LCD), le droit de révocation ne s'applique pas aux contrats de services dont l'exécution a commencé avec l'accord du consommateur.</p>
      <p><strong>En validant sa commande, le Client reconnaît et accepte que le traitement de son dossier puisse débuter immédiatement après réception du paiement.</strong></p>

      <h4>6.2 Annulation avant début du traitement</h4>
      <p>Le Client peut annuler sa commande <strong>uniquement si le traitement de son dossier n'a pas encore débuté</strong>. Le début du traitement intervient dès l'ouverture du dossier par nos équipes, généralement dans les <strong>24 à 48 heures</strong> suivant le paiement.</p>
      <p>Pour vérifier si une annulation est encore possible, le Client doit contacter NeoFidu par email à <a href="mailto:contact@neofidu.ch">contact@neofidu.ch</a> en indiquant son numéro de référence.</p>

      <h4>6.3 Remboursement intégral</h4>
      <p>Un remboursement intégral (déduction faite des frais de transaction bancaire) n'est accordé que dans les cas suivants :</p>
      <ul>
        <li>Annulation confirmée par NeoFidu <strong>avant le début du traitement</strong></li>
        <li>Erreur technique avérée lors du paiement (double facturation)</li>
        <li>Incapacité manifeste de NeoFidu à fournir la prestation (cas exceptionnel)</li>
      </ul>
      <p>Le remboursement sera effectué sous <strong>14 jours ouvrables</strong> via le même moyen de paiement utilisé pour la transaction initiale.</p>

      <h4>6.4 Remboursement partiel</h4>
      <p>En cas d'annulation après le début du traitement mais avant la livraison finale, NeoFidu <strong>peut</strong>, à sa seule discrétion, accorder un remboursement partiel selon les modalités suivantes :</p>
      <ul>
        <li>Déduction de <strong>50% minimum</strong> du montant payé pour frais de traitement et d'administration</li>
        <li>Déduction supplémentaire proportionnelle au travail déjà effectué</li>
      </ul>
      <p><strong>Le remboursement partiel n'est jamais automatique</strong> et doit faire l'objet d'une demande motivée examinée au cas par cas.</p>

      <h4>6.5 Exclusions de remboursement</h4>
      <p><strong>Aucun remboursement, même partiel, n'est accordé</strong> dans les cas suivants :</p>
      <ul>
        <li>La prestation a été livrée au Client (déclaration transmise ou documents finaux envoyés)</li>
        <li>La déclaration a été transmise aux autorités fiscales</li>
        <li>Le Client a fourni des informations inexactes, incomplètes ou frauduleuses</li>
        <li>Le Client ne répond pas aux demandes de documents dans un délai de 30 jours</li>
        <li>Le Client change d'avis après le début du traitement sans motif légitime</li>
        <li>Le résultat fiscal ne correspond pas aux attentes du Client (montant d'impôt à payer)</li>
        <li>Le Client a bénéficié d'une partie significative du service (conseils, analyse préliminaire)</li>
      </ul>

      <h4>6.6 Réclamations</h4>
      <p>Toute réclamation concernant une prestation doit être formulée par écrit dans un délai de <strong>14 jours</strong> suivant la livraison. Passé ce délai, la prestation est réputée acceptée sans réserve.</p>
      <p>Les réclamations portant sur une erreur avérée de NeoFidu seront traitées par une correction gratuite du dossier, <strong>sans remboursement</strong>.</p>

      <h4>6.7 Procédure de demande de remboursement</h4>
      <p>Pour soumettre une demande de remboursement (sous réserve d'éligibilité) :</p>
      <ol>
        <li>Envoyez un email à <a href="mailto:contact@neofidu.ch">contact@neofidu.ch</a> avec l'objet "Demande de remboursement - [Numéro de référence]"</li>
        <li>Joignez votre numéro de référence et la preuve de paiement</li>
        <li>Exposez les motifs détaillés de votre demande</li>
        <li>NeoFidu examinera votre demande et vous répondra sous 5 jours ouvrables</li>
      </ol>
      <p><strong>NeoFidu se réserve le droit de refuser toute demande de remboursement ne répondant pas aux critères énoncés ci-dessus.</strong></p>
    `,
  },
  {
    id: "confidentialite",
    title: "7. Confidentialité et protection des données",
    icon: Lock,
    content: `
      <h4>7.1 Secret professionnel</h4>
      <p>NeoFidu est soumis au secret professionnel et s'engage à traiter de manière confidentielle l'ensemble des informations communiquées par le Client.</p>

      <h4>7.2 Protection des données personnelles</h4>
      <p>Le traitement des données personnelles est effectué conformément à la Loi fédérale sur la protection des données (LPD) et au Règlement européen sur la protection des données (RGPD) le cas échéant.</p>

      <h4>7.3 Finalités du traitement</h4>
      <p>Les données collectées sont utilisées exclusivement pour :</p>
      <ul>
        <li>L'exécution des prestations commandées</li>
        <li>La gestion de la relation client</li>
        <li>Le respect des obligations légales</li>
        <li>L'amélioration de nos services (données anonymisées)</li>
      </ul>

      <h4>7.4 Conservation des données</h4>
      <p>Les documents et données sont conservés pendant la durée légale de conservation (10 ans pour les documents comptables et fiscaux), sauf demande contraire du Client dans les limites autorisées par la loi.</p>

      <h4>7.5 Droits du Client</h4>
      <p>Le Client dispose d'un droit d'accès, de rectification, de suppression et de portabilité de ses données personnelles. Ces droits peuvent être exercés par email à l'adresse contact@neofidu.ch.</p>
    `,
  },
  {
    id: "resiliation",
    title: "8. Durée et résiliation",
    icon: FileText,
    content: `
      <h4>8.1 Prestations ponctuelles</h4>
      <p>Les prestations ponctuelles (déclaration d'impôt) prennent fin à la livraison du travail commandé et au paiement intégral du prix.</p>

      <h4>8.2 Prestations récurrentes</h4>
      <p>Les contrats de comptabilité et de gérance sont conclus pour une durée indéterminée. Chaque partie peut résilier le contrat moyennant un préavis de 3 mois pour la fin d'un mois.</p>

      <h4>8.3 Résiliation pour justes motifs</h4>
      <p>Chaque partie peut résilier le contrat avec effet immédiat en cas de manquement grave de l'autre partie à ses obligations, notamment :</p>
      <ul>
        <li>Non-paiement des honoraires malgré rappel</li>
        <li>Fourniture d'informations frauduleuses</li>
        <li>Comportement incompatible avec la poursuite de la relation contractuelle</li>
      </ul>

      <h4>8.4 Effets de la résiliation</h4>
      <p>En cas de résiliation, les prestations effectuées restent dues. NeoFidu restitue au Client l'ensemble des documents originaux en sa possession dans un délai de 30 jours.</p>
    `,
  },
  {
    id: "droit-applicable",
    title: "9. Droit applicable et for juridique",
    icon: Scale,
    content: `
      <h4>9.1 Droit applicable</h4>
      <p>Les présentes CG et l'ensemble des relations contractuelles entre NeoFidu et le Client sont soumis au droit suisse.</p>

      <h4>9.2 For juridique</h4>
      <p>Tout litige découlant des présentes CG ou des prestations fournies par NeoFidu sera soumis à la compétence exclusive des tribunaux du Canton de Vaud, sous réserve d'un recours au Tribunal fédéral.</p>

      <h4>9.3 Médiation</h4>
      <p>Avant toute action judiciaire, les parties s'engagent à rechercher une solution amiable par voie de médiation.</p>
    `,
  },
  {
    id: "dispositions-finales",
    title: "10. Dispositions finales",
    icon: FileText,
    content: `
      <h4>10.1 Intégralité</h4>
      <p>Les présentes CG constituent l'intégralité de l'accord entre les parties et remplacent tout accord antérieur, écrit ou oral, portant sur le même objet.</p>

      <h4>10.2 Nullité partielle</h4>
      <p>Si l'une des dispositions des présentes CG devait être déclarée nulle ou inapplicable, les autres dispositions resteraient pleinement en vigueur.</p>

      <h4>10.3 Renonciation</h4>
      <p>Le fait pour NeoFidu de ne pas se prévaloir d'un manquement du Client à l'une de ses obligations ne saurait être interprété comme une renonciation à s'en prévaloir ultérieurement.</p>

      <h4>10.4 Contact et mentions légales</h4>
      <p>Pour toute question relative aux présentes CG, le Client peut contacter NeoFidu à l'adresse suivante :</p>
      <p>
        <strong>NeoFidu – Entreprise individuelle</strong><br />
        Propriétaire : <strong>Médéric Borgeaud</strong><br />
        Crettaz 1<br />
        1854 Leysin<br />
        Canton de Vaud, Suisse<br />
        Tél : +41 78 691 39 12<br />
        Email : contact@neofidu.ch
      </p>
      <p>Tous les prix sont affichés en CHF (Francs suisses), TVA incluse le cas échéant.</p>

      <p className="mt-4"><em>Dernière mise à jour : Février 2026</em></p>
    `,
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Conditions <span className="text-gradient">Générales</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Les présentes conditions régissent l'utilisation des services proposés par NeoFidu.
            </p>
          </motion.div>

          {/* Table of contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Table des matières</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">{section.title}</h2>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground
                      prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                      prose-p:mb-4 prose-ul:mb-4 prose-li:mb-1
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Des questions ?</h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est à votre disposition pour toute question concernant nos conditions générales.
              </p>
              <a
                href="mailto:contact@neofidu.ch"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                contact@neofidu.ch
              </a>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
