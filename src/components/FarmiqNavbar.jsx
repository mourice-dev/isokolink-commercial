import React, { useState } from 'react';
import { 
  ChevronDown, 
  ShoppingBag, 
  Sprout, 
  ShieldAlert, 
  Stethoscope, 
  Truck, 
  Newspaper, 
  PhoneCall, 
  PlusCircle, 
  Menu, 
  X,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';

export default function FarmiqNavbar({
  activeTab,
  setActiveTab,
  onOpenSellModal,
  cartCount = 0,
  onOpenCart,
}) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [farmsOpen, setFarmsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setProductsOpen(false);
    setFarmsOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a3721]/95 backdrop-blur-md text-white border-b border-emerald-900/40 shadow-sm transition-all duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-3.5 flex items-center justify-between gap-4">
        
        {/* ================= 1. BRAND LOGO ================= */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform duration-200">
            <Sprout size={22} className="text-[#072618]" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-sans">
                FARMIQ
              </span>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Rwanda
              </span>
            </div>
            <span className="text-[11px] tracking-wide text-emerald-300/80 font-medium">
              IsokoLink Digital Agriculture
            </span>
          </div>
        </div>

        {/* ================= 2. DESKTOP NAVIGATION MENU ================= */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-100/90 font-sans">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'home' 
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            <span>Home</span>
          </button>

          {/* About Us */}
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-1 ${
              activeTab === 'about' 
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            <span>About Us</span>
          </button>

          {/* Products & Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              onClick={() => handleNavClick('market')}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                ['market', 'defense', 'doctor', 'agencies'].includes(activeTab)
                  ? 'text-emerald-300 font-bold border-b-2 border-emerald-400'
                  : 'hover:text-white'
              }`}
            >
              <span>Products & Services</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-emerald-300' : 'opacity-70'}`} 
              />
            </button>

            {/* Hierarchical Submenu Dropdown */}
            {productsOpen && (
              <div className="absolute top-full -left-6 w-80 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-[#072618] rounded-2xl p-2.5 shadow-2xl border border-emerald-800/60 text-xs space-y-1 backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-emerald-400 font-bold border-b border-emerald-900/60">
                    Agricultural Ecosystem
                  </div>

                  <div
                    onClick={() => handleNavClick('market')}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-900/60 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                      <Sprout size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">Fresh Harvest Market</div>
                      <div className="text-[11px] text-emerald-300/70">Potatoes, Maize, Avocados, Coffee directly from co-ops</div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('defense')}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-900/60 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-amber-200 text-sm">Disease Prevention Hub</div>
                      <div className="text-[11px] text-emerald-300/70">RAB-certified defense kits, anti-blight & sanitation supplies</div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('doctor')}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-900/60 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                      <Stethoscope size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-purple-200 text-sm">AI Crop Doctor</div>
                      <div className="text-[11px] text-emerald-300/70">Instant photo pathology & agronomic remedies</div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('agencies')}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-900/60 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                      <Truck size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-cyan-200 text-sm">Field Spraying & Testing</div>
                      <div className="text-[11px] text-emerald-300/70">Book certified PPE spraying teams and soil tests</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Our Farms / Growing Zones */}
          <div
            className="relative"
            onMouseEnter={() => setFarmsOpen(true)}
            onMouseLeave={() => setFarmsOpen(false)}
          >
            <button
              onClick={() => handleNavClick('market')}
              className="flex items-center gap-1.5 py-1 hover:text-white transition-colors"
            >
              <span>Our Farms</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${farmsOpen ? 'rotate-180 text-emerald-300' : 'opacity-70'}`} 
              />
            </button>

            {farmsOpen && (
              <div className="absolute top-full -left-6 w-64 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-[#072618] rounded-2xl p-2.5 shadow-2xl border border-emerald-800/60 text-xs space-y-1 backdrop-blur-xl">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-400 font-bold border-b border-emerald-900/60">
                    Rwandan Growing Zones
                  </div>
                  {[
                    { district: 'Musanze & Gakenke', crop: 'Irish Potatoes (Kinigi)' },
                    { district: 'Nyagatare & Gatsibo', crop: 'Dry Grain Maize' },
                    { district: 'Huye & Nyamagabe', crop: 'Highland Arabica Coffee' },
                    { district: 'Rubavu & Rutsiro', crop: 'Bananas & Plantains' },
                    { district: 'Bugesera & Rwamagana', crop: 'Hass Avocados & Vegetables' }
                  ].map((zone, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleNavClick('market')}
                      className="p-2 rounded-lg hover:bg-emerald-900/60 cursor-pointer text-slate-200 flex items-start gap-2 transition-colors"
                    >
                      <MapPin size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">{zone.district}</div>
                        <div className="text-[10px] text-emerald-300/70">{zone.crop}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community Farming Feed */}
          <button
            onClick={() => handleNavClick('feed')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'feed' 
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            <Newspaper size={14} className="text-emerald-300" />
            <span>Community Feed</span>
          </button>

          {/* Contact */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-1 ${
              activeTab === 'contact' 
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            <span>Contact</span>
          </button>
        </nav>

        {/* ================= 3. RIGHT ACTIONS ================= */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Sell Produce (Farmer CTA) */}
          {onOpenSellModal && (
            <button
              onClick={onOpenSellModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-400/40 hover:bg-emerald-800/40 text-emerald-200 hover:text-white text-xs font-semibold transition-colors"
              title="Post a harvest listing for wholesale buyers"
            >
              <PlusCircle size={15} className="text-emerald-400" />
              <span>Sell Produce</span>
            </button>
          )}

          {/* Get Fresh Produce (Main Buyer CTA) */}
          <button
            onClick={() => handleNavClick('market')}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#d1fae5] hover:bg-[#bbf7d0] text-[#0a3721] font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-emerald-500/10 active:scale-95"
          >
            Get Fresh Produce
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center relative transition-colors"
            title="Open Cart"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center border-2 border-[#0a3721] shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= 4. RESPONSIVE MOBILE NAVIGATION DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/50 bg-[#072618] px-4 py-4 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <Sprout size={16} className="text-emerald-400" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('market')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'market' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <ShoppingBag size={16} className="text-emerald-400" />
              <span>Market</span>
            </button>

            <button
              onClick={() => handleNavClick('defense')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'defense' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <ShieldAlert size={16} className="text-amber-400" />
              <span>Disease Hub</span>
            </button>

            <button
              onClick={() => handleNavClick('doctor')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'doctor' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <Stethoscope size={16} className="text-purple-400" />
              <span>AI Crop Doctor</span>
            </button>

            <button
              onClick={() => handleNavClick('agencies')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'agencies' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <Truck size={16} className="text-cyan-400" />
              <span>Field Agencies</span>
            </button>

            <button
              onClick={() => handleNavClick('feed')}
              className={`p-2.5 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'feed' ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-950/60 text-slate-200'
              }`}
            >
              <Newspaper size={16} className="text-emerald-300" />
              <span>Community Feed</span>
            </button>
          </div>

          <div className="pt-2 border-t border-emerald-900/60 flex flex-col gap-2">
            {onOpenSellModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSellModal();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-800/70 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <PlusCircle size={15} />
                <span>Farmer Portal: Sell Produce</span>
              </button>
            )}
            
            <div className="flex justify-between items-center px-1 text-xs text-emerald-300/80">
              <button onClick={() => handleNavClick('about')} className="hover:text-white py-1">
                About Us
              </button>
              <span>•</span>
              <button onClick={() => handleNavClick('contact')} className="hover:text-white py-1">
                Contact & Support
              </button>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">📞 3030 (Toll-Free)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
