import React from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { routePathForTab } from '../lib/routes';

const links = [
  { label: 'Home', tab: 'home' },
  { label: 'Market', tab: 'market' },
  { label: 'Community', tab: 'feed' },
  { label: 'Plant health', tab: 'defense' },
  { label: 'About us', tab: 'about' },
  { label: 'Contact', tab: 'contact' },
];

export default function Footer({ onSwitchTab, onOpenSellModal, onContactSubmit, contactStatus }) {
  return (
    <footer className="mt-auto bg-[#17291e] text-white">
      <div className="page-gutter mx-auto max-w-[1000px] py-10">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.65fr_0.8fr_1.2fr]">
          <div className="max-w-md">
            <button type="button" onClick={() => onSwitchTab('home')} className="group inline-flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6B8E23] text-white transition group-hover:bg-[#7fa62d]" aria-hidden="true"><svg viewBox="0 0 36 48" className="h-8 w-7" fill="none"><path d="M8 43V7m10 36V4m10 39V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 13 3 8m5 11-5-5m5 11-5-5m5 11-5-5m5 11-5-5M18 10l-5-5m5 11-5-5m5 11-5-5m5 11-5-5m5 11-5-5m15-21-5 5m5 6-5 5m5 6-5 5m5 6-5 5m-5-39 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5m-5 1 5 5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /></svg></span>
              <span><span className="block text-lg font-extrabold tracking-wide text-[#f4f1df]">FARM AFRICA</span><span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#b7c49e]">IsokoLink Rwanda</span></span>
            </button>
            <p className="mt-4 text-sm leading-6 text-white/65">A shared place for Rwanda’s farmers, buyers, and agricultural community to meet, trade, and learn.</p>
            <button type="button" onClick={onOpenSellModal} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#6B8E23] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#829e3f]">List your produce <ArrowUpRight size={16} /></button>
          </div>
          <div><h2 className="text-sm font-semibold">Explore IsokoLink</h2><div className="mt-4 grid gap-2">{links.map(({ label, tab }) => <a key={tab} href={routePathForTab(tab)} onClick={(event) => { event.preventDefault(); onSwitchTab(tab); }} className="w-fit text-left text-sm text-white/65 transition-colors hover:translate-x-0.5 hover:text-[#d5e0bd]">{label}</a>)}</div></div>
          <div><h2 className="text-sm font-semibold">For the farming community</h2><p className="mt-4 text-sm leading-6 text-white/65">Share a harvest update, ask a growing question, or connect with people working across the food system.</p><button type="button" onClick={() => onSwitchTab('feed')} className="mt-3 text-sm font-semibold text-[#c2d19e] transition hover:text-white">Visit the community <span aria-hidden="true">→</span></button></div>
          <div className="md:justify-self-end md:w-full md:max-w-sm">
            <h2 className="text-sm font-semibold">Contact us</h2>
            <p className="mt-2 text-xs leading-5 text-white/60">Send a message to the IsokoLink team.</p>
            <form onSubmit={onContactSubmit} className="mt-4 grid gap-3">
              <label className="grid gap-1 text-xs font-medium text-white/75">Name<input name="name" required autoComplete="name" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c2d19e]" /></label>
              <label className="grid gap-1 text-xs font-medium text-white/75">Email<input name="email" type="email" required autoComplete="email" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c2d19e]" /></label>
              <label className="grid gap-1 text-xs font-medium text-white/75">Message<textarea name="message" required rows="3" className="resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#c2d19e]" /></label>
              <div className="flex flex-wrap items-center gap-3"><button type="submit" className="rounded-lg bg-[#6B8E23] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#829e3f]">Send message</button><p role="status" aria-live="polite" className="text-xs text-[#c2d19e]">{contactStatus}</p></div>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Farm Africa · IsokoLink Rwanda</span><span className="inline-flex items-center gap-1.5">Built for local agriculture <Heart size={13} className="text-[#c97862]" fill="currentColor" /></span></div>
      </div>
    </footer>
  );
}
