export interface ModelMetric {
  name: string;
  type: string;
  accuracy: number;
  rocAuc: number;
  trainSamples: number;
  testSamples: number;
  benignMetrics: { precision: number; recall: number; f1: number };
  phishMetrics: { precision: number; recall: number; f1: number };
  featuresDescription: string;
  datasetName: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  description: string;
  category: 'url' | 'html' | 'payment';
}

export interface DatasetKeyword {
  keyword: string;
  count: number;
  type: 'general' | 'provider' | 'credential' | 'method';
}

export interface DemoTestCase {
  id: string;
  title: string;
  url: string;
  category: 'legitimate' | 'phishing' | 'credential_harvester' | 'suspicious';
  verdict: 'VERIFIED_SAFE' | 'CRITICAL_THREAT' | 'HIGH_RISK' | 'SUSPICIOUS_WARNING';
  riskScore: number;
  urlScore: number;
  htmlScore: number;
  paymentScore: number;
  provider: string;
  detectedSignals: {
    highRisk: string[];
    mediumRisk: string[];
    safeSignals: string[];
  };
  details: {
    ssl: boolean;
    domainAge: string;
    formAction: string;
    iframeCount: number;
    sensitiveFields: string[];
    scriptCount: number;
    providerMismatch: boolean;
  };
}

export const URL_MODEL_DATA: ModelMetric = {
  name: 'URL Intelligence Model',
  type: 'Linear Support Vector Machine (Linear SVM)',
  accuracy: 0.96,
  rocAuc: 0.9923,
  trainSamples: 498255,
  testSamples: 168060,
  benignMetrics: {
    precision: 0.95,
    recall: 0.98,
    f1: 0.96,
  },
  phishMetrics: {
    precision: 0.98,
    recall: 0.93,
    f1: 0.96,
  },
  featuresDescription: 'Character n-gram TF-IDF representations + lexical structure metrics (entropy, subdomains, token ratios, digit densities)',
  datasetName: 'PhreshPhish Benchmark Dataset',
};

export const HTML_MODEL_DATA: ModelMetric = {
  name: 'HTML Intelligence Model',
  type: 'Gradient Boosted Decision Trees (XGBoost V2)',
  accuracy: 0.96,
  rocAuc: 0.991,
  trainSamples: 498255,
  testSamples: 168060,
  benignMetrics: {
    precision: 0.93,
    recall: 0.99,
    f1: 0.96,
  },
  phishMetrics: {
    precision: 0.99,
    recall: 0.92,
    f1: 0.95,
  },
  featuresDescription: '56 Structural, Security, and Resource distribution vectors extracted from deep DOM inspection',
  datasetName: 'PhreshPhish Structural Corpus',
};

export const HTML_FEATURE_IMPORTANCES: FeatureImportance[] = [
  { feature: 'external_domains', importance: 0.234460, description: 'Count and ratio of remote third-party domains referenced in page assets', category: 'html' },
  { feature: 'url_questions', importance: 0.108487, description: 'Occurrence count of query parameter question marks indicating obfuscated redirections', category: 'url' },
  { feature: 'url_slashes', importance: 0.069949, description: 'Path depth and slash frequency commonly used in spoofed subdirectories', category: 'url' },
  { feature: 'path_length', importance: 0.052366, description: 'Total character length of URL path component', category: 'url' },
  { feature: 'https', importance: 0.044095, description: 'Transport layer security flag (HTTPS presence does not establish gateway legitimacy)', category: 'url' },
  { feature: 'query_length', importance: 0.041049, description: 'Payload size inside URL query string parameters', category: 'url' },
  { feature: 'url_equals', importance: 0.032607, description: 'Density of key-value query assignments and nested redirect parameters', category: 'url' },
  { feature: 'subdomain_count', importance: 0.024959, description: 'Number of nested subdomains used to mimic brand names', category: 'url' },
  { feature: 'link_count', importance: 0.024399, description: 'Total anchor tags and internal vs external linking balance', category: 'html' },
  { feature: 'url_digits', importance: 0.018507, description: 'Entropy and frequency of numerical characters within domain and path', category: 'url' },
];

