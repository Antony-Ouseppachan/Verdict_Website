/**
 * Verdict Project Intelligence & Technical Knowledge Base
 * 
 * Answers user queries about Verdict, the website, architecture, 4 ML models,
 * PhreshPhish dataset benchmarks, multimodal pipeline, and payment risk analysis.
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    modelType?: string;
    isStreaming?: boolean;
  };
}

export const SYSTEM_PROMPT = `You are Verdict Intelligence, the official technical assistant for the Verdict project.

Verdict is an AI-assisted browser security and payment-page risk analysis platform.

You answer user queries explaining:
* What Verdict is and why it was built
* How the multimodal detection pipeline works end-to-end
* The 4 ML models (URL SVM, HTML XGBoost V2, Payment Risk XGBoost, Logistic Regression Fusion)
* Why 4 models are used instead of one monolithic classifier
* PhreshPhish dataset splits (498,255 train / 168,060 test) and benchmark performance
* Payment-specific risk analysis (why payment fields alone are not malicious)
* Transport vs Trust (why HTTPS alone does not guarantee authenticity)
* Model metrics, ROC-AUC, confusion matrices, and explainability

Always provide clear, technical, evidence-based explanations.
Never claim Verdict provides 100% detection or absolute ground-truth provider authenticity.
Verdict evaluates payment-related phishing risk.`;

export const VERDICT_KNOWLEDGE = {
  name: 'Verdict',
  tagline: 'AI-assisted payment-page risk and authenticity analysis',
  description: 'Verdict is an AI-assisted browser security platform that evaluates websites across multiple orthogonal dimensions: URL lexical patterns, HTML structural characteristics, payment-specific security signals, and a calibrated Logistic Regression risk fusion engine.',
  thresholds: {
    safe: '0.00 – 0.30 (SAFE)',
    suspicious: '0.30 – 0.70 (SUSPICIOUS)',
    highRisk: '0.70 – 1.00 (HIGH RISK)',
  },
  models: [
    {
      id: 'url_phishing_svm',
      name: 'Model 1: URL Phishing Linear SVM',
      file: 'models/url_phishing_svm.joblib',
      algorithm: 'Linear Support Vector Classifier (LinearSVC)',
      features: 'Character-level TF-IDF (ngrams 3-5, min_df 2, max_features 300,000, sublinear_tf True, class_weight balanced, C 1.0)',
      output: 'Continuous decision_function margin score',
      metrics: '96% Accuracy | 0.9923 ROC-AUC | Precision 0.98 | Recall 0.93',
    },
    {
      id: 'html_phishing_xgboost_v2',
      name: 'Model 2: HTML Phishing XGBoost V2',
      file: 'models/html_phishing_xgboost_v2.joblib',
      algorithm: 'XGBoost Classifier',
      features: '56 structural vectors from DOM parsing (external_domains, url_questions, url_slashes, path_length, external_iframes, external_forms, password_inputs, etc.)',
      output: 'HTML phishing probability (html_prob)',
      metrics: '96% Accuracy | 0.9910 ROC-AUC | Benign Precision 0.93 | Recall 0.99',
    },
    {
      id: 'payment_risk_xgboost',
      name: 'Model 3: Payment Risk XGBoost',
      file: 'models/payment_risk_xgboost.joblib',
      algorithm: 'XGBoost Classifier (400 trees, depth 6, lr 0.05, colsample 0.8, subsample 0.8)',
      features: 'Card inputs, CVV inputs, expiry selectors, UPI handles, OTP intercept fields, form action targets, iframe hosts, provider indicators, provider/domain consistency, eval/base64 density',
      output: 'Payment attack surface risk probability (payment_prob)',
      metrics: '84% Accuracy | 0.9376 ROC-AUC | Benign Precision 0.79 | Recall 0.95',
    },
    {
      id: 'risk_engine_fusion',
      name: 'Model 4: Risk Fusion Logistic Regression',
      file: 'models/risk_engine_fusion.joblib',
      algorithm: 'Logistic Regression (max_iter 1000, random_state 42)',
      featuresOrder: '1. url_score, 2. html_prob, 3. payment_prob',
      coefficients: 'url_score: 44.3535, html_prob: 7.5038, payment_prob: -1.1463, intercept: -18.5188',
      metrics: '97% Accuracy | 0.9964 ROC-AUC | Precision 0.99 | Recall 0.95 | F1 0.97',
    },
  ],
  dataset: {
    name: 'PhreshPhish Benchmark Dataset',
    train: '498,255 rows (56 Parquet shards: 276,729 benign, 221,526 phishing)',
    test: '168,060 rows (21 Parquet shards: 91,260 benign, 76,800 phishing)',
    overlap: '0 (Strict zero-leakage disjoint split)',
  },
};

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
}

/**
 * Intelligent project-focused reasoning assistant for Verdict.
 */
