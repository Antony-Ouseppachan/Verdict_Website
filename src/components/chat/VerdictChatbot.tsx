import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerdictChat } from '../../context/VerdictChatContext';
import { ChatMarkdownRenderer } from './ChatMarkdownRenderer';
import { VerdictLogo } from '../VerdictLogo';
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  Send,
  RotateCcw,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Cpu,
  Database,
  Lock,
  Compass,
} from 'lucide-react';

export const VerdictChatbot: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    isExpanded,
    setIsExpanded,
    messages,
    isStreaming,
    sendMessage,
    regenerateLastResponse,
    clearConversation,
    suggestedPrompts,
  } = useVerdictChat();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll on new messages or streaming chunks
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming, isOpen, isMinimized]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!inputVal.trim() || isStreaming) return;
    const text = inputVal;
    setInputVal('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Verdict Project AI Assistant"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`fixed z-50 flex flex-col bg-[#070a13]/95 border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl rounded-2xl overflow-hidden font-sans transition-all duration-300 ${
          isExpanded
            ? 'inset-4 md:inset-8 w-auto h-auto'
            : isMinimized
            ? 'bottom-6 right-6 w-80 h-14'
            : 'bottom-6 right-4 sm:right-6 w-[94vw] sm:w-[500px] md:w-[560px] h-[640px] max-h-[85vh]'
        }`}
      >
        {/* ================= HEADER BAR ================= */}
        <div className="px-4 py-3 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between select-none">
          
          {/* Brand & Assistant Status */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <VerdictLogo size={16} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xs tracking-wider text-white uppercase">
                  VERDICT INTELLIGENCE
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 uppercase font-semibold">
                  PROJECT ASSISTANT
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <span>Architecture & ML Guide</span>
                <span>•</span>
                <span className="text-emerald-400">Online</span>
              </div>
            </div>
          </div>

          {/* Window Action Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={clearConversation}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Clear Chat History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={isMinimized ? 'Restore' : 'Minimize'}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {!isMinimized && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Restore Size' : 'Maximize Window'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer ml-0.5"
              title="Close Assistant"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= MINIMIZED STATE BODY ================= */}
        {isMinimized && (
          <div
            onClick={() => setIsMinimized(false)}
            className="flex-1 flex items-center justify-between px-4 text-xs font-mono text-slate-300 cursor-pointer hover:bg-slate-900/50"
          >
            <span className="truncate">Verdict Project Assistant Idle</span>
            <span className="text-emerald-400 text-[10px]">CLICK TO EXPAND</span>
          </div>
        )}

        {/* ================= FULL INTERACTIVE BODY ================= */}
        {!isMinimized && (
          <>
            {/* Conversation Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              
              {/* Quick Topic Categories when only greeting exists */}
              {messages.length === 1 && (
                <div className="my-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5 font-mono">
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Explore Verdict Project Topics</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      onClick={() => sendMessage('What is Verdict and how does the multimodal pipeline work?')}
                      className="p-2 rounded-lg bg-[#070d18] hover:bg-slate-800 border border-slate-800 text-left text-slate-300 hover:text-white transition-all cursor-pointer flex items-start gap-2"
                    >
                      <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white text-[11px]">Overview & Flow</div>
                        <div className="text-[10px] text-slate-400">End-to-End Pipeline</div>
                      </div>
                    </button>

                    <button
                      onClick={() => sendMessage('Explain the 4 ML models and held-out test ROC-AUC')}
                      className="p-2 rounded-lg bg-[#070d18] hover:bg-slate-800 border border-slate-800 text-left text-slate-300 hover:text-white transition-all cursor-pointer flex items-start gap-2"
                    >
                      <Cpu className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white text-[11px]">4 ML Models</div>
                        <div className="text-[10px] text-slate-400">SVM, XGBoost, Fusion</div>
                      </div>
                    </button>

                    <button
                      onClick={() => sendMessage('Why is a payment field or CVV input alone not considered malicious?')}
                      className="p-2 rounded-lg bg-[#070d18] hover:bg-slate-800 border border-slate-800 text-left text-slate-300 hover:text-white transition-all cursor-pointer flex items-start gap-2"
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white text-[11px]">Payment Heuristics</div>
                        <div className="text-[10px] text-slate-400">CVV vs Tokenized Vault</div>
                      </div>
                    </button>

                    <button
                      onClick={() => sendMessage('What is the PhreshPhish dataset split and benchmark metrics?')}
                      className="p-2 rounded-lg bg-[#070d18] hover:bg-slate-800 border border-slate-800 text-left text-slate-300 hover:text-white transition-all cursor-pointer flex items-start gap-2"
                    >
                      <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white text-[11px]">PhreshPhish Split</div>
                        <div className="text-[10px] text-slate-400">498k train / 168k test</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                const isLast = index === messages.length - 1;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    {/* Message Header Label */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 px-1">
                      <span>{isUser ? 'USER QUERY' : 'VERDICT ASSISTANT'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`relative group max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 ${
                        isUser
                          ? 'bg-emerald-500/15 border border-emerald-500/35 text-white rounded-br-none shadow-[0_4px_16px_rgba(16,185,129,0.1)]'
                          : 'bg-[#0a0f1d] border border-slate-800/90 text-slate-200 rounded-bl-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-xs leading-relaxed break-words whitespace-pre-wrap font-sans">
                          {msg.content}
                        </p>
                      ) : (
                        <div>
                          <ChatMarkdownRenderer content={msg.content} />
                          {msg.metadata?.isStreaming && (
                            <span className="inline-block w-2 h-3.5 ml-1 bg-emerald-400 animate-pulse align-middle" />
                          )}
                        </div>
                      )}

                      {/* Action Bar for Assistant Messages */}
                      {!isUser && !msg.metadata?.isStreaming && msg.content && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                          <span className="text-slate-500">Verdict Research & Architecture</span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.content)}
                              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                              title="Copy Response"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            {isLast && (
                              <button
                                onClick={regenerateLastResponse}
                                disabled={isStreaming}
                                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer disabled:opacity-50"
                                title="Regenerate Answer"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Regenerate</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Streaming Indicator */}
              {isStreaming && (
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 animate-pulse px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Synthesizing project knowledge...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ================= SUGGESTED PROMPTS ================= */}
            <div className="px-4 py-2 bg-[#090e1c] border-t border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">TOPICS:</span>
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  disabled={isStreaming}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/70 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 font-mono text-[11px] transition-all whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* ================= INPUT BOX ================= */}
            <div className="p-3 bg-[#0a0f1d] border-t border-slate-800">
              <div className="relative rounded-xl border border-slate-700/80 bg-[#06080e] focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/30 transition-all p-2 flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any question about Verdict (models, datasets, architecture, how it works)..."
                  rows={2}
                  disabled={isStreaming}
                  className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed font-sans"
                />

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleSend}
                    disabled={!inputVal.trim() || isStreaming}
                    className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 transition-all cursor-pointer disabled:cursor-not-allowed shadow-[0_0_12px_rgba(16,185,129,0.3)] disabled:shadow-none"
                    title="Send Inquiry (Enter)"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Keyboard Helper Footer */}
              <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <span>Press</span>
                  <kbd className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">Enter</kbd>
                  <span>to send,</span>
                  <kbd className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">Shift+Enter</kbd>
                  <span>for newline</span>
                </div>
                <div>
                  <kbd className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">Ctrl+K</kbd>
                  <span className="ml-1">Toggle Chatbot</span>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.aside>
    </AnimatePresence>
  );
};
