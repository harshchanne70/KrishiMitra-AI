export type Language = 'en' | 'hi' | 'pa' | 'mr';

export type Season = 'Kharif' | 'Rabi' | 'Zaid';
export type SoilType = 'Alluvial' | 'Black' | 'Red' | 'Sandy' | 'Clay';
export type IrrigationType = 'Rainfed' | 'Drip' | 'Canal' | 'Well' | 'Sprinkler';
export type GrowthStage = 'Germination' | 'Vegetative' | 'Flowering' | 'Harvesting';
export type PlantPart = 'All' | 'Leaves' | 'Stem' | 'Roots' | 'Fruit';

export interface WeatherDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: 'sunny' | 'rainy' | 'cloudy' | 'partly-cloudy' | 'storm' | 'windy';
  precipProb: number; // percentage
  humidity: number; // percentage
  windSpeed: number; // km/h
  uvIndex: number;
  soilMoisture: number; // percentage
  advisoryNote: string;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  agroZone: string;
  lat: number;
  lng: number;
  primarySoil: SoilType;
  majorCrops: string[];
}

export interface AdvisoryAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  affectedCrops: string[];
  action: string;
  timestamp: string;
}

export interface CropRecommendationInput {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  season: Season;
  soilType: SoilType;
  irrigation: IrrigationType;
  areaAcres: number;
}

export interface RecommendedCrop {
  id: string;
  name: string;
  scientificName: string;
  matchScore: number; // percentage
  expectedYield: string; // e.g. "22 - 26 Quintals/Acre"
  sowingWindow: string; // e.g. "Oct 25 - Nov 15"
  harvestDuration: string; // e.g. "120 - 135 days"
  waterRequirement: string; // e.g. "450 - 550 mm"
  profitPotential: 'High' | 'Very High' | 'Moderate';
  estimatedNetReturn: string; // e.g. "₹35,000 - ₹48,000 / Acre"
  keyInputs: {
    seedRate: string;
    npkRatio: string;
    criticalIrrigations: string;
  };
  whyRecommended: string[];
  bestSuitedFor: string;
}

export interface DiseaseRecord {
  id: string;
  crop: string;
  cropHindi?: string;
  diseaseName: string;
  scientificName: string;
  affectedPart: 'Leaves' | 'Stem' | 'Roots' | 'Fruit';
  severity: 'High' | 'Medium' | 'Low';
  imagePlaceholderColor: string;
  symptoms: string[];
  visualIndicators: string;
  favorableConditions: string;
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventiveMeasures: string[];
}

export interface FertilizerCalculationResult {
  crop: string;
  areaAcres: number;
  stage: GrowthStage;
  targetNPK: { n: number; p: number; k: number };
  commercialBags: {
    ureaKg: number;
    dapKg: number;
    mopKg: number;
    zincSulphateKg?: number;
  };
  splitApplicationPlan: {
    stage: string;
    ureaKg: number;
    dapKg: number;
    mopKg: number;
    instructions: string;
  }[];
  waterRequirementLiters: number;
  irrigationIntervalDays: number;
  irrigationMethodRecommendation: string;
  estimatedCostInr: number;
}

export interface MandiPriceItem {
  id: string;
  commodity: string;
  variety: string;
  market: string;
  district: string;
  state: string;
  modalPrice: number; // Rs per quintal
  minPrice: number;
  maxPrice: number;
  msp: number; // Minimum Support Price
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  arrivalTons: number;
  updatedDate: string;
  sevenDayHistory: number[];
}

export interface FarmerProfile {
  name: string;
  farmName: string;
  regionId: string;
  totalAcres: number;
  soilType: SoilType;
  primaryCrop: string;
  irrigationType: IrrigationType;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
