import React from 'react';
import { RecommendedCrop } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Droplet, 
  Banknote, 
  Bookmark, 
  BookmarkCheck, 
  Sprout, 
  CheckCircle2,
  Share2
} from 'lucide-react';

interface CropResultCardProps {
  crop: RecommendedCrop;
  rank: number;
}

export const CropResultCard: React.FC<CropResultCardProps> = ({ crop, rank }) => {
  const { savedCrops, saveCropToPlan, removeCropFromPlan, addToast } = useApp();

  const isSaved = savedCrops.some(c => c.id === crop.id);

  const getRankBadge = (rankNum: number) => {
    switch (rankNum) {
      case 1:
        return 'bg-emerald-600 text-white border-emerald-500 shadow-sm';
      case 2:
        return 'bg-forest-800 text-white border-forest-700';
      case 3:
        return 'bg-stone-700 text-white border-stone-600';
      default:
        return 'bg-stone-600 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (score >= 80) return 'text-teal-700 bg-teal-100 border-teal-300';
    return 'text-amber-700 bg-amber-100 border-amber-300';
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Crop Advisory Recommendation: ${crop.name} (${crop.matchScore}% Match). Yield: ${crop.expectedYield}, Net Return: ${crop.estimatedNetReturn}`
    );
    addToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `Summary for ${crop.name} copied to clipboard.`
    });
  };

  return (
    <div className={`relative bg-white rounded-2xl border shadow-card transition-all duration-300 hover:shadow-elevated overflow-hidden ${
      rank === 1 ? 'border-emerald-400 ring-2 ring-emerald-500/10' : 'border-stone-200/90'
    }`}>
      {/* Top Banner Ribbon */}
      <div className={`px-5 py-3 flex items-center justify-between border-b ${
        rank === 1 ? 'bg-emerald-50/80 border-emerald-100' : 'bg-stone-50 border-stone-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${getRankBadge(rank)}`}>
            Rank #{rank} Recommended
          </span>
          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            {crop.bestSuitedFor}
          </span>
        </div>

        {/* Match Percentage Pill */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${getScoreColor(crop.matchScore)}`}>
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{crop.matchScore}% Suitability Match</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Crop Title & Profit Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{crop.name}</span>
            </h3>
            <p className="text-xs font-medium text-stone-500 italic mt-0.5">
              {crop.scientificName}
            </p>
          </div>

          <div className="text-left sm:text-right bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200/60">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              Estimated Net Return
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-900">
              {crop.estimatedNetReturn}
            </span>
          </div>
        </div>

        {/* 4 Core Agronomic Metrics Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              <span>Expected Yield</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mt-1">{crop.expectedYield}</p>
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Sowing Window</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mt-1">{crop.sowingWindow}</p>
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Maturity Cycle</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mt-1">{crop.harvestDuration}</p>
          </div>

          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
              <Droplet className="w-3.5 h-3.5 text-sky-600" />
              <span>Water Demand</span>
            </div>
            <p className="text-sm font-bold text-stone-900 mt-1">{crop.waterRequirement}</p>
          </div>

        </div>

        {/* Scientific Rationale List */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            Why AI Recommends this for Your Land
          </h4>
          <ul className="space-y-1.5">
            {crop.whyRecommended.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Input specifications box */}
        <div className="mt-4 p-3 bg-stone-100/70 rounded-xl border border-stone-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-stone-500 block font-medium">Certified Seed Rate:</span>
            <span className="font-bold text-stone-800">{crop.keyInputs.seedRate}</span>
          </div>
          <div>
            <span className="text-stone-500 block font-medium">Recommended NPK:</span>
            <span className="font-bold text-stone-800">{crop.keyInputs.npkRatio}</span>
          </div>
          <div>
            <span className="text-stone-500 block font-medium">Critical Water Stages:</span>
            <span className="font-bold text-stone-800 truncate block" title={crop.keyInputs.criticalIrrigations}>
              {crop.keyInputs.criticalIrrigations}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-xl hover:bg-stone-100 transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Advisory</span>
          </button>

          <button
            onClick={() => isSaved ? removeCropFromPlan(crop.id) : saveCropToPlan(crop)}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs ${
              isSaved
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                : 'bg-forest-900 text-white hover:bg-forest-800'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                <span>Saved in Farm Plan</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save to My Farm Plan</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
