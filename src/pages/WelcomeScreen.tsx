import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  History, 
  CloudSun, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n';

export const WelcomeScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      
      {/* Hero Card */}
      <div className="bg-theme-hero rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-theme transition duration-300">
        {/* Subtle decorative background watermarks & glowing orbs */}
        <div className="absolute -right-12 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none select-none" />
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none select-none" />
        
        <div className="absolute -right-6 -bottom-8 text-white/5 text-[190px] select-none pointer-events-none font-bold">
          🌾
        </div>

        <div className="max-w-2xl relative z-10">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <span className="text-base select-none">🌾</span>
            <span>{t.appName} — {t.tagline}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4 drop-shadow-sm">
            {t.welcome.title}
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg leading-relaxed mb-8 font-normal">
            {t.welcome.subtitle}
          </p>

          {/* Language Selector in Hero */}
          <div className="mb-8">
            <span className="block text-xs uppercase tracking-wider text-emerald-300 font-bold mb-2">
              भाषा चुनें / Choose Language:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['hi', 'mr', 'en'] as Language[]).map((langCode) => (
                <button
                  key={langCode}
                  type="button"
                  onClick={() => setLanguage(langCode)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition duration-200 ${
                    language === langCode
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-md ring-2 ring-white/50 scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {langCode === 'hi' ? 'हिंदी (Hindi)' : langCode === 'mr' ? 'मराठी (Marathi)' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('/advisory/farmer-info')}
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:via-teal-200 hover:to-cyan-300 active:scale-95 text-slate-950 font-extrabold text-base sm:text-lg transition shadow-xl shadow-emerald-500/25 border border-white/30 focus:outline-none"
            >
              <span>{t.welcome.btnStart}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.8]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/history')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition border border-white/20 backdrop-blur-md active:scale-95"
            >
              <History className="w-4 h-4 text-emerald-300" />
              <span>{t.welcome.btnHistory}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/weather')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition border border-white/20 backdrop-blur-md active:scale-95"
            >
              <CloudSun className="w-4 h-4 text-cyan-300" />
              <span>{t.welcome.btnWeather}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-8 sm:mt-12">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-theme-heading mb-1">
            कृषि मित्र AI की प्रमुख विशेषताएं (Core Capabilities)
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted">
            Intelligent agronomic advice tailored for soil, climate & local market yards
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-theme-card rounded-2xl p-5 border border-theme glass-card-interactive shadow-md">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-xl mb-3 border border-emerald-500/20">
              🌱
            </div>
            <h3 className="font-heading font-bold text-base text-theme-heading mb-1">
              {t.welcome.feature1Title}
            </h3>
            <p className="text-theme-secondary text-xs sm:text-sm leading-relaxed">
              {t.welcome.feature1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-theme-card rounded-2xl p-5 border border-theme glass-card-interactive shadow-md">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-xl mb-3 border border-cyan-500/20">
              💧
            </div>
            <h3 className="font-heading font-bold text-base text-theme-heading mb-1">
              {t.welcome.feature2Title}
            </h3>
            <p className="text-theme-secondary text-xs sm:text-sm leading-relaxed">
              {t.welcome.feature2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-theme-card rounded-2xl p-5 border border-theme glass-card-interactive shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold text-xl mb-3 border border-amber-500/20">
              🔬
            </div>
            <h3 className="font-heading font-bold text-base text-theme-heading mb-1">
              {t.welcome.feature3Title}
            </h3>
            <p className="text-theme-secondary text-xs sm:text-sm leading-relaxed">
              {t.welcome.feature3Desc}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-theme-card rounded-2xl p-5 border border-theme glass-card-interactive shadow-md">
            <div className="w-12 h-12 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold text-xl mb-3 border border-teal-500/20">
              📈
            </div>
            <h3 className="font-heading font-bold text-base text-theme-heading mb-1">
              {t.welcome.feature4Title}
            </h3>
            <p className="text-theme-secondary text-xs sm:text-sm leading-relaxed">
              {t.welcome.feature4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* College Minor Project Verification Badge */}
      <div className="mt-10 p-5 rounded-2xl bg-theme-card border border-theme text-theme-secondary text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-theme-heading">
              Verified Agricultural Technology Project
            </p>
            <p className="text-theme-muted text-xs">
              Built using ICAR Package of Practices, Open-Meteo Sat-Agromet, and FastAPI SQLite backend.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition shrink-0 active:scale-95 shadow-md shadow-emerald-500/20"
        >
          View Farmer Dashboard →
        </button>
      </div>

    </div>
  );
};
