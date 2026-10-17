import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { REGIONAL_CONDITIONS } from '../data/socialFeedData';

export default function WeatherConditionBanner({ onActionClick }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeCondition = REGIONAL_CONDITIONS[selectedIdx];

  return (
    <div className="bg-[#052214] text-white rounded-2xl p-5 md:p-6 shadow-md border border-emerald-800/40 relative overflow-hidden font-sans">
      {/* Background radial gradient accent in organic green */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-emerald-800/40 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Live Rwandan Farming Situation & Outbreak Status
          </span>
        </div>
        <span className="text-[11px] text-emerald-200/70 font-medium">
          {activeCondition.updatedAt} • MINAGRI / RAB Verified
        </span>
      </div>

      {/* Regional Selector Pills */}
      <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar relative z-10">
        {REGIONAL_CONDITIONS.map((cond, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              selectedIdx === idx
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900/60 border border-emerald-800/40'
            }`}
          >
            {cond.province.split(' ')[0]} {cond.province.includes('Kigali') ? 'Kigali' : ''}
          </button>
        ))}
      </div>

      {/* Active Situation Details with Green Caution Alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-center relative z-10">
        <div className="md:col-span-2 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-700/50">
              <MapPin size={12} className="text-emerald-400" />
              {activeCondition.province}
            </span>
            <span className="text-xs text-emerald-200 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800/60 font-medium">
              {activeCondition.weather}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {activeCondition.alertTitle}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-2xl">
            {activeCondition.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex md:justify-end">
          <button
            onClick={() => onActionClick(activeCondition.actionTab)}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#d1fae5] hover:bg-[#bbf7d0] text-[#0a3721] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-95"
          >
            <span>{activeCondition.actionText}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