export const PAYMENT_FEATURES_LIST = [
  { name: 'payment_form_present', type: 'Boolean', desc: 'Identifies presence of checkout/transaction action forms' },
  { name: 'card_input', type: 'Boolean', desc: 'Detects credit/debit card number input field patterns' },
  { name: 'cvv_input', type: 'Boolean', desc: 'Detects 3/4-digit security code inputs' },
  { name: 'expiry_input', type: 'Boolean', desc: 'Detects MM/YY expiration date selector/input fields' },
  { name: 'upi_input', type: 'Boolean', desc: 'Detects UPI ID / VPA handle input fields (@okaxis, @okhdfc, etc.)' },
  { name: 'otp_input', type: 'Boolean', desc: 'Detects 4-8 digit One-Time-Password intercept fields' },
  { name: 'payment_word_count', type: 'Integer', desc: 'Frequency of financial checkout lexicon across DOM' },
  { name: 'card_word_count', type: 'Integer', desc: 'Occurrences of Visa, Mastercard, RuPay, Amex terms' },
  { name: 'cvv_word_count', type: 'Integer', desc: 'Occurrences of CVV/CVC/CID security terminology' },
  { name: 'expiry_word_count', type: 'Integer', desc: 'Occurrences of Valid Thru/Expiration terminology' },
  { name: 'form_count', type: 'Integer', desc: 'Total form tags present on the page' },
  { name: 'input_count', type: 'Integer', desc: 'Total interactive input fields' },
  { name: 'button_count', type: 'Integer', desc: 'Total submission/trigger buttons' },
  { name: 'form_domain_count', type: 'Integer', desc: 'Number of distinct domains handling form submissions' },
  { name: 'external_form', type: 'Boolean', desc: 'CRITICAL: Form action points to foreign host different from address bar' },
  { name: 'iframe_count', type: 'Integer', desc: 'Total embedded iframes' },
  { name: 'iframe_domain_count', type: 'Integer', desc: 'Distinct host domains serving nested iframes' },
  { name: 'provider_count', type: 'Integer', desc: 'Recognized payment provider SDK signatures' },
  { name: 'provider_page_count', type: 'Integer', desc: 'Branded payment logos/assets rendered' },
  { name: 'provider_domain_match', type: 'Boolean', desc: 'Page host matches declared payment provider infrastructure' },
  { name: 'provider_mismatch', type: 'Boolean', desc: 'CRITICAL: Branded as Stripe/Razorpay but hosted on arbitrary server' },
  { name: 'card_cvv_combo', type: 'Boolean', desc: 'Simultaneous harvesting of primary account number and CVV' },
  { name: 'card_expiry_combo', type: 'Boolean', desc: 'Simultaneous harvesting of card and expiry date' },
  { name: 'sensitive_payment_combo', type: 'Boolean', desc: 'Full credential set (PAN + Expiry + CVV) collected in plain form' },
  { name: 'otp_payment_combo', type: 'Boolean', desc: 'Payment page immediately requesting 2FA SMS/Email OTP' },
  { name: 'script_count', type: 'Integer', desc: 'Total JavaScript script tags loaded' },
  { name: 'redirect_count', type: 'Integer', desc: 'Meta refreshes and client-side window.location triggers' },
  { name: 'eval_count', type: 'Integer', desc: 'Dynamic code execution (eval, Function constructor) count' },
  { name: 'base64_count', type: 'Integer', desc: 'Obfuscated base64 inline scripts and payloads' },
  { name: 'html_length', type: 'Integer', desc: 'Raw character byte length of HTML payload' },
];

export const DATASET_KEYWORD_STATS: DatasetKeyword[] = [
  { keyword: 'payment', count: 14621, type: 'general' },
  { keyword: 'checkout', count: 9934, type: 'general' },
  { keyword: 'upi', count: 12311, type: 'method' },
  { keyword: 'otp', count: 11882, type: 'credential' },
  { keyword: 'stripe', count: 7289, type: 'provider' },
  { keyword: 'paypal', count: 7365, type: 'provider' },
  { keyword: 'cvv', count: 4590, type: 'credential' },
  { keyword: 'cvc', count: 4792, type: 'credential' },
  { keyword: 'payu', count: 1165, type: 'provider' },
  { keyword: 'razorpay', count: 207, type: 'provider' },
  { keyword: 'cashfree', count: 3, type: 'provider' },
];

