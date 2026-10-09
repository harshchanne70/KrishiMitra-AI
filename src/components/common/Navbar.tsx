import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sprout, 
  Menu, 
  X, 
  CloudSun, 
  History, 
  TrendingUp, 
  ShieldCheck, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../i18n';
import { ThemeSelector } from './ThemeSelector';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/advisory/farmer-info', label: t.nav.startAdvisory, highlight: true },
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/weather', label: t.nav.weather, icon: CloudSun },
    { to: '/mandi', label: t.nav.mandi, icon: TrendingUp },
    { to: '/schemes', label: t.nav.schemes, icon: ShieldCheck },
    { to: '/history', label: t.nav.history, icon: History },
    { to: '/admin', label: t.nav.admin, icon: ShieldAlert }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <header className="bg-theme-navbar backdrop-blur-xl text-white shadow-xl sticky top-0 z-40 no-print border-b border-theme transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg border border-emerald-300/40 group-hover:scale-105 group-hover:rotate-3 transition duration-200">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white drop-shadow-sm">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  AI v2.0
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300/90 font-medium tracking-wide">
                {t.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition duration-200 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 active:scale-95'
                      : isActive
                      ? 'bg-white/20 text-white font-bold shadow-xs border border-white/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Theme Selector + Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Selector */}
            <ThemeSelector />

            {/* Language Switcher */}
            <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/15 shadow-inner" role="group" aria-label="Language Selector">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition duration-200 ${
                    language === l.code
                      ? 'bg-emerald-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-pressed={language === l.code}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-theme-card border-t border-theme px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  item.highlight
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold'
                    : isActive
                    ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
