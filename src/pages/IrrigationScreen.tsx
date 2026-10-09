import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { DemoTag } from '../components/common/DemoTag';
import { 
  Droplets, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  CloudRain, 
  Info,
  Clock
} from 'lucide-react';

export const IrrigationScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { farmSoil, cropSelection, weatherData } = useAdvisoryWorkflow();

  // Compute irrigation params from agronomy model
  const rainProb = weatherData?.current_rain_prob || 20;
  const isRainImminent = rainProb >= 55;

  // FAO-56 heuristic interval
  const soilRetention = farmSoil.soilType === 'black' || farmSoil.soilType === 'clay' ? 8 : 4;
  const intervalDays = isRainImminent ? 10 : soilRetention;
  const waterVolume = farmSoil.unit === 'hectare' ? 42000 : 17000;

  const handleNext = () => {
    navigate('/advisory/leaf-upload');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={6} maxReachedId={6} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5 text-cyan-800" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                  {t.irrigation.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  {t.irrigation.subtitle} ({cropSelection.cropName} · {cropSelection.growthStage})
                </p>
              </div>
            </div>
            <DemoTag customMessage="ICAR & FAO-56 Derived Guidance" />
          </div>
        </div>

        {/* Rain Alert Status Banner */}
        <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
          isRainImminent 
            ? 'bg-amber-50 border-amber-300 text-amber-900' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          {isRainImminent ? (
            <CloudRain className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-bold text-sm sm:text-base">
              {isRainImminent ? t.irrigation.rainAlertTitle : t.irrigation.rainAlertProceed}
            </h4>
            <p className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">
              {isRainImminent
                ? `Upcoming rainfall probability is high (${rainProb}%). Withholding surface irrigation prevents root asphyxiation and avoids fertilizer leaching.`
                : `Rainfall chance is minimal (${rainProb}%). Normal crop transpiration demand applies. Follow regular furrow or drip schedule.`}
            </p>
          </div>
        </div>

        {/* Irrigation Spec Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Card 1: Interval */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {t.irrigation.interval}
            </span>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1b4332]">
              {intervalDays} <span className="text-sm font-semibold">{t.irrigation.days}</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              Adjusted for {farmSoil.soilType.toUpperCase()} soil retention
            </span>
          </div>

          {/* Card 2: Volume */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mx-auto mb-2">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {t.irrigation.estimatedWater}
            </span>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1b4332]">
              {waterVolume.toLocaleString()}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {t.irrigation.litresPerAcre}
            </span>
          </div>

          {/* Card 3: Method */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mx-auto mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {t.irrigation.recommendedMethod}
            </span>
            <div className="font-bold text-base text-stone-900 mt-1">
              {farmSoil.irrigationMethod === 'drip' ? 'Drip Micro-Irrigation' : 'Broadbed Furrow (BBF)'}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              Reduces percolation runoff by 25-30%
            </span>
          </div>
        </div>

        {/* Uncertainty and Verification Notice */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-stone-800">
            <Info className="w-4 h-4 text-emerald-700" />
            <span>Agronomic Calibration & Soil Check</span>
          </div>
          <p>{t.irrigation.uncertaintyNote}</p>
          <p className="text-[11px] text-stone-500 italic">
            Source: FAO Irrigation and Drainage Paper No. 56 (Crop Evapotranspiration Guidelines).
          </p>
        </div>

        <StepNavigation
          onBack={() => navigate('/advisory/weather')}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};
