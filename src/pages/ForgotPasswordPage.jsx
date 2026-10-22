import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#EBF2F8] relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-teal-400/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl glass-panel-elevated shadow-2xl border border-white/90 p-8 sm:p-10 relative z-10 animate-fade-in text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Sparkles className="w-4 h-4 text-teal-300" />
          </div>
          <span className="text-xl font-bold text-slate-900 font-heading">
            FinBuddy
          </span>
        </Link>

        {submitted ? (
          <div className="space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Password Reset Link Sent
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We have dispatched a secure recovery instruction link to{' '}
              <span className="font-semibold text-slate-900">{email}</span>. Please verify your inbox and spam folder.
            </p>
            <div className="pt-4">
              <Link to="/login">
                <Button variant="outline" size="md" icon={ArrowLeft} className="w-full justify-center">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-heading text-center">
                Reset your password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">
                Enter your registered email address and we'll send you recovery steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
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
                    placeholder="alex@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl glass-input"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                className="w-full justify-center mt-2"
              >
                Send Reset Link
              </Button>
            </form>

            <div className="pt-4 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
