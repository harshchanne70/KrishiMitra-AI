import React, { useState, useRef, useEffect } from 'react';
import { Palette, Moon, Sun, Check, Sparkles } from 'lucide-react';
import { useTheme, AVAILABLE_THEMES, ThemeId } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const ThemeSelector: React.FC = () => {
  const { theme, themeConfig, setTheme, toggleDarkLight } = useTheme();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getThemeName = (themeId: ThemeId) => {
    const config = AVAILABLE_THEMES.find((t) => t.id === themeId);
    if (!config) return themeId;
    if (language === 'hi') return config.nameHindi;
    if (language === 'mr') return config.nameMarathi;
    return config.name;
  };

  return (
    <div className="relative inline-flex items-center gap-1.5" ref={dropdownRef}>
      {/* Quick Dark/Light Toggle Button */}
      <button
        type="button"
        onClick={toggleDarkLight}
        title={themeConfig.isDark ? "Switch to Light Theme" : "Switch to Cyber Dark Theme"}
        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white border border-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label="Toggle dark/light theme"
      >
        {themeConfig.isDark ? (
          <Sun className="w-4 h-4 text-amber-300 animate-pulse-subtle" />
        ) : (
          <Moon className="w-4 h-4 text-emerald-200" />
        )}
      </button>

      {/* Theme Picker Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-white border border-white/15 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Choose Visual Theme"
      >
        <span className="text-base select-none">{themeConfig.icon}</span>
        <span className="hidden md:inline font-medium tracking-wide">
          {getThemeName(theme)}
        </span>
        <Palette className="w-3.5 h-3.5 text-emerald-300 opacity-80" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl glass-panel shadow-2xl p-3 z-50 animate-fade-in border border-white/20 text-slate-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>थीम चुनें / Theme Palette</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">5 Themes</span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {AVAILABLE_THEMES.map((item) => {
              const isSelected = item.id === theme;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setTheme(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-500/20 border border-emerald-400/50 shadow-sm'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base shadow-sm border border-white/15 shrink-0"
                      style={{ backgroundColor: item.previewColors.card }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition">
                          {getThemeName(item.id)}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold uppercase">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {/* Color Swatch Dots */}
                    <div className="flex items-center -space-x-1">
                      <span
                        className="w-3 h-3 rounded-full border border-white/30 shadow-xs"
                        style={{ backgroundColor: item.previewColors.primary }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white/30 shadow-xs"
                        style={{ backgroundColor: item.previewColors.secondary }}
                      />
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-center text-slate-400">
            Selected theme is saved automatically
          </div>
        </div>
      )}
    </div>
  );
};
