import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-900 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 border border-teal-400/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading flex items-center gap-1.5">
                FinBuddy
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 border border-teal-500/30">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide -mt-1 hidden sm:block">
                Smart Financial Co-Pilot
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-xs">
            <a
              href="#features"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              Features
            </a>
            <a
              href="#simulator"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              Future Simulator
            </a>
            <a
              href="#survival"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              Survival Mode
            </a>
            <a
              href="#how-it-works"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              Pricing
            </a>
            <a
              href="#trust"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-white/80 rounded-full transition-all"
            >
              Trust & Privacy
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-slate-700 hover:text-slate-900"
            >
              Log In
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/register')}
            >
              Get Started Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-white/80 border border-white/80 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel-elevated border border-white/90 animate-fade-in shadow-xl">
            <div className="flex flex-col gap-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                Features
              </a>
              <a
                href="#simulator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                Future Simulator
              </a>
              <a
                href="#survival"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                Money Survival Mode
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                Pricing & Plans
              </a>
              <a
                href="#trust"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 rounded-xl"
              >
                Trust & Privacy
              </a>
              <hr className="border-slate-200 my-1" />
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="w-full justify-center"
              >
                Log In
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/register');
                }}
                className="w-full justify-center"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
