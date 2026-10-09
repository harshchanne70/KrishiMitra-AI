import React, { useState, useMemo } from 'react';
import { GrowthStage } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  Droplet, 
  Package, 
  Calendar, 
  IndianRupee, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface CropNutrientStandard {
  crop: string;
  nRate: number; // kg per hectare
  pRate: number;
  kRate: number;
  waterTotalMm: number;
  stages: {
    stage: GrowthStage;
    nPercent: number;
    pPercent: number;
    kPercent: number;
    waterDemand: string;
    intervalDays: number;
    notes: string;
  }[];
}

const CROP_STANDARDS: Record<string, CropNutrientStandard> = {
  'Wheat': {
    crop: 'Wheat (गेहूं)',
    nRate: 120,
    pRate: 60,
    kRate: 40,
    waterTotalMm: 450,
    stages: [
      { stage: 'Germination', nPercent: 50, pPercent: 100, kPercent: 100, waterDemand: 'Light pre-sowing Rauni (60mm)', intervalDays: 21, notes: 'Full P & K as basal + half Urea. Crucial for Crown Root Initiation.' },
      { stage: 'Vegetative', nPercent: 25, pPercent: 0, kPercent: 0, waterDemand: 'Medium irrigation (75mm)', intervalDays: 20, notes: 'Apply 1st top dressing Urea at tillering just before irrigation.' },
      { stage: 'Flowering', nPercent: 25, pPercent: 0, kPercent: 0, waterDemand: 'Critical moisture window (75mm)', intervalDays: 15, notes: '2nd top dressing Urea at boot leaf / heading stage.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Stop irrigation 15 days before harvest', intervalDays: 0, notes: 'Allow grain drying and dough hardening.' }
    ]
  },
  'Rice (Paddy)': {
    crop: 'Rice (Paddy - धान)',
    nRate: 120,
    pRate: 60,
    kRate: 60,
    waterTotalMm: 1200,
    stages: [
      { stage: 'Germination', nPercent: 33, pPercent: 100, kPercent: 50, waterDemand: 'Continuous standing 2-3 cm', intervalDays: 4, notes: 'Basal dose DAP + MOP + 1/3rd Urea at transplanting.' },
      { stage: 'Vegetative', nPercent: 33, pPercent: 0, kPercent: 0, waterDemand: 'Maintain 5 cm water level', intervalDays: 5, notes: 'Top dress Urea at active tillering (21-25 DAT) with Zinc sulphate.' },
      { stage: 'Flowering', nPercent: 34, pPercent: 0, kPercent: 50, waterDemand: 'Critical panicle saturation (5-7 cm)', intervalDays: 6, notes: 'Remaining Urea + Potash for grain weight.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Drain standing water 10 days prior', intervalDays: 0, notes: 'Facilitates mechanical combine harvesting.' }
    ]
  },
  'Cotton': {
    crop: 'Cotton (कपास)',
    nRate: 120,
    pRate: 60,
    kRate: 60,
    waterTotalMm: 700,
    stages: [
      { stage: 'Germination', nPercent: 20, pPercent: 100, kPercent: 30, waterDemand: 'Moderate (50mm)', intervalDays: 12, notes: 'Basal placement 5cm below and beside seed furrow.' },
      { stage: 'Vegetative', nPercent: 40, pPercent: 0, kPercent: 30, waterDemand: 'High (70mm)', intervalDays: 10, notes: 'Square formation stage split application.' },
      { stage: 'Flowering', nPercent: 40, pPercent: 0, kPercent: 40, waterDemand: 'Peak water demand (80mm)', intervalDays: 8, notes: 'Peak boll formation; avoid water stress to prevent boll shedding.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Taper off irrigation', intervalDays: 0, notes: 'Keeps fiber quality dry and stain-free.' }
    ]
  },
  'Tomato': {
    crop: 'Tomato (टमाटर)',
    nRate: 100,
    pRate: 60,
    kRate: 80,
    waterTotalMm: 500,
    stages: [
      { stage: 'Germination', nPercent: 25, pPercent: 100, kPercent: 25, waterDemand: 'Frequent light drip', intervalDays: 2, notes: 'Basal organic compost plus SSP and MOP.' },
      { stage: 'Vegetative', nPercent: 35, pPercent: 0, kPercent: 25, waterDemand: 'Drip fertigation every alternate day', intervalDays: 2, notes: 'Soluble 19:19:19 fertigation for rapid foliage expansion.' },
      { stage: 'Flowering', nPercent: 40, pPercent: 0, kPercent: 50, waterDemand: 'Consistent root zone moisture', intervalDays: 2, notes: 'Calcium Nitrate + Boron + Potash to prevent Blossom End Rot.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Moderate drip maintenance', intervalDays: 3, notes: 'Maintain firm fruit skin and high brix sugar.' }
    ]
  },
  'Mustard': {
    crop: 'Mustard (सरसों)',
    nRate: 80,
    pRate: 40,
    kRate: 20,
    waterTotalMm: 300,
    stages: [
      { stage: 'Germination', nPercent: 50, pPercent: 100, kPercent: 100, waterDemand: 'Pre-sowing irrigation', intervalDays: 30, notes: 'Basal SSP (provides crucial Sulphur for oil content) + half Urea.' },
      { stage: 'Vegetative', nPercent: 50, pPercent: 0, kPercent: 0, waterDemand: '1st irrigation at 30-35 DAS', intervalDays: 25, notes: 'Top dress balance Urea immediately before first irrigation.' },
      { stage: 'Flowering', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: '2nd irrigation at siliquae formation', intervalDays: 30, notes: 'Siliqua pod filling stage; avoid high pressure flood.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'No water', intervalDays: 0, notes: 'Dry pods for threshing.' }
    ]
  },
  'Potato': {
    crop: 'Potato (आलू)',
    nRate: 150,
    pRate: 80,
    kRate: 100,
    waterTotalMm: 500,
    stages: [
      { stage: 'Germination', nPercent: 50, pPercent: 100, kPercent: 50, waterDemand: 'Furrow moisture without waterlogging', intervalDays: 7, notes: 'Basal application at planting time with earthing up.' },
      { stage: 'Vegetative', nPercent: 50, pPercent: 0, kPercent: 50, waterDemand: 'Stolon emergence irrigation', intervalDays: 7, notes: 'Top dress Urea at 30-35 days before 2nd earthing.' },
      { stage: 'Flowering', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Tuber bulking irrigation', intervalDays: 6, notes: 'Maintain regular moisture for uniform tuber size.' },
      { stage: 'Harvesting', nPercent: 0, pPercent: 0, kPercent: 0, waterDemand: 'Dehaulm and stop water 12 days before', intervalDays: 0, notes: 'Skin cure curing.' }
    ]
  }
};

export const FertilizerCalculator: React.FC = () => {
  const { currentRegion, addToast } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat');
  const [area, setArea] = useState<number>(4);
  const [areaUnit, setAreaUnit] = useState<'Acres' | 'Hectares' | 'Bigha'>('Acres');
  const [currentStage, setCurrentStage] = useState<GrowthStage>('Germination');

  // Convert area to Hectares for standard ICAR calculations
  const areaInHectares = useMemo(() => {
    if (areaUnit === 'Acres') return area * 0.404686;
    if (areaUnit === 'Bigha') return area * 0.161874; // approx standard Pucca Bigha
    return area;
  }, [area, areaUnit]);

  const standard = CROP_STANDARDS[selectedCrop] || CROP_STANDARDS['Wheat'];
  const activeStageInfo = standard.stages.find(s => s.stage === currentStage) || standard.stages[0];

  // Nutrient calculations for total acreage
  const totalPureN = Math.round(standard.nRate * areaInHectares);
  const totalPureP = Math.round(standard.pRate * areaInHectares);
  const totalPureK = Math.round(standard.kRate * areaInHectares);

  // Commercial bag calculations:
  // 1. DAP (18% N, 46% P2O5) supplies the P requirement
  const dapTotalKg = Math.round(totalPureP / 0.46);
  const nProvidedByDap = Math.round(dapTotalKg * 0.18);

  // 2. Urea (46% N) supplies the remaining Nitrogen
  const remainingN = Math.max(0, totalPureN - nProvidedByDap);
  const ureaTotalKg = Math.round(remainingN / 0.46);

  // 3. MOP (60% K2O) supplies Potassium
  const mopTotalKg = Math.round(totalPureK / 0.60);

  // 4. Zinc Sulphate 21% (standard recommendation 25 kg/ha)
  const zincTotalKg = Math.round(25 * areaInHectares);

  // Standard 50kg bags
  const dapBags = (dapTotalKg / 50).toFixed(1);
  const ureaBags = (ureaTotalKg / 50).toFixed(1);
  const mopBags = (mopTotalKg / 50).toFixed(1);

  // Current stage specific dosage
  const currentStageUreaKg = Math.round((ureaTotalKg * activeStageInfo.nPercent) / 100);
  const currentStageDapKg = Math.round((dapTotalKg * activeStageInfo.pPercent) / 100);
  const currentStageMopKg = Math.round((mopTotalKg * activeStageInfo.kPercent) / 100);

  // Water volume calculations:
  // 1 mm of water over 1 hectare = 10,000 liters
  const totalWaterLiters = Math.round(standard.waterTotalMm * 10000 * areaInHectares);
  const stageWaterLiters = Math.round((totalWaterLiters * (activeStageInfo.nPercent > 0 ? 0.3 : 0.15)));

  // Estimated government subsidized cost:
  // Urea: ~₹270 per 50kg bag, DAP: ~₹1350 per 50kg bag, MOP: ~₹1700 per 50kg bag
  const estimatedCost = Math.round(
    (ureaTotalKg / 50) * 270 +
    (dapTotalKg / 50) * 1350 +
    (mopTotalKg / 50) * 1700 +
    (zincTotalKg * 60)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Sparkles className="w-4 h-4" />
          <span>Scientific Nutrient Management System</span>
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
          Precision Fertilizer & Irrigation Schedule Calculator
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          Converts pure elemental N-P-K crop requirements into commercial fertilizer bags (Urea, DAP, MOP) with stage-wise split application protocols to prevent nutrient leaching.
        </p>

        {/* Form Inputs Grid */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Crop Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {Object.keys(CROP_STANDARDS).map(c => (
                <option key={c} value={c}>{CROP_STANDARDS[c].crop}</option>
              ))}
            </select>
          </div>

          {/* Land Area & Unit */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Land Area
              </label>
              <div className="flex gap-1">
                {(['Acres', 'Hectares', 'Bigha'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setAreaUnit(u)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded transition ${
                      areaUnit === u ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
              <input
                type="number"
                min="0.25"
                max="500"
                step="0.5"
                value={area}
                onChange={(e) => setArea(Math.max(0.25, Number(e.target.value)))}
                className="w-full bg-transparent text-sm font-black text-stone-900 focus:outline-none"
              />
              <span className="text-xs font-bold text-stone-500">{areaUnit}</span>
            </div>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Current Crop Growth Stage
            </label>
            <select
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value as GrowthStage)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Germination">Germination & Sowing (Basal)</option>
              <option value="Vegetative">Active Vegetative / Tillering</option>
              <option value="Flowering">Flowering / Heading / Panicle</option>
              <option value="Harvesting">Maturity & Pre-Harvest</option>
            </select>
          </div>

        </div>
      </div>

      {/* Commercial Bags Overview Output */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Urea Card */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Nitrogen Source</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Urea (46% N)
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-stone-900">{ureaTotalKg}</span>
              <span className="text-xs font-semibold text-stone-500">kg total</span>
            </div>
            <p className="text-xs font-bold text-emerald-700 mt-1">
              ≈ {ureaBags} Bags (50kg each)
            </p>
            <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600">
              Current stage dose: <strong className="text-stone-900">{currentStageUreaKg} kg</strong>
            </div>
          </div>
        </div>

        {/* DAP Card */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Phosphorus Source</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              DAP (18:46:0)
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-stone-900">{dapTotalKg}</span>
              <span className="text-xs font-semibold text-stone-500">kg total</span>
            </div>
            <p className="text-xs font-bold text-teal-700 mt-1">
              ≈ {dapBags} Bags (50kg each)
            </p>
            <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600">
              Current stage dose: <strong className="text-stone-900">{currentStageDapKg} kg</strong>
            </div>
          </div>
        </div>

        {/* MOP Card */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Potassium Source</span>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              MOP (60% K2O)
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-stone-900">{mopTotalKg}</span>
              <span className="text-xs font-semibold text-stone-500">kg total</span>
            </div>
            <p className="text-xs font-bold text-indigo-700 mt-1">
              ≈ {mopBags} Bags (50kg each)
            </p>
            <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600">
              Current stage dose: <strong className="text-stone-900">{currentStageMopKg} kg</strong>
            </div>
          </div>
        </div>

        {/* Micronutrient & Cost Card */}
        <div className="bg-forest-900 text-white p-5 rounded-2xl border border-forest-800 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Micronutrient & Cost</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white">₹{estimatedCost.toLocaleString()}</span>
              <span className="text-xs text-stone-300">est. subsidized</span>
            </div>
            <p className="text-xs text-emerald-300 mt-1">
              Zinc Sulphate: {zincTotalKg} kg recommended
            </p>
            <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-stone-300">
              Area: {area} {areaUnit} (~{areaInHectares.toFixed(2)} Ha)
            </div>
          </div>
        </div>

      </div>

      {/* Split Application Schedule Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-card overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-stone-900">
              Recommended Split Application Schedule for {selectedCrop}
            </h3>
            <p className="text-xs text-stone-500">
              Applying fertilizer in timed splits increases uptake efficiency by up to 35% compared to single dumping.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start">
            ICAR Nutrient Protocol
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 uppercase font-bold text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Growth Stage</th>
                <th className="py-3 px-4">Urea Split</th>
                <th className="py-3 px-4">DAP Split</th>
                <th className="py-3 px-4">MOP Split</th>
                <th className="py-3 px-4">Field Instructions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {standard.stages.map((stg, idx) => {
                const isCurrent = currentStage === stg.stage;
                const stageUrea = Math.round((ureaTotalKg * stg.nPercent) / 100);
                const stageDap = Math.round((dapTotalKg * stg.pPercent) / 100);
                const stageMop = Math.round((mopTotalKg * stg.kPercent) / 100);

                return (
                  <tr key={idx} className={isCurrent ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-stone-50/60'}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>}
                        <span className={isCurrent ? 'text-emerald-950 font-bold' : 'text-stone-800'}>
                          {stg.stage}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {stageUrea > 0 ? `${stageUrea} kg (${stg.nPercent}%)` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {stageDap > 0 ? `${stageDap} kg (${stg.pPercent}%)` : '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {stageMop > 0 ? `${stageMop} kg (${stg.kPercent}%)` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {stg.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Water & Irrigation Schedule Card */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Droplet className="w-4 h-4" />
          <span>Hydrology & Irrigation Management</span>
        </div>
        <h3 className="text-xl font-black text-stone-900 mt-1">
          Precision Water Budget for {area} {areaUnit} of {selectedCrop}
        </h3>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <span className="text-xs font-bold text-sky-900 uppercase">Season Total Water Demand</span>
            <p className="text-2xl font-black text-sky-950 mt-1">
              {(totalWaterLiters / 100000).toFixed(1)} Lakh Liters
            </p>
            <p className="text-xs text-sky-700 mt-1">
              Based on {standard.waterTotalMm} mm total seasonal requirement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold text-stone-700 uppercase">Current Stage Irrigation Volume</span>
            <p className="text-2xl font-black text-stone-900 mt-1">
              {(stageWaterLiters / 100000).toFixed(1)} Lakh Liters
            </p>
            <p className="text-xs text-stone-600 mt-1">
              Recommended interval: Every {activeStageInfo.intervalDays > 0 ? `${activeStageInfo.intervalDays} days` : 'as needed'}.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold text-stone-700 uppercase">Method Recommendation</span>
            <p className="text-base font-bold text-emerald-800 mt-1">
              {selectedCrop === 'Tomato' ? 'Drip Micro-Irrigation (4 L/hr emitters)' : 'Furrow or Border Strip Irrigation'}
            </p>
            <p className="text-xs text-stone-600 mt-1">
              Irrigate during morning or twilight hours to reduce evapo-transpiration loss.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
