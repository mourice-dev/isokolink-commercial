import React, { useState } from 'react';
import { Play, ArrowUpRight, ChevronRight, X } from 'lucide-react';

export default function SustainableAgriLanding({ onExploreFarms, onOpenMarket, onOpenDiseaseHub, onOpenSocialFeed }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-[#092617] text-white font-sans selection:bg-[#d9f99d] selection:text-slate-900">
      {/* ================= 1. HERO SECTION (Matching image with refined low font size) ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-start overflow-hidden px-6 sm:px-12 md:px-20 lg:px-24 py-16">
        {/* Background Image with Dark Vignette/Overlay matching image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85"
            alt="Farmer watering terraced agriculture"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient darkening to make text crisp and legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl space-y-4 pt-6">
          {/* "Sustaining Earth" pill badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-xs">
            <span className="text-[11px] font-medium text-white/95 tracking-wide">
              Sustaining Earth
            </span>
          </div>

          {/* Main Headline with low, refined, elegant font size */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight font-sans">
            Grow the Future with <br className="hidden sm:inline" />
            Sustainable Agriculture
          </h1>

          {/* Subheading (low font size) */}
          <p className="text-xs sm:text-sm text-white/85 max-w-lg font-normal leading-relaxed">
            We empower farmers with eco-friendly methods, modern tools, and a shared
            mission to nourish the planet, naturally and responsibly.
          </p>

          {/* Pill CTA: "Explore Our Farms ↗" */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreFarms}
              className="group inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-[#d9f99d] hover:bg-[#bef264] text-slate-950 font-bold text-xs sm:text-sm transition-all duration-150 shadow-md transform hover:scale-[1.01]"
            >
              <span>Explore Our Farms</span>
              <div className="w-7 h-7 rounded-full bg-slate-950 text-[#d9f99d] flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </div>
            </button>

            <button
              onClick={onOpenSocialFeed}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-semibold text-xs transition-all"
            >
              <span>Farmer Social Feed</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. PARTNER LOGOS RIBBON ================= */}
      <section className="bg-[#051a0f] border-y border-emerald-950/60 py-4 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 sm:gap-8 text-slate-400 font-semibold text-xs tracking-wider">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">◉</span>
            <span>FocalPoint</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">▷</span>
            <span>Screentime</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">🌙</span>
            <span>Segment</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">⬡</span>
            <span>Shutterframe</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">🝯</span>
            <span>Lightspeed</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-sm">❖</span>
            <span>Mastermail</span>
          </div>
        </div>
      </section>

      {/* ================= 3. "INNOVATING THE FUTURE OF AGRICULTURE" ================= */}
      <section className="bg-[#092617] py-14 px-6 sm:px-12 md:px-20 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & 2 Vertical Image Cards */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white uppercase font-sans">
              INNOVATING THE FUTURE <br />
              OF AGRICULTURE
            </h2>

            {/* 2 Side-by-Side Vertical Farm Photography Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <div className="h-60 sm:h-80 rounded-xl overflow-hidden shadow-xl border border-emerald-800/40 group">
                <img
                  src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80"
                  alt="Parallel rows of green crops at sunset"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="h-60 sm:h-80 rounded-xl overflow-hidden shadow-xl border border-emerald-800/40 group">
                <img
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer tending crops in lush field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Description & 3 Stats (Low font size) */}
          <div className="lg:col-span-5 space-y-6 lg:pt-2">
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-normal">
              AgriGrow combines modern technology and sustainable methods to help farmers grow
              smarter, faster, and greener.
            </p>

            {/* Stat 1 */}
            <div className="space-y-0.5 border-b border-emerald-900/60 pb-4">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100">
                Customer Satisfaction
              </div>
              <p className="text-[11px] text-emerald-300/70">
                We create solutions that farmers trust and rely on.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-0.5 border-b border-emerald-900/60 pb-4">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                20+
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100">
                Years of Experience
              </div>
              <p className="text-[11px] text-emerald-300/70">
                Decades of innovation driving progress in global agriculture.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-0.5">
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100">
                Customer Satisfaction
              </div>
              <p className="text-[11px] text-emerald-300/70">
                We create solutions that farmers trust and rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. "WHERE TECHNOLOGY MEETS THE ROOTS OF NATURE" VIDEO SHOWCASE ================= */}
      <section className="bg-white text-slate-900 py-14 px-6 sm:px-12 md:px-20 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase max-w-lg font-sans">
              WHERE TECHNOLOGY MEETS <br />
              THE ROOTS OF NATURE
            </h2>

            <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm leading-relaxed md:text-right">
              Harnessing the power of modern tools to nurture crops, support farmers, and
              protect the earth we all depend on.
            </p>
          </div>

          {/* Large Aerial Terraces Video Card matching image */}
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="relative h-[260px] sm:h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=85"
              alt="Terraced agricultural hills from high aerial view"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

            {/* Central Round Frosted Glass Play Button matching image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Play size={22} className="translate-x-0.5 fill-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. "WHERE TECHNOLOGY MEETS THE ROOTS OF NATURE" 4 CARDS ================= */}
      <section className="bg-[#092617] py-14 px-6 sm:px-12 md:px-20 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white uppercase max-w-lg font-sans">
              WHERE TECHNOLOGY MEETS <br />
              THE ROOTS OF NATURE
            </h2>

            <p className="text-[11px] sm:text-xs text-emerald-200/70 max-w-sm leading-relaxed md:text-right">
              Harnessing the power of modern tools to nurture crops, support farmers, and
              protect the earth we all depend on.
            </p>
          </div>

          {/* 2x2 Grid of 4 Cards with low font size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 */}
            <article className="group space-y-2.5">
              <div className="h-52 sm:h-60 rounded-xl overflow-hidden border border-emerald-800/40 bg-emerald-950 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer using smartphone sensor in lush crop field"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d9f99d] transition-colors font-sans">
                  Sustainable Farming in the Age of Climate Change
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-200/70 leading-relaxed">
                  Explore how farmers worldwide are adapting to rising temperatures and unpredictable
                  weather using eco-friendly and tech-based solutions.
                </p>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group space-y-2.5">
              <div className="h-52 sm:h-60 rounded-xl overflow-hidden border border-emerald-800/40 bg-emerald-950 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80"
                  alt="Smart technology tablet in modern farm"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d9f99d] transition-colors font-sans">
                  How Smart Technology is Transforming Modern Agriculture
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-200/70 leading-relaxed">
                  Discover how AI, IoT, and automation are helping farmers monitor crops, boost
                  yields, and reduce waste — shaping the future of agriculture.
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group space-y-2.5">
              <div className="h-52 sm:h-60 rounded-xl overflow-hidden border border-emerald-800/40 bg-emerald-950 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80"
                  alt="Scientist holding healthy plant roots in nursery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d9f99d] transition-colors font-sans">
                  Building a Greener Future Through Regenerative Farming
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-200/70 leading-relaxed">
                  Learn how regenerative farming restores soil health, increases biodiversity, and
                  supports sustainable food production for future generations.
                </p>
              </div>
            </article>

            {/* Card 4 */}
            <article className="group space-y-2.5">
              <div className="h-52 sm:h-60 rounded-xl overflow-hidden border border-emerald-800/40 bg-emerald-950 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=800&q=80"
                  alt="Woman farmer tending greenhouse fruit vines"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d9f99d] transition-colors font-sans">
                  Sustainable Farming in the Modern Era
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-200/70 leading-relaxed">
                  Discover how eco-friendly farming practices are changing the way we grow and
                  harvest food across the world.
                </p>
              </div>
            </article>
          </div>

          {/* Quick Hub Navigation Bar */}
          <div className="pt-6 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-emerald-300">Explore platform departments:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onOpenMarket}
                className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-white font-medium border border-emerald-700/50"
              >
                🌾 Produce Marketplace
              </button>
              <button
                onClick={onOpenDiseaseHub}
                className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 font-medium border border-emerald-700/50"
              >
                🛡️ Disease Defense Hub
              </button>
              <button
                onClick={onOpenSocialFeed}
                className="px-3 py-1.5 rounded-lg bg-[#d9f99d] text-slate-950 font-bold"
              >
                📰 Community News Feed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-slate-800 text-white">
              <h4 className="font-bold text-xs sm:text-sm">Documentary: Sustainable Terraces of Rwanda</h4>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
              >
                <X size={16} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="Sustainable Farming Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
