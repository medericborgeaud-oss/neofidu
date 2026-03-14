export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  keywords?: string[];
}

export const blogCategories: Record<string, { name: string; nameEn: string; color: string }> = {
  fiscalite: {
    name: "Fiscalité",
    nameEn: "Taxation",
    color: "bg-emerald-500",
  },
  comptabilite: {
    name: "Comptabilité",
    nameEn: "Accounting",
    color: "bg-blue-500",
  },
  entreprise: {
    name: "Entreprise",
    nameEn: "Business",
    color: "bg-purple-500",
  },
  actualites: {
    name: "Actualités",
    nameEn: "News",
    color: "bg-orange-500",
  },
  expatries: {
    name: "Expatriés",
    nameEn: "Expats",
    color: "bg-teal-500",
  },
};

export const blogArticles: BlogArticle[] = [
  {
    id: "21",
    slug: "impot-source-suisse-guide-complet-2026",
    title: "Impôt à la source en Suisse 2026 : Guide complet (Barèmes, Taux, Rectification, Cantons)",
    titleEn: "Withholding Tax in Switzerland 2026: Complete Guide (Rates, Correction, Cantons)",
    excerpt:
      "Guide complet sur l'impôt à la source en Suisse 2026. Barèmes par canton (Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura), taux d'imposition, codes tarifaires A/B/C/H, rectification, remboursement. Permis B, frontaliers, 120'000 CHF. Calculateur et exemples chiffrés.",
    excerptEn: "Complete guide to Swiss withholding tax 2026. Rates by canton (Geneva, Vaud, Valais, Fribourg, Neuchâtel, Jura), tax codes A/B/C/H, correction, refund. B permit, cross-border workers, CHF 120,000 threshold. Calculator and examples.",
    keywords: [
      "impôt à la source Suisse",
      "impôt source Suisse 2026",
      "Quellensteuer",
      "Quellensteuer Schweiz",
      "withholding tax Switzerland",
      "withholding tax Switzerland 2026",
      "permis B impôts Suisse",
      "permis B impôt à la source",
      "rectification impôt source",
      "correction impôt source",
      "remboursement impôt source",
      "déclaration impôts étranger Suisse",
      "frontalier impôts Suisse",
      "frontalier Genève impôts",
      "frontalier Vaud impôts",
      "source tax correction Switzerland",
      "120000 CHF impôt source",
      "seuil 120000 impôt source",
      "TOU taxation ordinaire ultérieure",
      "quasi-résident Suisse",
      "quasi-résident Genève",
      "barème impôt source",
      "taux impôt source Suisse",
      "code tarifaire impôt source",
      "code A impôt source",
      "code B impôt source",
      "code C impôt source",
      "impôt source Genève",
      "impôt source Vaud",
      "impôt source Valais",
      "impôt source Fribourg",
      "impôt source Neuchâtel",
      "calculer impôt source",
      "simulateur impôt source",
      "délai rectification 31 mars",
      "expatrié Suisse impôts",
      "expat Switzerland tax"
    ],
    content: `
<p><em>This article is bilingual. English version follows the French text below.</em></p>
<p><em>Cet article est bilingue. La version anglaise suit le texte français ci-dessous.</em></p>

<br/>

<h1><strong>🇫🇷 FRANÇAIS</strong></h1>

<br/>

<p>Vous venez d'arriver en Suisse avec un <strong>permis B</strong> ? Vous êtes <strong>frontalier</strong> travaillant à Genève, Lausanne ou dans un autre canton ? Vous vous demandez pourquoi votre employeur prélève directement des impôts sur votre salaire ? Bienvenue dans le monde de l'<strong>impôt à la source</strong> (Quellensteuer en allemand).</p>

<p>Ce guide complet vous explique tout : qui est concerné, comment ça fonctionne, et surtout <strong>comment récupérer de l'argent</strong> si vous payez trop.</p>

<br/>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<p style="font-weight: bold; margin-bottom: 10px;">📋 Sommaire</p>
<ul style="margin: 0; padding-left: 20px;">
<li><a href="#quest-ce-que-limpot-a-la-source">Qu'est-ce que l'impôt à la source ?</a></li>
<li><a href="#qui-est-soumis">Qui est soumis à l'impôt à la source ?</a></li>
<li><a href="#quand-ne-sapplique-pas">Quand l'impôt à la source ne s'applique PAS</a></li>
<li><a href="#tableau-recapitulatif">Tableau récapitulatif</a></li>
<li><a href="#bareme">Comment fonctionne le barème ?</a></li>
<li><a href="#rectification">La rectification : récupérez votre argent</a></li>
<li><a href="#tou">La Taxation Ordinaire Ultérieure (TOU)</a></li>
<li><a href="#cantons">Spécificités par canton</a></li>
<li><a href="#erreurs">Erreurs fréquentes à éviter</a></li>
<li><a href="#checklist">Checklist d'optimisation</a></li>
<li><a href="#faq">FAQ - Questions fréquentes</a></li>
</ul>
</div>

<br/>

<p style="text-align: center; padding: 15px; background: #fef3c7; border-radius: 8px;">
⚡ <strong>Besoin d'un calcul rapide ?</strong> Utilisez notre <a href="/simulateur/salaire-net">simulateur de salaire net gratuit</a> pour connaître votre salaire après impôts.
</p>

<br/>

<h2><strong>Qu'est-ce que l'impôt à la source ?</strong></h2>

<br/>

<p>L'<strong>impôt à la source</strong> est un système de prélèvement fiscal où l'employeur retient directement l'impôt sur le revenu du salarié <strong>chaque mois</strong>, avant de lui verser son salaire net.</p>

<p>Contrairement à la procédure ordinaire (où vous remplissez une déclaration et payez ensuite), ici tout est automatique. L'administration fiscale reçoit l'argent directement de votre employeur.</p>

<br/>

<h3><strong>Avantages du système</strong></h3>

<ul>
<li>✅ Pas de grosse facture d'impôts en fin d'année</li>
<li>✅ Paiement étalé sur 12 mois</li>
<li>✅ Simplicité : pas de déclaration à remplir (dans la plupart des cas)</li>
</ul>

<br/>

<h3><strong>Inconvénients</strong></h3>

<ul>
<li>❌ Barème forfaitaire qui ne tient pas compte de toutes vos déductions</li>
<li>❌ Vous payez souvent <strong>plus que nécessaire</strong></li>
<li>❌ Nécessité de demander une rectification pour récupérer le trop-perçu</li>
</ul>

<br/>

<h2><strong>Qui est soumis à l'impôt à la source ?</strong></h2>

<br/>

<p>Vous êtes concerné par l'impôt à la source si vous remplissez <strong>l'une des conditions suivantes</strong> :</p>

<br/>

<h3><strong>1. Titulaires d'un permis B (séjour)</strong></h3>

<p>Si vous avez un <strong>permis B</strong> et que vous gagnez <strong>moins de CHF 120'000 brut par an</strong>, vous êtes automatiquement soumis à l'impôt à la source.</p>

<p><strong>Important :</strong> Ce seuil de CHF 120'000 concerne le revenu <strong>brut annuel</strong>, pas le revenu imposable. Il inclut le 13e salaire, les bonus et les avantages en nature.</p>

<br/>

<h3><strong>2. Frontaliers</strong></h3>

<p>Les <strong>travailleurs frontaliers</strong> (qui habitent en France, Allemagne, Italie ou Autriche et travaillent en Suisse) sont généralement imposés à la source en Suisse, sauf exception (notamment pour certains cantons avec la France).</p>

<br/>

<h3><strong>3. Travailleurs temporaires et saisonniers</strong></h3>

<p>Toute personne travaillant en Suisse <strong>sans domicile fiscal suisse</strong> est soumise à l'impôt à la source.</p>

<br/>

<h3><strong>4. Bénéficiaires de prestations de prévoyance</strong></h3>

<p>Les personnes recevant des <strong>rentes ou capitaux</strong> de prévoyance suisse tout en résidant à l'étranger sont imposées à la source sur ces revenus.</p>

<br/>

<h2><strong>Quand l'impôt à la source NE s'applique PAS</strong></h2>

<br/>

<p>Vous n'êtes <strong>PAS soumis</strong> à l'impôt à la source si :</p>

<br/>

<h3><strong>1. Vous avez un permis C (établissement)</strong></h3>

<p>Les titulaires d'un <strong>permis C</strong> sont imposés comme les citoyens suisses : ils reçoivent une déclaration d'impôts à remplir chaque année.</p>

<br/>

<h3><strong>2. Vous êtes marié(e) à un(e) Suisse ou titulaire de permis C</strong></h3>

<p>Si votre conjoint a la nationalité suisse ou un permis C, vous êtes imposé selon la procédure ordinaire (déclaration d'impôts).</p>

<br/>

<h3><strong>3. Votre revenu dépasse CHF 120'000</strong></h3>

<p>Si votre salaire brut annuel dépasse <strong>CHF 120'000</strong>, vous devez remplir une <strong>déclaration d'impôts obligatoire</strong>. L'impôt à la source est alors considéré comme un acompte qui sera régularisé.</p>

<br/>

<h3><strong>4. Vous possédez un bien immobilier en Suisse</strong></h3>

<p>Les propriétaires immobiliers doivent remplir une déclaration d'impôts, même s'ils sont normalement soumis à l'impôt à la source.</p>

<br/>

<h3><strong>5. Vous avez d'autres revenus significatifs</strong></h3>

<p>Revenus locatifs, activité indépendante accessoire, fortune importante (> CHF 80'000-100'000 selon les cantons)... Ces situations déclenchent l'obligation de déclaration.</p>

<br/>

<h2><strong>Tableau récapitulatif : Impôt à la source ou déclaration ?</strong></h2>

<br/>

<table>
<thead>
<tr>
<th>Situation</th>
<th>Impôt à la source</th>
<th>Déclaration obligatoire</th>
</tr>
</thead>
<tbody>
<tr>
<td>Permis B, salaire < 120'000 CHF</td>
<td>✅ Oui</td>
<td>❌ Non (mais rectification possible)</td>
</tr>
<tr>
<td>Permis B, salaire > 120'000 CHF</td>
<td>✅ Acompte</td>
<td>✅ Oui, obligatoire</td>
</tr>
<tr>
<td>Permis C</td>
<td>❌ Non</td>
<td>✅ Oui, obligatoire</td>
</tr>
<tr>
<td>Marié(e) à Suisse/permis C</td>
<td>❌ Non</td>
<td>✅ Oui, obligatoire</td>
</tr>
<tr>
<td>Frontalier (selon canton)</td>
<td>✅ Oui (sauf exceptions)</td>
<td>Dépend du canton et du statut</td>
</tr>
<tr>
<td>Propriétaire immobilier</td>
<td>✅ Acompte</td>
<td>✅ Oui, obligatoire</td>
</tr>
<tr>
<td>Fortune > 80'000-100'000 CHF</td>
<td>✅ Acompte</td>
<td>✅ Oui, obligatoire</td>
</tr>
</tbody>
</table>

<br/>

<h2><strong>Comment fonctionne le barème de l'impôt à la source ?</strong></h2>

<br/>

<p>L'impôt à la source est calculé selon un <strong>barème standardisé</strong> qui prend en compte :</p>

<ul>
<li>Votre <strong>salaire brut</strong></li>
<li>Votre <strong>état civil</strong> (célibataire, marié, etc.)</li>
<li>Votre <strong>nombre d'enfants</strong></li>
<li>Votre <strong>confession</strong> (impôt ecclésiastique)</li>
<li>Votre <strong>canton de travail</strong></li>
</ul>

<br/>

<h3><strong>Les codes tarifaires</strong></h3>

<p>Chaque situation correspond à un code à une lettre :</p>

<ul>
<li><strong>A</strong> : Célibataire sans enfant</li>
<li><strong>B</strong> : Marié, conjoint sans revenu</li>
<li><strong>C</strong> : Marié, les deux conjoints travaillent</li>
<li><strong>H</strong> : Famille monoparentale</li>
</ul>

<p>Un chiffre indique le nombre d'enfants (ex: B2 = marié, conjoint sans revenu, 2 enfants).</p>

<br/>

<p><strong>Problème :</strong> Ce barème ne tient pas compte de vos <strong>déductions personnelles</strong> : 3ème pilier, frais de transport élevés, rachats de 2ème pilier, frais de garde, etc. C'est pourquoi vous payez souvent trop !</p>

<br/>

<h2><strong>La rectification : récupérez votre argent !</strong></h2>

<br/>

<p>Voici la bonne nouvelle : même si vous êtes soumis à l'impôt à la source et gagnez moins de CHF 120'000, vous pouvez demander une <strong>rectification</strong> pour faire valoir vos déductions et potentiellement <strong>récupérer plusieurs centaines ou milliers de francs</strong>.</p>

<br/>

<h3><strong>Qu'est-ce que la rectification ?</strong></h3>

<p>La rectification (aussi appelée <strong>demande de correction</strong>) permet de :</p>

<ul>
<li>Déduire votre <strong>3ème pilier (pilier 3a)</strong></li>
<li>Déduire vos <strong>frais de transport</strong> domicile-travail</li>
<li>Déduire vos <strong>frais de repas</strong> hors domicile</li>
<li>Déduire vos <strong>frais de garde</strong> d'enfants</li>
<li>Déduire vos <strong>rachats de 2ème pilier</strong></li>
<li>Déduire les <strong>pensions alimentaires</strong> versées</li>
<li>Déduire vos <strong>frais de formation</strong> continue</li>
</ul>

<br/>

<h3><strong>Délai pour demander une rectification</strong></h3>

<p>Vous avez jusqu'au <strong>31 mars de l'année suivante</strong> pour déposer votre demande.</p>

<p><strong>Exemple :</strong> Pour l'année fiscale 2025, vous avez jusqu'au <strong>31 mars 2026</strong> pour demander une rectification.</p>

<br/>

<h3><strong>Exemple chiffré de rectification</strong></h3>

<p><strong>Situation :</strong> Marco, 32 ans, permis B, célibataire, travaille à Lausanne.</p>
<ul>
<li>Salaire annuel : CHF 85'000</li>
<li>Impôt à la source prélevé : CHF 11'200</li>
</ul>

<p><strong>Ses déductions :</strong></p>
<ul>
<li>3ème pilier : CHF 7'258</li>
<li>Frais de transport (30 km/jour en train) : CHF 3'200</li>
<li>Frais de repas (pas de cantine) : CHF 3'200</li>
</ul>

<p><strong>Après rectification :</strong></p>
<ul>
<li>Impôt recalculé : CHF 9'100</li>
<li><strong>Remboursement : CHF 2'100 !</strong></li>
</ul>

<br/>

<p style="text-align: center; margin: 25px 0;">
<a href="/demande" style="display: inline-block; padding: 15px 30px; background: #f97316; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">Demander une rectification avec NeoFidu →</a>
</p>

<br/>

<h2><strong>La Taxation Ordinaire Ultérieure (TOU) : pour les frontaliers quasi-résidents</strong></h2>

<br/>

<p>Si vous êtes <strong>frontalier</strong> et que <strong>90% ou plus de vos revenus mondiaux</strong> proviennent de Suisse, vous pouvez demander le statut de <strong>quasi-résident</strong> et bénéficier d'une <strong>Taxation Ordinaire Ultérieure (TOU)</strong>.</p>

<p>La TOU vous permet d'être imposé <strong>comme un résident suisse</strong>, avec toutes les déductions associées.</p>

<br/>

<h3><strong>Avantages de la TOU</strong></h3>

<ul>
<li>Déduction du 3ème pilier</li>
<li>Déduction des intérêts hypothécaires</li>
<li>Déduction des frais de garde</li>
<li>Déduction des rachats de 2ème pilier</li>
<li>Toutes les déductions des résidents !</li>
</ul>

<br/>

<h3><strong>Condition essentielle</strong></h3>

<p><strong>90% de vos revenus mondiaux</strong> (revenus du ménage) doivent provenir de Suisse. Si votre conjoint travaille dans votre pays de résidence, ce seuil peut être difficile à atteindre.</p>

<br/>

<h2><strong>Les spécificités par canton</strong></h2>

<br/>

<h3><strong>Canton de Genève</strong></h3>

<p>Genève applique un système particulier pour les frontaliers français :</p>
<ul>
<li>Les frontaliers sont imposés à la source à Genève</li>
<li>Le statut de <strong>quasi-résident</strong> est accessible sous conditions</li>
<li>Délai de rectification : <strong>31 mars</strong></li>
</ul>

<br/>

<h3><strong>Canton de Vaud</strong></h3>

<p>Dans le canton de Vaud :</p>
<ul>
<li>Les titulaires de permis B sont imposés à la source</li>
<li>La rectification est possible via <strong>VaudTax</strong></li>
<li>Seuil des CHF 120'000 strictement appliqué</li>
</ul>

<br/>

<h3><strong>Canton du Valais</strong></h3>

<p>Le Valais a des conventions spécifiques :</p>
<ul>
<li>Certains frontaliers français sont imposés en France (communes frontalières)</li>
<li>D'autres sont imposés en Valais</li>
<li>Taux d'imposition parmi les plus bas de Suisse romande</li>
<li>Vérifiez votre situation spécifique !</li>
</ul>

<p>En savoir plus : <a href="/cantons/valais">Guide fiscal du canton du Valais</a></p>

<br/>

<h3><strong>Canton de Fribourg</strong></h3>

<p>Particularités du canton de Fribourg :</p>
<ul>
<li>Taux d'imposition modérés comparés à Vaud et Neuchâtel</li>
<li>Frontaliers imposés en France (convention franco-suisse)</li>
<li>Rectification possible via le formulaire cantonal</li>
<li>Canton bilingue (français/allemand) : attention aux formulaires</li>
</ul>

<p>En savoir plus : <a href="/cantons/fribourg">Guide fiscal du canton de Fribourg</a></p>

<br/>

<h3><strong>Canton de Neuchâtel</strong></h3>

<p>Spécificités neuchâteloises :</p>
<ul>
<li>Taux d'imposition parmi les plus élevés de Suisse romande</li>
<li>Frontaliers imposés en France avec rétrocession</li>
<li>Délai de rectification : <strong>31 mars</strong></li>
<li>Possibilité de paiement échelonné en cas de régularisation</li>
</ul>

<p>En savoir plus : <a href="/cantons/neuchatel">Guide fiscal du canton de Neuchâtel</a></p>

<br/>

<h3><strong>Canton du Jura</strong></h3>

<p>Le Jura, plus jeune canton suisse :</p>
<ul>
<li>Taux d'imposition compétitifs pour attirer les contribuables</li>
<li>Frontaliers imposés en France</li>
<li>Administration fiscale réactive et accessible</li>
<li>Délai de rectification : <strong>31 mars</strong></li>
</ul>

<p>En savoir plus : <a href="/cantons/jura">Guide fiscal du canton du Jura</a></p>

<br/>

<h2><strong>Erreurs fréquentes à éviter</strong></h2>

<br/>

<h3><strong>❌ Ne pas demander de rectification</strong></h3>

<p>C'est l'erreur la plus coûteuse ! Beaucoup de personnes ne savent pas qu'elles peuvent récupérer de l'argent. <strong>Ne laissez pas de l'argent sur la table.</strong></p>

<br/>

<h3><strong>❌ Rater le délai du 31 mars</strong></h3>

<p>Le délai est strict. Passé le 31 mars, vous perdez définitivement le droit à la rectification pour l'année concernée.</p>

<br/>

<h3><strong>❌ Oublier de verser au 3ème pilier</strong></h3>

<p>Le 3ème pilier est LA déduction la plus importante. En 2026, vous pouvez déduire jusqu'à <strong>CHF 7'258</strong>. C'est de l'argent que vous récupérez via la rectification !</p>

<br/>

<h3><strong>❌ Ne pas signaler un changement de situation</strong></h3>

<p>Mariage, naissance, changement de canton... Tout changement doit être signalé à votre employeur pour ajuster votre barème.</p>

<br/>

<h2><strong>Checklist : optimisez votre impôt à la source</strong></h2>

<br/>

<p>✅ Vérifiez que votre <strong>code tarifaire</strong> est correct sur votre fiche de salaire</p>
<p>✅ Ouvrez et alimentez un <strong>3ème pilier</strong> (maximum CHF 7'258 en 2026)</p>
<p>✅ Conservez tous vos <strong>justificatifs</strong> de déductions</p>
<p>✅ Demandez une <strong>rectification avant le 31 mars</strong></p>
<p>✅ Si vous êtes frontalier, vérifiez si vous êtes éligible au statut de <strong>quasi-résident</strong></p>

<br/>

<hr style="margin: 40px 0; border: none; border-top: 2px solid #e5e7eb;"/>

<h1><strong>🇬🇧 ENGLISH</strong></h1>

<br/>

<p>Just arrived in Switzerland with a <strong>B permit</strong>? Are you a <strong>cross-border worker</strong> employed in Geneva, Lausanne, or another canton? Wondering why your employer deducts taxes directly from your salary? Welcome to the world of <strong>withholding tax</strong> (Quellensteuer in German).</p>

<p>This comprehensive guide explains everything: who is affected, how it works, and most importantly, <strong>how to get money back</strong> if you're overpaying.</p>

<br/>

<h2><strong>What Is Withholding Tax?</strong></h2>

<br/>

<p><strong>Withholding tax</strong> (also called source tax) is a tax collection system where the employer deducts income tax directly from the employee's salary <strong>every month</strong>, before paying them their net salary.</p>

<p>Unlike the ordinary procedure (where you file a return and pay afterward), here everything is automatic. The tax administration receives the money directly from your employer.</p>

<br/>

<h3><strong>Advantages of the System</strong></h3>

<ul>
<li>✅ No large tax bill at year-end</li>
<li>✅ Payments spread over 12 months</li>
<li>✅ Simplicity: no return to file (in most cases)</li>
</ul>

<br/>

<h3><strong>Disadvantages</strong></h3>

<ul>
<li>❌ Flat-rate scale that doesn't account for all your deductions</li>
<li>❌ You often pay <strong>more than necessary</strong></li>
<li>❌ Need to request a correction to recover overpayments</li>
</ul>

<br/>

<h2><strong>Who Is Subject to Withholding Tax?</strong></h2>

<br/>

<p>You are subject to withholding tax if you meet <strong>one of the following conditions</strong>:</p>

<br/>

<h3><strong>1. B Permit Holders (Residence Permit)</strong></h3>

<p>If you have a <strong>B permit</strong> and earn <strong>less than CHF 120,000 gross per year</strong>, you are automatically subject to withholding tax.</p>

<p><strong>Important:</strong> This CHF 120,000 threshold refers to <strong>gross annual income</strong>, not taxable income. It includes the 13th month salary, bonuses, and benefits in kind.</p>

<br/>

<h3><strong>2. Cross-Border Workers (Frontaliers)</strong></h3>

<p><strong>Cross-border workers</strong> (living in France, Germany, Italy, or Austria and working in Switzerland) are generally taxed at source in Switzerland, with some exceptions (particularly for certain cantons with France).</p>

<br/>

<h3><strong>3. Temporary and Seasonal Workers</strong></h3>

<p>Anyone working in Switzerland <strong>without Swiss tax residence</strong> is subject to withholding tax.</p>

<br/>

<h3><strong>4. Recipients of Pension Benefits</strong></h3>

<p>People receiving Swiss <strong>pension payments or capital</strong> while residing abroad are taxed at source on this income.</p>

<br/>

<h2><strong>When Withholding Tax Does NOT Apply</strong></h2>

<br/>

<p>You are <strong>NOT subject</strong> to withholding tax if:</p>

<br/>

<h3><strong>1. You Have a C Permit (Settlement)</strong></h3>

<p><strong>C permit</strong> holders are taxed like Swiss citizens: they receive a tax return to complete each year.</p>

<br/>

<h3><strong>2. You Are Married to a Swiss National or C Permit Holder</strong></h3>

<p>If your spouse has Swiss nationality or a C permit, you are taxed under the ordinary procedure (tax return).</p>

<br/>

<h3><strong>3. Your Income Exceeds CHF 120,000</strong></h3>

<p>If your gross annual salary exceeds <strong>CHF 120,000</strong>, you must file a <strong>mandatory tax return</strong>. The withholding tax is then considered an advance payment to be settled.</p>

<br/>

<h3><strong>4. You Own Real Estate in Switzerland</strong></h3>

<p>Property owners must file a tax return, even if they would normally be subject to withholding tax.</p>

<br/>

<h3><strong>5. You Have Other Significant Income</strong></h3>

<p>Rental income, secondary self-employment, significant wealth (> CHF 80,000-100,000 depending on canton)... These situations trigger the obligation to file a return.</p>

<br/>

<h2><strong>Summary Table: Withholding Tax or Tax Return?</strong></h2>

<br/>

<table>
<thead>
<tr>
<th>Situation</th>
<th>Withholding Tax</th>
<th>Mandatory Return</th>
</tr>
</thead>
<tbody>
<tr>
<td>B permit, salary < 120,000 CHF</td>
<td>✅ Yes</td>
<td>❌ No (but correction possible)</td>
</tr>
<tr>
<td>B permit, salary > 120,000 CHF</td>
<td>✅ Advance payment</td>
<td>✅ Yes, mandatory</td>
</tr>
<tr>
<td>C permit</td>
<td>❌ No</td>
<td>✅ Yes, mandatory</td>
</tr>
<tr>
<td>Married to Swiss/C permit holder</td>
<td>❌ No</td>
<td>✅ Yes, mandatory</td>
</tr>
<tr>
<td>Cross-border worker (varies by canton)</td>
<td>✅ Yes (with exceptions)</td>
<td>Depends on canton and status</td>
</tr>
<tr>
<td>Property owner</td>
<td>✅ Advance payment</td>
<td>✅ Yes, mandatory</td>
</tr>
<tr>
<td>Wealth > 80,000-100,000 CHF</td>
<td>✅ Advance payment</td>
<td>✅ Yes, mandatory</td>
</tr>
</tbody>
</table>

<br/>

<h2><strong>How Does the Withholding Tax Scale Work?</strong></h2>

<br/>

<p>Withholding tax is calculated using a <strong>standardized scale</strong> that considers:</p>

<ul>
<li>Your <strong>gross salary</strong></li>
<li>Your <strong>marital status</strong> (single, married, etc.)</li>
<li>Your <strong>number of children</strong></li>
<li>Your <strong>religious affiliation</strong> (church tax)</li>
<li>Your <strong>canton of employment</strong></li>
</ul>

<br/>

<h3><strong>Rate Codes</strong></h3>

<p>Each situation corresponds to a letter code:</p>

<ul>
<li><strong>A</strong>: Single without children</li>
<li><strong>B</strong>: Married, spouse without income</li>
<li><strong>C</strong>: Married, both spouses working</li>
<li><strong>H</strong>: Single parent</li>
</ul>

<p>A number indicates children (e.g., B2 = married, spouse without income, 2 children).</p>

<br/>

<p><strong>Problem:</strong> This scale doesn't account for your <strong>personal deductions</strong>: 3rd pillar, high transport costs, 2nd pillar purchases, childcare costs, etc. That's why you often overpay!</p>

<br/>

<h2><strong>Tax Correction: Get Your Money Back!</strong></h2>

<br/>

<p>Here's the good news: even if you're subject to withholding tax and earn less than CHF 120,000, you can request a <strong>correction</strong> to claim your deductions and potentially <strong>recover hundreds or thousands of francs</strong>.</p>

<br/>

<h3><strong>What Is a Tax Correction?</strong></h3>

<p>A correction (also called <strong>rectification</strong>) allows you to:</p>

<ul>
<li>Deduct your <strong>3rd pillar (pillar 3a)</strong></li>
<li>Deduct your <strong>commuting costs</strong></li>
<li>Deduct your <strong>meal expenses</strong> outside home</li>
<li>Deduct your <strong>childcare costs</strong></li>
<li>Deduct your <strong>2nd pillar purchases</strong></li>
<li>Deduct <strong>alimony payments</strong></li>
<li>Deduct your <strong>continuing education costs</strong></li>
</ul>

<br/>

<h3><strong>Deadline for Requesting a Correction</strong></h3>

<p>You have until <strong>March 31 of the following year</strong> to submit your request.</p>

<p><strong>Example:</strong> For tax year 2025, you have until <strong>March 31, 2026</strong> to request a correction.</p>

<br/>

<h3><strong>Correction Example with Numbers</strong></h3>

<p><strong>Situation:</strong> Marco, 32, B permit, single, works in Lausanne.</p>
<ul>
<li>Annual salary: CHF 85,000</li>
<li>Withholding tax deducted: CHF 11,200</li>
</ul>

<p><strong>His deductions:</strong></p>
<ul>
<li>3rd pillar: CHF 7,258</li>
<li>Transport costs (30 km/day by train): CHF 3,200</li>
<li>Meal costs (no canteen): CHF 3,200</li>
</ul>

<p><strong>After correction:</strong></p>
<ul>
<li>Recalculated tax: CHF 9,100</li>
<li><strong>Refund: CHF 2,100!</strong></li>
</ul>

<br/>

<h2><strong>Subsequent Ordinary Taxation (TOU): For Quasi-Resident Cross-Border Workers</strong></h2>

<br/>

<p>If you're a <strong>cross-border worker</strong> and <strong>90% or more of your worldwide income</strong> comes from Switzerland, you can apply for <strong>quasi-resident status</strong> and benefit from <strong>Subsequent Ordinary Taxation (TOU)</strong>.</p>

<p>TOU allows you to be taxed <strong>like a Swiss resident</strong>, with all associated deductions.</p>

<br/>

<h3><strong>Benefits of TOU</strong></h3>

<ul>
<li>3rd pillar deduction</li>
<li>Mortgage interest deduction</li>
<li>Childcare cost deduction</li>
<li>2nd pillar purchase deduction</li>
<li>All resident deductions!</li>
</ul>

<br/>

<h3><strong>Essential Condition</strong></h3>

<p><strong>90% of your worldwide income</strong> (household income) must come from Switzerland. If your spouse works in your country of residence, this threshold may be difficult to reach.</p>

<br/>

<h2><strong>Common Mistakes to Avoid</strong></h2>

<br/>

<h3><strong>❌ Not Requesting a Correction</strong></h3>

<p>This is the most costly mistake! Many people don't know they can get money back. <strong>Don't leave money on the table.</strong></p>

<br/>

<h3><strong>❌ Missing the March 31 Deadline</strong></h3>

<p>The deadline is strict. After March 31, you permanently lose the right to a correction for that year.</p>

<br/>

<h3><strong>❌ Forgetting to Contribute to the 3rd Pillar</strong></h3>

<p>The 3rd pillar is THE most important deduction. In 2026, you can deduct up to <strong>CHF 7,258</strong>. This is money you recover through the correction!</p>

<br/>

<h3><strong>❌ Not Reporting a Change in Situation</strong></h3>

<p>Marriage, birth, canton change... Any change must be reported to your employer to adjust your rate.</p>

<br/>

<h2><strong>Checklist: Optimize Your Withholding Tax</strong></h2>

<br/>

<p>✅ Check that your <strong>rate code</strong> is correct on your payslip</p>
<p>✅ Open and fund a <strong>3rd pillar</strong> (maximum CHF 7,258 in 2026)</p>
<p>✅ Keep all your <strong>deduction receipts</strong></p>
<p>✅ Request a <strong>correction before March 31</strong></p>
<p>✅ If you're a cross-border worker, check if you're eligible for <strong>quasi-resident status</strong></p>

<br/>

<h2><strong>Need Help? | Besoin d'aide ?</strong></h2>

<br/>

<p>At <strong>NeoFidu</strong>, we specialize in helping people subject to withholding tax recover their overpaid taxes. Our bilingual team handles everything for you.</p>

<p>Chez <strong>NeoFidu</strong>, nous accompagnons les personnes soumises à l'impôt à la source pour récupérer les impôts payés en trop. Notre équipe bilingue s'occupe de tout pour vous.</p>

<br/>

<p style="text-align: center; margin: 30px 0;">
<a href="/demande" style="display: inline-block; padding: 18px 40px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1.1em;">Request a Correction / Demander une rectification →</a>
</p>

<p style="text-align: center; color: #666;"><strong>From CHF 50 | À partir de CHF 50</strong><br/>10 business days | 10 jours ouvrés</p>

<br/>

<p style="text-align: center;">💡 <strong>Use our <a href="/simulateur/impots">free tax simulator</a></strong> to estimate your potential savings!</p>
<p style="text-align: center;">💡 <strong>Utilisez notre <a href="/simulateur/impots">simulateur d'impôts gratuit</a></strong> pour estimer vos économies potentielles !</p>

<br/>

<hr style="margin: 40px 0; border: none; border-top: 2px solid #e5e7eb;"/>

<h1><strong>Annexes / Appendices</strong></h1>

<br/>

<h2><strong>Barèmes de l'impôt à la source 2026 par canton (exemples)</strong></h2>

<br/>

<p>Voici des exemples de taux d'imposition à la source pour un <strong>célibataire sans enfant (code A0)</strong> selon différents salaires bruts mensuels :</p>

<br/>

<table>
<thead>
<tr>
<th>Salaire mensuel brut</th>
<th>Genève (GE)</th>
<th>Vaud (VD)</th>
<th>Valais (VS)</th>
<th>Fribourg (FR)</th>
<th>Neuchâtel (NE)</th>
</tr>
</thead>
<tbody>
<tr>
<td>CHF 5'000</td>
<td>~8.5%</td>
<td>~10.2%</td>
<td>~9.8%</td>
<td>~11.5%</td>
<td>~12.1%</td>
</tr>
<tr>
<td>CHF 7'000</td>
<td>~11.2%</td>
<td>~13.5%</td>
<td>~12.8%</td>
<td>~14.2%</td>
<td>~15.0%</td>
</tr>
<tr>
<td>CHF 10'000</td>
<td>~14.8%</td>
<td>~17.2%</td>
<td>~16.1%</td>
<td>~17.8%</td>
<td>~18.5%</td>
</tr>
<tr>
<td>CHF 12'000</td>
<td>~16.5%</td>
<td>~19.1%</td>
<td>~17.9%</td>
<td>~19.5%</td>
<td>~20.2%</td>
</tr>
<tr>
<td>CHF 15'000</td>
<td>~18.8%</td>
<td>~21.5%</td>
<td>~20.2%</td>
<td>~22.0%</td>
<td>~22.8%</td>
</tr>
</tbody>
</table>

<p><em>Note : Ces taux sont indicatifs et varient selon la commune, la confession et la situation familiale. Utilisez notre <a href="/simulateur/salaire-net">simulateur de salaire net</a> pour un calcul précis.</em></p>

<br/>

<h2><strong>Exemples chiffrés détaillés par situation</strong></h2>

<br/>

<h3><strong>Exemple 1 : Célibataire à Genève - CHF 80'000/an</strong></h3>

<table>
<tbody>
<tr><td><strong>Salaire brut annuel</strong></td><td>CHF 80'000</td></tr>
<tr><td>Impôt à la source prélevé (code A0)</td><td>CHF 10'400 (~13%)</td></tr>
<tr><td>3ème pilier versé</td><td>CHF 7'258</td></tr>
<tr><td>Frais de transport</td><td>CHF 2'800</td></tr>
<tr><td>Frais de repas</td><td>CHF 3'200</td></tr>
<tr><td><strong>Impôt après rectification</strong></td><td><strong>CHF 8'200</strong></td></tr>
<tr><td style="color: green;"><strong>Remboursement obtenu</strong></td><td style="color: green;"><strong>CHF 2'200</strong></td></tr>
</tbody>
</table>

<br/>

<h3><strong>Exemple 2 : Couple marié à Lausanne (Vaud) - CHF 140'000/an</strong></h3>

<table>
<tbody>
<tr><td><strong>Salaire brut annuel (total ménage)</strong></td><td>CHF 140'000</td></tr>
<tr><td>Situation</td><td>Marié, 2 enfants, conjoint sans revenu (code B2)</td></tr>
<tr><td>Impôt à la source prélevé</td><td>CHF 16'800</td></tr>
<tr><td>Obligation</td><td><strong>Déclaration obligatoire</strong> (> CHF 120'000)</td></tr>
<tr><td>3ème pilier (x2)</td><td>CHF 14'516</td></tr>
<tr><td>Frais de garde enfants</td><td>CHF 12'000</td></tr>
<tr><td><strong>Impôt final après déclaration</strong></td><td><strong>CHF 11'500</strong></td></tr>
<tr><td style="color: green;"><strong>Économie réalisée</strong></td><td style="color: green;"><strong>CHF 5'300</strong></td></tr>
</tbody>
</table>

<br/>

<h3><strong>Exemple 3 : Frontalier à Genève - CHF 95'000/an</strong></h3>

<table>
<tbody>
<tr><td><strong>Salaire brut annuel</strong></td><td>CHF 95'000</td></tr>
<tr><td>Résidence</td><td>France (Haute-Savoie)</td></tr>
<tr><td>Statut</td><td>Frontalier quasi-résident (90%+ revenus CH)</td></tr>
<tr><td>Impôt à la source prélevé</td><td>CHF 14'250</td></tr>
<tr><td>Demande TOU effectuée</td><td>Oui</td></tr>
<tr><td>3ème pilier</td><td>CHF 7'258</td></tr>
<tr><td>Intérêts hypothécaires (France)</td><td>CHF 8'500</td></tr>
<tr><td><strong>Impôt final après TOU</strong></td><td><strong>CHF 9'800</strong></td></tr>
<tr><td style="color: green;"><strong>Économie réalisée</strong></td><td style="color: green;"><strong>CHF 4'450</strong></td></tr>
</tbody>
</table>

<br/>

<h2><strong>Calendrier fiscal 2026 - Dates clés impôt à la source</strong></h2>

<br/>

<table>
<thead>
<tr>
<th>Date</th>
<th>Action</th>
<th>Concerne</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>31 janvier 2026</strong></td>
<td>Réception du certificat de salaire 2025</td>
<td>Tous les salariés</td>
</tr>
<tr>
<td><strong>28 février 2026</strong></td>
<td>Dernier versement 3ème pilier pour année 2025</td>
<td>Tous (si pas déjà fait en 2025)</td>
</tr>
<tr>
<td><strong>31 mars 2026</strong></td>
<td><strong>Délai rectification impôt source 2025</strong></td>
<td>Permis B < 120k, frontaliers</td>
</tr>
<tr>
<td><strong>31 mars 2026</strong></td>
<td>Délai demande TOU 2025</td>
<td>Frontaliers quasi-résidents</td>
</tr>
<tr>
<td><strong>30 juin 2026</strong></td>
<td>Délai déclaration d'impôts standard</td>
<td>Contribuables ordinaires</td>
</tr>
<tr>
<td><strong>31 décembre 2026</strong></td>
<td>Dernier versement 3ème pilier pour année 2026</td>
<td>Tous</td></tr>
</tbody>
</table>

<br/>

<h2><strong>FAQ - Questions fréquentes sur l'impôt à la source</strong></h2>

<br/>

<h3><strong>Combien d'impôt à la source vais-je payer ?</strong></h3>
<p>Le taux d'impôt à la source varie entre <strong>5% et 25%</strong> selon votre salaire, votre situation familiale et votre canton. Un célibataire gagnant CHF 80'000 à Genève paiera environ 13%, tandis qu'à Neuchâtel ce sera plutôt 16%. Utilisez notre <a href="/simulateur/salaire-net">simulateur de salaire net</a> pour un calcul précis.</p>

<br/>

<h3><strong>Puis-je récupérer l'impôt à la source payé en trop ?</strong></h3>
<p>Oui ! En demandant une <strong>rectification avant le 31 mars</strong>, vous pouvez récupérer en moyenne <strong>CHF 1'500 à 3'000</strong> si vous avez un 3ème pilier, des frais de transport ou d'autres déductions. <a href="/demande">Faites votre demande ici</a>.</p>

<br/>

<h3><strong>Quelle est la différence entre rectification et TOU ?</strong></h3>
<p>La <strong>rectification</strong> permet de corriger quelques déductions spécifiques (3ème pilier, frais professionnels). La <strong>TOU (Taxation Ordinaire Ultérieure)</strong> vous fait passer en imposition ordinaire complète, comme un résident suisse, avec TOUTES les déductions possibles. La TOU est réservée aux frontaliers quasi-résidents (90%+ revenus en Suisse).</p>

<br/>

<h3><strong>Je gagne exactement CHF 120'000, que se passe-t-il ?</strong></h3>
<p>Le seuil de CHF 120'000 s'applique au <strong>revenu brut total</strong> incluant 13ème salaire, bonus, et avantages en nature. Si vous dépassez ce seuil, vous devez obligatoirement remplir une déclaration d'impôts. L'impôt à la source prélevé sera alors un <strong>acompte</strong> régularisé.</p>

<br/>

<h3><strong>Mon employeur prélève-t-il le bon taux ?</strong></h3>
<p>Vérifiez votre <strong>code tarifaire</strong> sur votre fiche de salaire. Les erreurs courantes : mauvais nombre d'enfants, mauvais état civil, ou confession non mise à jour. Signalez tout changement à votre employeur pour ajuster le barème.</p>

<br/>

<h3><strong>L'impôt à la source inclut-il l'AVS et la LPP ?</strong></h3>
<p>Non ! L'impôt à la source ne concerne que l'<strong>impôt sur le revenu</strong>. Les cotisations sociales (AVS, AI, APG, AC, LPP, AANP) sont prélevées séparément. Notre <a href="/simulateur/salaire-net">simulateur de salaire net</a> vous montre la répartition complète.</p>

<br/>

<h3><strong>Je suis frontalier, suis-je imposé en Suisse ou en France ?</strong></h3>
<p>Cela dépend du canton et de votre commune de résidence :</p>
<ul>
<li><strong>Genève</strong> : Imposé à la source à Genève</li>
<li><strong>Vaud, Neuchâtel, Jura, Fribourg, Berne</strong> : Imposé en France (avec rétrocession fiscale)</li>
<li><strong>Valais</strong> : Dépend de la commune de résidence en France</li>
</ul>

<br/>

<h3><strong>Que se passe-t-il si je rate le délai du 31 mars ?</strong></h3>
<p>Malheureusement, le délai est <strong>strict et définitif</strong>. Passé le 31 mars, vous perdez le droit à la rectification pour l'année concernée. Vous ne pourrez pas récupérer l'impôt payé en trop. C'est pourquoi nous recommandons de <a href="/demande">faire votre demande tôt</a>.</p>

<br/>

<h3><strong>Combien coûte une demande de rectification ?</strong></h3>
<p>Chez NeoFidu, la rectification de l'impôt à la source coûte <strong>à partir de CHF 50</strong>. C'est généralement rentabilisé : nos clients récupèrent en moyenne <strong>CHF 2'000</strong>. <a href="/demande">Commencez votre demande</a>.</p>

<br/>

<h2><strong>Ressources utiles / Useful Resources</strong></h2>

<br/>

<ul>
<li><a href="/simulateur/salaire-net">Simulateur de salaire net Suisse</a> - Calculez votre salaire net par canton</li>
<li><a href="/simulateur/impots">Simulateur d'impôts Suisse</a> - Estimez vos impôts annuels</li>
<li><a href="/simulateur/3eme-pilier">Simulateur 3ème pilier</a> - Calculez vos économies d'impôts</li>
<li><a href="/guide/deductions-fiscales">Guide des déductions fiscales</a> - Toutes les déductions possibles</li>
<li><a href="/cantons/geneve">Impôts canton de Genève</a></li>
<li><a href="/cantons/vaud">Impôts canton de Vaud</a></li>
<li><a href="/cantons/valais">Impôts canton du Valais</a></li>
<li><a href="/faq">FAQ complète NeoFidu</a></li>
</ul>

<br/>

<p style="text-align: center; padding: 20px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; margin: 30px 0;">
<span style="color: white; font-size: 1.2em; font-weight: bold;">Ne laissez pas d'argent sur la table !</span><br/>
<span style="color: rgba(255,255,255,0.9);">Demandez votre rectification avant le 31 mars 2026</span><br/><br/>
<a href="/demande" style="display: inline-block; padding: 15px 40px; background: white; color: #f97316; text-decoration: none; border-radius: 8px; font-weight: 600;">Commencer ma demande →</a>
</p>
    `,
    category: "expatries",
    date: "2026-03-14",
    readTime: 25,
  },
  {
    id: "20",
    slug: "first-tax-return-switzerland-expat-guide",
    title: "Votre première déclaration d'impôts en Suisse : guide complet pour expatriés",
    titleEn: "Your First Tax Return in Switzerland: Complete Guide for Expats",
    excerpt:
      "Vous venez d'arriver en Suisse et devez remplir votre première déclaration d'impôts ? Ce guide bilingue vous explique tout : délais, documents nécessaires, déductions possibles et pièges à éviter.",
    excerptEn: "Just arrived in Switzerland and need to file your first tax return? This bilingual guide explains everything: deadlines, required documents, possible deductions and pitfalls to avoid.",
    keywords: [
      "expat tax return switzerland",
      "first tax return switzerland",
      "déclaration impôts expatrié",
      "quellensteuer",
      "withholding tax switzerland",
      "B permit tax return",
      "expat tax guide",
      "swiss tax for foreigners",
      "tax deductions expats",
      "pillar 3a expats"
    ],
    content: `
<p><em>This article is bilingual. English version follows the French text below.</em></p>
<p><em>Cet article est bilingue. La version anglaise suit le texte français ci-dessous.</em></p>

<br/>

<h1><strong>🇫🇷 FRANÇAIS</strong></h1>

<br/>

<p>Félicitations pour votre installation en Suisse ! Si vous venez d'arriver et que vous vous demandez comment fonctionne le système fiscal suisse, vous êtes au bon endroit. Ce guide vous accompagne pas à pas dans votre <strong>première déclaration d'impôts</strong>.</p>

<br/>

<h2><strong>Dois-je remplir une déclaration d'impôts ?</strong></h2>

<br/>

<p>La réponse dépend de votre situation :</p>

<h3><strong>Vous êtes imposé à la source (Quellensteuer)</strong></h3>

<p>Si vous avez un <strong>permis B</strong> et gagnez <strong>moins de CHF 120'000 par an</strong>, vous êtes probablement imposé à la source. Cela signifie que votre employeur retient directement l'impôt sur votre salaire chaque mois.</p>

<p><strong>Bonne nouvelle :</strong> Même si vous n'êtes pas obligé de remplir une déclaration complète, vous pouvez demander une <strong>rectification de l'impôt à la source</strong> pour faire valoir des déductions et potentiellement obtenir un <strong>remboursement</strong>.</p>

<h3><strong>Vous devez remplir une déclaration obligatoire si :</strong></h3>

<ul>
<li>Vous gagnez <strong>plus de CHF 120'000 par an</strong> (brut)</li>
<li>Vous avez des <strong>revenus supplémentaires</strong> (immobilier, indépendant, etc.)</li>
<li>Vous possédez une <strong>fortune taxable</strong> supérieure à CHF 80'000 (selon les cantons)</li>
<li>Vous avez un <strong>permis C</strong> (établissement)</li>
</ul>

<br/>

<h2><strong>Les délais à respecter</strong></h2>

<br/>

<p>Le calendrier fiscal varie selon les cantons, mais voici les grandes lignes :</p>

<table>
<thead>
<tr>
<th>Canton</th>
<th>Délai standard</th>
<th>Prolongation possible</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vaud</td>
<td>15 mars</td>
<td>Jusqu'au 30 septembre (gratuit)</td>
</tr>
<tr>
<td>Genève</td>
<td>31 mars</td>
<td>Jusqu'au 30 novembre</td>
</tr>
<tr>
<td>Valais</td>
<td>31 mars</td>
<td>Jusqu'au 30 septembre</td>
</tr>
</tbody>
</table>

<p style="text-align: center; margin: 20px 0;">
<a href="/demande/prolongation" style="display: inline-block; padding: 12px 24px; background: #f97316; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">Demander une prolongation →</a>
</p>

<br/>

<h2><strong>Documents nécessaires</strong></h2>

<br/>

<p>Rassemblez ces documents <strong>avant de commencer</strong> :</p>

<h3><strong>Revenus</strong></h3>
<ul>
<li>Certificat de salaire (<em>Lohnausweis</em>) de votre employeur</li>
<li>Attestation de chômage (si applicable)</li>
<li>Revenus de placements (intérêts, dividendes)</li>
</ul>

<h3><strong>Fortune</strong></h3>
<ul>
<li>Relevés bancaires au <strong>31 décembre</strong> (tous vos comptes en Suisse ET à l'étranger)</li>
<li>Valeur de votre voiture</li>
<li>Portefeuille d'investissements (actions, crypto, etc.)</li>
</ul>

<h3><strong>Déductions</strong></h3>
<ul>
<li>Attestation 3ème pilier (pilier 3a)</li>
<li>Primes d'assurance maladie</li>
<li>Frais de transport domicile-travail</li>
<li>Frais de formation continue</li>
<li>Frais de garde d'enfants</li>
</ul>

<br/>

<h2><strong>Les déductions que vous ne devez pas oublier</strong></h2>

<br/>

<p>En tant qu'expatrié, voici les déductions les plus importantes :</p>

<h3><strong>1. Le 3ème pilier (Pilier 3a)</strong></h3>

<p>C'est LA déduction la plus avantageuse en Suisse. En 2026, vous pouvez déduire jusqu'à <strong>CHF 7'258</strong> si vous êtes salarié. Ce montant est déduit à 100% de votre revenu imposable.</p>

<p><strong>Conseil :</strong> Ouvrez un compte 3a dès votre arrivée. Même si vous ne restez que quelques années, c'est un excellent investissement fiscal.</p>

<h3><strong>2. Frais professionnels</strong></h3>

<ul>
<li><strong>Transport :</strong> Abonnement de transports publics OU CHF 0.70/km en voiture (plafonné)</li>
<li><strong>Repas :</strong> Forfait de CHF 15-30/jour selon le canton si vous mangez à l'extérieur</li>
<li><strong>Vêtements professionnels :</strong> Si votre employeur ne les fournit pas</li>
</ul>

<h3><strong>3. Frais de formation</strong></h3>

<p>Les formations en lien avec votre activité professionnelle sont déductibles (cours de langue, certifications, etc.).</p>

<h3><strong>4. Frais de garde d'enfants</strong></h3>

<p>Jusqu'à <strong>CHF 10'000-25'000</strong> par enfant selon les cantons pour la crèche ou la garde extra-scolaire.</p>

<br/>

<h2><strong>Erreurs fréquentes des expatriés</strong></h2>

<br/>

<h3><strong>❌ Oublier les comptes à l'étranger</strong></h3>

<p>Vous <strong>devez</strong> déclarer tous vos comptes bancaires, même ceux dans votre pays d'origine. Le non-respect peut entraîner des amendes importantes.</p>

<h3><strong>❌ Ne pas demander de rectification</strong></h3>

<p>Si vous êtes imposé à la source, vous avez jusqu'au <strong>31 mars de l'année suivante</strong> pour demander une rectification et récupérer l'impôt payé en trop.</p>

<h3><strong>❌ Ignorer le 3ème pilier</strong></h3>

<p>Beaucoup d'expatriés découvrent le pilier 3a trop tard. Vous ne pouvez pas rattraper les années manquées !</p>

<br/>

<hr style="margin: 40px 0; border: none; border-top: 2px solid #e5e7eb;"/>

<h1><strong>🇬🇧 ENGLISH</strong></h1>

<br/>

<p>Congratulations on your move to Switzerland! If you've just arrived and are wondering how the Swiss tax system works, you're in the right place. This guide will walk you through your <strong>first tax return</strong> step by step.</p>

<br/>

<h2><strong>Do I Need to File a Tax Return?</strong></h2>

<br/>

<p>The answer depends on your situation:</p>

<h3><strong>If You're Taxed at Source (Quellensteuer)</strong></h3>

<p>If you have a <strong>B permit</strong> and earn <strong>less than CHF 120,000 per year</strong>, you're probably taxed at source. This means your employer deducts tax directly from your salary each month.</p>

<p><strong>Good news:</strong> Even if you're not required to file a full return, you can request a <strong>source tax correction</strong> to claim deductions and potentially get a <strong>refund</strong>.</p>

<h3><strong>You Must File a Tax Return If:</strong></h3>

<ul>
<li>You earn <strong>more than CHF 120,000 per year</strong> (gross)</li>
<li>You have <strong>additional income</strong> (real estate, self-employment, etc.)</li>
<li>You own <strong>taxable assets</strong> exceeding CHF 80,000 (varies by canton)</li>
<li>You have a <strong>C permit</strong> (permanent residence)</li>
</ul>

<br/>

<h2><strong>Key Deadlines</strong></h2>

<br/>

<p>Tax deadlines vary by canton, but here's an overview:</p>

<table>
<thead>
<tr>
<th>Canton</th>
<th>Standard Deadline</th>
<th>Extension Available</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vaud</td>
<td>March 15</td>
<td>Until September 30 (free)</td>
</tr>
<tr>
<td>Geneva</td>
<td>March 31</td>
<td>Until November 30</td>
</tr>
<tr>
<td>Valais</td>
<td>March 31</td>
<td>Until September 30</td>
</tr>
</tbody>
</table>

<br/>

<h2><strong>Required Documents</strong></h2>

<br/>

<p>Gather these documents <strong>before you start</strong>:</p>

<h3><strong>Income</strong></h3>
<ul>
<li>Salary certificate (<em>Lohnausweis</em>) from your employer</li>
<li>Unemployment benefits statement (if applicable)</li>
<li>Investment income (interest, dividends)</li>
</ul>

<h3><strong>Assets</strong></h3>
<ul>
<li>Bank statements as of <strong>December 31</strong> (all accounts in Switzerland AND abroad)</li>
<li>Value of your car</li>
<li>Investment portfolio (stocks, crypto, etc.)</li>
</ul>

<h3><strong>Deductions</strong></h3>
<ul>
<li>Pillar 3a certificate</li>
<li>Health insurance premiums</li>
<li>Commuting costs</li>
<li>Professional development costs</li>
<li>Childcare expenses</li>
</ul>

<br/>

<h2><strong>Deductions You Shouldn't Miss</strong></h2>

<br/>

<p>As an expat, here are the most important deductions:</p>

<h3><strong>1. Pillar 3a (Third Pillar)</strong></h3>

<p>This is THE most advantageous deduction in Switzerland. In 2026, you can deduct up to <strong>CHF 7,258</strong> if you're employed. This amount is 100% deductible from your taxable income.</p>

<p><strong>Tip:</strong> Open a 3a account as soon as you arrive. Even if you're only staying a few years, it's an excellent tax investment.</p>

<h3><strong>2. Professional Expenses</strong></h3>

<ul>
<li><strong>Transport:</strong> Public transport pass OR CHF 0.70/km by car (capped)</li>
<li><strong>Meals:</strong> Flat rate of CHF 15-30/day depending on canton if you eat out</li>
<li><strong>Work clothes:</strong> If your employer doesn't provide them</li>
</ul>

<h3><strong>3. Training Costs</strong></h3>

<p>Training related to your professional activity is deductible (language courses, certifications, etc.).</p>

<h3><strong>4. Childcare Costs</strong></h3>

<p>Up to <strong>CHF 10,000-25,000</strong> per child depending on the canton for daycare or after-school care.</p>

<br/>

<h2><strong>Common Mistakes Expats Make</strong></h2>

<br/>

<h3><strong>❌ Forgetting Foreign Accounts</strong></h3>

<p>You <strong>must</strong> declare all your bank accounts, even those in your home country. Non-compliance can result in significant fines.</p>

<h3><strong>❌ Not Requesting a Correction</strong></h3>

<p>If you're taxed at source, you have until <strong>March 31 of the following year</strong> to request a correction and recover overpaid taxes.</p>

<h3><strong>❌ Ignoring Pillar 3a</strong></h3>

<p>Many expats discover pillar 3a too late. You cannot catch up on missed years!</p>

<br/>

<h2><strong>Ready to File Your Tax Return? | Prêt à remplir votre déclaration ?</strong></h2>

<br/>

<p>At NeoFidu, we specialize in helping expats navigate the Swiss tax system. Our English-speaking team handles everything for you, ensuring you claim all eligible deductions.</p>

<p>Chez NeoFidu, nous accompagnons les expatriés dans le système fiscal suisse. Notre équipe anglophone s'occupe de tout pour vous, en s'assurant que vous bénéficiez de toutes les déductions possibles.</p>

<p style="text-align: center; margin: 30px 0;">
<a href="/demande" style="display: inline-block; padding: 18px 40px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1.1em;">Start Your Tax Return / Commencer ma déclaration →</a>
</p>

<p style="text-align: center; color: #666;"><strong>From CHF 50 | À partir de CHF 50</strong><br/>10 business days | 10 jours ouvrés</p>
    `,
    category: "expatries",
    date: "2026-03-12",
    readTime: 12,
  },
  {
    id: "19",
    slug: "impot-gain-immobilier-suisse-guide-complet",
    title: "Impôt sur le gain immobilier en Suisse : guide complet 2026",
    titleEn: "Real Estate Capital Gains Tax in Switzerland: Complete 2026 Guide",
    excerpt:
      "Vous vendez un bien immobilier en Suisse ? Découvrez comment calculer l'impôt sur le gain immobilier (IGI), les taux par canton et les astuces pour réduire votre facture fiscale.",
    excerptEn: "Selling property in Switzerland? Learn how to calculate real estate capital gains tax, rates by canton, and tips to reduce your tax bill.",
    keywords: ["impôt gain immobilier", "plus-value immobilière", "vente immobilier Suisse", "IGI", "capital gains tax Switzerland", "property sale tax"],
    content: `
<p>La vente d'un bien immobilier en Suisse peut générer un bénéfice important. Mais attention : ce gain est imposable ! L'impôt sur le gain immobilier (IGI) est un impôt cantonal qui peut représenter une somme significative si vous n'êtes pas bien préparé. Dans ce guide, nous vous expliquons tout ce que vous devez savoir pour anticiper et optimiser votre situation fiscale lors de la vente de votre bien.</p>

<br/>

<h2><strong>Qu'est-ce que l'impôt sur le gain immobilier ?</strong></h2>

<br/>

<p>L'impôt sur le gain immobilier, parfois appelé impôt sur la plus-value immobilière, est prélevé lors de la vente d'un bien immobilier lorsque le prix de vente est supérieur au prix d'acquisition. Cet impôt est perçu par le canton où se situe le bien et s'applique aussi bien aux résidences principales qu'aux résidences secondaires et aux immeubles de rendement. Contrairement à l'impôt sur le revenu, l'IGI est un impôt spécial calculé uniquement sur le bénéfice réalisé lors de la transaction.</p>

<br/>

<h2><strong>Comment se calcule le gain immobilier ?</strong></h2>

<br/>

<p>Le calcul du gain imposable suit une logique simple :</p>

<p style="text-align: center; font-size: 1.1em; padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 20px 0;">
Gain imposable = Prix de vente − Prix d'acquisition − Frais déductibles
</p>

<br/>

<h3><strong>Le prix de vente</strong></h3>

<p>C'est le montant effectivement perçu lors de la vente, tel qu'indiqué dans l'acte notarié. Si vous vendez avec une reprise de dette hypothécaire, celle-ci est ajoutée au prix de vente.</p>

<br/>

<h3><strong>Le prix d'acquisition</strong></h3>

<p>Il comprend le prix d'achat initial, mais aussi les frais liés à l'acquisition : frais de notaire lors de l'achat, droits de mutation payés à l'époque, et commission d'agence à l'achat si applicable. Si vous avez hérité ou reçu le bien en donation, le prix d'acquisition correspond généralement à la valeur fiscale au moment du transfert.</p>

<br/>

<h3><strong>Les frais déductibles</strong></h3>

<p>Plusieurs dépenses peuvent être déduites du gain pour réduire l'impôt :</p>

<ul>
<li>Travaux de plus-value (rénovations, agrandissements, transformations)</li>
<li>Frais de vente (commission de courtage, publicité)</li>
<li>Frais de notaire lors de la vente</li>
<li>Impôt sur les successions ou donations payé sur le bien</li>
</ul>

<p>Attention : les travaux d'entretien courant (peinture, petites réparations) ne sont généralement pas déductibles. Seuls les travaux qui augmentent la valeur du bien le sont.</p>

<br/>

<h2><strong>Les taux d'imposition par canton</strong></h2>

<br/>

<p>Chaque canton fixe ses propres taux. Voici un aperçu pour la Suisse romande :</p>

<table>
<thead>
<tr>
<th>Canton</th>
<th>Taux de base</th>
<th>Particularités</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vaud</td>
<td>Jusqu'à 30%</td>
<td>Réduction progressive selon durée de détention</td>
</tr>
<tr>
<td>Genève</td>
<td>Jusqu'à 50%</td>
<td>Taux dégressif, exonération possible après 25 ans</td>
</tr>
<tr>
<td>Valais</td>
<td>Jusqu'à 25%</td>
<td>Parmi les plus avantageux de Suisse romande</td>
</tr>
<tr>
<td>Fribourg</td>
<td>Jusqu'à 22%</td>
<td>Taux modérés avec réductions progressives</td>
</tr>
<tr>
<td>Neuchâtel</td>
<td>Jusqu'à 28%</td>
<td>Système similaire à Vaud</td>
</tr>
<tr>
<td>Jura</td>
<td>Jusqu'à 25%</td>
<td>Réductions selon durée de propriété</td>
</tr>
</tbody>
</table>

<br/>

<h2><strong>L'importance de la durée de détention</strong></h2>

<br/>

<p>C'est le facteur clé pour réduire votre impôt. Plus vous possédez votre bien longtemps, moins vous payez d'impôt. Le principe est simple : les cantons veulent décourager la spéculation à court terme. Une vente rapide après l'achat sera donc davantage taxée qu'une vente après de nombreuses années de propriété.</p>

<p>Voici comment cela fonctionne généralement :</p>

<ul>
<li>Moins de 2 ans : taux maximum, parfois majoré</li>
<li>2 à 5 ans : premières réductions (10 à 20%)</li>
<li>5 à 10 ans : réductions plus importantes (20 à 30%)</li>
<li>10 à 20 ans : réductions significatives (30 à 50%)</li>
<li>Plus de 25 ans : exonération totale dans certains cantons</li>
</ul>

<br/>

<h2><strong>Calculez votre impôt avec notre simulateur</strong></h2>

<br/>

<p>Pour estimer rapidement l'impôt sur le gain immobilier de votre future vente, utilisez notre outil gratuit. Notre simulateur prend en compte les taux de chaque canton romand et les réductions liées à la durée de détention.</p>

<p style="text-align: center; margin: 25px 0;">
<a href="/simulateur/gain-immobilier" style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">Accéder au simulateur IGI →</a>
</p>

<br/>

<h2><strong>Les cas d'exonération</strong></h2>

<br/>

<p>Dans certaines situations, vous pouvez être exonéré de l'impôt sur le gain immobilier.</p>

<br/>

<h3><strong>Le remploi (réinvestissement)</strong></h3>

<p>Si vous vendez votre résidence principale pour en acheter une autre en Suisse, l'imposition peut être différée. Le gain n'est pas immédiatement taxé mais reporté sur le nouveau bien. Pour bénéficier de cette exonération, le bien vendu doit être votre résidence principale, vous devez acquérir un nouveau logement principal, le réinvestissement doit se faire dans un délai raisonnable (généralement 2 ans), et le nouveau bien doit être situé en Suisse.</p>

<br/>

<h3><strong>La détention longue</strong></h3>

<p>Après 25 ans de propriété, certains cantons comme Genève accordent une exonération totale. D'autres cantons appliquent des réductions très importantes sans aller jusqu'à l'exonération complète.</p>

<br/>

<h3><strong>Les ventes à perte</strong></h3>

<p>Si vous vendez à un prix inférieur à votre prix d'acquisition (plus les frais déductibles), il n'y a pas de gain et donc pas d'impôt. Vous n'êtes malheureusement pas remboursé pour cette perte.</p>

<br/>

<h2><strong>Conseils pour optimiser votre situation</strong></h2>

<br/>

<p>Voici quelques stratégies légales pour réduire votre impôt sur le gain immobilier.</p>

<br/>

<h3><strong>Conservez tous vos justificatifs</strong></h3>

<p>Gardez précieusement les factures de tous les travaux effectués sur votre bien, même les plus anciens. Ces documents peuvent faire la différence entre un gain imposable de CHF 200'000 et un gain de CHF 150'000.</p>

<br/>

<h3><strong>Planifiez le timing de la vente</strong></h3>

<p>Si vous êtes proche d'un palier de réduction (par exemple 9 ans et 8 mois de détention), il peut être avantageux d'attendre quelques mois pour passer au palier suivant et bénéficier d'une réduction supplémentaire.</p>

<br/>

<h3><strong>Étudiez l'option du remploi</strong></h3>

<p>Si vous comptez racheter un bien, le mécanisme du remploi permet de différer l'imposition. Cela peut représenter un avantage de trésorerie considérable.</p>

<br/>

<h3><strong>Faites-vous accompagner</strong></h3>

<p>Les règles varient fortement d'un canton à l'autre. Un conseiller fiscal peut vous aider à identifier toutes les déductions possibles et à choisir le meilleur moment pour vendre.</p>

<br/>

<h2><strong>Questions fréquentes</strong></h2>

<br/>

<h3><strong>Quand dois-je payer l'impôt ?</strong></h3>

<p>L'impôt est généralement dû dans les 30 jours suivant la notification de la décision de taxation. Le notaire peut parfois retenir une provision lors de la vente pour garantir le paiement.</p>

<br/>

<h3><strong>L'impôt est-il dû si je vends à ma famille ?</strong></h3>

<p>En principe oui, même en cas de vente à un membre de la famille. Cependant, les donations et successions ont des règles spécifiques. Une vente à un prix inférieur au marché peut être requalifiée partiellement en donation.</p>

<br/>

<h3><strong>Puis-je déduire les intérêts hypothécaires ?</strong></h3>

<p>Non, les intérêts hypothécaires ne sont pas déductibles du gain immobilier. Ils sont déductibles de l'impôt sur le revenu, mais c'est un autre calcul.</p>

<br/>

<h2><strong>Besoin d'aide pour votre vente immobilière ?</strong></h2>

<br/>

<p>Vendre un bien immobilier implique de nombreuses considérations fiscales. Chez NeoFidu, nous accompagnons les propriétaires dans l'optimisation de leur situation fiscale. Nous pouvons vous aider à estimer précisément votre impôt sur le gain immobilier, identifier toutes les déductions possibles, évaluer l'opportunité d'un remploi, et préparer votre déclaration après la vente.</p>

<p><a href="/demande">Contactez-nous pour un accompagnement personnalisé →</a></p>
    `,
    category: "fiscalite",
    date: "2026-03-09",
    readTime: 10,
  },
  // ... rest of the articles unchanged ...
];
