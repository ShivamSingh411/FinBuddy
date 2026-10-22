import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/80 bg-white/40 backdrop-blur-xl text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-bold text-slate-900 font-heading">
                FinBuddy
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track Smarter. Plan Ahead. Save Better. Your intelligent glassmorphic personal finance companion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                <Lock className="w-3 h-3" /> Client-Side Privacy Mode
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-teal-600 transition-colors">
                  Interactive Dashboard
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="hover:text-teal-600 transition-colors">
                  Future Simulator
                </Link>
              </li>
              <li>
                <Link to="/survival" className="hover:text-teal-600 transition-colors">
                  Money Survival Mode
                </Link>
              </li>
              <li>
                <Link to="/life-events" className="hover:text-teal-600 transition-colors">
                  Life Event Predictor
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-teal-600 transition-colors">
                  AI Money Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Tracking & Control
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/transactions" className="hover:text-teal-600 transition-colors">
                  Transactions Manager
                </Link>
              </li>
              <li>
                <Link to="/budgets" className="hover:text-teal-600 transition-colors">
                  Category Budgets
                </Link>
              </li>
              <li>
                <Link to="/goals" className="hover:text-teal-600 transition-colors">
                  Savings Milestones
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-teal-600 transition-colors">
                  Reports & Analytics
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-teal-600 transition-colors">
                  Settings & Data Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Disclaimer */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Transparency & Notice
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              FinBuddy calculations and projections are provided for educational and financial organization purposes only. They do not constitute certified financial or investment advice.
            </p>
            <p className="text-[11px] text-slate-400">
              Frontend prototype ready for Flask REST API integration.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FinBuddy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-slate-900">
              Demo Login
            </Link>
            <Link to="/register" className="hover:text-slate-900">
              Create Account
            </Link>
            <a href="#trust" className="hover:text-slate-900">
              Privacy Framework
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
