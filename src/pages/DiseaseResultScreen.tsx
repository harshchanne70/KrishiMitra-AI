import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAdvisoryWorkflow } from '../context/AdvisoryWorkflowContext';
import { FurrowStepper } from '../components/common/FurrowStepper';
import { StepNavigation } from '../components/common/StepNavigation';
import { DemoTag } from '../components/common/DemoTag';
import { 
  Microscope, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  BookOpen, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const DiseaseResultScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { leafImage, diseaseResult, cropSelection } = useAdvisoryWorkflow();

  const handleNext = () => {
    navigate('/advisory/summary');
  };

  const displayName = diseaseResult
    ? language === 'hi'
      ? diseaseResult.condition_name_hi
      : language === 'mr'
      ? diseaseResult.condition_name_mr
      : diseaseResult.condition_name_en
    : '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <FurrowStepper currentStepId={8} maxReachedId={8} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mt-4">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Microscope className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1b4332]">
                  {t.diseaseResult.title}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
                  {t.diseaseResult.subtitle} ({cropSelection.cropName})
                </p>
              </div>
            </div>

            <DemoTag 
              isLive={!diseaseResult?.is_demo && diseaseResult?.confidence != null}
              customMessage={diseaseResult?.is_demo ? 'Demo Mode — Simulated Diagnosis' : 'Neural Model Active'}
            />
          </div>
        </div>

        {/* Content */}
        {!leafImage ? (
          /* Case 1: Skipped image upload */
          <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto text-xl">
              🍃
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-stone-800">
              {t.diseaseResult.skippedMessage}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              Preventative crop protection and general prophylactic IPM guidance will be provided in your final advisory report.
            </p>
          </div>
        ) : diseaseResult ? (
          /* Case 2: Analysis result available */
          <div className="space-y-6">
            
            {/* Transparent Demo Notice Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">{t.diseaseResult.demoNotice}</h4>
                <p className="text-xs text-amber-800/90 mt-0.5">
                  {diseaseResult.disclaimer}
                </p>
              </div>
            </div>

            {/* Condition Header Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <img
                src={leafImage}
                alt="Analyzed leaf"
                className="w-32 h-32 object-cover rounded-xl border border-stone-200 shadow-sm"
              />

              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {t.diseaseResult.predictedCondition}
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1b4332]">
                  {displayName}
                </h3>

                {diseaseResult.confidence != null ? (
                  <p className="text-xs font-bold text-emerald-700">
                    {t.diseaseResult.confidence}: {diseaseResult.confidence}%
                  </p>
                ) : (
                  <p className="text-xs text-stone-500 italic">
                    Confidence metric omitted to prevent unvalidated ML accuracy claims.
                  </p>
                )}
              </div>
            </div>

            {/* Symptoms Observed */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                {t.diseaseResult.symptoms}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-700">
                {diseaseResult.symptoms_observed.map((symp, i) => (
                  <li key={i}>{symp}</li>
                ))}
              </ul>
            </div>

            {/* Immediate Care Actions */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                {t.diseaseResult.careActions}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-emerald-900">
                {diseaseResult.immediate_care_actions.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            {/* When to Contact Expert */}
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 text-xs sm:text-sm text-red-950 flex items-start gap-3">
              <PhoneCall className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 mb-0.5">
                  {t.diseaseResult.whenContactExpert}
                </h4>
                <p className="text-red-900/90 leading-relaxed">
                  {diseaseResult.when_to_contact_expert}
                </p>
              </div>
            </div>

            {/* Verified Sources */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-800 flex items-center gap-1.5 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                {t.diseaseResult.verifiedSources}:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-500">
                {diseaseResult.verified_knowledge_sources.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
            </div>

          </div>
        ) : (
          <div className="text-center py-8 text-stone-500">
            <p>Click below to generate full personalized advisory.</p>
          </div>
        )}

        <StepNavigation
          onBack={() => navigate('/advisory/leaf-upload')}
          onNext={handleNext}
          nextLabel="Generate Final Advisory →"
        />
      </div>
    </div>
  );
};
