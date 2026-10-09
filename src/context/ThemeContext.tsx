import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'cyber-dark' | 'golden-harvest' | 'oceanic-precision' | 'emerald-light' | 'heritage';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameHindi: string;
  nameMarathi: string;
  description: string;
  icon: string;
  badge: string;
  isDark: boolean;
  previewColors: {
    primary: string;
    secondary: string;
    background: string;
    card: string;
  };
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  {
    id: 'cyber-dark',
    name: 'Cyber-Agri Dark',
    nameHindi: 'साइबर एग्री (डार्क)',
    nameMarathi: 'सायबर ॲग्री (डार्क)',
    description: 'Futuristic AI dark mode with neon emerald & luminous glow',
    icon: '⚡',
    badge: 'Modern AI',
    isDark: true,
    previewColors: {
      primary: '#10b981',
      secondary: '#06b6d4',
      background: '#090d16',
      card: '#111827'
    }
  },
  {
    id: 'emerald-light',
    name: 'Neo-Botanical Light',
    nameHindi: 'नियो-बोटैनिकल (लाइट)',
    nameMarathi: 'निओ-बोटॅनिकल (लाइट)',
    description: 'Crisp, high-contrast modern agricultural tech palette',
    icon: '🍃',
    badge: 'Clean Tech',
    isDark: false,
    previewColors: {
      primary: '#059669',
      secondary: '#0284c7',
      background: '#f8fafc',
      card: '#ffffff'
    }
  },
  {
    id: 'golden-harvest',
    name: 'Golden Solar Harvest',
    nameHindi: 'स्वर्ण फसल (गोल्डन)',
    nameMarathi: 'सुवर्ण पिक (गोल्डन)',
    description: 'Warm sunburst gold, amber wheat & rich earth tones',
    icon: '🌾',
    badge: 'Solar Harvest',
    isDark: false,
    previewColors: {
      primary: '#d97706',
      secondary: '#ea580c',
      background: '#fefce8',
      card: '#ffffff'
    }
  },
  {
    id: 'oceanic-precision',
    name: 'Hydro & Satellite Blue',
    nameHindi: 'हाइड्रो सेटेलाइट (ब्लू)',
    nameMarathi: 'हायड्रो सॅटेलाइट (ब्लू)',
    description: 'Precision agromet weather & smart irrigation azure',
    icon: '🌊',
    badge: 'Agromet Blue',
    isDark: true,
    previewColors: {
      primary: '#0ea5e9',
      secondary: '#14b8a6',
      background: '#0b1329',
      card: '#131e3a'
    }
  },
  {
    id: 'heritage',
    name: 'Heritage Earth',
    nameHindi: 'पारंपरिक धरती (क्लासिक)',
    nameMarathi: 'पारंपरिक माती (क्लासिक)',
    description: 'Traditional Indian kharif green and marigold amber',
    icon: '🌿',
    badge: 'Classic',
    isDark: false,
    previewColors: {
      primary: '#1b4332',
      secondary: '#d97706',
      background: '#fcfbf7',
      card: '#ffffff'
    }
  }
];

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeConfig;
  setTheme: (themeId: ThemeId) => void;
  toggleDarkLight: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('krishimitra_theme') as ThemeId | null;
    if (saved && AVAILABLE_THEMES.some((t) => t.id === saved)) {
      return saved;
    }
    // Default to the brand new modern Cyber-Agri Dark theme!
    return 'cyber-dark';
  });

  const currentConfig = AVAILABLE_THEMES.find((t) => t.id === theme) || AVAILABLE_THEMES[0];

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('krishimitra_theme', newTheme);
  };

  const toggleDarkLight = () => {
    if (currentConfig.isDark) {
      setTheme('emerald-light');
    } else {
      setTheme('cyber-dark');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    // Set theme attribute
    root.setAttribute('data-theme', theme);
    
    // Toggle dark class for Tailwind dark: variants
    if (currentConfig.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, currentConfig.isDark]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: currentConfig,
        setTheme,
        toggleDarkLight
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
