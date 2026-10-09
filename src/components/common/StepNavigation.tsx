import React from 'react';
import { ArrowLeft, ArrowRight, Save, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onSaveDraft?: () => void;
  onSkip?: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
  backLabel?: string;
  skipLabel?: string;
  showSaveDraft?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  onSkip,
  isNextDisabled = false,
  isLoading = false,
  nextLabel,
  backLabel,
  skipLabel,
  showSaveDraft = true
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-8 border-t border-theme no-print">
      {/* Back Button */}
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-theme-primary bg-theme-card border border-theme hover:bg-theme-card-subtle active:scale-95 font-semibold text-sm transition shadow-2xs hover:border-theme-accent"
        >
          <ArrowLeft className="w-4 h-4 text-theme-muted" />
          <span>{backLabel || t.nav.back}</span>
        </button>
      ) : (
        <div></div>
      )}

      {/* Middle Options: Save Draft / Skip */}
      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-theme-muted hover:text-theme-primary bg-transparent hover:bg-theme-card-subtle font-medium text-xs sm:text-sm transition"
          >
            {skipLabel || 'Skip Step'}
          </button>
        )}

        {showSaveDraft && onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 font-medium text-xs sm:text-sm transition"
            title="Saves entered inputs safely on this device"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.nav.saveDraft}</span>
          </button>
        )}
      </div>

      {/* Next Button */}
      {onNext && (
        <button
          type="button"
          disabled={isNextDisabled || isLoading}
          onClick={onNext}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition shadow-md active:scale-95 ${
            isNextDisabled || isLoading
              ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/30'
          }`}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
              <span>Processing…</span>
            </>
          ) : (
            <>
              <span>{nextLabel || t.nav.next}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
