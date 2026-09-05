import React, { useState } from 'react';
import { useVerdictChat } from '../../context/VerdictChatContext';
import { Bot, Sparkles, MessageSquareCode } from 'lucide-react';

export const ChatTriggerButton: React.FC = () => {
  const { isOpen, setIsOpen, isMinimized, setIsMinimized } = useVerdictChat();
  const [isHovered, setIsHovered] = useState(false);

  if (isOpen && !isMinimized) return null;

  return (
    <aside aria-label="Verdict AI Chatbot Launcher" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Dynamic AI Greeting / Callout Balloon */}
      <div
        className={`transition-all duration-300 transform origin-bottom-right pointer-events-none ${isHovered
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
          }`}
      >
        <div className="relative px-3.5 py-1.5 rounded-xl bg-[#0b1220]/95 border border-emerald-500/40 text-slate-200 text-xs font-mono shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
          <span>Ask Verdict AI anything...</span>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0b1220] border-r border-b border-emerald-500/40 rotate-45" />
        </div>
      </div>

      {/* Main AI Chatbot Capsule Widget */}
      <button
        type="button"
        aria-label="Open Verdict AI Cybersecurity Assistant"
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-full bg-[#070b16]/95 hover:bg-[#0c1426] border border-emerald-500/40 hover:border-emerald-400 text-white shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.45)] backdrop-blur-2xl transition-all duration-300 cursor-pointer"
      >
        {/* Animated Holographic AI Bot Avatar */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-950/40 to-slate-900 border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform shrink-0">

          {/* Neural Ring Pulse */}
          <span className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-30" />

          {/* AI Bot Face Icon */}
          <Bot className="w-5 h-5 text-emerald-300 group-hover:text-emerald-200 transition-colors" />

          {/* Active Status Badge */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-950" />
          </span>
        </div>

        {/* Chatbot Identity Text */}
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold tracking-wide uppercase text-white group-hover:text-emerald-300 transition-colors">
              Verdict AI
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider">
              CHATBOT
            </span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
            <MessageSquareCode className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Project & ML Assistant</span>
          </div>
        </div>

        {/* Shortcut Chip */}
        <div className="hidden sm:flex items-center ml-1 pl-2.5 border-l border-slate-800">
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-400 group-hover:text-slate-200 shadow-inner">
            Ctrl+K
          </kbd>
        </div>
      </button>
    </aside>
  );
};
