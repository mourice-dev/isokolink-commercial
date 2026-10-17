import React from 'react';
import { Sprout, ShieldAlert, Stethoscope, Truck, Newspaper, ChevronRight, Layers } from 'lucide-react';

export default function HierarchicalFloorTree({ activeFloor, onSelectFloor }) {
  const floors = [
    {
      id: 'market',
      level: 'Floor 1',
      title: 'Fresh Produce Market',
      rank: 'Bulk Harvest Supply',
      badge: '450+ Cooperatives',
      icon: Sprout,
      color: 'emerald',
      description: 'Connect direct with smallholders for Kinigi potatoes, Hass avocados, maize & coffee.'
    },
    {
      id: 'defense',
      level: 'Floor 2',
      title: 'Disease Defense Hub',
      rank: 'RAB-Certified Antidotes',
      badge: 'Laboratory Verified',
      icon: ShieldAlert,
      color: 'amber',
      description: 'Explore and buy protective fungicides, bio-larvicides, and BXW sanitation kits.'
    },
    {
      id: 'doctor',
      level: 'Floor 3',
      title: 'AI Crop Diagnostic Doctor',
      rank: 'Pathology & Prescription',
      badge: 'Instant AI Analysis',
      icon: Stethoscope,
      color: 'purple',
      description: 'Step-by-step leaf & plant symptom troubleshooter with 1-click remedy ordering.'
    },
    {
      id: 'agencies',
      level: 'Floor 4',
      title: 'Field Agencies & Teams',
      rank: 'On-Farm Intervention',
      badge: 'PPE Certified Squads',
      icon: Truck,
      color: 'cyan',
      description: 'Book motorized crop spraying teams, soil testing labs, and refrigerated transport.'
    },
    {
      id: 'feed',
      level: 'Floor 5',
      title: 'Community Farming News & Weather',
      rank: 'Agronomy Exchange & Alerts',
      badge: 'Live Rwanda Advisory',
      icon: Newspaper,
      color: 'blue',
      description: 'Verified farmer field updates, cooperative harvest bulletins, pest outbreak alerts, and peer networking.'
    }
  ];

  return (
    <section className="bg-[#072618] border-y border-emerald-900/40 py-8 px-6 sm:px-12 md:px-16 lg:px-20">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Floor Hierarchy Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/60 flex items-center justify-center text-[#d1fae5]">
              <Layers size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Ecosystem Architecture & Department Levels
              </h2>
              <p className="text-xs text-emerald-300/70">
                Organized hierarchically from farm-gate harvest to plant pathology defense
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
            5 Verified Operational Floors
          </span>
        </div>

        {/* 5 Hierarchical Floors Tree Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          {floors.map((floor) => {
            const Icon = floor.icon;
            const isActive = activeFloor === floor.id;

            return (
              <div
                key={floor.id}
                onClick={() => onSelectFloor(floor.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group ${
                  isActive
                    ? 'bg-emerald-950/90 border-[#d1fae5] shadow-lg shadow-black/40 ring-1 ring-[#d1fae5]/50'
                    : 'bg-[#0a3721]/60 border-emerald-900/50 hover:bg-[#0a3721] hover:border-emerald-700/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      {floor.level}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200">
                      {floor.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={16} className={isActive ? 'text-[#d1fae5]' : 'text-emerald-300'} />
                    <h3 className="text-sm font-bold text-white font-sans truncate">
                      {floor.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-emerald-200/70 leading-snug line-clamp-2">
                    {floor.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-emerald-900/40 flex items-center justify-between text-[11px] font-semibold text-emerald-300">
                  <span>{floor.rank}</span>
                  <ChevronRight
                    size={14}
                    className={`transform transition-transform ${
                      isActive ? 'translate-x-1 text-[#d1fae5]' : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