export const DATASET_SPLIT_INFO = {
  totalRows: 498255,
  train: {
    total: 498255,
    benign: 276729,
    phish: 221526,
    benignPercent: 55.54,
    phishPercent: 44.46,
  },
  test: {
    total: 168060,
    benign: 91260,
    phish: 76800,
    benignPercent: 54.30,
    phishPercent: 45.70,
  },
  overlap: 0.00,
  duplicateRows: 0,
  source: 'PhreshPhish Benchmark Corpus',
  disjointIntegrity: 'Strict zero-leakage disjoint split between training corpus and evaluation test set.',
};

export const DEMO_PRESETS: DemoTestCase[] = [
  {
    id: 'case-razorpay-legit',
    title: 'Legitimate Razorpay Checkout Gateway',
    url: 'https://api.razorpay.com/v1/checkout/public?order_id=ord_LkJ92hMZa109',
    category: 'legitimate',
    verdict: 'VERIFIED_SAFE',
    riskScore: 4.2,
    urlScore: 98.4,
    htmlScore: 97.1,
    paymentScore: 96.8,
    provider: 'Razorpay Software Private Limited',
    detectedSignals: {
      highRisk: [],
      mediumRisk: [],
      safeSignals: [
        'Domain matches official Razorpay API TLS certificate',
        'Direct tokenized iframe PCI-DSS compliant vault',
        'No direct form POST to untrusted foreign endpoints',
        'Subdomain and query signature cryptographically structured',
        'Valid Strict-Transport-Security (HSTS) enforced',
      ],
    },
    details: {
      ssl: true,
      domainAge: '11 Years',
      formAction: 'https://api.razorpay.com/v1/payments/create/token',
      iframeCount: 1,
      sensitiveFields: ['Card Tokenized Container'],
      scriptCount: 4,
      providerMismatch: false,
    },
  },
  {
    id: 'case-hdfc-phish',
    title: 'Spoofed Bank UPI & NetBanking Harvester',
    url: 'https://hdfc-netbanking-verify-secure.site/pay/quick-auth?session=910822',
    category: 'phishing',
    verdict: 'CRITICAL_THREAT',
    riskScore: 96.8,
    urlScore: 94.2,
    htmlScore: 95.7,
    paymentScore: 98.9,
    provider: 'Claimed: HDFC Bank (Fake)',
    detectedSignals: {
      highRisk: [
        'Domain registered on disposable .site TLD with brand impersonation',
        'Plaintext OTP & NetBanking password harvesting fields',
        'Form action transmits financial credentials to unverified server: http://194.87.144.29/drop.php',
        'Missing authorized banking origin headers and Content-Security-Policy',
        'Suspicious base64 payload detected in DOM header',
      ],
      mediumRisk: [
        'HTTPS certificate active but issued via automated free CA 24 hours ago',
        'Inline event handlers disabling right-click and DOM inspection',
      ],
      safeSignals: [
        'HTTPS connection established',
      ],
    },
    details: {
      ssl: true,
      domainAge: '2 Days',
      formAction: 'http://194.87.144.29/drop.php',
      iframeCount: 0,
      sensitiveFields: ['Customer ID', 'IPIN Password', 'Debit Card PIN', 'SMS OTP'],
      scriptCount: 12,
      providerMismatch: true,
    },
  },
  {
    id: 'case-stripe-harvester',
    title: 'Deceptive Stripe Checkout Impersonation',
    url: 'https://stripe-payment-gate-secure-update.cc/checkout/express-pay',
    category: 'credential_harvester',
    verdict: 'CRITICAL_THREAT',
    riskScore: 94.5,
    urlScore: 91.0,
    htmlScore: 93.4,
    paymentScore: 97.2,
    provider: 'Claimed: Stripe Payments (Fake)',
    detectedSignals: {
      highRisk: [
        'Provider/Domain Mismatch: Page displays Stripe UI but resides on .cc domain',
        'Sensitive payment combo: PAN + Expiry + CVV requested in plain un-tokenized DOM',
        'Form POST destination routed to external unverified VPS',
        'Excessive URL subdomains mimicking authentic payment routing',
      ],
      mediumRisk: [
        'Stripe CSS and SVGs hotlinked directly from CDN without Stripe.js SDK init',
        'Obfuscated script timer detecting automated bots',
      ],
      safeSignals: [
        'Valid TLS certificate present',
      ],
    },
    details: {
      ssl: true,
      domainAge: '6 Days',
      formAction: 'https://cdn-collect-engine.cc/api/v1/harvest',
      iframeCount: 0,
      sensitiveFields: ['Card Number', 'CVV / CVC', 'Cardholder Name', 'Expiry Date', 'Billing Zip'],
      scriptCount: 7,
      providerMismatch: true,
    },
  },
  {
    id: 'case-suspicious-shop',
    title: 'Suspicious Third-Party Checkout (Unverified)',
    url: 'https://global-flash-deals-clearance24.top/order/checkout?deal_id=8841',
    category: 'suspicious',
    verdict: 'SUSPICIOUS_WARNING',
    riskScore: 68.4,
    urlScore: 65.0,
    htmlScore: 71.2,
    paymentScore: 69.1,
    provider: 'Generic Direct Form',
    detectedSignals: {
      highRisk: [
        'High entropy domain on non-standard TLD (.top) with high threat score',
        'Direct credit card capture without recognized third-party payment gateway SDK',
      ],
      mediumRisk: [
        'Multiple remote scripts loaded from mixed unknown origins',
        'Form destination is relative path without clear merchant identification',
        'Redirect count exceeds standard e-commerce checkout flow threshold',
      ],
      safeSignals: [
        'HTTPS active',
        'No known blacklist signatures triggered yet',
      ],
    },
    details: {
      ssl: true,
      domainAge: '18 Days',
      formAction: '/process/order-submit',
      iframeCount: 2,
      sensitiveFields: ['Card Number', 'CVV', 'Billing Address'],
      scriptCount: 15,
      providerMismatch: false,
    },
  },
];

