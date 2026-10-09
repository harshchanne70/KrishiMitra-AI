import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { DemoTag } from '../components/common/DemoTag';
import { BarChart3, CheckCircle2, AlertTriangle, Info, Check } from 'lucide-react';

export const CropSuitabilityScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { 
    cropSuitabilities, 
    fetchSuitabilities, 
    cropSelection, 
    setCropSelection, 
    isLoading 
  } = useAdvisoryWorkflow();

  useEffect(() => {
    if (cropSuitabilities.length === 0) {
      fetchSuitabilities();
    }
  }, []);

  const handleSelectCrop = (cropId: string, cropName: string) => {
    setCropSelection({
      ...cropSelection,
      cropId,
      cropName
    });
  };

  const handleNext = () => {
    navigate('/advisory/weather');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={4} maxReachedId={4} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                  {t.cropSuitability.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  {t.cropSuitability.subtitle}
                </p>
              </div>
            </div>
            
            <DemoTag customMessage="Rule-Based Agronomic Scoring" />
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 mb-6">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{t.cropSuitability.heuristicDisclaimer}</strong> Calculated from soil matrix (40%), seasonal sowing calendar (30%), water supply balance (20%), and soil pH (10%).
          </p>
        </div>

        {/* Suitability Cards List */}
        {isLoading ? (
          <div className="text-center py-12 text-stone-500">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="font-bold text-sm">Evaluating agronomic compatibility matrix…</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cropSuitabilities.map((crop) => {
              const isSelected = cropSelection.cropId === crop.crop_id;
              const cropDisplayName = language === 'hi' ? crop.name_hi : language === 'mr' ? crop.name_mr : crop.name_en;

              const badgeColor =
                crop.score >= 80
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : crop.score >= 60
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-stone-100 text-stone-700 border-stone-300';

              return (
                <div
                  key={crop.crop_id}
                  className={`p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/60 shadow-sm ring-2 ring-emerald-600/20'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{crop.icon}</span>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-stone-900">
                          {cropDisplayName} ({crop.name_en})
                        </h3>
                        <p className="text-xs text-stone-500">
                          Water Demand: <span className="font-semibold capitalize">{crop.water_req}</span> · Season: <span className="font-semibold capitalize">{crop.suitable_seasons.join(', ')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 rounded-xl border font-black text-sm sm:text-base ${badgeColor}`}>
                        {crop.score}% Match
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectCrop(crop.crop_id, crop.name_en)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-emerald-100 text-stone-800 border border-stone-200'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{t.cropSuitability.selected}</span>
                          </>
                        ) : (
                          <span>{t.cropSuitability.selectThisCrop}</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        crop.score >= 80 ? 'bg-emerald-600' : crop.score >= 60 ? 'bg-amber-500' : 'bg-stone-400'
                      }`}
                      style={{ width: `${crop.score}%` }}
                    ></div>
                  </div>

                  {/* Reasons & Cautions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-emerald-950">
                      <span className="font-bold flex items-center gap-1 mb-1 text-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        {t.cropSuitability.whySuitable}
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-emerald-900/90">
                        {crop.match_reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-800">
                      <span className="font-bold flex items-center gap-1 mb-1 text-stone-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        {t.cropSuitability.cautions}
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                        {crop.cautions.length > 0 ? (
                          crop.cautions.map((c, i) => <li key={i}>{c}</li>)
                        ) : (
                          <li>Standard agronomic conditions met without critical risks.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <StepNavigation
          onBack={() => navigate('/advisory/crop-select')}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};
