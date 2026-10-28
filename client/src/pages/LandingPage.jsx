import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bike,
  BookOpen,
  Laptop,
  Calculator,
  Compass,
  Armchair,
  Timer,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { formatPaiseToRupees } from '../utils/formatCurrency.js';

const CATEGORIES = [
  { id: 'CYCLES', label: 'Cycles & Mobility', icon: Bike, count: '14 Live' },
  { id: 'TEXTBOOKS', label: 'Textbooks & Notes', icon: BookOpen, count: '32 Live' },
  { id: 'ELECTRONICS', label: 'Gadgets & Tech', icon: Laptop, count: '19 Live' },
  { id: 'CALCULATORS', label: 'Scientific Calculators', icon: Calculator, count: '8 Live' },
  { id: 'LAB_EQUIPMENT', label: 'Lab & Engineering', icon: Compass, count: '11 Live' },
  { id: 'FURNITURE', label: 'Dorm & Hostel', icon: Armchair, count: '6 Live' },
];

const SAMPLE_FEATURED = [
  {
    id: 'sample-1',
    title: 'Firefox Target 21-Speed Geared Mountain Bicycle',
    category: 'CYCLES',
    condition: 'LIKE_NEW',
    startingPricePaise: 250000,
    currentPricePaise: 380000,
    bidCount: 9,
    closingMinutes: 24,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    seller: 'Kavita R. (Civil 3rd Yr)',
  },
  {
    id: 'sample-2',
    title: 'Casio fx-991EX ClassWiz Scientific Calculator',
    category: 'CALCULATORS',
    condition: 'GOOD',
    startingPricePaise: 60000,
    currentPricePaise: 95000,
    bidCount: 7,
    closingMinutes: 52,
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    seller: 'Aditya M. (CSE 2nd Yr)',
  },
  {
    id: 'sample-3',
    title: 'Introduction to Algorithms (CLRS 3rd Edition) + Notes',
    category: 'TEXTBOOKS',
    condition: 'GOOD',
    startingPricePaise: 40000,
    currentPricePaise: 65000,
    bidCount: 5,
    closingMinutes: 110,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    seller: 'Sneha P. (IT Final Yr)',
  },
];

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero pt-12 pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Transparent Second-Hand Campus Auctions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Student gear auctions with{' '}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 bg-clip-text text-transparent">
                zero markup
              </span>{' '}
              and verified handovers.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Buy bicycles, textbooks, calculators, and lab tools at fair market value. Every bid is
              backed by anti-sniping extensions and authoritative in-person verification.
            </p>

            {/* Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
              <div className="glass-panel p-2 rounded-2xl shadow-xl shadow-brand-500/5 flex flex-col sm:flex-row items-center gap-2">
                <div className="flex-1 flex items-center gap-2.5 px-3 w-full">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bicycles, CLRS, Casio calculators, dorm fridges..."
                    className="w-full bg-transparent border-0 focus:ring-0 text-slate-800 placeholder-slate-400 text-sm font-medium py-2.5 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Explore Bids</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-amber-500" />
                <span>Anti-Sniping 60s Buffer</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe Campus Handover</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Fair Proxy Bidding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Popular Campus Categories</h2>
            <p className="text-xs text-slate-500">Direct from outgoing seniors and campus peers</p>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.id}`}
                className="glass-panel p-4 rounded-xl hover:border-brand-300 hover:shadow-md transition-all group text-left flex flex-col justify-between h-28"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {cat.label}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Live Auctions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Closing Soon on Campus</h2>
              <p className="text-xs text-slate-500">Competitive auctions ending in the next few hours</p>
            </div>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Explore all auctions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_FEATURED.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-200/90 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge-live shadow-sm bg-white/90 backdrop-blur-md">
                    {item.closingMinutes}m left
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                    {item.condition}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-1">
                    {item.category}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-brand-600 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">Sold by {item.seller}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Current Bid ({item.bidCount} bids)
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {formatPaiseToRupees(item.currentPricePaise)}
                    </span>
                  </div>

                  <Link
                    to="/marketplace"
                    className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Bid Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auction Rules Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-brand-300 tracking-wider uppercase">
              How CampusBid Protects You
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Fair, Transparent Auctions with In-Person Campus Handover
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              No hidden fees, no shipping damage. Sellers approve final winning bids, and payment is
              settled directly upon in-person campus inspection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-amber-400" />
                  Anti-Sniping Guarantee
                </h4>
                <p className="text-[11px] text-slate-300">
                  Any bid placed in the final 30 seconds extends the auction by 60 seconds, ensuring
                  everyone gets a fair chance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Private Proxy Bidding
                </h4>
                <p className="text-[11px] text-slate-300">
                  Set your private maximum bid once. The engine bids only the minimum increment to
                  keep you in the lead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
