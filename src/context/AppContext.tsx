import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Region, 
  FarmerProfile, 
  RecommendedCrop, 
  ToastMessage,
  CropRecommendationInput
} from '../types';
import { AGRICULTURAL_REGIONS, TRANSLATIONS, CROP_DATABASE } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentRegion: Region;
  setRegionById: (regionId: string) => void;
  autoDetectLocation: () => void;
  outdoorMode: boolean;
  toggleOutdoorMode: () => void;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  savedCrops: RecommendedCrop[];
  saveCropToPlan: (crop: RecommendedCrop) => void;
  removeCropFromPlan: (cropId: string) => void;
  savedDiseases: string[];
  toggleBookmarkDisease: (diseaseId: string) => void;
  showPrintModal: boolean;
  setShowPrintModal: (show: boolean) => void;
  calculateRecommendations: (input: CropRecommendationInput) => RecommendedCrop[];
}

const DEFAULT_PROFILE: FarmerProfile = {
  name: 'Sardar Gurpreet Singh',
  farmName: 'Green Horizon Organic Estate',
  regionId: 'punjab-ludhiana',
  totalAcres: 8.5,
  soilType: 'Alluvial',
  primaryCrop: 'Wheat (HD-2967)',
  irrigationType: 'Well'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('krishi_language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('krishi_language', lang);
    addToast({
      type: 'info',
      title: 'Language Updated',
      message: `Language switched to ${lang.toUpperCase()}`
    });
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  // 2. Region State
  const [currentRegion, setCurrentRegion] = useState<Region>(() => {
    const savedId = localStorage.getItem('krishi_region_id');
    const found = AGRICULTURAL_REGIONS.find(r => r.id === savedId);
    return found || AGRICULTURAL_REGIONS[0];
  });

  const setRegionById = (regionId: string) => {
    const found = AGRICULTURAL_REGIONS.find(r => r.id === regionId);
    if (found) {
      setCurrentRegion(found);
      localStorage.setItem('krishi_region_id', regionId);
      addToast({
        type: 'success',
        title: 'Location Synchronized',
        message: `Weather, Mandi and Advisories updated for ${found.name}`
      });
    }
  };

  const autoDetectLocation = () => {
    addToast({
      type: 'info',
      title: 'Detecting GPS Coordinates...',
      message: 'Accessing satellite agromet sensors'
    });
    
    // Simulate realistic browser geolocation
    setTimeout(() => {
      // Pick Ludhiana or Nashik randomly or first
      const sample = AGRICULTURAL_REGIONS[0];
      setCurrentRegion(sample);
      localStorage.setItem('krishi_region_id', sample.id);
      addToast({
        type: 'success',
        title: 'Location Detected',
        message: `Matched to ${sample.name} (${sample.agroZone})`
      });
    }, 800);
  };

  // 3. Outdoor Daylight Contrast Mode
  const [outdoorMode, setOutdoorMode] = useState<boolean>(() => {
    return localStorage.getItem('krishi_outdoor_mode') === 'true';
  });

  const toggleOutdoorMode = () => {
    setOutdoorMode(prev => {
      const next = !prev;
      localStorage.setItem('krishi_outdoor_mode', String(next));
      if (next) {
        document.documentElement.classList.add('outdoor-contrast');
      } else {
        document.documentElement.classList.remove('outdoor-contrast');
      }
      return next;
    });
  };

  useEffect(() => {
    if (outdoorMode) {
      document.documentElement.classList.add('outdoor-contrast');
    } else {
      document.documentElement.classList.remove('outdoor-contrast');
    }
  }, [outdoorMode]);

  // 4. Farmer Profile State
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('krishi_farmer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const updateFarmerProfile = (updates: Partial<FarmerProfile>) => {
    setFarmerProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('krishi_farmer_profile', JSON.stringify(next));
      return next;
    });
    addToast({
      type: 'success',
      title: 'Profile Saved',
      message: 'Farm configuration updated in offline storage.'
    });
  };

  // 5. Active Tab State
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // 6. Toast Notification Manager
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [...prev.slice(-3), newToast]); // keep max 4 toasts
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 7. Saved Crop Plan (localStorage)
  const [savedCrops, setSavedCrops] = useState<RecommendedCrop[]>(() => {
    const saved = localStorage.getItem('krishi_saved_crops');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const saveCropToPlan = (crop: RecommendedCrop) => {
    if (savedCrops.some(c => c.id === crop.id)) {
      addToast({
        type: 'info',
        title: 'Already in Farm Plan',
        message: `${crop.name} is already saved in your farm itinerary.`
      });
      return;
    }
    const updated = [crop, ...savedCrops];
    setSavedCrops(updated);
    localStorage.setItem('krishi_saved_crops', JSON.stringify(updated));
    addToast({
      type: 'success',
      title: 'Added to Farm Plan',
      message: `${crop.name} saved with personalized inputs.`
    });
  };

  const removeCropFromPlan = (cropId: string) => {
    const updated = savedCrops.filter(c => c.id !== cropId);
    setSavedCrops(updated);
    localStorage.setItem('krishi_saved_crops', JSON.stringify(updated));
    addToast({
      type: 'info',
      title: 'Removed',
      message: 'Crop removed from active plan.'
    });
  };

  // 8. Bookmarked Diseases
  const [savedDiseases, setSavedDiseases] = useState<string[]>(() => {
    const saved = localStorage.getItem('krishi_saved_diseases');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['wheat-yellow-rust'];
  });

  const toggleBookmarkDisease = (diseaseId: string) => {
    setSavedDiseases(prev => {
      const exists = prev.includes(diseaseId);
      const next = exists ? prev.filter(id => id !== diseaseId) : [...prev, diseaseId];
      localStorage.setItem('krishi_saved_diseases', JSON.stringify(next));
      addToast({
        type: exists ? 'info' : 'success',
        title: exists ? 'Diagnosis Unsaved' : 'Diagnosis Bookmarked',
        message: exists ? 'Removed from quick reference' : 'Added to quick disease guide bookmarks'
      });
      return next;
    });
  };

  // 9. Print Modal State
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // 10. Intelligent Recommendation Engine
  const calculateRecommendations = (input: CropRecommendationInput): RecommendedCrop[] => {
    // Score all crops against provided soil & environmental attributes
    const scored = CROP_DATABASE.map(crop => {
      let score = 50; // base score

      // Season match (Weight 25)
      if (crop.idealSeason === input.season) {
        score += 25;
      } else if (crop.idealSeason === 'Zaid' || input.season === 'Zaid') {
        score += 10;
      }

      // Soil match (Weight 20)
      if (crop.soilTypes.includes(input.soilType)) {
        score += 20;
      } else {
        score -= 10;
      }

      // pH match (Weight 15)
      if (input.ph >= crop.phRange[0] && input.ph <= crop.phRange[1]) {
        score += 15;
      } else {
        const phDiff = Math.min(Math.abs(input.ph - crop.phRange[0]), Math.abs(input.ph - crop.phRange[1]));
        score += Math.max(0, 15 - Math.round(phDiff * 10));
      }

      // Nitrogen match (Weight 15)
      const nMid = (crop.nRange[0] + crop.nRange[1]) / 2;
      const nProximity = 1 - Math.min(1, Math.abs(input.nitrogen - nMid) / 100);
      score += Math.round(nProximity * 15);

      // Water / Irrigation match (Weight 15)
      if (crop.waterType.includes(input.irrigation)) {
        score += 15;
      } else if (input.irrigation === 'Drip') {
        score += 12; // Drip is universally efficient
      } else {
        score += 5;
      }

      // Cap score between 65% and 98%
      const finalScore = Math.min(98, Math.max(68, score));

      const whyReasons: string[] = [];
      if (crop.soilTypes.includes(input.soilType)) {
        whyReasons.push(`High affinity for ${input.soilType} soil structure & drainage.`);
      }
      if (crop.idealSeason === input.season) {
        whyReasons.push(`Synchronized with ${input.season} thermal degree days.`);
      }
      if (input.ph >= crop.phRange[0] && input.ph <= crop.phRange[1]) {
        whyReasons.push(`Optimal soil pH ${input.ph.toFixed(1)} for micronutrient uptake.`);
      }
      if (crop.waterType.includes(input.irrigation)) {
        whyReasons.push(`Directly aligned with your ${input.irrigation} water infrastructure.`);
      }

      return {
        id: crop.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: crop.name,
        scientificName: crop.scientificName,
        matchScore: finalScore,
        expectedYield: crop.expectedYield,
        sowingWindow: crop.sowingWindow,
        harvestDuration: crop.harvestDuration,
        waterRequirement: crop.waterRequirement,
        profitPotential: crop.profitPotential,
        estimatedNetReturn: crop.estimatedNetReturn,
        keyInputs: {
          seedRate: crop.seedRate,
          npkRatio: crop.npkRatio,
          criticalIrrigations: crop.criticalIrrigations
        },
        whyRecommended: whyReasons.length > 0 ? whyReasons : ['Favorable agro-climatic growth parameters.'],
        bestSuitedFor: `${input.soilType} Soil • ${input.season} Season • ${input.irrigation} Irrigation`
      };
    });

    // Sort descending by match score and return top 3
    scored.sort((a, b) => b.matchScore - a.matchScore);
    return scored.slice(0, 3);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRegion,
        setRegionById,
        autoDetectLocation,
        outdoorMode,
        toggleOutdoorMode,
        farmerProfile,
        updateFarmerProfile,
        activeTab,
        setActiveTab,
        toasts,
        addToast,
        removeToast,
        savedCrops,
        saveCropToPlan,
        removeCropFromPlan,
        savedDiseases,
        toggleBookmarkDisease,
        showPrintModal,
        setShowPrintModal,
        calculateRecommendations
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
