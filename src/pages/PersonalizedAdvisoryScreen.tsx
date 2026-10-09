import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { DemoTag } from '../components/common/DemoTag';
import { 
  FileText, 
  Printer, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets, 
  CloudSun, 
  Sprout, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PersonalizedAdvisoryScreen: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { 
    advisoryResult, 
    generateFinalAdvisory, 
    farmerInfo, 
    cropSelection, 
    resetWorkflow, 
    isLoading 
  } = useAdvisoryWorkflow();

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!advisoryResult) {
      generateFinalAdvisory();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToHistory = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleStartNew = () => {
    resetWorkflow();
    navigate('/advisory/farmer-info');
  };

  if (isLoading || !advisoryResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="font-heading font-bold text-xl text-[#1b4332] mb-1">
          Synthesizing Personalized Agronomic Advisory…
        </h3>
        <p className="text-stone-600 text-sm">
          Integrating soil parameters, 5-day weather forecast, and ICAR crop protection guides.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={9} maxReachedId={9} />

      {/* Action Bar (Top) */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Session ID:</span>
          <span className="text-xs font-mono font-bold bg-stone-100 px-2 py-0.5 rounded text-stone-800">
            {advisoryResult.session_id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-100 text-stone-800 hover:bg-stone-200 transition border border-stone-300"
          >
            <Printer className="w-4 h-4" />
            <span>{t.nav.printAdvisory}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveToHistory}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs ${
              savedSuccess
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-800 text-white hover:bg-emerald-900'
            }`}
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved to Records!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{t.nav.saveToHistory}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        
        {/* Document Header */}
        <div className="border-b border-stone-200 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full mb-1">
                <span>🌾 KrishiMitra AI Precision Advisory</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1b4332]">
                {t.advisory.title}
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                {t.advisory.greeting} <strong>{farmerInfo.name}</strong> ({farmerInfo.village}, {farmerInfo.district})
              </p>
            </div>

            <DemoTag customMessage="Rule-Based Agronomy Engine" />
          </div>
        </div>

        {/* CARD 1: My Farm Summary */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b4332] mb-3 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            {t.advisory.farmSummaryCard}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div>
              <span className="block text-stone-500 text-xs">Total Area</span>
              <strong className="text-stone-900">{advisoryResult.farmer_summary.total_area}</strong>
            </div>
            <div>
              <span className="block text-stone-500 text-xs">Soil Type</span>
              <strong className="text-stone-900">{advisoryResult.farmer_summary.soil_type}</strong>
            </div>
            <div>
              <span className="block text-stone-500 text-xs">Soil pH</span>
              <strong className="text-stone-900">{String(advisoryResult.farmer_summary.soil_ph)}</strong>
            </div>
            <div>
              <span className="block text-stone-500 text-xs">Water Source</span>
              <strong className="text-stone-900">{advisoryResult.farmer_summary.water_source}</strong>
            </div>
          </div>
        </div>

        {/* CARD 2: Selected Crop and Growth Stage */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
          <h3 className="font-heading font-bold text-base sm:text-lg text-emerald-950 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            {t.advisory.cropStageCard}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <span className="block text-emerald-800 text-xs">Target Crop</span>
              <strong className="text-emerald-950 text-base">{advisoryResult.crop_growth_stage.crop_name}</strong>
            </div>
            <div>
              <span className="block text-emerald-800 text-xs">Current Growth Stage</span>
              <strong className="text-emerald-950">{advisoryResult.crop_growth_stage.current_stage}</strong>
            </div>
            <div>
              <span className="block text-emerald-800 text-xs">Expected Yield Potential</span>
              <strong className="text-emerald-950">{advisoryResult.crop_growth_stage.benchmark_yield}</strong>
            </div>
          </div>
        </div>

        {/* CARD 3: Weather Advisory */}
        <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-200">
          <h3 className="font-heading font-bold text-base sm:text-lg text-cyan-950 mb-3 flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-cyan-700" />
            {t.advisory.weatherCard}
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-cyan-950 font-bold">
                {advisoryResult.weather_advisory.condition} · {advisoryResult.weather_advisory.current_temperature}
              </p>
              <p className="text-xs text-cyan-800 mt-0.5">
                {advisoryResult.weather_advisory.forecast_headline}
              </p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-cyan-900 bg-white/70 px-3 py-2 rounded-xl border border-cyan-200">
              <span>Rain: {advisoryResult.weather_advisory.rain_probability}</span>
              <span>Humidity: {advisoryResult.weather_advisory.humidity}</span>
              <span>Wind: {advisoryResult.weather_advisory.wind_speed}</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Soil and Water Notes & Irrigation Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Soil Notes */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
            <h4 className="font-heading font-bold text-base text-stone-900 mb-2">
              {t.advisory.soilWaterCard}
            </h4>
            <p className="text-stone-700 leading-relaxed mb-1.5">
              {advisoryResult.soil_and_water_notes.retention_profile}
            </p>
            <p className="text-stone-600 text-xs">
              pH status: {advisoryResult.soil_and_water_notes.ph_status}
            </p>
          </div>

          {/* Irrigation Guidance */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
            <h4 className="font-heading font-bold text-base text-stone-900 mb-2 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-700" />
              {t.advisory.irrigationCard}
            </h4>
            <p className="font-bold text-emerald-800 mb-1">
              Interval: Every {advisoryResult.irrigation_guidance.interval_days} days · {advisoryResult.irrigation_guidance.estimated_litres_per_acre?.toLocaleString()} L/acre
            </p>
            <p className="text-stone-700 text-xs leading-relaxed">
              {advisoryResult.irrigation_guidance.action_advisory}
            </p>
          </div>
        </div>

        {/* CARD 5: Crop Care Recommendations */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#1b4332]">
            {t.advisory.cropCareCard}
          </h3>
          <div className="space-y-2.5">
            {advisoryResult.crop_care_recommendations.map((rec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
                <span className="font-bold text-emerald-800 block mb-0.5">{rec.category}</span>
                <p className="text-stone-800 leading-relaxed">{rec.recommendation}</p>
                <span className="text-[11px] text-stone-500 italic block mt-1">Source: {rec.source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 6: Pest or Disease Concerns */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
          <h3 className="font-heading font-bold text-base sm:text-lg text-amber-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            {t.advisory.pestDiseaseCard}
          </h3>
          {advisoryResult.pest_and_disease_concerns.map((pest, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2 mb-1">
                <strong className="text-amber-950 font-bold">{pest.issue}</strong>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {pest.severity}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-stone-700 mt-1">
                {pest.action.map((act, j) => (
                  <li key={j}>{act}</li>
                ))}
              </ul>
              <span className="text-[11px] text-stone-500 italic block mt-1.5">Source: {pest.source}</span>
            </div>
          ))}
        </div>

        {/* CARD 7: Important Alerts */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-base text-stone-900">
            {t.advisory.alertsCard}
          </h3>
          {advisoryResult.important_alerts.map((alt, i) => (
            <div key={i} className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
              alt.severity === 'warning' ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong className="block font-bold">{alt.title}</strong>
                <p className="mt-0.5 leading-relaxed">{alt.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CARD 8: Recommended Next Steps */}
        <div className="p-5 rounded-2xl bg-emerald-900 text-white space-y-2">
          <h3 className="font-heading font-bold text-base sm:text-lg text-amber-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            {t.advisory.nextStepsCard}
          </h3>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-emerald-100">
            {advisoryResult.recommended_next_steps.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        {/* CARD 9: Official Citations & Disclaimer */}
        <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 space-y-1">
          <p className="font-bold text-stone-700">{t.advisory.officialCitations}:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {advisoryResult.knowledge_sources.map((s, i) => (
              <li key={i}>{s.source} — {s.organization}</li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] italic text-stone-400">
            {advisoryResult.disclaimer}
          </p>
        </div>

      </div>

      {/* Bottom Floating Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 no-print">
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-50"
        >
          ← {t.history.title}
        </button>

        <button
          type="button"
          onClick={handleStartNew}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm sm:text-base shadow-md transition"
        >
          <span>{t.nav.startNew}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
