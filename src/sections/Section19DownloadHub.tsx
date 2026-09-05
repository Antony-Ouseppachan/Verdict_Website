import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { VerdictLogo } from '../components/VerdictLogo';
import {
  Download,
  Terminal,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Cpu,
  HelpCircle,
  ChevronDown,
  Zap,
  CheckCircle2,
  Code2,
  Server,
  Star,
  GitFork,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GITHUB_REPO_URL = 'https://github.com/Antony-Ouseppachan/Verdict';
const GITHUB_ZIP_URL = 'https://github.com/Antony-Ouseppachan/Verdict/archive/refs/heads/main.zip';

interface StepGuide {
  step: string;
  title: string;
  desc: string;
  actionHint?: string;
}

const EXTENSION_STEPS: StepGuide[] = [
  {
    step: '01',
    title: 'Download & Extract Archive',
    desc: 'Download the pre-bundled Verdict extension zip package and extract the contents to a local folder.',
    actionHint: 'Verdict-main.zip -> Extract Here',
  },
  {
    step: '02',
    title: 'Open Extension Manager & Enable Developer Mode',
    desc: 'Navigate to chrome://extensions or edge://extensions in your Chromium browser. Switch on the Developer mode toggle in the top-right corner.',
    actionHint: 'Developer mode [ ON ]',
  },
  {
    step: '03',
    title: 'Click "Load unpacked" & Select Folder',
    desc: 'Click the "Load unpacked" button in the top-left and select the extracted extension/ folder. Verdict zero-trust shield activates instantly.',
    actionHint: 'Load unpacked -> /Verdict/extension',
  },
];

const ChromeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#202124" />
    <path d="M12 2C6.48 2 2 6.48 2 12c0 .41.03.82.08 1.21L8.2 5.37C9.31 4.51 10.6 4 12 4h9.54C19.67 2.76 16.01 2 12 2z" fill="#EA4335" />
    <path d="M21.54 4H12c-.52 0-1.02.08-1.5.22L4.35 15.5c.98 1.54 2.45 2.72 4.19 3.32L14.7 7.21C16.32 7.73 17.5 9.22 17.5 11c0 .28-.03.56-.09.82L21.9 13.5c.06-.49.1-1 .1-1.5 0-2.92-1.25-5.55-3.26-7.39l2.8-1.61z" fill="#FBBC05" />
    <path d="M12 22c4.08 0 7.64-2.44 9.24-5.96L15.08 9.87C14.47 11.16 13.34 12 12 12c-.88 0-1.67-.38-2.22-1l-6.14 6.88C5.55 20.21 8.56 22 12 22z" fill="#34A853" />
    <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
    <circle cx="12" cy="12" r="3.5" fill="#1A73E8" />
  </svg>
);

const EdgeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="edgeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0C80DF" />
        <stop offset="100%" stopColor="#00D2FF" />
      </linearGradient>
      <linearGradient id="edgeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00C950" />
        <stop offset="100%" stopColor="#0078D7" />
      </linearGradient>
    </defs>
    <path d="M20.9 14.8c-.3-.1-1.4-.4-2.7-.4-2.8 0-4.7 1.8-4.7 4.3 0 2.5 1.8 3.3 3.6 3.3 3.8 0 4.9-3.4 4.9-5.1 0-.7-.4-1.6-1.1-2.1z" fill="url(#edgeGrad2)" />
    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.3 1.6 6.2 4.1 8 0-1.8.8-4.5 3.4-5.6 2.3-1 4.5-.4 6.3-1.6 2.4-1.6 2.7-4.1 2.7-4.7 0-3.4-2.9-6.1-6.5-6.1z" fill="url(#edgeGrad1)" />
    <path d="M8.5 14.4C6 14.4 4 16.5 4 19c0 .7.2 1.4.5 2 2.3 1.9 5.3 3 8.5 3 4.1 0 7.7-2.1 9.7-5.3-1-.6-2.4-1.1-4.2-1.1-3 0-4.8 1.4-6.4 1.4-1.5 0-2.3-.9-2.3-2 0-1.4 1-2.6 2.6-2.6.8 0 1.5.3 2.1.8l1.4-2.1c-.9-.7-2.1-1.1-3.4-1.1z" fill="#0078D7" />
  </svg>
);

const BraveIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.5 3.4 10.3 8 11.8 4.6-1.5 8-6.3 8-11.8V6l-8-4z" fill="#FB542B" />
    <path d="M12 4.2L6 7.2V12c0 3.8 2.5 7.6 6 8.8 3.5-1.2 6-5 6-8.8V7.2l-6-3z" fill="#FF7654" />
    <path d="M12 8l-3 3.5 1.2 1.5L12 11.8l1.8 1.2 1.2-1.5L12 8z" fill="#FFFFFF" />
    <path d="M9 14.5c.8.9 1.9 1.5 3 1.5s2.2-.6 3-1.5l-1-1c-.5.6-1.2.9-2 .9s-1.5-.3-2-.9l-1 1z" fill="#FFFFFF" />
  </svg>
);

const ArcIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF416C" />
        <stop offset="50%" stopColor="#FF4B2B" />
        <stop offset="100%" stopColor="#8A2387" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#arcGrad)" />
    <path d="M12 5a7 7 0 0 1 7 7 7 7 0 0 1-7 7A7 7 0 0 1 5 12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
  </svg>
);

const OperaIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="9" ry="10" fill="#FF1B2D" />
    <ellipse cx="12" cy="12" rx="4.5" ry="7" fill="#070b14" />
    <path d="M12 2C7.03 2 3 6.48 3 12s4.03 10 9 10 9-4.48 9-10S16.97 2 12 2zm0 17c-3.04 0-5.5-3.13-5.5-7S8.96 5 12 5s5.5 3.13 5.5 7-2.46 7-5.5 7z" fill="#FF1B2D" />
  </svg>
);

const VivaldiIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#EF3939" />
    <path d="M12 17.5l-4.5-9h2.8l2.2 4.8 2.2-4.8H17.5l-4.5 9h-1z" fill="#FFFFFF" />
  </svg>
);

const COMPATIBLE_BROWSERS = [
  { name: 'Google Chrome', version: 'v108+', badge: 'Optimal', icon: <ChromeIcon /> },
  { name: 'Microsoft Edge', version: 'v108+', badge: 'Verified', icon: <EdgeIcon /> },
  { name: 'Brave Browser', version: 'Latest', badge: 'Verified', icon: <BraveIcon /> },
  { name: 'Arc Browser', version: 'Latest', badge: 'Verified', icon: <ArcIcon /> },
  { name: 'Opera / GX', version: 'Latest', badge: 'Verified', icon: <OperaIcon /> },
  { name: 'Vivaldi', version: 'Latest', badge: 'Verified', icon: <VivaldiIcon /> },
];

const FAQ_ITEMS = [
  {
    q: 'How do I update the extension when the codebase changes?',
    a: 'Simply open chrome://extensions (or edge://extensions) in your browser, find the Verdict card, and click the circular Reload icon. The updated Manifest V3 background worker and content scripts reload in under 100ms.',
  },
  {
    q: 'Does Verdict require the Python AI backend running at all times?',
    a: 'Yes, for the full 4-model multi-modal inference pipeline (URL SVM, HTML DOM XGBoost, and Payment Gateway classification on http://127.0.0.1:8000). If the backend is paused, the extension operates in rapid heuristic-only fallback mode.',
  },
  {
    q: 'Can I run Verdict in Incognito / Private Browsing mode?',
    a: 'Yes! In chrome://extensions, click "Details" under the Verdict card, then scroll down and toggle on "Allow in incognito" to protect confidential payment checkouts in private tabs.',
  },
  {
    q: 'What if the AI Backend encounters a port 8000 conflict?',
    a: 'If another service is using port 8000, start uvicorn with --port 8001 (e.g. uvicorn backend.main:app --port 8001 --reload) and update the API_BASE_URL inside extension/config.ts. You can verify live health via Swagger docs at http://127.0.0.1:8000/docs.',
  },
  {
    q: 'Are any passwords or credit card numbers sent over the internet?',
    a: 'Never. Verdict is designed under a strict Zero-Trust local architecture. All DOM parsing, lexical tokenization, and AI tensor evaluations run locally inside your browser and local machine on 127.0.0.1. No payment data or keystrokes ever leave your device.',
  },
];

