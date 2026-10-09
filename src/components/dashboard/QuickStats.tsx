import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarDays, 
  Activity, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Sprout,
  ShieldCheck,
  Droplets
} from 'lucide-react';

export const QuickStats: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200/90 shadow-card hover:border-emerald-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Cropping Season
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-xl font-black text-stone-900">Rabi 2026-27</h4>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Prime Sowing Window Active</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200/90 shadow-card hover:border-emerald-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Soil Health Index
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <h4 className="text-xl font-black text-stone-900">84 / 100</h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Optimal
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500 font-medium">
              <span>EC: 0.42 dS/m • Organic Carbon: 0.68%</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200/90 shadow-card hover:border-emerald-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Field Work Window
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-xl font-black text-stone-900">Next 36 Hours</h4>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-700 font-medium">
              <span>Safe for spraying before weekend rain</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200/90 shadow-card hover:border-emerald-300 transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Mandi Index Trend
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-800">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <h4 className="text-xl font-black text-stone-900">₹2,475 / Qtl</h4>
              <span className="text-xs font-bold text-emerald-600">
                +1.8%
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-stone-500 font-medium">
              <span>Wheat APMC Model Price • Above MSP</span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Launchpad Action Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => setActiveTab('crops')}
          className="cursor-pointer bg-gradient-to-br from-emerald-800 to-forest-900 text-white p-4 rounded-2xl shadow-card hover:shadow-lg transition-all group border border-emerald-700/50 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-emerald-300 group-hover:scale-105 transition">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Recommendation AI</p>
              <h5 className="text-sm font-bold text-white">Find Best Crop for Your Soil</h5>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('diseases')}
          className="cursor-pointer bg-gradient-to-br from-amber-900 to-stone-900 text-white p-4 rounded-2xl shadow-card hover:shadow-lg transition-all group border border-amber-800/40 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-amber-300 group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">AI Leaf Diagnostic</p>
              <h5 className="text-sm font-bold text-white">Detect Pests & Symptoms</h5>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('fertilizer')}
          className="cursor-pointer bg-gradient-to-br from-teal-900 to-forest-950 text-white p-4 rounded-2xl shadow-card hover:shadow-lg transition-all group border border-teal-800/40 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-teal-300 group-hover:scale-105 transition">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-300 uppercase tracking-wider">Nutrient Calculator</p>
              <h5 className="text-sm font-bold text-white">Calculate Urea, DAP & Water</h5>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition" />
        </div>

      </div>
    </div>
  );
};
