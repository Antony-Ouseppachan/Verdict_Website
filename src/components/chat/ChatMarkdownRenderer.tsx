import React, { useState } from 'react';
import { Copy, Check, ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink, Globe, Code2, CreditCard, Cpu } from 'lucide-react';

interface ChatMarkdownRendererProps {
  content: string;
}

export const ChatMarkdownRenderer: React.FC<ChatMarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split content by special custom card blocks (:::risk-summary ... :::, :::model-breakdown ... :::)
  const segments = parseCustomBlocks(content);

  return (
    <div className="space-y-3 text-xs leading-relaxed text-slate-200 break-words font-sans">
      {segments.map((seg, idx) => {
        if (seg.type === 'risk-summary') {
          return <RiskSummaryCard key={idx} data={seg.data} />;
        }
        if (seg.type === 'model-breakdown') {
          return <ModelBreakdownCard key={idx} data={seg.data} />;
        }
        return <FormattedMarkdownText key={idx} text={seg.content} />;
      })}
    </div>
  );
};

// ---------------- CUSTOM BLOCKS PARSER ----------------

interface CustomBlock {
  type: 'text' | 'risk-summary' | 'model-breakdown';
  content: string;
  data?: Record<string, string>;
}

function parseCustomBlocks(text: string): CustomBlock[] {
  const blocks: CustomBlock[] = [];
  const lines = text.split('\n');
  let currentText: string[] = [];
  let inBlockType: 'risk-summary' | 'model-breakdown' | null = null;
  let blockLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith(':::risk-summary')) {
      if (currentText.length > 0) {
        blocks.push({ type: 'text', content: currentText.join('\n') });
        currentText = [];
      }
      inBlockType = 'risk-summary';
      blockLines = [];
      continue;
    }

    if (line.trim().startsWith(':::model-breakdown')) {
      if (currentText.length > 0) {
        blocks.push({ type: 'text', content: currentText.join('\n') });
        currentText = [];
      }
      inBlockType = 'model-breakdown';
      blockLines = [];
      continue;
    }

    if (inBlockType && line.trim() === ':::') {
      const data: Record<string, string> = {};
      blockLines.forEach((bLine) => {
        const colonIdx = bLine.indexOf(':');
        if (colonIdx !== -1) {
          const key = bLine.slice(0, colonIdx).trim();
          const val = bLine.slice(colonIdx + 1).trim();
          data[key] = val;
        }
      });
      blocks.push({ type: inBlockType, content: '', data });
      inBlockType = null;
      blockLines = [];
      continue;
    }

    if (inBlockType) {
      blockLines.push(line);
    } else {
      currentText.push(line);
    }
  }

  if (currentText.length > 0) {
    blocks.push({ type: 'text', content: currentText.join('\n') });
  }

  return blocks;
}

// ---------------- RISK SUMMARY CARD ----------------

