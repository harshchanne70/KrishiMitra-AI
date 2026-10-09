import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { Sprout, Droplets, Sun, Layers, HelpCircle } from 'lucide-react';

export const FarmSoilScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { farmSoil, setFarmSoil } = useAdvisoryWorkflow();

  const handleNext = () => {
    navigate('/advisory/crop-select');
  };

  const soilVisualDetails: Record<string, { color: string; description: string }> = {
    black: { color: 'bg-stone-800 text-stone-100', description: 'Deep Vertisol, high water holding, ideal for Cotton & Soybean.' },
    clay: { color: 'bg-amber-900 text-amber-100', description: 'Fine texture, rich nutrient capacity, slow drainage.' },
    alluvial: { color: 'bg-stone-600 text-stone-100', description: 'Loamy river valley deposit, balanced fertility for Wheat & Paddy.' },
    red: { color: 'bg-red-800 text-red-100', description: 'Iron-rich, permeable, suited for Groundnut, Maize & Pulses.' },
    laterite: { color: 'bg-orange-800 text-orange-100', description: 'Porous, acidic, well-adapted for plantation crops & Cashew.' },
    sandy: { color: 'bg-amber-600 text-amber-100', description: 'Light coarse texture, fast drainage, requires frequent drip irrigation.' }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={2} maxReachedId={2} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                {t.farmSoil.title}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                {t.farmSoil.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Land Area and Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.area} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={farmSoil.area}
                onChange={(e) => setFarmSoil({ ...farmSoil, area: parseFloat(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.unit}
              </label>
              <select
                value={farmSoil.unit}
                onChange={(e) => setFarmSoil({ ...farmSoil, unit: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="acre">{t.farmSoil.acre}</option>
                <option value="hectare">{t.farmSoil.hectare}</option>
              </select>
            </div>
          </div>

          {/* Visual Soil Selection */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              {t.farmSoil.soilType} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(t.farmSoil.soils).map(([code, label]) => {
                const isSelected = farmSoil.soilType === code;
                const visual = soilVisualDetails[code];

                return (
                  <div
                    key={code}
                    onClick={() => setFarmSoil({ ...farmSoil, soilType: code })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition text-left flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-600/20'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${visual?.color || 'bg-stone-700 text-white'}`}>
                          {code}
                        </span>
                        {isSelected && (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 leading-tight mb-1">
                        {label}
                      </h4>
                      <p className="text-[11px] text-stone-500 leading-normal">
                        {visual?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soil pH (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-bold text-stone-900">
                {t.farmSoil.soilPh}
              </label>
              <span className="text-xs text-stone-500 italic">Optional (वैकल्पिक)</span>
            </div>
            <input
              type="number"
              step="0.1"
              min="3"
              max="10"
              value={farmSoil.ph}
              onChange={(e) => setFarmSoil({ ...farmSoil, ph: e.target.value })}
              placeholder="e.g. 6.8 (Leave blank if not tested)"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <p className="text-xs text-stone-500 mt-1">
              {t.farmSoil.soilPhHint}
            </p>
          </div>

          {/* Water Source & Water Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.waterSource} <span className="text-red-500">*</span>
              </label>
              <select
                value={farmSoil.waterSource}
                onChange={(e) => setFarmSoil({ ...farmSoil, waterSource: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {Object.entries(t.farmSoil.sources).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.waterAvailability} <span className="text-red-500">*</span>
              </label>
              <select
                value={farmSoil.waterAvailability}
                onChange={(e) => setFarmSoil({ ...farmSoil, waterAvailability: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {Object.entries(t.farmSoil.levels).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Irrigation Method & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.irrigationMethod} <span className="text-red-500">*</span>
              </label>
              <select
                value={farmSoil.irrigationMethod}
                onChange={(e) => setFarmSoil({ ...farmSoil, irrigationMethod: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {Object.entries(t.farmSoil.methods).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.farmSoil.currentSeason} <span className="text-red-500">*</span>
              </label>
              <select
                value={farmSoil.season}
                onChange={(e) => setFarmSoil({ ...farmSoil, season: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {Object.entries(t.farmSoil.seasons).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <StepNavigation
          onBack={() => navigate('/advisory/farmer-info')}
          onNext={handleNext}
          onSaveDraft={() => alert('Soil inputs saved safely in browser!')}
        />
      </div>
    </div>
  );
};
