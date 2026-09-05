import { generateVerdictResponse, sanitizeInput } from './verdictIntelligenceEngine';

export interface ChatApiRequest {
  message: string;
  conversationId?: string;
}

export interface ChatApiResponse {
  message: string;
  metadata?: {
    modelType?: string;
    latencyMs?: number;
  };
}

/**
 * Sends chat inquiry to backend server (/api/chat) or uses local project reasoning engine.
 * Supports streaming callback to deliver realistic token-by-token responses.
 */
export async function sendChatMessage(
  req: ChatApiRequest,
  onTokenChunk?: (chunk: string, fullText: string) => void
): Promise<ChatApiResponse> {
  const sanitizedMsg = sanitizeInput(req.message);
  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: sanitizedMsg,
        conversationId: req.conversationId,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const responseText = data.message || '';

      if (responseText && onTokenChunk) {
        await streamTextToCallback(responseText, onTokenChunk);
        return {
          message: responseText,
          metadata: {
            ...data.metadata,
            latencyMs: Math.round(performance.now() - startTime),
          },
        };
      }
    }
  } catch {
    // Gracefully fallback to deterministic local project reasoning engine
  }

  // Generate response from the embedded project knowledge base
  const generated = generateVerdictResponse(sanitizedMsg);
  const responseText = generated.text;

  if (onTokenChunk) {
    await streamTextToCallback(responseText, onTokenChunk);
  }

  return {
    message: responseText,
    metadata: {
      modelType: 'Verdict-Project-Intelligence-Engine-v2',
      latencyMs: Math.round(performance.now() - startTime),
    },
  };
}

async function streamTextToCallback(
  fullText: string,
  onTokenChunk: (chunk: string, fullText: string) => void
) {
  const words = fullText.split(' ');
  let accumulated = '';
  
  for (let i = 0; i < words.length; i++) {
    const word = (i === 0 ? '' : ' ') + words[i];
    accumulated += word;
    onTokenChunk(word, accumulated);
    
    // Controlled typing cadence
    if (i % 3 === 0) {
      await new Promise((r) => setTimeout(r, 12));
    }
  }
}
