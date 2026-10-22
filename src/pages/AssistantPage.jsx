import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Shield,
  AlertCircle,
  HelpCircle,
  Trash2,
  TrendingUp,
  Receipt,
  PieChart,
  Lock,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { api } from '../services/api';
import { GlassCard, CardHeader } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

const SUGGESTED_PROMPTS = [
  'Where did I spend the most this month?',
  'How can I save an extra ₹15,000 this month?',
  'Can I afford a ₹35,000 smartwatch purchase?',
  'What is my Money Survival runway right now?',
];

export const AssistantPage = () => {
  const { user, metrics, formatCurrency } = useFinance();
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${user.name}! I am **FinBuddy AI**, your personal financial co-pilot. I have analyzed your current October cash flow (${formatCurrency(metrics.totalIncome)} in / ${formatCurrency(metrics.totalExpenses)} out).

How can I help you optimize your spending, evaluate an upcoming purchase, or plan your runway today?`,
      timestamp: 'Just now',
      isSample: true,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await api.askAssistant(query, {
        totalIncome: metrics.totalIncome,
        totalExpenses: metrics.totalExpenses,
        netSavings: metrics.netSavings,
        savingsRate: metrics.savingsRate,
      });

      const assistantMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: response.timestamp,
        suggestions: response.suggestions,
        isSample: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered an issue connecting to the inference engine. When connected to the Flask backend, Gemini API will provide real-time reasoning.',
          timestamp: 'Just now',
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg_welcome_reset',
        sender: 'assistant',
        text: `Conversation reset. Ask me anything about your current budget, recent transactions, or future investment goals!`,
        timestamp: 'Just now',
        isSample: true,
      },
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-500/15 px-3 py-0.5 rounded-full border border-teal-500/30">
              AI Money Assistant
            </span>
            <Badge variant="teal" size="sm">Gemini Ready Architecture</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
            Conversational Co-Pilot
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Get instant contextual answers and financial scenario analysis without leaving your workspace.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Trash2}
          onClick={handleClearHistory}
        >
          Clear Chat
        </Button>
      </div>

      {/* Main Grid: Chat Workspace + Financial Context Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Chat Window Panel */}
        <GlassCard className="lg:col-span-2 p-0 flex flex-col h-[650px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200/70 bg-white/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">FinBuddy Intelligent Engine</h3>
                <span className="text-[11px] text-teal-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Active Context • Simulated Local Heuristics
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-white/60 px-2 py-0.5 rounded-md border border-slate-200">
              v1.0-preview
            </span>
          </div>

          {/* Privacy Reminder Alert */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-800">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              <strong>Privacy Protection:</strong> Never enter sensitive bank passwords, credit card numbers, or social security details in the chat.
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-teal-500/15 text-teal-700 border border-teal-500/30'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div
                    className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-tr-sm'
                        : 'glass-panel-elevated text-slate-800 rounded-tl-sm border border-white/90'
                    }`}
                  >
                    {/* Render message with line breaks and simple markdown-like bold handling */}
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.text.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    {m.isSample && (
                      <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400">
                        <span>✦ AI Preview • Heuristic Engine</span>
                        <span>{m.timestamp}</span>
                      </div>
                    )}
                  </div>

                  {/* Context Suggestions */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(s)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-xl bg-teal-500/10 text-teal-800 hover:bg-teal-500/20 border border-teal-500/20 transition-all text-left"
                        >
                          {s} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-700 flex items-center justify-center shrink-0 border border-teal-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-3xl glass-panel-elevated text-slate-500 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span>FinBuddy is analyzing your transactions and computing projection...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 bg-white/50 border-t border-slate-200/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Suggested:</span>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 text-xs rounded-full bg-white/80 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-slate-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white/70 border-t border-slate-200/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask FinBuddy about your expenses, budgeting, or savings plan..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input placeholder:text-slate-400"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading || !inputPrompt.trim()}
              icon={Send}
            >
              Send
            </Button>
          </form>
        </GlassCard>

        {/* Financial Context Sidebar */}
        <div className="space-y-5">
          <GlassCard>
            <CardHeader
              title="Live Financial Context"
              subtitle="Data currently available to the assistant"
              icon={TrendingUp}
            />

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Monthly Inflow</span>
                <span className="font-bold text-slate-900">{formatCurrency(metrics.totalIncome)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Monthly Outflow</span>
                <span className="font-bold text-slate-900">{formatCurrency(metrics.totalExpenses)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Net Cash Saved</span>
                <span className="font-bold text-teal-700">{formatCurrency(metrics.netSavings)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Current Savings Rate</span>
                <span className="font-bold text-emerald-600">{metrics.savingsRate}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Survival Runway</span>
                <span className="font-bold text-teal-700">5.2 Months</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-teal-500/10 to-sky-500/10">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Backend API Status
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you launch the Flask backend (`http://localhost:5000`), the assistant automatically upgrades from local heuristic mock to live Gemini generative inference without code changes.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
