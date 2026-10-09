import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getForecastForRegion } from '../../data/mockData';
import { WeatherDay } from '../../types';
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  CloudSun, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer, 
  ShieldCheck, 
  AlertCircle,
  Gauge,
  Sparkles
} from 'lucide-react';

export const WeatherCard: React.FC = () => {
  const { currentRegion, t } = useApp();
  const forecast = getForecastForRegion(currentRegion.id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const activeDay: WeatherDay = forecast[selectedDayIndex] || forecast[0];

  const getWeatherIcon = (iconName: WeatherDay['icon'], sizeClass = "w-6 h-6") => {
    switch (iconName) {
      case 'sunny':
        return <Sun className={`${sizeClass} text-amber-500`} />;
      case 'rainy':
        return <CloudRain className={`${sizeClass} text-blue-500`} />;
      case 'cloudy':
        return <Cloud className={`${sizeClass} text-slate-400`} />;
      case 'partly-cloudy':
        return <CloudSun className={`${sizeClass} text-amber-500`} />;
      case 'storm':
        return <CloudLightning className={`${sizeClass} text-purple-600`} />;
      case 'windy':
        return <Wind className={`${sizeClass} text-teal-500`} />;
      default:
        return <Sun className={`${sizeClass} text-amber-500`} />;
    }
  };

  // Spraying feasibility logic
  const getSprayingStatus = (day: WeatherDay) => {
    if (day.precipProb >= 40) {
      return {
        label: 'Do Not Spray',
        desc: 'High rain probability will wash off chemicals.',
        color: 'bg-rose-100 text-rose-800 border-rose-200',
        icon: AlertCircle
      };
    }
    if (day.windSpeed >= 18) {
      return {
        label: 'Wind Drift Risk',
        desc: 'Wind speed exceeds 18 km/h; drift to non-target areas likely.',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: AlertCircle
      };
    }
    return {
      label: 'Optimal Spray Window',
      desc: 'Low wind, high leaf retention conditions.',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: ShieldCheck
    };
  };

  const sprayStatus = getSprayingStatus(activeDay);
  const SprayIcon = sprayStatus.icon;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-card overflow-hidden mb-6">
      
      {/* Card Header */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Micro-AgroMet Station • {currentRegion.name}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1 tracking-tight text-white">
              7-Day Precision Agricultural Weather
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Agromet Zone: {currentRegion.agroZone}
            </p>
          </div>

          {/* Quick spraying advisory badge */}
          <div className={`self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold shadow-xs ${sprayStatus.color}`}>
            <SprayIcon className="w-4 h-4 flex-shrink-0" />
            <div>
              <p className="font-bold leading-none">{sprayStatus.label}</p>
              <p className="text-[10px] opacity-80 mt-0.5 font-normal">{sprayStatus.desc}</p>
            </div>
          </div>
        </div>

        {/* Selected Day Feature Box */}
        <div className="mt-6 pt-5 border-t border-forest-800/80 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Main Temperature & Condition */}
          <div className="md:col-span-5 flex items-center gap-5">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              {getWeatherIcon(activeDay.icon, 'w-14 h-14 sm:w-16 sm:h-16')}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {activeDay.tempMax}°C
                </span>
                <span className="text-lg font-semibold text-stone-300">
                  / {activeDay.tempMin}°C
                </span>
              </div>
              <p className="text-base font-bold text-emerald-200 mt-0.5">
                {activeDay.condition}
              </p>
              <p className="text-xs text-stone-300">
                {activeDay.dayName} ({activeDay.date})
              </p>
            </div>
          </div>

          {/* Key Micro Parameters Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-forest-950/40 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-stone-300 text-[11px] font-semibold">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('rainProb')}</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">{activeDay.precipProb}%</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeDay.precipProb}%` }}
                />
              </div>
            </div>

            <div className="bg-forest-950/40 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-stone-300 text-[11px] font-semibold">
                <Droplets className="w-3.5 h-3.5 text-teal-400" />
                <span>{t('humidity')}</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">{activeDay.humidity}%</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeDay.humidity}%` }}
                />
              </div>
            </div>

            <div className="bg-forest-950/40 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-stone-300 text-[11px] font-semibold">
                <Wind className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t('wind')}</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">{activeDay.windSpeed} <span className="text-xs font-normal">km/h</span></p>
              <p className="text-[10px] text-stone-300 mt-1">Light Breeze</p>
            </div>

            <div className="bg-forest-950/40 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 text-stone-300 text-[11px] font-semibold">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('soilMoisture')}</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">{activeDay.soilMoisture}%</p>
              <p className="text-[10px] text-emerald-300 mt-1 font-semibold">Adequate</p>
            </div>
          </div>
        </div>

        {/* Selected Day Advisory Note */}
        <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/10 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-stone-200 font-medium">
            <span className="font-bold text-emerald-300">Agricultural Guidance: </span>
            {activeDay.advisoryNote}
          </p>
        </div>
      </div>

      {/* 7-Day Forecast Tabs Carousel */}
      <div className="p-4 sm:p-5 bg-stone-50/70 border-t border-stone-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          Select Day for Microclimate Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {forecast.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDayIndex(idx)}
                className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-md transform -translate-y-0.5'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-stone-50 shadow-xs'
                }`}
              >
                <p className={`text-xs font-bold ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {day.dayName}
                </p>
                <p className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                  {day.date.slice(5)}
                </p>

                <div className="my-2 flex justify-center">
                  {getWeatherIcon(day.icon, 'w-7 h-7')}
                </div>

                <div className="flex items-center justify-center gap-1 text-sm font-extrabold">
                  <span>{day.tempMax}°</span>
                  <span className={`text-xs font-normal ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                    {day.tempMin}°
                  </span>
                </div>

                <div className={`mt-1.5 text-[10px] font-semibold flex items-center justify-center gap-1 ${
                  day.precipProb >= 40 
                    ? isSelected ? 'text-rose-200' : 'text-rose-600'
                    : isSelected ? 'text-stone-200' : 'text-stone-500'
                }`}>
                  <Droplets className="w-3 h-3" />
                  <span>{day.precipProb}% rain</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
