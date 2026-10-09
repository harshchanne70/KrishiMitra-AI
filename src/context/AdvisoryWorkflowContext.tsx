import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  api, 
  CropSuitabilityResult, 
  WeatherResponse, 
  LeafDiseasePrediction, 
  AdvisorySummaryResponse 
} from '../services/api';

export interface FarmerInfoState {
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  preferredLang: string;
}

export interface FarmSoilState {
  area: number;
  unit: string; // 'acre' or 'hectare'
  soilType: string; // 'black', 'clay', 'alluvial', 'red', 'laterite', 'sandy'
  ph: string; // string input so farmer can type e.g. 6.8 or leave empty
  waterSource: string; // 'borewell', 'well', 'canal', 'rain'
  waterAvailability: string; // 'low', 'medium', 'high'
  irrigationMethod: string; // 'drip', 'furrow', 'sprinkler', 'flood'
  season: string; // 'kharif', 'rabi', 'zaid'
}

export interface CropSelectionState {
  cropId: string;
  cropName: string;
  cropVariety: string;
  growthStage: string;
  sowingDate: string;
  allocatedArea: number;
}

interface AdvisoryWorkflowContextType {
  farmerInfo: FarmerInfoState;
  setFarmerInfo: React.Dispatch<React.SetStateAction<FarmerInfoState>>;
  farmSoil: FarmSoilState;
  setFarmSoil: React.Dispatch<React.SetStateAction<FarmSoilState>>;
  cropSelection: CropSelectionState;
  setCropSelection: React.Dispatch<React.SetStateAction<CropSelectionState>>;
  cropSuitabilities: CropSuitabilityResult[];
  setCropSuitabilities: (list: CropSuitabilityResult[]) => void;
  weatherData: WeatherResponse | null;
  setWeatherData: (w: WeatherResponse | null) => void;
  leafImage: string | null;
  setLeafImage: (img: string | null) => void;
  leafFile: File | null;
  setLeafFile: (f: File | null) => void;
  diseaseResult: LeafDiseasePrediction | null;
  setDiseaseResult: (d: LeafDiseasePrediction | null) => void;
  advisoryResult: AdvisorySummaryResponse | null;
  setAdvisoryResult: (a: AdvisorySummaryResponse | null) => void;
  historyList: any[];
  isLoading: boolean;
  activeStep: number;
  setActiveStep: (step: number) => void;
  
  // Actions
  fetchSuitabilities: () => Promise<void>;
  fetchWeather: () => Promise<void>;
  analyzeLeaf: (colorHint?: string) => Promise<void>;
  generateFinalAdvisory: () => Promise<AdvisorySummaryResponse>;
  refreshHistory: () => Promise<void>;
  deleteHistoryItem: (id: string) => Promise<boolean>;
  resetWorkflow: () => void;
}

const DEFAULT_FARMER_INFO: FarmerInfoState = {
  name: 'Ramesh Patil',
  phone: '9876543210',
  state: 'Maharashtra',
  district: 'Nagpur',
  village: 'Katol',
  preferredLang: 'hi'
};

const DEFAULT_FARM_SOIL: FarmSoilState = {
  area: 3.0,
  unit: 'acre',
  soilType: 'black',
  ph: '6.8',
  waterSource: 'borewell',
  waterAvailability: 'medium',
  irrigationMethod: 'drip',
  season: 'kharif'
};

const DEFAULT_CROP_SELECTION: CropSelectionState = {
  cropId: 'soybean',
  cropName: 'Soybean',
  cropVariety: 'JS 335',
  growthStage: 'Flowering (31-50d)',
  sowingDate: '2026-06-25',
  allocatedArea: 3.0
};

const AdvisoryWorkflowContext = createContext<AdvisoryWorkflowContextType | undefined>(undefined);

