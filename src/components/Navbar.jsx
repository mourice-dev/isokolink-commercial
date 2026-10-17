import React from 'react';
import {
  Sprout,
  ShieldAlert,
  Stethoscope,
  Truck,
  PlusCircle,
  ShoppingBag,
  Newspaper,
  Search,
  Bell,
  Globe
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenSellModal,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#072618] text-white border-b border-emerald-950/60 shadow-md">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center text-amber-300 shadow-sm">
                <span className="text-xl">🌾</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#faf7f0] font-sans">
                    FARM AFRICA
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#d9f99d] text-slate-950 uppercase">
                    IsokoLink
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300 font-medium hidden sm:inline">
                  Sustainable Agriculture & Trade
                </span>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="hidden md:flex items-center bg-emerald-900/60 border border-emerald-700/50 rounded-full px-3.5 py-1.5 text-xs text-emerald-100 w-52 lg:w-64 focus-within:w-72 transition-all duration-200">
              <Search size={14} className="text-emerald-300 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search crops, farms, disease remedies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full placeholder:text-emerald-400/70 text-xs"
              />
            </div>
          </div>

          {/* Navigation Tabs (Overview matching image, Community Feed, Produce, Disease Hub, AI Doctor) */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#d9f99d] text-slate-950 shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900/70 hover:text-white'
              }`}
            >
              <Globe size={14} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'feed'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900/70 hover:text-white'
              }`}
            >
              <Newspaper size={14} />
              <span>News & Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('market')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'market'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900/70 hover:text-white'
              }`}
            >
              <Sprout size={14} />
              <span>Produce Market</span>
            </button>

            <button
              onClick={() => setActiveTab('defense')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'defense'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                  : 'text-amber-200 hover:bg-amber-950/70 hover:text-amber-300'
              }`}
            >
              <ShieldAlert size={14} />
              <span>Disease Defense</span>
            </button>

            <button
              onClick={() => setActiveTab('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'doctor'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-purple-200 hover:bg-purple-950/70 hover:text-purple-300'
              }`}
            >
              <Stethoscope size={14} />
              <span>AI Crop Doctor</span>
            </button>

            <button
              onClick={() => setActiveTab('agencies')}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'agencies'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900/70 hover:text-white'
              }`}
            >
              <Truck size={14} />
              <span>Agencies</span>
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Sell Harvest button */}
            <button
              onClick={onOpenSellModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-sm"
            >
              <PlusCircle size={15} />
              <span>Sell Harvest</span>
            </button>

            {/* Notifications */}
            <button
              className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center relative transition-colors"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {/* Cart trigger */}
            <button
              onClick={onOpenCart}
              className="w-9 h-9 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center relative transition-colors"
              title="Cart"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center justify-center border-2 border-[#072618]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <div
              onClick={() => setActiveTab('feed')}
              className="flex items-center gap-2 pl-1 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Quen Nice"
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-400"
              />
              <span className="hidden md:inline text-xs font-bold text-slate-100">
                Quen Nice
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
