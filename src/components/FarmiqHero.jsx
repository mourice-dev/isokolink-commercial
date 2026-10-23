import React from 'react';
import { Sprout, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function FarmiqHero({ onExploreProduce, onJoinCommunity, onOpenDiseaseHub }) {
  return (
    <section className="relative bg-[#0a3721] text-white overflow-hidden py-10 md:py-16 px-6 sm:px-12 md:px-16 lg:px-20 farmiq-leaf-pattern">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* ================= LEFT COLUMN: HEADLINE & STATS (Exact matching image) ================= */}
        <div className="lg:col-span-6 space-y-7">
          {/* Main Display Headline in Söhne */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
            Organic Fresh <br />
            Produce Grown <br />
            With Care
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl font-normal leading-relaxed">
            Fresh, naturally grown organic produce from Farmiq ensures healthy living, trusted
            quality, and daily nutrition.
          </p>

          {/* Pill button: "Explore Fresh Produce" */}
          <div className="pt-1">
            <button
              onClick={onExploreProduce}
              className="px-7 py-3 rounded-full bg-[#d1fae5] hover:bg-[#bbf7d0] text-[#0a3721] font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-black/20 transform hover:scale-[1.02]"
            >
              Explore Fresh Produce
            </button>
          </div>

          {/* Bottom Floating Stat Cards (Exact matching image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Card 1: 200K+ Community Card (Warm Cream Card) */}
            <div className="bg-[#faf7f0] text-slate-900 rounded-2xl p-5 shadow-xl space-y-2 border border-amber-100/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Community</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-950">
                200K+
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Happy Farmers Worldwide
              </div>
              {/* Avatar Cluster */}
              <div className="pt-2 flex items-center gap-2 border-t border-slate-200/80">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Farmer 1"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Farmer 2"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Farmer 3"
                  />
                </div>
                <button
                  onClick={onJoinCommunity}
                  className="text-[11px] font-bold text-slate-800 hover:text-emerald-800 transition-colors"
                >
                  Join Our Farming Network
                </button>
              </div>
            </div>

            {/* Card 2: 300K+ Farmland Card (Clean Mint Card) */}
            <div className="bg-[#eef8f2] text-slate-900 rounded-2xl p-5 shadow-xl space-y-2 border border-emerald-200/70">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-950">
                300K+
              </div>
              <div className="text-xs font-bold text-slate-800">
                Acres of Farmland
              </div>
              <p className="text-xs text-slate-600 leading-normal pt-1">
                Growing healthy crops using sustainable farming methods.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: FARMER CARD (Exact matching image) ================= */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[32px] overflow-hidden bg-[#c7eed8] p-2 shadow-2xl flex items-end justify-center">
            {/* High-res Farmer Image holding vegetable crate */}
            <img
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=1000&q=85"
              alt="Smiling farmer holding crate of fresh harvested vegetables"
              className="w-full h-full object-cover object-top rounded-[28px]"
            />

            {/* Top Left Floating Badge: Chemical Free Guarantee */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-100 max-w-[210px] space-y-1">
              <div className="text-[11px] font-semibold text-slate-500">
                Chemical Free Guarantee
              </div>
              <div className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">
                100%
              </div>
              <div className="text-[11px] font-medium text-emerald-800 leading-tight">
                No Harmful Pesticides Used
              </div>
            </div>

            {/* Bottom Right Floating Badge: 2,500+ Farms Improved */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-emerald-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sprout size={18} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-950 font-sans">
                  2,500+
                </div>
                <div className="text-[10px] font-semibold text-slate-600">
                  Farms Improved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