function RiskSummaryCard({ data = {} }: { data?: Record<string, string> }) {
  const verdict = data.verdict || 'SUSPICIOUS';
  const score = data.score || '0.50';
  const domain = data.domain || 'Target Host';
  const url = data.url || '';

  const isSafe = verdict.toUpperCase().includes('SAFE') || verdict.toUpperCase().includes('AUTHENTIC');
  const isHighRisk = verdict.toUpperCase().includes('HIGH') || verdict.toUpperCase().includes('THREAT') || verdict.toUpperCase().includes('CRITICAL');

  return (
    <div className={`my-3 p-3.5 rounded-xl border font-mono transition-all ${
      isSafe
        ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
        : isHighRisk
        ? 'bg-red-950/30 border-red-500/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
        : 'bg-amber-950/25 border-amber-500/40 text-amber-300'
    }`}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          {isSafe ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : isHighRisk ? <ShieldAlert className="w-4 h-4 text-red-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
          <span className="text-[11px] font-bold tracking-wider uppercase">VERDICT RISK ASSESSMENT</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
          isSafe ? 'bg-emerald-500/20 text-emerald-300' : isHighRisk ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
        }`}>
          {verdict}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-slate-400 text-[10px] block">FINAL FUSED RISK</span>
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block">TARGET DOMAIN</span>
          <span className="text-white truncate block font-sans" title={domain}>{domain}</span>
        </div>
      </div>

      {url && url !== 'N/A' && (
        <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-400 truncate flex items-center gap-1 font-sans">
          <Globe className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
      )}
    </div>
  );
}

// ---------------- MODEL BREAKDOWN CARD ----------------

function ModelBreakdownCard({ data = {} }: { data?: Record<string, string> }) {
  return (
    <div className="my-3 p-3.5 rounded-xl border border-slate-700/80 bg-[#090e18] shadow-inner font-mono">
      <div className="text-[10px] uppercase text-slate-400 tracking-wider font-bold mb-2.5 flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
        <span>Multi-Model Pipeline Telemetry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
        {/* URL Model */}
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <Globe className="w-3 h-3 text-sky-400" />
            <span>01 URL SVM</span>
          </div>
          <div className="text-slate-200 font-bold truncate">{data.urlScore || '0.94'}</div>
        </div>

        {/* HTML Model */}
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <Code2 className="w-3 h-3 text-emerald-400" />
            <span>02 HTML XGBoost</span>
          </div>
          <div className="text-slate-200 font-bold truncate">{data.htmlProb || '0.96'}</div>
        </div>

        {/* Payment Model */}
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
            <CreditCard className="w-3 h-3 text-amber-400" />
            <span>03 Payment XGB</span>
          </div>
          <div className="text-slate-200 font-bold truncate">{data.paymentProb || '0.98'}</div>
        </div>
      </div>
    </div>
  );
}

// ---------------- FORMATTED MARKDOWN TEXT & CODE ----------------

function FormattedMarkdownText({ text }: { text: string }) {
  if (!text) return null;

  // Split into paragraphs / code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          return <CodeSnippetBlock key={pIdx} block={part} />;
        }

        const lines = part.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lIdx} className="h-1" />;
              }

              // Headings
              if (trimmed.startsWith('#### ')) {
                return <h4 key={lIdx} className="text-xs font-bold font-mono uppercase text-emerald-400 tracking-wider mt-3 mb-1">{formatInline(trimmed.slice(5))}</h4>;
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={lIdx} className="text-sm font-bold text-white tracking-tight mt-3.5 mb-1 pb-1 border-b border-slate-800">{formatInline(trimmed.slice(4))}</h3>;
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={lIdx} className="text-sm font-extrabold text-white tracking-tight mt-4 mb-1.5">{formatInline(trimmed.slice(3))}</h2>;
              }

              // Blockquotes
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={lIdx} className="pl-3 border-l-2 border-emerald-500/50 my-2 text-slate-300 italic text-[11px] bg-slate-900/40 py-1 rounded-r">
                    {formatInline(trimmed.slice(2))}
                  </blockquote>
                );
              }

              // Unordered List Items
              if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-emerald-400 text-[10px] leading-relaxed shrink-0 mt-0.5">•</span>
                    <span className="text-slate-300">{formatInline(trimmed.slice(2))}</span>
                  </div>
                );
              }

              // Ordered List Items
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-emerald-400 font-mono text-[10px] shrink-0 font-bold">{numMatch[1]}.</span>
                    <span className="text-slate-300">{formatInline(numMatch[2])}</span>
                  </div>
                );
              }

              // Divider
              if (trimmed === '---' || trimmed === '***') {
                return <hr key={lIdx} className="border-slate-800 my-2.5" />;
              }

              // Standard text line
              return (
                <p key={lIdx} className="text-slate-300 leading-relaxed">
                  {formatInline(trimmed)}
                </p>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

// ---------------- CODE BLOCK COMPONENT ----------------

function CodeSnippetBlock({ block }: { block: string }) {
  const [copied, setCopied] = useState(false);

  // Extract language and code
  const firstLineEnd = block.indexOf('\n');
  let lang = 'code';
  let code = '';

  if (firstLineEnd !== -1) {
    lang = block.slice(3, firstLineEnd).trim() || 'ascii';
    code = block.slice(firstLineEnd + 1, -3);
  } else {
    code = block.slice(3, -3);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-xl border border-slate-800 bg-[#04060a] overflow-hidden font-mono text-[11px] shadow-lg">
      <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-slate-400">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-slate-200 leading-relaxed scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ---------------- INLINE MARKDOWN FORMATTER ----------------

function formatInline(text: string): React.ReactNode[] {
  // Regex to split by bold (**text**), inline code (`code`), links ([text](url))
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={i} className="text-white font-bold">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[10px] mx-0.5">
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline hover:text-emerald-300 inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
          <ExternalLink className="w-2.5 h-2.5 inline" />
        </a>
      );
    }
    return token;
  });
}
