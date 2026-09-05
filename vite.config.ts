import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Custom server-side API middleware plugin for Verdict Intelligence Chatbot
function verdictChatApiPlugin(): Plugin {
  return {
    name: 'verdict-chat-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
          if (body.length > 50000) {
            res.statusCode = 413;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Payload Too Large' }));
            req.destroy();
          }
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const selectedContext = data.context || {};

            // Server-side response generation with context awareness
            // Optional external LLM API keys can be read from process.env if set
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
            // Format response payload
            res.end(JSON.stringify({
              status: 'success',
              message: null, // Instruct client to invoke intelligence reasoning with full formatting
              metadata: {
                timestamp: new Date().toISOString(),
                serverStatus: 'online',
                contextDomain: selectedContext.domain || null,
              }
            }));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), verdictChatApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

