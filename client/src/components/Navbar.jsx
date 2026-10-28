import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gavel, Search, Sparkles, PlusCircle, Bell, Heart } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Gavel className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-brand-700 bg-clip-text text-transparent">
                CampusBid
              </span>
              <span className="badge-live">LIVE</span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 tracking-wider uppercase -mt-0.5">
              Campus Auction Hub
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/marketplace"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive('/marketplace')
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            Marketplace
          </Link>
          <Link
            to="/ai-assistant"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive('/ai-assistant')
                ? 'bg-purple-50 text-purple-700'
                : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            AI Assistant
          </Link>
          <Link
            to="/watchlist"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive('/watchlist')
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            Watchlist
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/create-listing"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-sm font-semibold shadow-sm hover:from-brand-700 hover:to-indigo-700 hover:shadow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sell Item</span>
          </Link>

          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 text-sm font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
