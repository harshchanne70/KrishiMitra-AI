import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Sprout, 
  Compass, 
  BarChart3, 
  CloudSun, 
  Droplets, 
  Camera, 
  Microscope, 
  FileText, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface StepItem {
  id: number;
  route: string;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WORKFLOW_STEPS: StepItem[] = [
  { id: 1, route: '/advisory/farmer-info', key: 'farmerInfo', icon: User },
  { id: 2, route: '/advisory/farm-soil', key: 'farmSoil', icon: Sprout },
  { id: 3, route: '/advisory/crop-select', key: 'cropSelect', icon: Compass },
  { id: 4, route: '/advisory/crop-suitability', key: 'cropSuitability', icon: BarChart3 },
  { id: 5, route: '/advisory/weather', key: 'weather', icon: CloudSun },
  { id: 6, route: '/advisory/irrigation', key: 'irrigation', icon: Droplets },
  { id: 7, route: '/advisory/leaf-upload', key: 'leafUpload', icon: Camera },
  { id: 8, route: '/advisory/disease-result', key: 'diseaseResult', icon: Microscope },
  { id: 9, route: '/advisory/summary', key: 'summary', icon: FileText }
];

interface FurrowStepperProps {
  currentStepId: number;
  maxReachedId?: number;
}

export const FurrowStepper: React.FC<FurrowStepperProps> = ({ currentStepId, maxReachedId = currentStepId }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const fillPercentage = Math.round(((currentStepId - 1) / (WORKFLOW_STEPS.length - 1)) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto my-4 sm:my-6 px-2 overflow-x-auto select-none no-print">
      <div className="min-w-[680px] relative px-4 py-2">
        {/* Furrow base line */}
        <div className="absolute top-[26px] left-8 right-8 h-1.5 bg-theme-card-subtle border border-theme rounded-full z-0"></div>
        
        {/* Animated Leaf Green progress fill */}
        <div 
          className="absolute top-[26px] left-8 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full z-0 transition-all duration-300 shadow-sm shadow-emerald-500/50"
          style={{ width: `calc(${fillPercentage}% - 16px)` }}
        ></div>

        {/* Step Nodes */}
        <div className="flex items-center justify-between relative z-10">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = step.id < currentStepId;
            const isCurrent = step.id === currentStepId;
            const isClickable = step.id <= Math.max(maxReachedId, currentStepId);

            const labelText = (t.steps as Record<string, string>)[step.key] || step.key;

            return (
              <button
                key={step.id}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && navigate(step.route)}
                className={`flex flex-col items-center group focus:outline-none transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                aria-label={`Go to ${labelText}`}
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                    isCurrent
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 ring-4 ring-emerald-400/30 scale-110 font-bold border-2 border-emerald-200'
                      : isDone
                      ? 'bg-emerald-600/30 text-emerald-300 border-2 border-emerald-500 hover:bg-emerald-600/50'
                      : 'bg-theme-card text-theme-muted border-2 border-theme hover:border-theme-accent'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-5 h-5 stroke-[2.8]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[11px] font-semibold mt-1.5 max-w-[70px] text-center leading-tight tracking-tight ${
                    isCurrent
                      ? 'text-theme-primary font-bold'
                      : isDone
                      ? 'text-emerald-400 font-medium'
                      : 'text-theme-muted'
                  }`}
                >
                  {labelText}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
