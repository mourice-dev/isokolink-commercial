import React, { useState } from 'react';
import { Bell, Menu, PlusCircle, ShoppingBag, UserPlus, X } from 'lucide-react';

const navigation = [
  { label: 'Home', tab: 'home' },
  { label: 'Market', tab: 'market' },
  { label: 'Community', tab: 'feed' },
  { label: 'About', tab: 'about' },
];

export default function FarmiqNavbar({ activeTab, setActiveTab, onOpenSellModal, onOpenCart, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinkClass = (tab) =>
    `cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      activeTab === tab
        ? 'font-bold'
        : ''
      }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#17291e] text-white shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
      <div className="page-gutter mx-auto flex max-w-[1080px] items-center justify-between gap-3 py-2 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 shrink-0 items-center gap-3 xl:justify-self-start">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex shrink-0 cursor-pointer items-center gap-2 text-left xl:justify-self-start"
          aria-label="Farm Africa IsokoLink Rwanda home"
        >
          <span className="flex h-8 w-7 items-center justify-center border-r border-white/20 pr-1.5 text-[#f4f1df] transition-transform group-hover:scale-105" aria-hidden="true">
            <svg viewBox="0 0 36 48" className="h-7 w-6" fill="none">
              <path d="M8 43V7m10 36V4m10 39V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 13 3 8m5 11-5-5m5 11-5-5m5 11-5-5m5 11-5-5M18 10l-5-5m5 11-5-5m5 11-5-5m5 11-5-5m5 11-5-5m15-21-5 5m5 6-5 5m5 6-5 5m5 6-5 5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              <path d="m18 4 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap text-[15px] font-extrabold tracking-[0.035em] text-[#f4f1df] sm:text-[17px]">FARM AFRICA</span>
            <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.17em] text-[#b7c49e] sm:text-[9px]">IsokoLink Rwanda</span>
          </span>
        </button>

        </div>

        <nav aria-label="Main navigation" className="hidden items-center justify-self-center gap-1 xl:flex">
          {navigation.map(({ label, tab }) => (
            <button key={tab} type="button" aria-current={activeTab === tab ? 'page' : undefined} onClick={() => handleNavClick(tab)} className={`${navLinkClass(tab)} relative px-3.5 py-2.5 ${activeTab === tab ? 'text-[#d5e0bd] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:rounded-full after:bg-[#9eb65b]' : 'text-white/80 hover:bg-white/[0.04] hover:text-white'}`}>
              {label}
            </button>
          ))}
        </nav>

        <div className="relative ml-auto flex shrink-0 items-center gap-2 sm:gap-3 xl:ml-0 xl:justify-self-end">
          <button type="button" onClick={() => handleNavClick('profile')} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#c2d19e]/40 px-2 py-1.5 text-[11px] font-semibold text-[#e6edda] transition hover:bg-white/10 sm:px-2.5 sm:text-xs">
            <UserPlus size={14} className="text-[#c2d19e]" /> Sign up
          </button>
          <button
            type="button"
            onClick={onOpenSellModal}
            className="hidden cursor-pointer items-center gap-1 rounded-lg border border-white/25 px-2 py-1.5 text-[11px] font-semibold text-white/90 transition-all hover:border-[#9eb65b] hover:bg-white/5 sm:inline-flex"
          >
            <PlusCircle size={15} className="text-[#b3c773]" />
            <span>Sell produce</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('market')}
            className="cursor-pointer rounded-lg bg-[#6B8E23] px-2.5 py-2 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-[#556B2F] sm:px-3 sm:text-xs"
          >
            Get produce
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 text-white/85 transition-all hover:-translate-y-0.5 hover:border-[#c2d19e]/60 hover:bg-white/5"
            title="Open cart"
            aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag size={17} />
            <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-[#17291e] bg-[#9eb65b] px-0.5 text-[9px] font-bold leading-none text-[#17291e]">{cartCount}</span>
          </button>
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 text-white/85 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-[#17291e] bg-[#c9a449]" />
          </button>
          {notificationsOpen && (
            <div className="absolute right-16 top-[calc(100%-0.25rem)] z-50 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-black/10 bg-white text-black shadow-xl sm:right-24">
              <div className="border-b border-black/8 px-4 py-3"><h2 className="text-sm font-semibold">Notifications</h2><p className="mt-0.5 text-xs text-black/50">Updates from the IsokoLink community</p></div>
              <button type="button" onClick={() => { handleNavClick('market'); setNotificationsOpen(false); }} className="block w-full border-b border-black/5 px-4 py-3 text-left transition-colors hover:bg-[#f4f6ee]"><span className="block text-sm font-medium">New harvest listings are available</span><span className="mt-1 block text-xs text-black/50">Explore produce offered by local growers</span></button>
              <button type="button" onClick={() => { handleNavClick('feed'); setNotificationsOpen(false); }} className="block w-full px-4 py-3 text-left transition-colors hover:bg-[#f4f6ee]"><span className="block text-sm font-medium">Join the latest farm discussions</span><span className="mt-1 block text-xs text-black/50">See updates, ideas, and questions from the community</span></button>
              <button type="button" onClick={() => { onOpenCart?.(); setNotificationsOpen(false); }} className="flex w-full items-center justify-between border-t border-black/8 px-4 py-3 text-left text-sm font-semibold text-[#556B2F] transition-colors hover:bg-[#f4f6ee]"><span className="inline-flex items-center gap-2"><ShoppingBag size={15} /> View your basket</span><span className="rounded-full bg-[#e8eddc] px-2 py-0.5 text-xs">{cartCount}</span></button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 text-white/85 transition-colors hover:bg-white/5 xl:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-[#17291e] px-4 py-3 xl:hidden">
          <div className="page-gutter mx-auto grid max-w-[1080px] grid-cols-2 gap-2 sm:grid-cols-6">
            {navigation.map(({ label, tab }) => (
              <button key={tab} type="button" onClick={() => handleNavClick(tab)} className={`${navLinkClass(tab)} border border-white/10 bg-white/[0.03] text-left`}>
                {label}
              </button>
            ))}
            <button type="button" onClick={() => handleNavClick('profile')} className="flex items-center gap-2 rounded-lg border border-[#c2d19e]/35 bg-white/[0.03] px-3 py-2 text-left text-sm font-medium text-[#e6edda]"><UserPlus size={15}/> Sign up</button>
            {onOpenSellModal && (
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenSellModal(); }}
                className="flex items-center gap-2 rounded-lg bg-[#6B8E23] px-3 py-2 text-left text-sm font-semibold text-white sm:hidden"
              >
                <PlusCircle size={16} /> Sell
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
