import React, { useState } from 'react';
import { DiseaseRecord } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Bug, 
  Leaf, 
  ShieldCheck, 
  FlaskConical, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  BookmarkCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface DiseaseCardProps {
  disease: DiseaseRecord;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease }) => {
  const { savedDiseases, toggleBookmarkDisease } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'preventive'>('organic');

  const isBookmarked = savedDiseases.includes(disease.id);

  const getSeverityBadge = (sev: DiseaseRecord['severity']) => {
    switch (sev) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-card hover:shadow-elevated transition-all overflow-hidden">
      
      {/* Header bar */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs flex-shrink-0"
              style={{ backgroundColor: disease.imagePlaceholderColor }}
            >
              <Leaf className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {disease.crop} ({disease.cropHindi})
                </span>
                <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                  Part: {disease.affectedPart}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getSeverityBadge(disease.severity)}`}>
                  {disease.severity} Threat
                </span>
              </div>

              <h4 className="text-lg font-black text-stone-900 mt-1.5 tracking-tight">
                {disease.diseaseName}
              </h4>
              <p className="text-xs font-medium text-stone-500 italic">
                {disease.scientificName}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmarkDisease(disease.id)}
            className={`p-2 rounded-xl border transition ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark this disease advisory'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Visual Symptom Summary */}
        <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700 font-bold mb-1">
            <Bug className="w-3.5 h-3.5 text-amber-700" />
            <span>Key Field Symptoms:</span>
          </div>
          <p className="text-stone-600 font-normal leading-relaxed">
            {disease.visualIndicators}
          </p>
        </div>

        {/* Favorable Climate Conditions */}
        <div className="mt-2.5 text-[11px] text-stone-500 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span><strong className="text-stone-700">Weather Triggers:</strong> {disease.favorableConditions}</span>
        </div>

        {/* Toggle Detailed Treatments */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
          >
            <span>{expanded ? 'Hide Treatment Protocol' : 'View Actionable Treatments & Dosages'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <span className="text-[11px] font-semibold text-stone-400">
            {disease.organicTreatment.length + disease.chemicalTreatment.length} remedies
          </span>
        </div>
      </div>

      {/* Expanded Accordion Treatment Guide */}
      {expanded && (
        <div className="bg-stone-50/70 border-t border-stone-200 p-5 space-y-4 animate-fade-in">
          
          {/* Treatment Tabs */}
          <div className="flex gap-2 border-b border-stone-200 pb-2">
            <button
              onClick={() => setActiveTab('organic')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'organic'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              🌱 Organic & Biological ({disease.organicTreatment.length})
            </button>
            <button
              onClick={() => setActiveTab('chemical')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'chemical'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              🧪 Chemical & Fungicides ({disease.chemicalTreatment.length})
            </button>
            <button
              onClick={() => setActiveTab('preventive')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                activeTab === 'preventive'
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              🛡️ Cultural Prevention ({disease.preventiveMeasures.length})
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="space-y-2">
            {activeTab === 'organic' && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Certified Bio-Pesticides & Traditional Formulations:
                </p>
                {disease.organicTreatment.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-stone-800 flex items-start gap-2">
                    <span className="font-bold text-emerald-800 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'chemical' && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                  CIBRC Approved Technical Fungicides & Dosages:
                </p>
                {disease.chemicalTreatment.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200 text-xs text-stone-800 flex items-start gap-2">
                    <span className="font-bold text-blue-800 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
                <p className="text-[10px] text-stone-500 italic mt-1">
                  * Always observe pre-harvest interval (PHI) and wear protective masks during application.
                </p>
              </div>
            )}

            {activeTab === 'preventive' && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Long-Term Field Sanitation & Resistant Cultivars:
                </p>
                {disease.preventiveMeasures.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
                    <span className="font-bold text-stone-700 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
