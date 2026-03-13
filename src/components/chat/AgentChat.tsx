import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { mockAIResponses } from '@/data/content';
import { ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, User, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';

interface AgentChatProps {
  onClose: () => void;
}

export function AgentChat({ onClose }: AgentChatProps) {
  const { user, chatMessages, addChatMessage, askQuestion } = useUser();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  if (!user) return null;

  const language = user.language;

  const t = {
    title: { en: 'Ask the Agent', de: 'Den Agenten fragen' },
    subtitle: { en: 'Your AI energy market assistant', de: 'Dein KI-Energiemarkt-Assistent' },
    placeholder: { en: 'Ask about energy markets...', de: 'Frage zu Energiemärkten...' },
    sources: { en: 'Sources', de: 'Quellen' },
    confidence: { en: 'Confidence', de: 'Konfidenz' },
    high: { en: 'High', de: 'Hoch' },
    medium: { en: 'Medium', de: 'Mittel' },
    low: { en: 'Low', de: 'Niedrig' },
    welcomeMessage: {
      en: "Hello! I'm your AI energy market assistant. Ask me anything about power prices, renewables, trading, grid operations, or energy policy!",
      de: "Hallo! Ich bin dein KI-Energiemarkt-Assistent. Frag mich alles über Strompreise, Erneuerbare, Handel, Netzbetrieb oder Energiepolitik!"
    },
  };

  const getMockResponse = (query: string): { content: string; sources: { title: string; url: string }[]; confidence: 'low' | 'medium' | 'high' } => {
    const lowerQuery = query.toLowerCase();

    let responseKey = 'default';
    if (lowerQuery.includes('price') || lowerQuery.includes('preis') || lowerQuery.includes('cost') || lowerQuery.includes('kosten')) {
      responseKey = 'price';
    } else if (lowerQuery.includes('renewable') || lowerQuery.includes('erneuerbar') || lowerQuery.includes('wind') || lowerQuery.includes('solar')) {
      responseKey = 'renewables';
    } else if (lowerQuery.includes('grid') || lowerQuery.includes('netz') || lowerQuery.includes('tso') || lowerQuery.includes('dso')) {
      responseKey = 'grid';
    } else if (lowerQuery.includes('trading') || lowerQuery.includes('handel') || lowerQuery.includes('market') || lowerQuery.includes('markt')) {
      responseKey = 'trading';
    }

    const mockSources = [
      { title: 'European Energy Exchange (EEX)', url: 'https://www.eex.com' },
      { title: 'ENTSO-E Transparency Platform', url: 'https://transparency.entsoe.eu' },
      { title: 'Bundesnetzagentur SMARD', url: 'https://www.smard.de' },
    ];

    return {
      content: mockAIResponses[responseKey]?.[language] || mockAIResponses.default[language],
      sources: mockSources.slice(0, 2),
      confidence: responseKey === 'default' ? 'medium' : 'high',
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    addChatMessage({
      role: 'user',
      content: userMessage,
    });

    setIsTyping(true);
    askQuestion();

    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const response = getMockResponse(userMessage);

    addChatMessage({
      role: 'assistant',
      content: response.content,
      sources: response.sources,
      confidence: response.confidence,
    });

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getConfidenceColor = (conf: string) => {
    if (conf === 'high') return 'text-success';
    if (conf === 'medium') return 'text-warning';
    return 'text-destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      <div className="p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold">{t.title[language]}</h1>
              <p className="text-xs text-muted-foreground">{t.subtitle[language]}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {chatMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card rounded-2xl rounded-tl-sm p-4 border border-border shadow-sm">
                <p>{t.welcomeMessage[language]}</p>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  message.role === 'user' ? 'bg-secondary' : 'gradient-primary'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>

                <div className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
                    : 'bg-card rounded-2xl rounded-tl-sm border border-border shadow-sm'
                } p-4`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>

                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                        <ExternalLink className="w-3 h-3" />
                        {t.sources[language]}
                      </div>
                      <div className="space-y-1">
                        {message.sources.map((source, i) => (
                          <a
                            key={i}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-primary hover:underline truncate"
                          >
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {message.confidence && (
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <AlertCircle className={`w-3 h-3 ${getConfidenceColor(message.confidence)}`} />
                      <span className="text-muted-foreground">{t.confidence[language]}:</span>
                      <span className={`font-semibold ${getConfidenceColor(message.confidence)}`}>
                        {t[message.confidence][language]}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card rounded-2xl rounded-tl-sm p-4 border border-border shadow-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder[language]}
            className="flex-1 h-12 rounded-xl"
            disabled={isTyping}
          />
          <Button
            variant="gradient"
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-12 w-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
