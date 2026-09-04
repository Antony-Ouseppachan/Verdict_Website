import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedMetric } from '../components/AnimatedMetric';
import { Scissors } from 'lucide-react';

export const Section05URLModel: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'scheme' | 'subdomain' | 'domain' | 'path' | 'query'>('domain');

  const segments = {
    scheme: {
      text: 'https://',
      label: 'Scheme / Protocol',
      desc: 'Port 443 TLS encrypted transport flag. Important feature weight in baseline, but 4.4% relative importance due to ubiquitous phishing SSL adoption.',
      signals: 'Transport: TLS 1.3 • Port: 443',
    },
    subdomain: {
      text: 'accounts.security-verify',
      label: 'Subdomain String',
      desc: 'Attackers create deceptive subdomains with banking keywords to trick casual scrutiny before reaching untrusted apex domain.',
      signals: 'Subdomain Count: 2 • Brand Keyword: "accounts"',
    },
    domain: {
      text: '.checkout-update.cc',
      label: 'Apex Domain & TLD',
      desc: 'Extracted apex domain evaluated against character n-gram entropy, registration risk, and top-level domain threat distribution (.cc/.top/.site).',
      signals: 'TLD: .cc (High Entropy Risk) • Token Entropy: 3.84 bits',
    },
    path: {
      text: '/login/session/auth',
      label: 'Path Hierarchy',
      desc: 'Deep subdirectory paths with high slash frequencies designed to mimic nested banking architectures.',
      signals: 'Path Length: 19 chars • Slash Count: 3',
    },
    query: {
      text: '?redirect=https%3A%2F%2Fdrop.box&client_id=892',
      label: 'Query Parameters & Payload',
      desc: 'Decodes nested URL parameters, open redirects, base64 tokens, and deceptive return-to URLs.',
      signals: 'Query Length: 48 chars • Open Redirect Detected',
    },
  };

  return (
    <section id="url-ai" className="py-2 sm:py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader
        number="05"
        tag="Pre-Render Intelligence"
        title="URL Intelligence Model"
        subtitle="Linear Support Vector Machine analyzing character n-gram TF-IDF representations and lexical entropy metrics before fetching remote assets."
      />

      {/* Model Benchmark Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <AnimatedMetric
          value={96}
          suffix="%"
          label="TEST ACCURACY"
          subtext="Evaluated on 168,060 disjoint test URLs"
          highlightColor="text-emerald-400"
        />
        <AnimatedMetric
          value={0.9923}
          decimals={4}
          label="ROC-AUC SCORE"
          subtext="Exceptional discrimination threshold"
          highlightColor="text-cyan-400"
        />
        <AnimatedMetric
          value={498255}
          label="TRAINING CORPUS"
          subtext="PhreshPhish verified benchmark dataset"
          highlightColor="text-slate-100"
        />
        <AnimatedMetric
          value={168060}
          label="EVALUATION TEST SAMPLES"
          subtext="Zero-overlap disjoint test split"
          highlightColor="text-slate-100"
        />
      </div>

      {/* Interactive URL Dissection Chamber */}
      <div className="cyber-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-950/90 mb-12">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Interactive Lexical Dissection Engine
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            TF-IDF VECTORIZATION
          </span>
        </div>

        {/* The Dissected URL Bar */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 font-mono text-sm md:text-base flex flex-wrap items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveSegment('scheme')}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${
              activeSegment === 'scheme' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-emerald-400/80 hover:bg-slate-800'
            }`}
          >
            {segments.scheme.text}
          </button>
          
          <button
            onClick={() => setActiveSegment('subdomain')}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${
              activeSegment === 'subdomain' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-amber-400/80 hover:bg-slate-800'
            }`}
          >
            {segments.subdomain.text}
          </button>

          <button
            onClick={() => setActiveSegment('domain')}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${
              activeSegment === 'domain' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-red-400/80 hover:bg-slate-800'
            }`}
          >
            {segments.domain.text}
          </button>

          <button
            onClick={() => setActiveSegment('path')}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${
              activeSegment === 'path' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-cyan-400/80 hover:bg-slate-800'
            }`}
          >
            {segments.path.text}
          </button>

          <button
            onClick={() => setActiveSegment('query')}
            className={`px-2 py-1 rounded transition-all cursor-pointer ${
              activeSegment === 'query' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-indigo-400/80 hover:bg-slate-800'
            }`}
          >
            {segments.query.text}
          </button>
        </div>

        {/* Selected Segment Breakdown */}
        <div className="mt-6 p-5 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 uppercase">
                {segments[activeSegment].label}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {segments[activeSegment].desc}
            </p>
          </div>

          <div className="md:col-span-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-[10px] text-slate-400 uppercase">EXTRACTED VECTOR FEATURES</div>
            <div className="text-emerald-400 font-medium">{segments[activeSegment].signals}</div>
          </div>
        </div>

        {/* Extracted Feature Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'URL LENGTH', val: '94 chars' },
            { label: 'SUBDOMAINS', val: '2 tokens' },
            { label: 'DIGIT COUNT', val: '7 numeric' },
            { label: 'HYPHEN COUNT', val: '2 hyphens' },
            { label: 'SLASH COUNT', val: '5 slashes' },
            { label: 'QUERY LENGTH', val: '48 chars' },
          ].map((feat, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">{feat.label}</div>
              <div className="font-mono text-xs font-semibold text-white mt-1">{feat.val}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