export function generateVerdictResponse(userQuery: string): { text: string } {
  const query = userQuery.toLowerCase().trim();

  // 0. CREATOR & AUTHOR INFORMATION
  if (
    query.includes('who created') ||
    query.includes('who made') ||
    query.includes('who developed') ||
    query.includes('who is the author') ||
    query.includes('who is the creator') ||
    query.includes('creator') ||
    query.includes('author') ||
    query.includes('developer') ||
    query.includes('antony') ||
    query.includes('ouseppachan')
  ) {
    return {
      text: `### Creator & Lead Developer

**Verdict** was created and developed by **Antony Ouseppachan**.

* **LinkedIn Profile**: [Antony Ouseppachan on LinkedIn](https://www.linkedin.com/in/antony-ouseppachan-255275207/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B7%2FCN7IwZRK6YnXb2Yz4rSA%3D%3D)

Antony engineered Verdict as an AI-assisted browser security and payment-page risk analysis platform combining 4 machine learning models (URL SVM, HTML XGBoost, Payment Risk XGBoost, and Logistic Regression Risk Fusion) to protect users from deceptive payment clones and credential harvesters.`
    };
  }

  // 1. WHAT IS VERDICT & DIFFERENTIATOR
  if (
    query.includes('what is verdict') ||
    query.includes('what does verdict do') ||
    query.includes('about verdict') ||
    query.includes('overview') ||
    query.includes('what makes verdict different') ||
    query.includes('why verdict')
  ) {
    return {
      text: `### What is Verdict?

**Verdict** is an AI-assisted browser security and payment-page risk analysis platform.

Its primary purpose is to inspect websites visited by users and evaluate whether a page is:
* **SAFE (0.00 – 0.30)**
* **SUSPICIOUS (0.30 – 0.70)**
* **HIGH RISK (0.70 – 1.00)**

---

#### Key Differentiator: Multimodal Security Analysis
Traditional security tools rely almost entirely on static URL blocklists, domain age, or binary string matching. Verdict evaluates **multiple orthogonal dimensions** in real time:

1. **Lexical URL Patterns**: Evaluates character entropy, obfuscated redirects, and deceptive subdomains with a specialized Linear SVM.
2. **HTML / DOM Structure**: Extracts 56 structural vectors (external resources, rogue forms, iframes) with XGBoost V2.
3. **Payment-Specific Security Signals**: Identifies financial forms, CVV/OTP extraction, provider mismatch, and un-vaulted input traps.
4. **Calibrated Risk Fusion**: Merges all three perspectives via Logistic Regression to produce a single calibrated risk score.
5. **Explainable Findings**: Translates model outputs into human-auditable security findings.

> **Important Standard**: Verdict is described as **"AI-assisted payment-page risk and authenticity analysis."** It evaluates payment-related phishing risk rather than claiming absolute proof of gateway ground truth.`
    };
  }

  // 2. HOW IT WORKS & END-TO-END PIPELINE
  if (
    query.includes('how does it work') ||
    query.includes('how it works') ||
    query.includes('pipeline') ||
    query.includes('flow') ||
    query.includes('dataflow') ||
    query.includes('architecture') ||
    query.includes('end to end') ||
    query.includes('user flow')
  ) {
    return {
      text: `### How Verdict Works: End-to-End Pipeline

The Verdict detection and protection workflow operates across 6 sequential stages:

\`\`\`
Browser Visited URL
       │
       ▼
1. URL Lexical Extraction ───────────► URL Phishing SVM (LinearSVC)
       │                                     │ (url_score)
       ▼                                     │
2. DOM & Resource Parsing ───────────► HTML Phishing XGBoost V2
       │                                     │ (html_prob)
       ▼                                     │
3. Payment Surface Analysis ─────────► Payment Risk XGBoost
                                             │ (payment_prob)
                                             ▼
                              4. Risk Fusion Logistic Regression
                                             │
                                             ▼
                                     5. Final Risk Score
                                  (0.00 - 1.00 Calibrated)
                                             │
                                             ▼
                               6. Explainable Telemetry & Verdict
                               (SAFE | SUSPICIOUS | HIGH RISK)
\`\`\`

#### Detailed Stage Breakdown:
1. **URL Inspection**: Evaluates character n-grams (3-5), digit density, and subdomain counts.
2. **DOM Feature Extraction**: Parses 56 structural vectors including remote script ratios, external iframes, and form action targets.
3. **Payment Heuristic Analysis**: Checks if financial fields (Card, Expiry, CVV, OTP, UPI) are properly isolated in tokenized PCI-DSS iframes or collected in plain DOM.
4. **Evidence Fusion**: Combines the 3 model outputs in fixed order: \`[url_score, html_prob, payment_prob]\`.
5. **Decision Output**: Determines whether the interaction is Safe, Suspicious, or High Risk with clear evidentiary explanations.`
    };
  }

  // 3. THE 4 MACHINE LEARNING MODELS
  if (
    query.includes('model') ||
    query.includes('models') ||
    query.includes('svm') ||
    query.includes('xgboost') ||
    query.includes('fusion model') ||
    query.includes('4 models') ||
    query.includes('four models') ||
    query.includes('logistic regression')
  ) {
    return {
      text: `### The 4 Machine Learning Models in Verdict

Verdict uses **four specialized, complementary models** located in the \`models/\` directory:

---

#### 1. URL Phishing SVM (\`url_phishing_svm.joblib\`)
* **Algorithm**: Linear Support Vector Classifier (\`LinearSVC\`)
* **Features**: Character-level TF-IDF (ngrams: 3–5, \`min_df=2\`, \`max_features=300,000\`, \`sublinear_tf=True\`, \`class_weight=balanced\`, \`C=1.0\`)
* **Output**: Continuous \`decision_function\` margin score representing lexical phishing likelihood.
* **Held-out Test Performance**: **96% Accuracy | 0.9923 ROC-AUC** (Phishing Precision: 0.98, Recall: 0.93).

#### 2. HTML Phishing XGBoost V2 (\`html_phishing_xgboost_v2.joblib\`)
* **Algorithm**: Gradient Boosted Trees (\`XGBoost\`)
* **Features**: 56 page-derived structural vectors (e.g. \`external_domains\`, \`url_questions\`, \`url_slashes\`, \`path_length\`, \`https\`, \`link_count\`, \`external_iframes\`, \`external_forms\`, \`external_scripts\`, \`password_inputs\`).
* **Output**: Probability of structural phishing indicators (\`html_prob\`).
* **Held-out Test Performance**: **96% Accuracy | 0.9910 ROC-AUC** (Benign Precision: 0.93, Recall: 0.99).

#### 3. Payment Risk XGBoost (\`payment_risk_xgboost.joblib\`)
* **Algorithm**: XGBoost Classifier (\`n_estimators=400\`, \`max_depth=6\`, \`learning_rate=0.05\`, \`subsample=0.8\`, \`colsample_bytree=0.8\`)
* **Features**: Form action targets, card/CVV/expiry/OTP/UPI inputs, provider indicators (Razorpay, Stripe, PayPal, UPI), provider/domain consistency, redirects, dynamic eval/base64 density.
* **Output**: Payment attack surface risk probability (\`payment_prob\`).
* **Held-out Test Performance**: **84% Accuracy | 0.9376 ROC-AUC**.

#### 4. Risk Fusion Logistic Regression (\`risk_engine_fusion.joblib\`)
* **Algorithm**: Calibrated Logistic Regression combining model outputs in fixed order: \`[url_score, html_prob, payment_prob]\`.
* **Learned Coefficients**: \`url_score: 44.3535\`, \`html_prob: 7.5038\`, \`payment_prob: -1.1463\`, \`intercept: -18.5188\`.
* **Held-out Benchmark**: **97% Accuracy | 0.9964 ROC-AUC** (Phishing Precision: 0.99, Recall: 0.95, F1: 0.97).`
    };
  }

  // 4. WHY NOT ONE MONOLITHIC MODEL
  if (
    query.includes('why not one model') ||
    query.includes('why 4 models') ||
    query.includes('why four models') ||
    query.includes('why separate') ||
    query.includes('monolithic') ||
    query.includes('why svm') ||
    query.includes('why xgboost')
  ) {
    return {
      text: `### Why Use 4 Specialized Models Instead of One Monolithic Model?

Each model in Verdict solves a **fundamentally different learning problem** on different feature spaces:

\`\`\`
┌──────────────────────────┬───────────────────────┬───────────────────────────────┐
│ MODEL                    │ EVIDENCE TYPE         │ SPECIALIZED ADVANTAGE         │
├──────────────────────────┼───────────────────────┼───────────────────────────────┤
│ URL Phishing SVM         │ High-dim Sparse TFIDF │ Fast, pre-fetch lexical scan  │
│ HTML Phishing XGBoost    │ Dense Continuous DOM  │ Non-linear feature combos     │
│ Payment Risk XGBoost     │ Financial Heuristics  │ Credential risk detection     │
│ Fusion Logistic Regress  │ Calibrated Probabilities│ Calibrated ensemble weighting │
└──────────────────────────┴───────────────────────┴───────────────────────────────┘
\`\`\`

#### Key Benefits of Multimodal Architecture:
1. **Independent Perspectives**: A deceptive checkout clone on a compromised legitimate host will be caught by the Payment model even if the URL looks benign.
2. **Fast Pre-Fetch Triage**: The URL SVM can evaluate strings in sub-millisecond time before the entire page payload is downloaded.
3. **No Feature Entanglement**: Tree models (XGBoost) excel on tabular/continuous DOM metrics, while Linear SVMs excel on ultra-high-dimensional character n-gram matrices (300,000 features).
4. **Full Explainability**: Enables transparent explanations (e.g., "The URL is clean, but the DOM contains a foreign form target impersonating Razorpay").`
    };
  }

  // 5. DATASET & PHRESHPHISH SPLIT
  if (
    query.includes('dataset') ||
    query.includes('phreshphish') ||
    query.includes('training data') ||
    query.includes('test data') ||
    query.includes('samples') ||
    query.includes('shards') ||
    query.includes('corpus')
  ) {
    return {
      text: `### Dataset & Benchmark Corpus: PhreshPhish

Verdict was developed and rigorously evaluated on the **PhreshPhish** benchmark dataset across strictly disjoint partitions:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ PHRESHPHISH DATASET SPECIFICATIONS                          │
├──────────────────────┬──────────────────────┬───────────────┤
│ METRIC               │ TRAINING CORPUS      │ TEST SET      │
├──────────────────────┼──────────────────────┼───────────────┤
│ Total Records        │ 498,255 rows         │ 168,060 rows  │
│ Parquet Shards       │ 56 shards            │ 21 shards     │
│ Benign Samples       │ 276,729 (55.54%)     │ 91,260 (54.3%)│
│ Phishing Samples     │ 221,526 (44.46%)     │ 76,800 (45.7%)│
│ Unique URLs          │ 498,255              │ 168,060       │
│ Train/Test Overlap   │ 0 (Disjoint)         │ 0 (Disjoint)  │
└──────────────────────┴──────────────────────┴───────────────┘
\`\`\`

#### Core Schema Columns:
* \`sha256\`: Unique cryptographic hash of raw HTML payload.
* \`url\`: Full visited target address.
* \`label\`: Ground-truth binary classification (\`0 = Benign\`, \`1 = Phishing\`).
* \`target\`: Brand impersonation target if known.
* \`date\`, \`lang\`, \`lang_score\`, \`html\`: Temporal metadata and full DOM content.

#### Additional Corpora Evaluated:
* **PhiUSIIL**: Structural phishing benchmark dataset.
* **Tranco Top 1M**: Highly ranked benign baseline domains.
* **URLhaus**: Live active malware and phishing telemetry.`
    };
  }

  // 6. PAYMENT SECURITY & CVV / PROVIDER AUTHENTICITY
  if (
    query.includes('cvv') ||
    query.includes('payment') ||
    query.includes('razorpay') ||
    query.includes('stripe') ||
    query.includes('authentic') ||
    query.includes('genuine') ||
    query.includes('card field') ||
    query.includes('otp')
  ) {
    return {
      text: `### Payment Risk Heuristics & Provider Authenticity Policy

#### 1. Why Payment Signals Alone Are Not Malicious
Legitimate merchants naturally collect credit cards, display payment logos, and request billing addresses.

Therefore: **PAYMENT SIGNAL ≠ MALICIOUS BY ITSELF.**

Verdict **never** flags a page as phishing solely because a \`CVV\` or \`card_number\` field is detected.

#### 2. How Verdict Evaluates Payment Risk:
Risk is determined by the **context and combination of signals**:
* **Vaulted Tokenized Iframes vs. Raw DOM**: Authentic gateways (Razorpay, Stripe) isolate card inputs in tokenized, cross-origin PCI-DSS iframes. Malicious harvesters collect PAN, Expiry, and CVV directly in the raw page DOM.
* **Form Action Target**: Where does the form post? An authentic checkout posts to official endpoints (e.g. \`api.razorpay.com\`); a harvester posts to an unverified IP or foreign domain.
* **Provider / Host Domain Match**: If a page displays Stripe or Razorpay logos but is hosted on a disposable \`.site\` or \`.cc\` registrar domain, provider mismatch is triggered.

#### 3. Strict Provider Claim Policy
* Detecting "Razorpay" in HTML means *"the page contains indicators associated with Razorpay"*, NOT *"this is definitively authentic Razorpay"*.
* Verdict estimates **payment-related phishing risk**, not legal proof of merchant origin.`
    };
  }

  // 7. PERFORMANCE & METRICS
  if (
    query.includes('accuracy') ||
    query.includes('metric') ||
    query.includes('metrics') ||
    query.includes('roc') ||
    query.includes('auc') ||
    query.includes('precision') ||
    query.includes('recall') ||
    query.includes('confusion matrix') ||
    query.includes('performance')
  ) {
    return {
      text: `### Benchmark Performance Metrics

All evaluation metrics represent held-out evaluation on **168,060 test samples** from PhreshPhish:

\`\`\`
┌───────────────────────────┬──────────┬──────────┬───────────┬─────────┐
│ MODEL                     │ ACCURACY │ ROC-AUC  │ PHISH F1  │ PHISH REC│
├───────────────────────────┼──────────┼──────────┼───────────┼─────────┤
│ 01. URL Phishing SVM      │ 96%      │ 0.9923   │ 0.96      │ 0.93    │
│ 02. HTML XGBoost V2       │ 96%      │ 0.9910   │ 0.95      │ 0.92    │
│ 03. Payment Risk XGBoost  │ 84%      │ 0.9376   │ 0.80      │ 0.70    │
│ 04. Risk Fusion Engine    │ 97%      │ 0.9964   │ 0.97      │ 0.95    │
└───────────────────────────┴──────────┴──────────┴───────────┴─────────┘
\`\`\`

#### Fusion Model Confusion Matrix (168,060 Held-Out Samples):
* **Benign correctly identified**: 90,554 (99.23%)
* **False Positives (FP)**: 706 (0.77%)
* **Phishing correctly identified**: 73,126 (95.22%)
* **False Negatives (FN)**: 3,674 (4.78%)

> **Note**: These metrics are held-out scientific benchmark results on PhreshPhish and represent research evaluation rather than a guarantee of 100% real-world detection.`
    };
  }

  // 8. TRANSPORT VS TRUST & THREAT MODEL
  if (
    query.includes('https') ||
    query.includes('ssl') ||
    query.includes('tls') ||
    query.includes('transport') ||
    query.includes('padlock') ||
    query.includes('threat model') ||
    query.includes('problem')
  ) {
    return {
      text: `### Threat Model: Transport Security vs. Identity Trust

#### The "Green Padlock" Illusion
A common misconception is that **HTTPS (SSL/TLS)** means a website is safe.

* **HTTPS provides Transport Encryption**: It ensures traffic between browser and server cannot be eavesdropped in transit.
* **HTTPS does NOT verify Merchant Authenticity**: Free automated Certificate Authorities (Let's Encrypt, Cloudflare) issue valid TLS certificates to malicious phishing domains within seconds.

#### Modern Threat Vector: Counterfeit Payment Overlays
1. Adversaries register high-entropy or typosquat domains with free TLS certificates.
2. They replicate official payment interfaces (Razorpay, Stripe, PayPal) with pixel-perfect CSS.
3. Plaintext input fields harvest card numbers, CVVs, and 2FA OTP codes.
4. Form POST actions exfiltrate credentials to offshore drop servers.

Verdict bridges the gap between **encrypted transport** and **evidentiary authenticity**.`
    };
  }

  // 9. ROADMAP & FUTURE WORK
  if (
    query.includes('roadmap') ||
    query.includes('future') ||
    query.includes('future work') ||
    query.includes('vision') ||
    query.includes('planned')
  ) {
    return {
      text: `### Verdict Research & Technology Roadmap

The development of Verdict follows a phased engineering roadmap:

* **Phase 01 — URL Intelligence Model**: Linear SVM on TF-IDF character features (96% Acc, 0.9923 ROC-AUC) — \`[IMPLEMENTED]\`
* **Phase 02 — HTML Structural Intelligence**: XGBoost on 56 structural DOM vectors (96% Acc, 0.9910 ROC-AUC) — \`[IMPLEMENTED]\`
* **Phase 03 — Payment Heuristic Pipeline**: Extraction of card, CVV, OTP, UPI, and provider mismatch heuristics — \`[IMPLEMENTED]\`
* **Phase 04 — Risk Fusion Engine**: Multimodal Logistic Regression evidence combination — \`[IMPLEMENTED]\`
* **Phase 05 — Runtime DOM Mutation Tracing**: Headless browser execution analyzing DOM mutation hooks and event listeners — \`[IN PROGRESS]\`
* **Phase 06 — Computer Vision & Visual Impersonation**: Siamese CNN visual similarity detection comparing checkout layouts against certified templates — \`[PLANNED]\`
* **Phase 07 — Threat Intelligence Enrichment**: Live ASN reputation, Certificate Transparency logs, and domain age feeds — \`[PLANNED]\``
    };
  }

  // DEFAULT COMPREHENSIVE OVERVIEW
  return {
    text: `### Verdict Project & Technology Intelligence

I am the dedicated technical assistant for **Verdict**. I can answer any questions regarding the website, architecture, machine learning models, and security logic.

#### Key Topics You Can Ask About:
* **How Verdict Works**: End-to-end dataflow from browser extension to multimodal risk verdict.
* **The 4 ML Models**: URL Linear SVM, HTML XGBoost V2, Payment Risk XGBoost, and Logistic Regression Fusion.
* **Why 4 Models?**: Why specialized models outperform a single monolithic classifier.
* **PhreshPhish Dataset**: 498k training split, 168k test split, zero-leakage partitions.
* **Payment Security**: Why payment fields alone are not malicious, and how tokenized vaults differ from DOM harvesters.
* **Transport vs Trust**: Why HTTPS/SSL does not guarantee merchant authenticity.
* **Benchmark Metrics**: ROC-AUC (0.9964), 97% accuracy, and confusion matrices.`
  };
}
