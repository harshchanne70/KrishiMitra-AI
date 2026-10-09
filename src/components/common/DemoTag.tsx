import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DemoTagProps {
  customMessage?: string;
  isLive?: boolean;
}

export const DemoTag: React.FC<DemoTagProps> = ({ customMessage, isLive = false }) => {
  const { t } = useLanguage();

  if (isLive) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-200 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
        {customMessage || t.liveBadge}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300/80 shadow-xs">
      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>{customMessage || t.demoBadge}</span>
    </span>
  );
};
