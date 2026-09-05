import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { VerdictLogo } from '../components/VerdictLogo';
import { ShieldCheck, ShieldAlert, Play, Pause, RotateCcw, Lock, Globe, Code2, CreditCard, CheckCircle2, AlertTriangle, XCircle, Download, ArrowRight, Sparkles } from 'lucide-react';
import { useVerdictChat } from '../context/VerdictChatContext';

interface Section18Props {
  onNavigateToDownload?: () => void;
}

interface SimulationScenario {
  id: string;
  type: 'SAFE' | 'MALICIOUS';
  name: string;
  url: string;
  verdict: string;
  riskScore: number;
  urlScore: string;
  htmlScore: string;
  paymentScore: string;
  findings: {
    status: 'pass' | 'fail' | 'warn';
    category: string;
    title: string;
    desc: string;
  }[];
  details: {
    tls: string;
    hostOrigin: string;
    formTarget: string;
    providerMatch: string;
    sensitiveFields: string;
  };
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'safe',
    type: 'SAFE',
    name: 'Authentic Gateway (Razorpay Checkout)',
    url: 'https://api.razorpay.com/v1/checkout/public?order_id=ord_LkJ92hMZa109',
    verdict: 'VERIFIED AUTHENTIC',
    riskScore: 4.2,
    urlScore: '98.4% Confidence (Benign)',
    htmlScore: '97.1% Confidence (Clean DOM)',
    paymentScore: '96.8% Confidence (Authorized)',
    findings: [
      {
        status: 'pass',
        category: 'URL Intelligence',
        title: 'Cryptographic Subdomain & Clean Lexical Hierarchy',
        desc: 'Apex domain matches official Razorpay infrastructure certificate; zero deceptive character entropy.',
      },
      {
        status: 'pass',
        category: 'HTML Structure',
        title: 'PCI-DSS Tokenized Iframe Vault',
        desc: 'Card entry inputs reside inside isolated tokenized container with strict Content Security Policy.',
      },
      {
        status: 'pass',
        category: 'Payment Intelligence',
        title: 'Form Origin & Provider Matching',
        desc: 'Form submission endpoint directly routes to official verified gateway API: https://api.razorpay.com/v1/payments.',
      },
      {
        status: 'pass',
        category: 'Transport Security',
        title: 'Strict-Transport-Security (HSTS) Enforced',
        desc: 'Valid Extended Validation TLS certificate issued to Razorpay Software Private Limited.',
      },
    ],
    details: {
      tls: 'TLS 1.3 (Verified EV)',
      hostOrigin: 'api.razorpay.com (AS13335)',
      formTarget: 'https://api.razorpay.com/v1/payments',
      providerMatch: 'VERIFIED MATCH',
      sensitiveFields: 'Encrypted Token Container (No Plaintext Pan)',
    },
  },
  {
    id: 'malicious',
    type: 'MALICIOUS',
    name: 'Spoofed Impersonator (Credential Harvester)',
    url: 'https://razorpay-secure-checkout.site/pay/quick-auth?session=910822',
    verdict: 'CRITICAL THREAT — DO NOT PAY',
    riskScore: 96.8,
    urlScore: '94.2% Threat Probability',
    htmlScore: '95.7% Threat Probability',
    paymentScore: '98.9% Threat Probability',
    findings: [
      {
        status: 'fail',
        category: 'Payment Intelligence',
        title: 'Severe Provider / Host Domain Mismatch',
        desc: 'Page renders Razorpay branding & logos but is hosted on disposable .site registrar domain.',
      },
      {
        status: 'fail',
        category: 'HTML Structure',
        title: 'Rogue External Form POST Target',
        desc: 'Form action silently transmits sensitive financial payload to unverified remote IP: http://194.87.144.29/drop.php.',
      },
      {
        status: 'fail',
        category: 'Credential Harvester',
        title: 'Plaintext CVV & OTP Exfiltration Trap',
        desc: 'Raw un-vaulted input fields harvest Card Number, Expiry, CVV and SMS OTP simultaneously in plain DOM.',
      },
      {
        status: 'warn',
        category: 'URL Intelligence',
        title: 'Disposable High-Entropy TLD (.site)',
        desc: 'Domain registered 48 hours ago using automated free CA certificate to mimic authentic checkout flow.',
      },
    ],
    details: {
      tls: 'Free DV Certificate (2 Days Old)',
      hostOrigin: 'razorpay-secure-checkout.site (Disposable)',
      formTarget: 'http://194.87.144.29/drop.php (Foreign IP)',
      providerMatch: 'PROVIDER MISMATCH DETECTED',
      sensitiveFields: 'Plain PAN + CVV + SMS OTP In Raw DOM',
    },
  },
];

