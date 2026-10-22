import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = useState('alex.rivera@finbuddy.dev');
  const [password, setPassword] = useState('FinBuddy2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('Welcome back, Alex! Redirecting to your dashboard...', 'success');
      navigate('/dashboard');
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail('alex.rivera@finbuddy.dev');
    setPassword('FinBuddy2026!');
    setError('');
    addToast('Demo credentials auto-filled', 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#EBF2F8] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[550px] h-[550px] bg-teal-400/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-sky-400/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl glass-panel-elevated shadow-2xl border border-white/90 overflow-hidden relative z-10 animate-fade-in">
        {/* Left Side: Login Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Brand Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Sparkles className="w-4 h-4 text-teal-300" />
              </div>
              <span className="text-xl font-bold text-slate-900 font-heading">
                FinBuddy
              </span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Sign in to access your financial dashboard and AI co-pilot.
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-2xl glass-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-600 select-none">Remember this browser</span>
                </label>

                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[11px] font-semibold text-teal-700 bg-teal-500/15 hover:bg-teal-500/25 px-2.5 py-1 rounded-full border border-teal-500/30 transition-colors"
                >
                  ⚡ Auto-fill Demo
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center mt-2"
              >
                Sign In to FinBuddy
              </Button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/60 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Decorative Glass Finance Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Demo Environment Ready
            </div>
            <h2 className="text-2xl font-bold font-heading">
              "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make."
            </h2>
          </div>

          {/* Mini Glass Metric Card */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">October Cash Flow Balance</span>
              <span className="text-teal-300 font-semibold">+54.3% Saved</span>
            </div>
            <div className="text-2xl font-bold font-heading text-white">₹1,85,400.00</div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-400 h-full w-[72%] rounded-full" />
            </div>
            <p className="text-[11px] text-slate-300">
              Your financial runway is currently in the top 15% tier among users with similar cash flows.
            </p>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>FinBuddy v1.0 Client</span>
            <span>Ready for Flask REST API</span>
          </div>
        </div>
      </div>
    </div>
  );
};