export const AdvisoryWorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Farmer Info with localStorage persistence
  const [farmerInfo, setFarmerInfo] = useState<FarmerInfoState>(() => {
    try {
      const saved = localStorage.getItem('krishi_farmer_draft');
      return saved ? JSON.parse(saved) : DEFAULT_FARMER_INFO;
    } catch {
      return DEFAULT_FARMER_INFO;
    }
  });

  // 2. Farm & Soil Details
  const [farmSoil, setFarmSoil] = useState<FarmSoilState>(() => {
    try {
      const saved = localStorage.getItem('krishi_soil_draft');
      return saved ? JSON.parse(saved) : DEFAULT_FARM_SOIL;
    } catch {
      return DEFAULT_FARM_SOIL;
    }
  });

  // 3. Crop Selection
  const [cropSelection, setCropSelection] = useState<CropSelectionState>(() => {
    try {
      const saved = localStorage.getItem('krishi_crop_draft');
      return saved ? JSON.parse(saved) : DEFAULT_CROP_SELECTION;
    } catch {
      return DEFAULT_CROP_SELECTION;
    }
  });

  const [cropSuitabilities, setCropSuitabilities] = useState<CropSuitabilityResult[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [leafImage, setLeafImage] = useState<string | null>(null);
  const [leafFile, setLeafFile] = useState<File | null>(null);
  const [diseaseResult, setDiseaseResult] = useState<LeafDiseasePrediction | null>(null);
  const [advisoryResult, setAdvisoryResult] = useState<AdvisorySummaryResponse | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('krishi_farmer_draft', JSON.stringify(farmerInfo));
  }, [farmerInfo]);

  useEffect(() => {
    localStorage.setItem('krishi_soil_draft', JSON.stringify(farmSoil));
  }, [farmSoil]);

  useEffect(() => {
    localStorage.setItem('krishi_crop_draft', JSON.stringify(cropSelection));
  }, [cropSelection]);

  // Load history on mount
  useEffect(() => {
    refreshHistory();
  }, []);

  const refreshHistory = async () => {
    const list = await api.getAdvisoryHistory();
    setHistoryList(list);
  };

  const deleteHistoryItem = async (id: string): Promise<boolean> => {
    const ok = await api.deleteAdvisoryRecord(id);
    if (ok) {
      await refreshHistory();
    }
    return ok;
  };

  const fetchSuitabilities = async () => {
    setIsLoading(true);
    try {
      const phVal = farmSoil.ph.trim() ? parseFloat(farmSoil.ph) : null;
      const res = await api.calculateSuitability({
        soil_type: farmSoil.soilType,
        season: farmSoil.season,
        water_availability: farmSoil.waterAvailability,
        ph: phVal && !isNaN(phVal) ? phVal : null
      });
      setCropSuitabilities(res);
      // Auto-update crop name if needed
      if (!cropSelection.cropId && res.length > 0) {
        setCropSelection(prev => ({
          ...prev,
          cropId: res[0].crop_id,
          cropName: res[0].name_en
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const res = await api.getWeather(
        farmerInfo.village || 'Nagpur',
        farmerInfo.district || 'Nagpur',
        farmerInfo.state || 'Maharashtra'
      );
      setWeatherData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeLeaf = async (colorHint?: string) => {
    if (!leafFile) return;
    setIsLoading(true);
    try {
      const res = await api.analyzeLeafImage(leafFile, colorHint);
      setDiseaseResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFinalAdvisory = async (): Promise<AdvisorySummaryResponse> => {
    setIsLoading(true);
    try {
      const phVal = farmSoil.ph.trim() ? parseFloat(farmSoil.ph) : null;
      const payload = {
        farmer_name: farmerInfo.name,
        phone: farmerInfo.phone,
        state: farmerInfo.state,
        district: farmerInfo.district,
        village: farmerInfo.village,
        preferred_lang: farmerInfo.preferredLang,
        farm_area: farmSoil.area,
        area_unit: farmSoil.unit,
        soil_type: farmSoil.soilType,
        soil_ph: phVal && !isNaN(phVal) ? phVal : null,
        water_source: farmSoil.waterSource,
        water_availability: farmSoil.waterAvailability,
        irrigation_method: farmSoil.irrigationMethod,
        current_season: farmSoil.season,
        crop_id: cropSelection.cropId,
        crop_name: cropSelection.cropName,
        crop_variety: cropSelection.cropVariety,
        growth_stage: cropSelection.growthStage,
        sowing_date: cropSelection.sowingDate,
        allocated_area: cropSelection.allocatedArea,
        disease_result: diseaseResult
      };

      const result = await api.generateAdvisory(payload);
      setAdvisoryResult(result);
      await refreshHistory();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const resetWorkflow = () => {
    setCropSuitabilities([]);
    setWeatherData(null);
    setLeafImage(null);
    setLeafFile(null);
    setDiseaseResult(null);
    setAdvisoryResult(null);
    setActiveStep(1);
  };

  return (
    <AdvisoryWorkflowContext.Provider value={{
      farmerInfo,
      setFarmerInfo,
      farmSoil,
      setFarmSoil,
      cropSelection,
      setCropSelection,
      cropSuitabilities,
      setCropSuitabilities,
      weatherData,
      setWeatherData,
      leafImage,
      setLeafImage,
      leafFile,
      setLeafFile,
      diseaseResult,
      setDiseaseResult,
      advisoryResult,
      setAdvisoryResult,
      historyList,
      isLoading,
      activeStep,
      setActiveStep,
      fetchSuitabilities,
      fetchWeather,
      analyzeLeaf,
      generateFinalAdvisory,
      refreshHistory,
      deleteHistoryItem,
      resetWorkflow
    }}>
      {children}
    </AdvisoryWorkflowContext.Provider>
  );
};

export const useAdvisoryWorkflow = (): AdvisoryWorkflowContextType => {
  const context = useContext(AdvisoryWorkflowContext);
  if (!context) {
    throw new Error('useAdvisoryWorkflow must be used within an AdvisoryWorkflowProvider');
  }
  return context;
};