export const Section18InteractiveDemo: React.FC<Section18Props> = ({ onNavigateToDownload }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [currentTypedUrl, setCurrentTypedUrl] = useState<string>('');
  const [scanStep, setScanStep] = useState<number>(0); // 0: typing, 1: url scan, 2: html scan, 3: payment scan, 4: verdict
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const { askProjectTopic } = useVerdictChat();

  const scenario = SCENARIOS[activeScenarioIndex] || SCENARIOS[0];

  // Automated Typing & Scan Flow
  useEffect(() => {
    let isCancelled = false;
    setCurrentTypedUrl('');
    setScanStep(0);

    const target = scenario.url;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (isCancelled) return;
      if (charIndex <= target.length) {
        setCurrentTypedUrl(target.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        // Sequential model scanning stages
        setTimeout(() => { if (!isCancelled) setScanStep(1); }, 350); // URL model
        setTimeout(() => { if (!isCancelled) setScanStep(2); }, 850); // HTML model
        setTimeout(() => { if (!isCancelled) setScanStep(3); }, 1450); // Payment model
        setTimeout(() => { if (!isCancelled) setScanStep(4); }, 2100); // Risk Fusion Verdict

        // If auto-playing, advance to next scenario after viewing verdict
        if (isAutoPlaying) {
          setTimeout(() => {
            if (!isCancelled && isAutoPlaying) {
              setActiveScenarioIndex((prev) => (prev === 0 ? 1 : 0));
            }
          }, 7000);
        }
      }
    }, 28);

    return () => {
      isCancelled = true;
      clearInterval(typeInterval);
    };
  }, [activeScenarioIndex, isAutoPlaying, replayKey, scenario.url]);

  const restartSimulation = () => {
    setCurrentTypedUrl('');
    setScanStep(0);
    setReplayKey((k) => k + 1);
  };

  const handleSelectScenario = (index: number) => {
    setIsAutoPlaying(false);
    setActiveScenarioIndex(index);
    setReplayKey((k) => k + 1);
  };

  return (
    <section id="demo" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="18"
        tag="Interactive Demonstration"
        title="Dual Gateway Verification Simulation"
        subtitle="Watch the multimodal engine analyze an authentic payment gateway versus a deceptive phishing clone in real time."
      />

      <div className="cyber-panel p-6 md:p-10 rounded-3xl border border-slate-700 bg-[#090d16]/95 shadow-[0_0_80px_rgba(0,0,0,0.9)] mb-8">
        
        {/* Simulation Header & Scenario Toggle Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSelectScenario(0)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeScenarioIndex === 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DEMO A: AUTHENTIC GATEWAY</span>
            </button>

            <button
              onClick={() => handleSelectScenario(1)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeScenarioIndex === 1
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>DEMO B: SPOOFED PHISHING TRAP</span>
            </button>
          </div>

          {/* Playback Controls & AI Explanation Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => askProjectTopic('How does the multimodal pipeline distinguish an authentic gateway from a spoofed phishing clone?')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
              title="Ask Verdict AI to explain how this verification works"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Explain with AI</span>
            </button>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoPlaying ? 'PAUSE LOOP' : 'AUTO-PLAY'}</span>
            </button>

            <button
              onClick={restartSimulation}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
              title="Replay Current Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Browser Window Mockup */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-slate-800 bg-[#06080e] shadow-2xl">
          
          {/* Browser Address Bar */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
            </div>

            <div className="flex-1 flex items-center gap-2 bg-[#090d16] px-3.5 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 overflow-hidden">
              <Lock className={`w-3.5 h-3.5 shrink-0 ${scenario.type === 'SAFE' ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="truncate">{currentTypedUrl}</span>
              <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse shrink-0" />
            </div>

            <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              TARGET URL
            </div>
          </div>

          {/* Multi-Model Scanning Pipeline Strip */}
          <div className="p-6 bg-slate-950/60 border-b border-slate-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* URL AI Node */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                scanStep >= 1
                  ? scenario.type === 'SAFE' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="font-semibold">01 URL Model</span>
                  </div>
                  <span className="text-[10px]">{scanStep >= 1 ? 'EVALUATED' : 'WAITING'}</span>
                </div>
                <div className="text-[11px] font-sans text-slate-300">
                  {scanStep >= 1 ? scenario.urlScore : 'Parsing lexical structure...'}
                </div>
              </div>

              {/* HTML AI Node */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                scanStep >= 2
                  ? scenario.type === 'SAFE' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="font-semibold">02 HTML Model</span>
                  </div>
                  <span className="text-[10px]">{scanStep >= 2 ? 'EVALUATED' : 'WAITING'}</span>
                </div>
                <div className="text-[11px] font-sans text-slate-300">
                  {scanStep >= 2 ? scenario.htmlScore : 'Extracting 56 DOM vectors...'}
                </div>
              </div>

              {/* Payment AI Node */}
              <div className={`p-3.5 rounded-xl border transition-all ${
                scanStep >= 3
                  ? scenario.type === 'SAFE' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span className="font-semibold">03 Payment Model</span>
                  </div>
                  <span className="text-[10px]">{scanStep >= 3 ? 'EVALUATED' : 'WAITING'}</span>
                </div>
                <div className="text-[11px] font-sans text-slate-300">
                  {scanStep >= 3 ? scenario.paymentScore : 'Scanning attack surface...'}
                </div>
              </div>

            </div>
          </div>

          {/* Verdict Banner & Audited Findings */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* The Final Verdict Box */}
            <div className={`p-6 rounded-2xl border transition-all duration-500 ${
              scanStep < 4
                ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                : scenario.type === 'SAFE'
                ? 'bg-emerald-950/25 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                : 'bg-red-950/30 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <VerdictLogo size={18} />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                    VERDICT DECISION OUTPUT
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {scanStep >= 4 && (
                    <button
                      onClick={() => askProjectTopic('Explain how the multimodal pipeline verifies payment gateways and detects phishing clones')}
                      className="px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all"
                      title="Ask Verdict AI how this verification works"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Ask AI Analyst</span>
                    </button>
                  )}

                  {scanStep >= 4 && (
                    <span className={`font-mono text-xs px-3 py-1 rounded-full font-bold uppercase ${
                      scenario.type === 'SAFE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}>
                      {scenario.verdict}
                    </span>
                  )}
                </div>
              </div>

              <h3 className={`font-display text-2xl md:text-3xl font-black uppercase tracking-tight ${
                scanStep < 4
                  ? 'text-slate-500'
                  : scenario.type === 'SAFE' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {scanStep < 4 ? 'ANALYSIS IN PROGRESS...' : scenario.verdict}
              </h3>

              <div className="mt-2 text-xs font-mono text-slate-400">
                {scanStep >= 4 && (
                  <span>CALCULATED PAYMENT RISK PROBABILITY: <strong className="text-white">{scenario.riskScore}%</strong></span>
                )}
              </div>
            </div>


            {/* Granular Evidentiary Findings List */}
            {scanStep >= 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  IDENTIFIED SECURITY TELEMETRY & EVIDENTIARY SIGNALS:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {scenario.findings.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-3 ${
                        item.status === 'pass'
                          ? 'bg-emerald-950/15 border-emerald-500/30'
                          : item.status === 'fail'
                          ? 'bg-red-950/20 border-red-500/30'
                          : 'bg-amber-950/20 border-amber-500/30'
                      }`}
                    >
                      {item.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {item.status === 'fail' && <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                      {item.status === 'warn' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}

                      <div className="space-y-0.5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">{item.category}</div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[11px] text-slate-300 font-sans leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Infrastructure Drawer */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div>
                    <div className="text-slate-500 text-[10px]">HOST ORIGIN</div>
                    <div className="text-white truncate">{scenario.details.hostOrigin}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">FORM TARGET</div>
                    <div className={scenario.type === 'SAFE' ? 'text-emerald-400 truncate' : 'text-red-400 truncate'}>
                      {scenario.details.formTarget}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">PROVIDER STATUS</div>
                    <div className={scenario.type === 'SAFE' ? 'text-emerald-400' : 'text-red-400'}>
                      {scenario.details.providerMatch}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">CREDENTIAL HANDLING</div>
                    <div className="text-slate-300 truncate">{scenario.details.sensitiveFields}</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Direct Transition Strip to Download Section */}
      {onNavigateToDownload && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-cyan-950/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm">
                Ready to protect your browser in real time?
              </div>
              <div className="text-xs font-mono text-slate-400">
                Install the pre-built Manifest V3 package or spin up the full AI stack locally.
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToDownload}
            className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <span>Proceed to Download Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </section>
  );
};
