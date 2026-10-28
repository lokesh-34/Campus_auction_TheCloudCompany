import React from 'react';
import { Gavel, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Gavel className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                CampusBid
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent, student-first auction marketplace for verified campus community members.
              Buy and sell pre-loved campus essentials with real-time bidding integrity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>Cycles & Campus Mobility</li>
              <li>Textbooks & Study Guides</li>
              <li>Calculators & Lab Gears</li>
              <li>Laptops & Electronics</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Auction Safeguards
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Anti-sniping 60s extensions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authoritative proxy bidding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
                <span>Verified in-person handovers</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Campus Security
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Protected by Firebase Auth, server-enforced atomic transactions, and tamper-proof bid logs.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} CampusBid. Built for campus fairness & trust.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Auction Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Handover Guidelines</span>
            <span className="hover:text-slate-600 cursor-pointer">Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
