import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CloudSun, 
  MapPin, 
  RefreshCw, 
  Droplets, 
  Wind, 
  Umbrella, 
  Info 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { WeatherDayForecast } from '../services/api';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { DemoTag } from '../components/common/DemoTag';

export const WeatherScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { weatherData, fetchWeather, farmerInfo, isLoading } = useAdvisoryWorkflow();

  const isWorkflow = location.pathname.startsWith('/advisory');

  useEffect(() => {
    if (!weatherData) {
      fetchWeather();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {isWorkflow && <FurrowStepper currentStepId={5} />}

      <div className="bg-theme-card rounded-3xl p-6 sm:p-8 border border-theme shadow-xl space-y-6">
        
        {/* Header Bar */}
        <div className="pb-4 border-b border-theme">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/30">
                <CloudSun className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-theme-heading">
                  {t.weather.title}
                </h2>
                <div className="flex items-center gap-1.5 text-theme-muted text-xs sm:text-sm mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{weatherData?.location_name || `${farmerInfo.village}, ${farmerInfo.district}`}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DemoTag 
                isLive={weatherData?.is_live_api}
                customMessage={weatherData?.is_live_api ? 'Live Sat-Agromet' : 'Simulated Agromet (Demo)'} 
              />
              <button
                type="button"
                onClick={() => fetchWeather()}
                className="p-2 rounded-xl text-theme-muted hover:text-theme-primary hover:bg-theme-card-subtle transition border border-theme"
                title="Refresh Weather Feed"
                aria-label="Refresh Weather"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-theme-muted">
            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="font-bold text-sm">Syncing Agromet satellite sensors…</p>
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            
            {/* Today's Hero Banner */}
            <div className="bg-theme-hero rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-theme relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <span className="text-5xl sm:text-6xl drop-shadow-md select-none">
                    {weatherData.current_icon}
                  </span>
                  <div>
                    <div className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight text-white">
                      {weatherData.current_temp}°C
                    </div>
                    <div className="text-emerald-300 font-semibold text-sm sm:text-base mt-0.5">
                      {weatherData.current_condition} · {t.weather.today}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-black/30 p-3 sm:p-4 rounded-xl backdrop-blur-md border border-white/15 text-center">
                  <div>
                    <span className="block text-[11px] text-slate-300 uppercase font-bold tracking-wider">
                      {t.weather.rainProb}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-white flex items-center justify-center gap-1 mt-0.5">
                      <Umbrella className="w-4 h-4 text-cyan-300" />
                      {weatherData.current_rain_prob}%
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-slate-300 uppercase font-bold tracking-wider">
                      {t.weather.humidity}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-white flex items-center justify-center gap-1 mt-0.5">
                      <Droplets className="w-4 h-4 text-cyan-300" />
                      {weatherData.current_humidity}%
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] text-slate-300 uppercase font-bold tracking-wider">
                      {t.weather.wind}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-white flex items-center justify-center gap-1 mt-0.5">
                      <Wind className="w-4 h-4 text-cyan-300" />
                      {weatherData.current_wind} km/h
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Advisory Strip */}
              <div className="mt-5 pt-4 border-t border-white/15 text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <p>
                  <strong>{t.weather.advisoryNote}:</strong> {weatherData.advisory_recommendation}
                </p>
              </div>
            </div>

            {/* 5-Day Forecast Grid */}
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-theme-heading mb-3">
                {t.weather.forecast5Days}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weatherData.forecast.map((d: WeatherDayForecast, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-theme-card-subtle border border-theme text-center flex flex-col justify-between glass-card-interactive"
                  >
                    <div>
                      <span className="font-bold text-xs text-theme-primary block">
                        {d.label}
                      </span>
                      <span className="text-[10px] text-theme-muted block mb-1">
                        {d.date_str}
                      </span>
                      <span className="text-3xl my-2 block select-none">
                        {d.condition_icon}
                      </span>
                      <div className="font-extrabold text-sm text-theme-primary">
                        {d.temp_max}° / <span className="text-theme-muted text-xs font-normal">{d.temp_min}°</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-theme text-[11px] text-theme-secondary font-semibold flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-400" />
                      <span>{d.rain_probability}% rain</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source transparency note */}
            <p className="text-[11px] text-theme-muted italic">
              Data feed source: {weatherData.source}. IMD & WMO calibrated forecast.
            </p>

          </div>
        ) : null}

        {isWorkflow && (
          <StepNavigation
            onBack={() => navigate('/advisory/crop-suitability')}
            onNext={() => navigate('/advisory/irrigation')}
          />
        )}
      </div>
    </div>
  );
};
