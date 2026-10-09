import React from 'react';
import { AdvisoryAlertsBanner } from './AdvisoryAlertsBanner';
import { QuickStats } from './QuickStats';
import { WeatherCard } from './WeatherCard';
import { MANDI_PRICES_DATA } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert, 
  Sprout, 
  Leaf, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { setActiveTab, currentRegion, t } = useApp();

  const topMandiPicks = MANDI_PRICES_DATA.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* 1. Real-time Advisory Alerts Banner */}
      <AdvisoryAlertsBanner />

      {/* 2. Key Agronomic KPIs & Launchpad Actions */}
      <QuickStats />

      {/* 3. 7-Day Precision Micro-Weather Forecast */}
      <WeatherCard />

      {/* 4. Bottom Split: Quick Mandi Snapshot & Agronomic Helpdesk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Mandi Snapshot Preview */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                Agmarknet Live APMC Feed
              </span>
              <h3 className="text-base font-black text-stone-900">
                Key Commodity Rates ({currentRegion.state} & Neighbors)
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('mandi')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
            >
              <span>View All APMC Mandis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topMandiPicks.map(item => (
              <div 
                key={item.id} 
                onClick={() => setActiveTab('mandi')}
                className="p-3.5 rounded-xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200/80 transition cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">{item.commodity}</h4>
                    <span className="text-[11px] text-stone-500">{item.market}</span>
                  </div>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    item.trend === 'up' ? 'text-emerald-800 bg-emerald-100' : 'text-stone-700 bg-stone-200'
                  }`}>
                    {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-base font-black text-stone-900">₹{item.modalPrice} <span className="text-[10px] text-stone-500 font-normal">/ Qtl</span></span>
                  <span className="text-[10px] text-stone-500">Range: ₹{item.minPrice} - ₹{item.maxPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kisan Expert Helpline & Agromet Support Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white p-6 rounded-2xl shadow-card border border-forest-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Government Kisan Advisory Helpline</span>
            </div>
            <h3 className="text-xl font-black text-white mt-2">
              Speak Directly with an ICAR Agronomist
            </h3>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Facing unusual pest behavior, stunted seedlings, or need soil testing guidance? The national Kisan Call Centre provides 24x7 toll-free support in 22 regional languages.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-xs text-stone-200 font-semibold">Toll-Free Helpline:</span>
              <span className="text-base font-black text-emerald-300 font-mono tracking-wider">1800-180-1551</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('diseases')}
                className="flex-1 text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Scan Plant Symptoms
              </button>
              <button
                onClick={() => setActiveTab('crops')}
                className="flex-1 text-center py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition"
              >
                Plan Next Crop
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
