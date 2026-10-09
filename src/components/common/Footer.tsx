import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-theme-card text-theme-secondary border-t border-theme pt-12 pb-8 mt-16 no-print transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌾</span>
              <span className="font-heading font-extrabold text-xl text-theme-primary">
                {t.appName}
              </span>
            </div>
            <p className="text-theme-muted text-xs sm:text-sm max-w-md leading-relaxed mb-4">
              {t.taglineSub}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-card-subtle text-xs text-theme-accent border border-theme">
              <span>🎓 College Minor Project — Farmer-Friendly AI Crop Advisory System</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-theme-primary font-bold text-xs uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.home}</Link></li>
              <li><Link to="/advisory/farmer-info" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.startAdvisory}</Link></li>
              <li><Link to="/dashboard" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.dashboard}</Link></li>
              <li><Link to="/weather" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.weather}</Link></li>
              <li><Link to="/mandi" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.mandi}</Link></li>
              <li><Link to="/schemes" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.schemes}</Link></li>
              <li><Link to="/history" className="text-theme-secondary hover:text-theme-accent transition">{t.nav.history}</Link></li>
            </ul>
          </div>

          {/* Knowledge Citations */}
          <div>
            <h4 className="text-theme-primary font-bold text-xs uppercase tracking-wider mb-3">
              Verified Scientific Sources
            </h4>
            <ul className="space-y-1.5 text-xs text-theme-muted">
              <li>• ICAR Handbook of Agriculture</li>
              <li>• IMD Agromet Weather Division</li>
              <li>• State Agricultural Universities (SAUs)</li>
              <li>• AGMARKNET Mandi Price Bulletin</li>
              <li>• DAC&FW Soil Health Card Protocols</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-theme flex flex-col sm:flex-row items-center justify-between text-xs text-theme-muted gap-4">
          <p>© 2026 KrishiMitra AI. Minor Project designed for Indian farmers. Offline-resilient and open-source.</p>
          <p>Privacy & Data: All local records are stored securely on this device & local SQLite backend.</p>
        </div>
      </div>
    </footer>
  );
};
