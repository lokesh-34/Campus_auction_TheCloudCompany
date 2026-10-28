import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { LandingPage } from './pages/LandingPage.jsx';

function PlaceholderPage({ title, description }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase">
        Milestone Roadmap
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
      <p className="text-slate-600 max-w-lg mx-auto text-sm">{description}</p>
      <div className="pt-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/marketplace"
              element={
                <PlaceholderPage
                  title="Campus Marketplace"
                  description="Browse active student auctions, filter by category and condition, and place real-time bids."
                />
              }
            />
            <Route
              path="/login"
              element={
                <PlaceholderPage
                  title="Sign In to CampusBid"
                  description="Firebase Authentication with Google Sign-in and verified email accounts."
                />
              }
            />
            <Route
              path="/register"
              element={
                <PlaceholderPage
                  title="Register Student Account"
                  description="Open campus registration with optional email verification and instant seller profile creation."
                />
              }
            />
            <Route
              path="/create-listing"
              element={
                <PlaceholderPage
                  title="List Item for Auction"
                  description="Upload photos, specify starting price, set minimum increment, and schedule auction closing time."
                />
              }
            />
            <Route
              path="/ai-assistant"
              element={
                <PlaceholderPage
                  title="CampusBid AI Assistant"
                  description="Natural language queries, factual comparisons, and confirmation-gated bidding actions."
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <PlaceholderPage
                  title="Your Watchlist"
                  description="Keep track of closing timers and outbid updates on saved auctions."
                />
              }
            />
            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="Page Not Found"
                  description="The page you are looking for does not exist."
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
