import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { api, CropCatalogItem } from '../services/api';
import { Compass, Calendar, Layers, Check } from 'lucide-react';

export const CropSelectScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { cropSelection, setCropSelection, farmSoil } = useAdvisoryWorkflow();

  const [catalog, setCatalog] = useState<CropCatalogItem[]>([]);
  const [selectedCropObj, setSelectedCropObj] = useState<CropCatalogItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const crops = await api.getCropCatalog();
      setCatalog(crops);
      const found = crops.find(c => c.crop_id === cropSelection.cropId);
      if (found) {
        setSelectedCropObj(found);
      } else if (crops.length > 0) {
        setSelectedCropObj(crops[0]);
        setCropSelection(prev => ({
          ...prev,
          cropId: crops[0].crop_id,
          cropName: crops[0].name_en,
          cropVariety: crops[0].varieties[0]?.name || 'Standard High-Yielding'
        }));
      }
    };
    load();
  }, []);

  const handleSelectCrop = (crop: CropCatalogItem) => {
    setSelectedCropObj(crop);
    setCropSelection({
      ...cropSelection,
      cropId: crop.crop_id,
      cropName: crop.name_en,
      cropVariety: crop.varieties[0]?.name || 'Local High-Yielding',
      growthStage: crop.growth_stages[1] || 'Vegetative'
    });
  };

  const handleNext = () => {
    navigate('/advisory/crop-suitability');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={3} maxReachedId={3} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                {t.cropSelect.title}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                {t.cropSelect.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Crop Grid */}
          <div>
            <label className="block text-sm font-bold text-stone-900 mb-2">
              {t.cropSelect.chooseCrop} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {catalog.map((c) => {
                const isSelected = cropSelection.cropId === c.crop_id;
                const cropDisplayName = language === 'hi' ? c.name_hi : language === 'mr' ? c.name_mr : c.name_en;

                return (
                  <button
                    key={c.crop_id}
                    type="button"
                    onClick={() => handleSelectCrop(c)}
                    className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 focus:outline-none ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/30 shadow-xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <span className="text-3xl mb-0.5">{c.icon}</span>
                    <span className="text-sm font-bold leading-tight">{cropDisplayName}</span>
                    <span className="text-[10px] text-stone-500 font-medium capitalize">
                      {c.duration_days}
                    </span>
                    {isSelected && (
                      <span className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Variety & Growth Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.cropSelect.variety}
              </label>
              <select
                value={cropSelection.cropVariety}
                onChange={(e) => setCropSelection({ ...cropSelection, cropVariety: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {selectedCropObj?.varieties && selectedCropObj.varieties.length > 0 ? (
                  selectedCropObj.varieties.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name} {v.maturity_days ? `(${v.maturity_days} days)` : ''}
                    </option>
                  ))
                ) : (
                  <option value="Local Standard">Local Standard Variety</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.cropSelect.stage} <span className="text-red-500">*</span>
              </label>
              <select
                value={cropSelection.growthStage}
                onChange={(e) => setCropSelection({ ...cropSelection, growthStage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {selectedCropObj?.growth_stages && selectedCropObj.growth_stages.length > 0 ? (
                  selectedCropObj.growth_stages.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))
                ) : (
                  <>
                    <option value="Germination">Germination (अंकुरण)</option>
                    <option value="Vegetative">Vegetative Growth (वानस्पतिक)</option>
                    <option value="Flowering">Flowering (फूल अवस्था)</option>
                    <option value="Pod/Fruit Formation">Pod / Grain Formation (दाने भरणे)</option>
                    <option value="Maturity">Maturity / Harvest (परिपक्वता)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Sowing Date & Allocated Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.cropSelect.sowingDate}
              </label>
              <input
                type="date"
                value={cropSelection.sowingDate}
                onChange={(e) => setCropSelection({ ...cropSelection, sowingDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 mb-1.5">
                {t.cropSelect.allocatedArea} ({farmSoil.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                max={farmSoil.area * 2}
                value={cropSelection.allocatedArea}
                onChange={(e) => setCropSelection({ ...cropSelection, allocatedArea: parseFloat(e.target.value) || farmSoil.area })}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm sm:text-base bg-stone-50/60 focus:bg-white transition focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

        </div>

        <StepNavigation
          onBack={() => navigate('/advisory/farm-soil')}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};
