import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ChatMessage } from '../services/verdictIntelligenceEngine';
import { sendChatMessage } from '../services/chatApi';

interface VerdictChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (min: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: (exp: boolean) => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  sendMessage: (content: string) => Promise<void>;
  regenerateLastResponse: () => Promise<void>;
  clearConversation: () => void;
  askProjectTopic: (question: string) => void;
  suggestedPrompts: string[];
}

const INITIAL_GREETING: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  content: `### Welcome to Verdict Intelligence

I am the technical assistant for the **Verdict** project. 

I can explain **how Verdict works**, how our **4 ML models** detect phishing, the **PhreshPhish benchmark datasets**, how **payment risk heuristics** operate, and our multi-stage architecture.

Ask any question about the project or select a topic below to get started.`,
};

const PROJECT_PROMPTS = [
  'What is Verdict and how does it work?',
  'Explain the 4 ML models & ROC-AUC',
  'Why not just use one monolithic model?',
  'What is the PhreshPhish dataset split?',
  'Why is a payment field alone not malicious?',
  'Explain the Threat Model (Transport vs Trust)',
  'How does the Risk Fusion engine calculate scores?',
];

const VerdictChatContext = createContext<VerdictChatContextType | undefined>(undefined);

export const VerdictChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const suggestedPrompts = PROJECT_PROMPTS;

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMsgId = `user-${Date.now()}`;
      const assistantMsgId = `asst-${Date.now() + 1}`;
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userMsg: ChatMessage = {
        id: userMsgId,
        role: 'user',
        content,
        timestamp: timeStr,
      };

      const initialAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: timeStr,
        metadata: { isStreaming: true },
      };

      setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
      setIsStreaming(true);

      try {
        await sendChatMessage(
          {
            message: content,
            conversationId: 'verdict-session-1',
          },
          (_chunk, fullTextSoFar) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: fullTextSoFar } : msg
              )
            );
          }
        );
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    '**Verdict Intelligence is temporarily unavailable.** You can explore the technical sections and interactive models directly across the page.',
                }
              : msg
          )
        );
      } finally {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, metadata: { ...msg.metadata, isStreaming: false } }
              : msg
          )
        );
        setIsStreaming(false);
      }
    },
    [isStreaming]
  );

  const regenerateLastResponse = useCallback(async () => {
    if (isStreaming || messages.length < 2) return;
    
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    setMessages((prev) => {
      const idx = prev.map((m) => m.id).lastIndexOf(lastUserMsg.id);
      return prev.slice(0, idx + 1);
    });

    await sendMessage(lastUserMsg.content);
  }, [isStreaming, messages, sendMessage]);

  const clearConversation = useCallback(() => {
    setMessages([
      {
        ...INITIAL_GREETING,
        id: `init-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const askProjectTopic = useCallback((question: string) => {
    setIsOpen(true);
    setIsMinimized(false);
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  }, [sendMessage]);

  // Global hotkey support (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <VerdictChatContext.Provider
      value={{
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
        askProjectTopic,
        suggestedPrompts,
      }}
    >
      {children}
    </VerdictChatContext.Provider>
  );
};

export const useVerdictChat = () => {
  const context = useContext(VerdictChatContext);
  if (!context) {
    throw new Error('useVerdictChat must be used within a VerdictChatProvider');
  }
  return context;
};
