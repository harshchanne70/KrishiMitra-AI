import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CropRecommendationInput, Season, SoilType, IrrigationType, RecommendedCrop } from '../../types';
import { CropResultCard } from './CropResultCard';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  FlaskConical, 
  CloudSun, 
  Droplet, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Info,
  Sliders,
  BookmarkCheck
} from 'lucide-react';

export const CropRecommendationWizard: React.FC = () => {
  const { calculateRecommendations, addToast, savedCrops } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<RecommendedCrop[] | null>(null);

  // Form State
  const [formData, setFormData] = useState<CropRecommendationInput>({
    nitrogen: 120, // kg/ha
    phosphorus: 55, // kg/ha
    potassium: 45, // kg/ha
    ph: 6.8,
    season: 'Rabi',
    soilType: 'Alluvial',
    irrigation: 'Well',
    areaAcres: 5
  });

  // Quick Preset Handlers
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'alluvial':
        setFormData({
          nitrogen: 130,
          phosphorus: 60,
          potassium: 45,
          ph: 7.2,
          season: 'Rabi',
          soilType: 'Alluvial',
          irrigation: 'Canal',
          areaAcres: 5
        });
        break;
      case 'black':
        setFormData({
          nitrogen: 90,
          phosphorus: 40,
          potassium: 60,
          ph: 7.8,
          season: 'Kharif',
          soilType: 'Black',
          irrigation: 'Drip',
          areaAcres: 8
        });
        break;
      case 'red':
        setFormData({
          nitrogen: 80,
          phosphorus: 50,
          potassium: 40,
          ph: 6.2,
          season: 'Kharif',
          soilType: 'Red',
          irrigation: 'Well',
          areaAcres: 4
        });
        break;
      case 'sandy':
        setFormData({
          nitrogen: 60,
          phosphorus: 35,
          potassium: 30,
          ph: 7.5,
          season: 'Rabi',
          soilType: 'Sandy',
          irrigation: 'Sprinkler',
          areaAcres: 6
        });
        break;
    }
    addToast({
      type: 'info',
      title: 'Soil Profile Preset Loaded',
      message: `Populated standard parameters for ${presetName.toUpperCase()} region.`
    });
  };

  const handleRunRecommendation = () => {
    setLoading(true);
    setRecommendations(null);

    setTimeout(() => {
      const results = calculateRecommendations(formData);
      setRecommendations(results);
      setLoading(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully if canvas is constrained
      }

      addToast({
        type: 'success',
        title: 'Crop AI Recommendation Complete',
        message: `Discovered top ${results.length} highest-yielding crops for your soil chemistry.`
      });
    }, 700);
  };

  const getPhDescription = (ph: number) => {
    if (ph < 5.5) return { label: 'Strongly Acidic', color: 'text-amber-600', advice: 'Requires agricultural lime' };
    if (ph < 6.5) return { label: 'Slightly Acidic', color: 'text-lime-600', advice: 'Good for potatoes and pulses' };
    if (ph <= 7.5) return { label: 'Neutral (Optimal)', color: 'text-emerald-700', advice: 'Ideal for maximum nutrient uptake' };
    if (ph <= 8.5) return { label: 'Moderately Alkaline', color: 'text-sky-600', advice: 'Common in calcareous black soils' };
    return { label: 'Strongly Alkaline (Saline)', color: 'text-purple-600', advice: 'Apply Gypsum / green manuring' };
  };

  const phInfo = getPhDescription(formData.ph);

  return (
    <div className="space-y-6">
      
      {/* Tool Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Factor Agronomic AI Model</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Smart Crop Recommendation Engine
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Input your soil health card metrics, local climate season, and water access. Our agronomic engine matches biological tolerance curves to identify top-performing crops.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Quick Soil Card Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset('alluvial')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition"
              >
                Alluvial Plain
              </button>
              <button
                onClick={() => applyPreset('black')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition"
              >
                Black Cotton
              </button>
              <button
                onClick={() => applyPreset('red')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition"
              >
                Red Loam
              </button>
              <button
                onClick={() => applyPreset('sandy')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 border border-stone-200 transition"
              >
                Sandy Loam
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {[
              { num: 1, label: 'Soil Nutrients & pH', icon: FlaskConical },
              { num: 2, label: 'Season & Soil Type', icon: CloudSun },
              { num: 3, label: 'Irrigation & Land', icon: Droplet }
            ].map(step => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl transition ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-50 text-stone-500 border border-stone-200'
                  }`}
                >
                  {isPast ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">Step {step.num}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleRunRecommendation}
            disabled={loading}
            className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Calculating...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Run Recommendation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Multi-Step Wizard Body */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-card">
        
        {/* STEP 1: Soil Nutrients & pH */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Step 1: Soil Nutrients & Reaction (pH)</h3>
                <p className="text-xs text-stone-500">Values can be found on your official Soil Health Card (SHC).</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Chemical Parameters
              </span>
            </div>

            {/* N-P-K Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Nitrogen */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-stone-700">Nitrogen (N)</label>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {formData.nitrogen} kg/ha
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={formData.nitrogen}
                  onChange={(e) => setFormData({ ...formData, nitrogen: Number(e.target.value) })}
                  className="w-full accent-emerald-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-semibold">
                  <span>Low (&lt;100)</span>
                  <span>Medium (100-140)</span>
                  <span>High (&gt;140)</span>
                </div>
              </div>

              {/* Phosphorus */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-stone-700">Phosphorus (P)</label>
                  <span className="text-xs font-extrabold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    {formData.phosphorus} kg/ha
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="2"
                  value={formData.phosphorus}
                  onChange={(e) => setFormData({ ...formData, phosphorus: Number(e.target.value) })}
                  className="w-full accent-teal-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-semibold">
                  <span>Low (&lt;30)</span>
                  <span>Medium (30-60)</span>
                  <span>High (&gt;60)</span>
                </div>
              </div>

              {/* Potassium */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-stone-700">Potassium (K)</label>
                  <span className="text-xs font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                    {formData.potassium} kg/ha
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={formData.potassium}
                  onChange={(e) => setFormData({ ...formData, potassium: Number(e.target.value) })}
                  className="w-full accent-indigo-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-semibold">
                  <span>Low (&lt;30)</span>
                  <span>Medium (30-50)</span>
                  <span>High (&gt;50)</span>
                </div>
              </div>

            </div>

            {/* Soil pH Slider with visual range spectrum */}
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <label className="text-sm font-bold text-stone-800">Soil Reaction (pH Level)</label>
                  <p className="text-xs text-stone-500">Determines nutrient bioavailability in root zone.</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-stone-900">{formData.ph.toFixed(1)}</span>
                  <span className={`block text-xs font-bold ${phInfo.color}`}>{phInfo.label}</span>
                </div>
              </div>

              <input
                type="range"
                min="4.5"
                max="9.0"
                step="0.1"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: Number(e.target.value) })}
                className="w-full accent-emerald-800 h-3 rounded-lg cursor-pointer bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400"
              />

              <div className="flex justify-between text-[10px] text-stone-500 mt-2 font-semibold">
                <span>4.5 (Strong Acidic)</span>
                <span>6.5 - 7.5 (Neutral Optimal)</span>
                <span>9.0 (Strong Alkaline)</span>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-white border border-stone-200 flex items-center gap-2 text-xs">
                <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-stone-700">
                  <strong className="text-stone-900">Agronomist Insight:</strong> {phInfo.advice}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
              >
                <span>Continue to Step 2: Climate & Soil</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Season & Soil Type */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Step 2: Cropping Season & Soil Taxonomy</h3>
                <p className="text-xs text-stone-500">Matches thermal window and moisture retention capability.</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Agro-Climatic
              </span>
            </div>

            {/* Cropping Season Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Current / Target Agricultural Season
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Rabi', title: 'Rabi (Winter)', months: 'Oct - Mar (Wheat, Mustard, Gram)' },
                  { id: 'Kharif', title: 'Kharif (Monsoon)', months: 'Jun - Oct (Paddy, Cotton, Soybean)' },
                  { id: 'Zaid', title: 'Zaid (Summer)', months: 'Mar - Jun (Vegetables, Pulses, Melons)' }
                ].map(season => (
                  <button
                    key={season.id}
                    onClick={() => setFormData({ ...formData, season: season.id as Season })}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      formData.season === season.id
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <p className={`text-sm font-bold ${formData.season === season.id ? 'text-emerald-900' : 'text-stone-800'}`}>
                      {season.title}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">{season.months}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Soil Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Primary Field Soil Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'Alluvial', desc: 'Indo-Gangetic, fertile silt' },
                  { id: 'Black', desc: 'Regur, clay-rich, moisture holder' },
                  { id: 'Red', desc: 'Porous, iron-rich, fast drain' },
                  { id: 'Sandy', desc: 'Light, coarse, high aeration' },
                  { id: 'Clay', desc: 'Heavy, high water retention' }
                ].map(soil => (
                  <button
                    key={soil.id}
                    onClick={() => setFormData({ ...formData, soilType: soil.id as SoilType })}
                    className={`p-3 rounded-xl border text-left transition ${
                      formData.soilType === soil.id
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <p className={`text-xs font-bold ${formData.soilType === soil.id ? 'text-emerald-900' : 'text-stone-800'}`}>
                      {soil.id} Soil
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{soil.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cultivated Area in Acres */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-stone-700">Planned Cultivation Area (Acres)</label>
                <span className="text-xs font-extrabold text-stone-900 bg-white px-2.5 py-1 rounded border border-stone-200">
                  {formData.areaAcres} Acres (~{(formData.areaAcres * 0.4047).toFixed(1)} Hectares)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={formData.areaAcres}
                onChange={(e) => setFormData({ ...formData, areaAcres: Number(e.target.value) })}
                className="w-full accent-emerald-800 h-2 bg-stone-200 rounded-lg cursor-pointer mt-3"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
              >
                <span>Continue to Step 3: Irrigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Irrigation & Field Condition */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Step 3: Water Availability & Irrigation Setup</h3>
                <p className="text-xs text-stone-500">Crucial for matching seasonal drought or waterlogging risks.</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Hydrological
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Canal', title: 'Canal Irrigation', desc: 'Government canal system, seasonal flow' },
                { id: 'Well', title: 'Tube-well / Borewell', desc: 'Year-round groundwater access' },
                { id: 'Drip', title: 'Drip Fertigation System', desc: 'Micro-irrigation, high water efficiency' },
                { id: 'Sprinkler', title: 'Sprinkler System', desc: 'Even coverage on sandy/undulating terrain' },
                { id: 'Rainfed', title: 'Rainfed (Barani)', desc: 'Dependent solely on monsoon precipitation' }
              ].map(irr => (
                <button
                  key={irr.id}
                  onClick={() => setFormData({ ...formData, irrigation: irr.id as IrrigationType })}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    formData.irrigation === irr.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <p className={`text-sm font-bold ${formData.irrigation === irr.id ? 'text-emerald-900' : 'text-stone-800'}`}>
                    {irr.title}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">{irr.desc}</p>
                </button>
              ))}
            </div>

            {/* Summary Confirmation Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-stone-700 space-y-2">
              <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                Ready to Process AI Advisory Model:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-stone-500 block">N-P-K Ratio:</span>
                  <span className="font-bold text-stone-900">{formData.nitrogen} : {formData.phosphorus} : {formData.potassium}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Soil pH:</span>
                  <span className="font-bold text-stone-900">{formData.ph.toFixed(1)} ({phInfo.label})</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Season & Soil:</span>
                  <span className="font-bold text-stone-900">{formData.season} • {formData.soilType}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Irrigation & Land:</span>
                  <span className="font-bold text-stone-900">{formData.irrigation} • {formData.areaAcres} Acres</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleRunRecommendation}
                disabled={loading}
                className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Generate Recommendations Now</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Recommended Output Section */}
      {recommendations && (
        <div className="space-y-5 animate-fade-in pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                AI Advisory Results
              </span>
              <h3 className="text-xl font-black text-stone-900">
                Top 3 Recommended Crops for Your Farm
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Ranked by biological suitability, historical yield, and input ROI.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {recommendations.map((crop, idx) => (
              <CropResultCard key={crop.id} crop={crop} rank={idx + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Saved Crop Plan Quick Bar */}
      {savedCrops.length > 0 && (
        <div className="bg-stone-100/90 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-700" />
            <span className="text-xs font-bold text-stone-800">
              You have {savedCrops.length} crop(s) saved in your offline Farm Plan itinerary.
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('farm-plan-summary');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-emerald-50 transition"
          >
            Review Saved Plan
          </button>
        </div>
      )}

    </div>
  );
};
