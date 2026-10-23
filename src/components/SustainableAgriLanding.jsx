import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Leaf, MapPin, ShieldCheck, ShoppingBasket, Sprout, Users } from 'lucide-react';

const benefits = [
  {
    icon: Sprout,
    title: 'Buy closer to the source',
    text: 'Discover fresh produce offered by farmers and cooperatives across Rwanda.',
  },
  {
    icon: ShieldCheck,
    title: 'Trade with confidence',
    text: 'Clear listing details help buyers make informed decisions before they order.',
  },
  {
    icon: Users,
    title: 'Grow together',
    text: 'Share local knowledge and stay connected with Rwanda’s farming community.',
  },
];

export default function SustainableAgriLanding({ onExploreFarms, onOpenMarket, onOpenSocialFeed }) {
  return (
    <div className="bg-white text-black">
      <section className="bg-[#f7f8f4]">
        <div className="page-gutter mx-auto grid max-w-[1000px] items-center gap-8 py-9 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-12">
          <div className="max-w-2xl py-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#6B8E23]/20 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-[#556B2F] shadow-sm sm:text-sm">
              <MapPin size={15} className="text-[#6B8E23]" />
              <span>Made for Rwanda’s agriculture</span>
            </div>
            <h1 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-[#17291e] sm:text-4xl lg:text-5xl">
              A better way to grow and trade together.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-black/65 sm:text-base sm:leading-7">
              IsokoLink connects Rwanda’s farmers, cooperatives, and buyers through one straightforward place to find produce and build stronger local markets.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreFarms}
                className="group inline-flex cursor-pointer items-center gap-3 rounded-lg bg-[#6B8E23] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#556B2F] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B8E23]"
              >
                Explore the market <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={onOpenSocialFeed}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#17291e] transition-all hover:-translate-y-0.5 hover:border-[#6B8E23]/50 hover:bg-[#f4f6ee] hover:shadow-sm"
              >
                Visit the community
              </button>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-black/55">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#6B8E23]" /> Local produce listings</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#6B8E23]" /> Farmer-first marketplace</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-[#e9eedf] shadow-lg shadow-[#17291e]/10 transition-transform duration-300 hover:scale-[1.01]">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85"
                alt="Green agricultural fields and hills in Rwanda"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-xl border border-black/5 bg-white px-4 py-3 shadow-md sm:bottom-5 sm:left-5"><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#6B8E23]">Connected locally</p><p className="mt-1 text-sm font-semibold text-[#17291e]">Farmers · Buyers · Community</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-[#f7f8f4]">
        <div className="page-gutter mx-auto grid max-w-[1000px] gap-4 py-6 sm:grid-cols-3">
          {[
            ['01', 'Find produce', 'Browse available harvests and connect with sellers.'],
            ['02', 'Make a connection', 'Explore clear details and reach the right supplier.'],
            ['03', 'Build your market', 'Keep local trade and farming knowledge moving.'],
          ].map(([number, title, description]) => (
            <div key={number} className="flex items-start gap-4 rounded-xl p-2 sm:p-3">
              <span className="pt-0.5 text-sm font-semibold text-[#6B8E23]">{number}</span>
              <div>
                <h2 className="text-sm font-semibold text-black">{title}</h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-black/60">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-gutter mx-auto max-w-[1000px] py-12 sm:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B8E23]">One connected platform</span>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
              Built around the people who feed Rwanda.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-black/65 lg:justify-self-end sm:text-base">
            From the first harvest listing to a new community connection, IsokoLink brings useful tools together in a clear, easy-to-use experience.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23]/10 text-[#556B2F]">
                <Icon size={21} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/60">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f8f4]">
        <div className="page-gutter mx-auto grid max-w-[1000px] items-center gap-8 py-11 sm:py-12 lg:grid-cols-2">
          <div className="relative min-h-[250px] overflow-hidden rounded-2xl sm:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1200&q=85"
              alt="Fresh vegetables growing in a cultivated field"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-semibold text-black">
              <Leaf size={15} className="text-[#228B22]" /> Rooted in local agriculture
            </div>
          </div>
          <div className="lg:pl-6">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6B8E23]">Your next harvest starts here</span>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">Good food travels further when we work together.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/65 sm:text-base">
              Find fresh listings, meet the people behind them, and take part in a more connected agricultural community.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={onOpenMarket} className="inline-flex items-center gap-2 rounded-full bg-[#228B22] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#556B2F]">
                <ShoppingBasket size={17} /> Browse produce <ArrowUpRight size={16} />
              </button>
              <button type="button" onClick={onOpenSocialFeed} className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-black transition hover:border-[#6B8E23] hover:text-[#556B2F]">
                Join the community
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