export const Section19DownloadHub: React.FC = () => {
  const [osTab, setOsTab] = useState<'win' | 'unix'>('win');
  const [activeStackTab, setActiveStackTab] = useState<'backend' | 'extension' | 'console'>('backend');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeQuickStep, setActiveQuickStep] = useState<number>(0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const gitCloneCommand = `git clone ${GITHUB_REPO_URL}.git\ncd Verdict`;

  const stackCommands = {
    backend: {
      title: 'Step 1: Start AI Engine (Port 8000)',
      tag: 'FastAPI + 4 ML Models',
      port: '8000',
      win: `cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload`,
      unix: `cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload`,
    },
    extension: {
      title: 'Step 2: Build & Load Extension',
      tag: 'Manifest V3 Shield',
      port: 'Browser Unpacked',
      win: `cd extension
npm install
npm run build
# Load the 'extension' directory in chrome://extensions -> 'Load unpacked'`,
      unix: `cd extension
npm install
npm run build
# Load the 'extension' directory in chrome://extensions -> 'Load unpacked'`,
    },
    console: {
      title: 'Step 3: Launch SOC Console (Optional)',
      tag: 'React 19 Security Cockpit',
      port: '5174',
      win: `cd console
npm install
npm run dev`,
      unix: `cd console
npm install
npm run dev`,
    },
  };

  const currentStackCmd = stackCommands[activeStackTab][osTab];

  return (
    <section id="download" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="19"
        tag="Deployment & Run Locally"
        title="Get Verdict / Run Defense Stack"
        subtitle="Deploy zero-trust browser protection in two clicks, or orchestrate the complete local multi-model AI decision engine and SOC console from source."
      />

      {/* Top Banner / GitHub Live Badge Strip */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#090d18]/90 border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <VerdictLogo size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-sm">Verdict Core Repository</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                v2.4 Production
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Antony-Ouseppachan/Verdict • Open Source MIT Security Core
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 font-mono text-xs transition-all cursor-pointer shadow-sm"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>Star on GitHub</span>
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 font-mono text-xs transition-all cursor-pointer shadow-sm"
          >
            <GitFork className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fork Repo</span>
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400 font-mono text-xs font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <span>View Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Dual-Path Installation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
        
        {/* ================= OPTION A: QUICK BROWSER SETUP ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between cyber-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0a1120]/95 via-[#070b14]/95 to-[#05070d]/95 relative overflow-hidden group">
          
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-emerald-500/20 transition-all duration-500" />

          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Zap className="w-3.5 h-3.5" />
                OPTION A: QUICK SETUP
              </span>
              <span className="font-mono text-[11px] text-slate-400">~2 Mins to Launch</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Pre-built Extension ZIP
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Instant zero-trust browser protection. Download the pre-compiled Manifest V3 bundle and load directly into any Chromium browser.
            </p>

            {/* Primary Action Button */}
            <div className="space-y-3 mb-8">
              <a
                href={GITHUB_ZIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-display font-extrabold text-base tracking-wide hover:brightness-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer group/btn"
              >
                <Download className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" />
                <span>Download Extension (.zip)</span>
                <span className="ml-auto px-2 py-0.5 rounded bg-slate-950/20 text-slate-950 font-mono text-xs font-bold">
                  v2.4 ZIP
                </span>
              </a>

              <div className="flex items-center justify-between px-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Pre-compiled MV3 bundle
                </span>
                <span className="text-slate-500">Zero Node build required</span>
              </div>
            </div>

            {/* 3-Step Mini Visual Guide */}
            <div className="space-y-3 pt-6 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="uppercase tracking-wider font-semibold text-slate-300">
                  3-Step Installation Guide
                </span>
                <span className="text-emerald-400">Step {activeQuickStep + 1} of 3</span>
              </div>

              <div className="space-y-2.5">
                {EXTENSION_STEPS.map((step, idx) => {
                  const isActive = activeQuickStep === idx;
                  return (
                    <div
                      key={step.step}
                      onClick={() => setActiveQuickStep(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-950/25 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                          : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {step.step}
                        </span>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-[12px] text-slate-400 leading-relaxed font-sans">
                            {step.desc}
                          </p>

                          {step.actionHint && (
                            <div className="pt-1.5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-300/90">
                              <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{step.actionHint}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Direct Address Shortcuts */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2 bg-[#04060b] p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400">Quick URL:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => copyToClipboard('chrome://extensions', 'chrome-url')}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-slate-500 font-mono text-[11px] text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Copy chrome://extensions"
              >
                <span>chrome://extensions</span>
                {copiedKey === 'chrome-url' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* ================= OPTION B: FULL SOC & ML ENGINE SETUP ================= */}
        <div className="lg:col-span-7 flex flex-col justify-between cyber-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#090e1c]/95 via-[#060a14]/95 to-[#04060b]/95 relative overflow-hidden group">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-cyan-500/15 transition-all duration-500" />

          <div>
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Terminal className="w-3.5 h-3.5" />
                OPTION B: FULL SOC & AI STACK
              </span>
              
              {/* OS Selector Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setOsTab('win')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-all ${
                    osTab === 'win'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Windows (PowerShell)
                </button>
                <button
                  onClick={() => setOsTab('unix')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-all ${
                    osTab === 'unix'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  macOS / Linux (Bash)
                </button>
              </div>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Build & Run from GitHub Source
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 font-sans">
              Launch the full 3-tier cybersecurity ecosystem: FastAPI 4-model heuristic decision engine, Vite SOC analyst console, and hot-reloading browser extension.
            </p>

            {/* Prerequisite Warning Capsule */}
            <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.12)] flex items-start gap-3">
              <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 border border-amber-500/30">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs font-sans leading-relaxed text-slate-300">
                <span className="font-mono font-bold text-amber-300 uppercase tracking-wider text-[11px] mr-1.5 inline-block">
                  Prerequisites Notice:
                </span>
                Please ensure you have{' '}
                <a
                  href="https://git-scm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 decoration-amber-400/70 hover:decoration-amber-300 transition-colors inline-flex items-center gap-0.5"
                >
                  <span>Git</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>{' '}
                and{' '}
                <a
                  href="https://www.python.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 decoration-amber-400/70 hover:decoration-amber-300 transition-colors inline-flex items-center gap-0.5"
                >
                  <span>Python (v3.10+)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>{' '}
                installed and added to your system environment variables before proceeding.
              </div>
            </div>

            {/* One-Click Git Clone Card */}
            <div className="mb-6 rounded-2xl bg-[#03060d] border border-slate-800 p-4 relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>STEP 0: CLONE REPOSITORY</span>
                </div>
                <button
                  onClick={() => copyToClipboard(gitCloneCommand, 'clone')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all cursor-pointer"
                >
                  {copiedKey === 'clone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-xs sm:text-sm text-cyan-300 bg-black/40 p-3 rounded-xl border border-white/5 overflow-x-auto selection:bg-cyan-500/30">
                <code>{gitCloneCommand}</code>
              </pre>
            </div>

            {/* Stack Step Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(['backend', 'extension', 'console'] as const).map((key) => {
                const item = stackCommands[key];
                const isActive = activeStackTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStackTab(key)}
                    className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-bold ${isActive ? 'text-cyan-400' : 'text-slate-300'}`}>
                        {key === 'backend' ? '01 AI Engine' : key === 'extension' ? '02 Extension' : '03 Console'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {item.port}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{item.tag}</div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Terminal Window */}
            <div className="rounded-2xl bg-[#03050a] border border-slate-800 overflow-hidden shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    {stackCommands[activeStackTab].title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    {osTab === 'win' ? 'PS Windows' : 'sh / bash'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(currentStackCmd, `stack-${activeStackTab}-${osTab}`)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs transition-all cursor-pointer"
                  >
                    {copiedKey === `stack-${activeStackTab}-${osTab}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Block</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 max-h-56 custom-scrollbar">
                {currentStackCmd.split('\n').map((line, lIdx) => {
                  const isComment = line.trim().startsWith('#');
                  const isUvicorn = line.includes('uvicorn');
                  const isNpm = line.includes('npm');
                  return (
                    <div key={lIdx} className="flex items-start gap-2 py-0.5">
                      <span className="text-slate-600 select-none w-5 text-right shrink-0">{lIdx + 1}</span>
                      <span
                        className={
                          isComment
                            ? 'text-slate-500 italic'
                            : isUvicorn
                            ? 'text-emerald-400 font-bold'
                            : isNpm
                            ? 'text-cyan-300 font-semibold'
                            : 'text-slate-200'
                        }
                      >
                        {line}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Quick Architecture Note */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>Endpoints:</span>
              <span className="text-white">http://127.0.0.1:8000</span>
              <span className="text-slate-600">•</span>
              <span className="text-white">http://localhost:5174</span>
            </div>
            <div className="text-slate-500">Python 3.10+ • Node 18+</div>
          </div>

        </div>

      </div>

      {/* ================= COMPATIBILITY & PREREQUISITES MATRIX ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        
        {/* Supported Browsers Panel */}
        <div className="md:col-span-7 cyber-panel p-6 rounded-3xl border border-slate-800 bg-[#070b14]/90">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="font-display font-bold text-white text-base">
                Supported Browser Engines
              </h4>
            </div>
            <span className="font-mono text-xs text-emerald-400 font-semibold">
              All Chromium Core 108+
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COMPATIBLE_BROWSERS.map((b) => (
              <div
                key={b.name}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-slate-950/70 p-1 flex items-center justify-center shrink-0 border border-slate-800 shadow-inner">
                    {b.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{b.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{b.version}</div>
                  </div>
                </div>
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites & Hardware Footprint */}
        <div className="md:col-span-5 cyber-panel p-6 rounded-3xl border border-slate-800 bg-[#070b14]/90">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h4 className="font-display font-bold text-white text-base">
                System Prerequisites
              </h4>
            </div>
            <span className="font-mono text-xs text-cyan-400">Zero Cloud Deps</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400">Git CLI</span>
              <a
                href="https://git-scm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-bold hover:text-cyan-200 underline underline-offset-2 flex items-center gap-1"
              >
                <span>Git v2.30+</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400">Python Runtime</span>
              <a
                href="https://www.python.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-bold hover:text-cyan-200 underline underline-offset-2 flex items-center gap-1"
              >
                <span>Python 3.10 / 3.11 / 3.12</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400">Node.js Engine</span>
              <span className="text-white font-bold">Node.js v18.0+ / npm 9+</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-slate-400">Memory Footprint</span>
              <span className="text-emerald-400 font-bold">&lt; 280 MB RAM (Inference)</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= TROUBLESHOOTING FAQ ACCORDION ================= */}
      <div className="cyber-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#070b14]/90 mb-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="font-display font-bold text-white text-lg">
                Troubleshooting & Setup FAQs
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                Common deployment questions, reload patterns, and security sandbox guarantees.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400">
            5 Solutions
          </span>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/80 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                    : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer outline-none"
                >
                  <span className={`text-sm font-semibold ${isOpen ? 'text-white' : 'text-slate-300'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-t border-slate-800/60 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
