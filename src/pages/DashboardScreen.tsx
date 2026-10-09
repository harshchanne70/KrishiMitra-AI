import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  ShieldCheck, 
  History, 
  PlusCircle, 
  ArrowRight, 
  Camera
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';

export const DashboardScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { farmerInfo, farmSoil, cropSelection, weatherData, historyList, fetchWeather, refreshHistory } = useAdvisoryWorkflow();

  useEffect(() => {
    if (!weatherData) {
      fetchWeather();
    }
    refreshHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-theme-hero rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-300 text-xs font-bold mb-2 backdrop-blur-md">
            <span>🌾 Farmer Central Dashboard</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            {farmerInfo.name ? `Welcome, ${farmerInfo.name}` : t.dashboard.title}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            {farmerInfo.village}, {farmerInfo.district}, {farmerInfo.state} · {farmSoil.area} {farmSoil.unit} Farm Holding
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/advisory/farmer-info')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition active:scale-95 self-start sm:self-auto relative z-10"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{t.welcome.btnStart}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Farm Overview & Active Crops */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm glass-card-interactive">
              <span className="block text-xs text-theme-muted font-bold uppercase">Land Size</span>
              <strong className="text-xl sm:text-2xl font-heading font-extrabold text-theme-primary">
                {farmSoil.area} <span className="text-xs font-semibold">{farmSoil.unit}</span>
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm glass-card-interactive">
              <span className="block text-xs text-theme-muted font-bold uppercase">Soil Class</span>
              <strong className="text-xl sm:text-2xl font-heading font-extrabold text-theme-primary capitalize">
                {farmSoil.soilType}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm glass-card-interactive">
              <span className="block text-xs text-theme-muted font-bold uppercase">Active Season</span>
              <strong className="text-xl sm:text-2xl font-heading font-extrabold text-theme-primary capitalize">
                {farmSoil.season}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm glass-card-interactive">
              <span className="block text-xs text-theme-muted font-bold uppercase">Advisories</span>
              <strong className="text-xl sm:text-2xl font-heading font-extrabold text-theme-primary">
                {historyList.length}
              </strong>
            </div>
          </div>

          {/* Active Crop Card */}
          <div className="bg-theme-card p-6 rounded-3xl border border-theme shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-theme-heading flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                {t.dashboard.activeCrops}
              </h3>
              <button
                onClick={() => navigate('/advisory/crop-select')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
              >
                Change Crop →
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-theme-card-subtle border border-theme flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30">
                  🌾
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-theme-heading capitalize">
                    {cropSelection.cropName || 'Soybean (सोयाबीन)'}
                  </h4>
                  <p className="text-xs text-theme-muted">
                    Growth Stage: <span className="font-semibold text-theme-primary capitalize">{cropSelection.growthStage || 'Flowering'}</span> · Sowing: {cropSelection.sowingDate || 'June'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/advisory/summary')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-sm transition active:scale-95"
              >
                View Full Advisory
              </button>
            </div>
          </div>

          {/* Recent Advisory History Snippet */}
          <div className="bg-theme-card p-6 rounded-3xl border border-theme shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-theme-heading flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-400" />
                {t.dashboard.recentAdvisories}
              </h3>
              <button
                onClick={() => navigate('/history')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
              >
                View All History →
              </button>
            </div>

            {historyList.length === 0 ? (
              <p className="text-xs text-theme-muted py-4 text-center">
                No past advisory reports found. Generate one now to view saved logs!
              </p>
            ) : (
              <div className="space-y-3">
                {historyList.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-theme-card-subtle border border-theme flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-theme-primary block">
                        {item.crop_name} — {item.farmer_name}
                      </span>
                      <span className="text-theme-muted text-[11px]">
                        {new Date(item.created_at).toLocaleDateString()} · {item.district}, {item.state}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/history')}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold text-[11px] transition"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Weather Summary & Quick Actions */}
        <div className="space-y-6">
          
          {/* Weather Widget */}
          <div className="bg-theme-hero text-white p-6 rounded-3xl shadow-xl border border-theme space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-amber-300" />
                {t.dashboard.weatherWidget}
              </h3>
              <button
                onClick={() => navigate('/weather')}
                className="text-xs text-amber-300 font-bold hover:underline"
              >
                Forecast →
              </button>
            </div>

            {weatherData ? (
              <div>
                <div className="flex items-center justify-between my-2">
                  <div className="text-4xl font-heading font-extrabold">
                    {weatherData.current_temp}°C
                  </div>
                  <div className="text-4xl select-none">
                    {weatherData.current_icon}
                  </div>
                </div>

                <p className="text-emerald-200 text-xs font-semibold">
                  {weatherData.current_condition} · Rain Chance: {weatherData.current_rain_prob}%
                </p>

                <div className="mt-3 pt-3 border-t border-white/15 text-[11px] text-slate-200 leading-snug">
                  {weatherData.advisory_recommendation}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-300">Loading satellite agromet feed…</p>
            )}
          </div>

          {/* Quick Farmer Actions Card */}
          <div className="bg-theme-card p-6 rounded-3xl border border-theme shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-base text-theme-heading mb-2">
              {t.dashboard.quickActions}
            </h3>

            <button
              type="button"
              onClick={() => navigate('/weather')}
              className="w-full p-3 rounded-xl bg-theme-card-subtle hover:bg-emerald-500/10 border border-theme text-left text-xs sm:text-sm font-bold text-theme-primary flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <CloudSun className="w-4 h-4 text-cyan-400" />
                <span>5-Day Weather Forecast</span>
              </div>
              <ArrowRight className="w-4 h-4 text-theme-muted group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/advisory/leaf-upload')}
              className="w-full p-3 rounded-xl bg-theme-card-subtle hover:bg-emerald-500/10 border border-theme text-left text-xs sm:text-sm font-bold text-theme-primary flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Check Leaf Photo for Disease</span>
              </div>
              <ArrowRight className="w-4 h-4 text-theme-muted group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/mandi')}
              className="w-full p-3 rounded-xl bg-theme-card-subtle hover:bg-emerald-500/10 border border-theme text-left text-xs sm:text-sm font-bold text-theme-primary flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Track Mandi Prices</span>
              </div>
              <ArrowRight className="w-4 h-4 text-theme-muted group-hover:translate-x-1 transition" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/schemes')}
              className="w-full p-3 rounded-xl bg-theme-card-subtle hover:bg-emerald-500/10 border border-theme text-left text-xs sm:text-sm font-bold text-theme-primary flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Government Agriculture Schemes</span>
              </div>
              <ArrowRight className="w-4 h-4 text-theme-muted group-hover:translate-x-1 transition" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