export const RESEARCH_ROADMAP = [
  { phase: 'Phase 01', name: 'URL Intelligence Model', status: 'IMPLEMENTED', description: 'Linear SVM on TF-IDF character features with 96% accuracy and 0.9923 ROC-AUC.', icon: 'CheckCircle2' },
  { phase: 'Phase 02', name: 'HTML Structure Intelligence', status: 'IMPLEMENTED', description: 'XGBoost on 56 structural/security DOM features with 96% accuracy and 0.991 ROC-AUC.', icon: 'CheckCircle2' },
  { phase: 'Phase 03', name: 'Payment-Specific Feature Pipeline', status: 'IMPLEMENTED', description: 'Extraction of card, CVV, OTP, UPI, and provider-mismatch heuristics across payment forms.', icon: 'CheckCircle2' },
  { phase: 'Phase 04', name: 'Risk Fusion Engine', status: 'IMPLEMENTED', description: 'Multimodal Bayesian evidence combination and calibrated threat scoring.', icon: 'CheckCircle2' },
  { phase: 'Phase 05', name: 'Runtime Behavior & Event Tracing', status: 'IN_PROGRESS', description: 'Headless browser execution analyzing DOM mutation, network calls, and event listener hooks.', icon: 'Clock' },
  { phase: 'Phase 06', name: 'Computer Vision & Visual Impersonation', status: 'PLANNED', description: 'Visual similarity inspection to detect counterfeit checkout templates via Siamese CNNs (Not claimed as implemented).', icon: 'Sparkles' },
  { phase: 'Phase 07', name: 'Threat Intelligence Live Enrichment', status: 'PLANNED', description: 'Real-time telemetry feeds connecting ASN reputation, certificate transparency logs, and domain age.', icon: 'Radio' },
  { phase: 'Phase 08', name: 'Browser Extension & Edge Interception', status: 'PLANNED', description: 'Client-side zero-latency evaluation warning consumers before submitting payment inputs.', icon: 'ShieldAlert' },
];
